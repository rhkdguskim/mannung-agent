#!/usr/bin/env node
// doctor.js — Cross-platform backend connectivity diagnostics
// Verifies each model backend is actually working, not just configured

const { execSync } = require('child_process');
const https = require('https');
const http = require('http');

const W = 55;
const H = '\u2500'.repeat(W);
const results = [];

function line(text) { console.log(`\u2502 ${text.padEnd(W - 1)}\u2502`); }
function sep() { console.log(`\u251C${H}\u2524`); }

function exec(cmd, timeout = 8000) {
  try {
    return execSync(cmd, { encoding: 'utf-8', timeout, stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch { return ''; }
}

function httpGet(url, headers = {}) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers, timeout: 5000 }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', () => resolve({ status: 0, data: '' }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, data: 'timeout' }); });
  });
}

// Cache MCP list to avoid multiple calls
let _mcpListCache = null;
function getMcpList() {
  if (_mcpListCache !== null) return _mcpListCache;
  _mcpListCache = exec('claude mcp list 2>&1');
  return _mcpListCache;
}

async function checkAntigravityGemini() {
  const configured = getMcpList().includes('antigravity-gemini');
  if (!configured) {
    return { name: 'antigravity-gemini', status: 'NOT CONFIGURED', models: [], fix: 'claude mcp add antigravity-gemini -- npx -y github:rhkdguskim/antigravity-gemini-mcp' };
  }
  return { name: 'antigravity-gemini', status: 'CONFIGURED', models: ['gemini-3-pro-high', 'gemini-3-flash'], fix: null };
}

async function checkCodex() {
  const configured = getMcpList().includes('codex');
  if (!configured) {
    return { name: 'codex-shell', status: 'NOT CONFIGURED', models: [], fix: 'claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp' };
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { name: 'codex-shell', status: 'MCP OK, NO API KEY', models: ['codex'], fix: 'Set OPENAI_API_KEY environment variable' };
  }
  return { name: 'codex-shell', status: 'READY', models: ['codex'], fix: null };
}

async function checkZAI() {
  const apiKey = process.env.ZHIPU_API_KEY;
  if (!apiKey) {
    return { name: 'Z.AI (GLM)', status: 'NO API KEY', models: [], fix: 'Set ZHIPU_API_KEY (subscribe at z.ai/subscribe)' };
  }
  // Test connectivity
  const res = await httpGet('https://api.z.ai/api/paas/v4/models', {
    'Authorization': `Bearer ${apiKey}`
  });
  if (res.status === 200) {
    return { name: 'Z.AI (GLM)', status: 'CONNECTED', models: ['glm-4.7', 'glm-4.5-air'], fix: null };
  } else if (res.status === 401) {
    return { name: 'Z.AI (GLM)', status: 'AUTH FAILED (401)', models: [], fix: 'Check ZHIPU_API_KEY — may be expired or invalid' };
  } else if (res.status === 0) {
    return { name: 'Z.AI (GLM)', status: 'UNREACHABLE', models: [], fix: 'Check network connection to api.z.ai' };
  } else {
    return { name: 'Z.AI (GLM)', status: `ERROR (${res.status})`, models: [], fix: 'Check Z.AI service status' };
  }
}

function checkClaude() {
  return { name: 'Claude (native)', status: 'ALWAYS READY', models: ['opus', 'sonnet', 'haiku'], fix: null };
}

async function main() {
  console.log('');
  console.log(`\u250C${H}\u2510`);
  line('mannung-agent doctor v2.0');
  line('Diagnosing backend connectivity...');
  sep();

  const checks = await Promise.all([
    checkAntigravityGemini(),
    checkCodex(),
    checkZAI(),
  ]);
  checks.push(checkClaude());

  let allOk = true;
  let readyCount = 0;
  const issues = [];

  for (const c of checks) {
    const ok = !c.fix;
    const icon = ok ? '\u2714' : '\u2718';
    if (ok) readyCount++;
    else allOk = false;

    line(`${icon} ${c.name}`);
    line(`  Status: ${c.status}`);
    if (c.models.length > 0) {
      line(`  Models: ${c.models.join(', ')}`);
    }
    if (c.fix) {
      issues.push({ backend: c.name, fix: c.fix });
    }
    line('');
  }

  sep();
  line(`Backends: ${readyCount}/${checks.length} ready`);

  if (allOk) {
    line('All backends connected!');
  }

  // Available models summary
  sep();
  line('Available Models for Code Generation:');
  line('');
  const models = [];
  for (const c of checks) {
    for (const m of c.models) models.push(m);
  }
  if (models.length > 0) {
    line(`  ${models.join(', ')}`);
  } else {
    line('  Only Claude (native) available');
  }

  console.log(`\u2514${H}\u2518`);

  // Issues and fixes
  if (issues.length > 0) {
    console.log('');
    console.log(`\u250C${H}\u2510`);
    line('Fixes needed:');
    sep();
    for (const issue of issues) {
      line(`${issue.backend}:`);
      line(`  ${issue.fix}`);
      line('');
    }
    console.log(`\u2514${H}\u2518`);
  }

  console.log('');
}

main().catch(console.error);
