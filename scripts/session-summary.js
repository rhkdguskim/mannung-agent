#!/usr/bin/env node
// session-summary.js — Session end summary display
// Reads session state from temp file and shows summary

const fs = require('fs');
const os = require('os');
const path = require('path');

const sessionFile = path.join(os.tmpdir(), `mannung-agent-session-${process.ppid || 'default'}.json`);

try {
  if (!fs.existsSync(sessionFile)) {
    console.log('[mannung-agent] Session ended');
    process.exit(0);
  }

  const session = JSON.parse(fs.readFileSync(sessionFile, 'utf-8'));
  const elapsed = Math.round((Date.now() - session.startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  const w = 41;
  const h = '\u2500'.repeat(w);

  console.log('');
  console.log(`\u250C${h}\u2510`);
  console.log(`\u2502 ${'mannung-agent session summary'.padEnd(w - 1)}\u2502`);
  console.log(`\u251C${h}\u2524`);
  console.log(`\u2502 Tasks:    ${String(session.taskCount || 0).padEnd(w - 12)}\u2502`);
  console.log(`\u2502 Duration: ${timeStr.padEnd(w - 12)}\u2502`);

  if (session.tools && Object.keys(session.tools).length > 0) {
    const toolSummary = Object.entries(session.tools)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([k, v]) => `${k}(${v})`)
      .join(', ');
    const truncated = toolSummary.length > (w - 12)
      ? toolSummary.substring(0, w - 15) + '...'
      : toolSummary;
    console.log(`\u2502 Tools:    ${truncated.padEnd(w - 12)}\u2502`);
  }

  console.log(`\u2514${h}\u2518`);
  console.log('');

  // Clean up session file
  try { fs.unlinkSync(sessionFile); } catch { /* ignore */ }
} catch {
  console.log('[mannung-agent] Session ended');
}
