#!/usr/bin/env node
// session-start.js — Cross-platform session start display
// Works on macOS, Linux, and Windows

const { execSync } = require('child_process');

function checkMcp(name) {
  try {
    const out = execSync('claude mcp list 2>&1', { encoding: 'utf-8', timeout: 5000 });
    return out.includes(name);
  } catch {
    return false;
  }
}

const gemini = checkMcp('antigravity-gemini');
const codex = checkMcp('codex');
const glm = !!process.env.ZHIPU_API_KEY;

const line = '\u2500'.repeat(41);
console.log('');
console.log(`\u250C${line}\u2510`);
console.log(`\u2502 mannung-agent v2.0                     \u2502`);
console.log(`\u251C${line}\u2524`);
console.log(`\u2502 Gemini:  ${gemini ? 'Ready (antigravity-gemini)   ' : '--                              '}\u2502`);
console.log(`\u2502 Codex:   ${codex  ? 'Ready (codex-shell)          ' : '--                              '}\u2502`);
console.log(`\u2502 GLM:     ${glm    ? 'Ready (Z.AI API)             ' : '--                              '}\u2502`);
console.log(`\u2502 Claude:  Ready (native)                 \u2502`);
console.log(`\u2514${line}\u2518`);
console.log('');
