#!/usr/bin/env node
// show-progress.js — PostToolUse hook for progress and token cost display
// Uses shared routing rules from lib/routing-rules.js

const { detectModel, getCostTier, getCostIndicator, BOX_WIDTH } = require('./lib/routing-rules');

const input = process.env.CLAUDE_TOOL_INPUT || '';
const toolName = process.env.CLAUDE_TOOL_NAME || '';
const fs = require('fs');
const os = require('os');
const path = require('path');
const sessionFile = path.join(os.tmpdir(), `mannung-agent-session-${process.ppid || 'default'}.json`);

// Load or init session state
let session = { taskCount: 0, startTime: Date.now(), tools: {} };
try {
  if (fs.existsSync(sessionFile)) {
    session = JSON.parse(fs.readFileSync(sessionFile, 'utf-8'));
  }
} catch { /* ignore */ }

session.taskCount++;
session.tools[toolName] = (session.tools[toolName] || 0) + 1;

// Detect model and cost from shared rules
let model = 'Claude';
let costTier = 'medium-high';

if (toolName === 'Task') {
  try {
    const parsed = JSON.parse(input);
    const combined = `${parsed.description || ''} ${parsed.prompt || ''}`;
    const detected = detectModel(combined);

    if (detected) {
      model = detected.model;
      costTier = getCostTier(detected.model);
    }

    if (parsed.run_in_background) {
      costTier = costTier + '-parallel';
    }
  } catch { /* ignore parse errors */ }
}

const costDisplay = getCostIndicator(costTier);

// Elapsed time
const elapsed = Math.round((Date.now() - session.startTime) / 1000);
const mins = Math.floor(elapsed / 60);
const secs = elapsed % 60;
const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

// Only show for Task tool calls (model routing events)
if (toolName === 'Task') {
  const w = BOX_WIDTH;
  const h = '\u2500'.repeat(w);

  console.log('');
  console.log(`\u250C${h}\u2510`);
  console.log(`\u2502 ${'mannung-agent progress'.padEnd(w - 1)}\u2502`);
  console.log(`\u251C${h}\u2524`);
  console.log(`\u2502 Model:   ${model.padEnd(w - 11)}\u2502`);
  console.log(`\u2502 Cost:    ${costDisplay.padEnd(w - 11)}\u2502`);
  console.log(`\u2502 Tasks:   ${String(session.taskCount).padEnd(w - 11)}\u2502`);
  console.log(`\u2502 Elapsed: ${timeStr.padEnd(w - 11)}\u2502`);
  console.log(`\u2514${h}\u2518`);
  console.log('');
}

// Save session state
try {
  fs.writeFileSync(sessionFile, JSON.stringify(session));
} catch { /* ignore */ }
