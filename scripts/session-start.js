#!/usr/bin/env node
// session-start.js — Cross-platform session start display
// Works on macOS, Linux, and Windows

const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Cache MCP list (single call)
let mcpListCache = null;
function getMcpList() {
  if (mcpListCache !== null) return mcpListCache;
  try {
    mcpListCache = execSync('claude mcp list 2>&1', { encoding: 'utf-8', timeout: 5000 });
  } catch {
    mcpListCache = '';
  }
  return mcpListCache;
}

// Clean up stale session files (older than 24 hours)
try {
  const tmpDir = os.tmpdir();
  const files = fs.readdirSync(tmpDir).filter(f => f.startsWith('mannung-agent-session-'));
  const now = Date.now();
  for (const f of files) {
    try {
      const fp = path.join(tmpDir, f);
      const stat = fs.statSync(fp);
      if (now - stat.mtimeMs > 86400000) {
        fs.unlinkSync(fp);
      }
    } catch { /* ignore */ }
  }
} catch { /* ignore */ }

const gemini = getMcpList().includes('antigravity-gemini');
const codex = getMcpList().includes('codex');
const glm = !!process.env.ZHIPU_API_KEY;

const backends = [gemini, codex, glm, true].filter(Boolean).length;

const line = '\u2500'.repeat(41);
console.log('');
console.log(`\u250C${line}\u2510`);
console.log(`\u2502 mannung-agent v2.0                     \u2502`);
console.log(`\u251C${line}\u2524`);
console.log(`\u2502 Gemini:  ${gemini ? 'Ready (antigravity-gemini)   ' : '--                              '}\u2502`);
console.log(`\u2502 Codex:   ${codex  ? 'Ready (codex-shell)          ' : '--                              '}\u2502`);
console.log(`\u2502 GLM:     ${glm    ? 'Ready (Z.AI API)             ' : '--                              '}\u2502`);
console.log(`\u2502 Claude:  Ready (native)                 \u2502`);
console.log(`\u251C${line}\u2524`);
console.log(`\u2502 Backends: ${String(backends + '/4 ready').padEnd(30)}\u2502`);
console.log(`\u2514${line}\u2518`);
console.log('');
