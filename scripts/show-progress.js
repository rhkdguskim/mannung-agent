#!/usr/bin/env node
// show-progress.js — PostToolUse hook for progress and token cost display
// Shows what just happened, estimated cost tier, and elapsed time

const input = process.env.CLAUDE_TOOL_INPUT || '';
const toolName = process.env.CLAUDE_TOOL_NAME || '';
const sessionFile = '/tmp/mannung-agent-session.json';
const fs = require('fs');

// Load or init session state
let session = { taskCount: 0, startTime: Date.now(), tools: {} };
try {
  if (fs.existsSync(sessionFile)) {
    session = JSON.parse(fs.readFileSync(sessionFile, 'utf-8'));
  }
} catch { /* ignore */ }

session.taskCount++;
session.tools[toolName] = (session.tools[toolName] || 0) + 1;

// Estimate cost tier based on tool and content
let costTier = 'low';
let model = 'Claude';

if (toolName === 'Task') {
  try {
    const parsed = JSON.parse(input);
    const desc = (parsed.description || '').toLowerCase();
    const prompt = (parsed.prompt || '').toLowerCase();
    const combined = desc + ' ' + prompt;

    // Detect model from keywords (same logic as show-routing.js)
    if (/autopilot|finish.it|do.everything|end.to.end/.test(combined)) {
      model = 'Autopilot'; costTier = 'varies';
    } else if (/codex|algorithm|optimize|debug|reason|complex|security|performance/.test(combined)) {
      model = 'Codex'; costTier = 'high';
    } else if (/explore|search|find|grep|codebase|structure|navigate/.test(combined)) {
      model = 'Gemini Pro'; costTier = 'medium';
    } else if (/frontend|react|vue|css|html|ui|component|style|layout/.test(combined)) {
      model = 'Gemini Flash'; costTier = 'low';
    } else if (/implement|create|build|write.*code|generate|add.*feature|develop/.test(combined)) {
      model = 'Sonnet'; costTier = 'medium-high';
    } else if (/plan\b|document|readme|changelog|specification/.test(combined)) {
      model = 'GLM-4.7'; costTier = 'low';
    }

    if (parsed.run_in_background) {
      costTier += ' (parallel)';
    }
  } catch { /* ignore parse errors */ }
}

// Cost tier indicators
const costIndicators = {
  'low': '$',
  'medium': '$$',
  'medium-high': '$$$',
  'high': '$$$$',
  'varies': '~',
};

const costDisplay = costIndicators[costTier] || costTier;

// Elapsed time
const elapsed = Math.round((Date.now() - session.startTime) / 1000);
const mins = Math.floor(elapsed / 60);
const secs = elapsed % 60;
const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

// Only show for Task tool calls (model routing events)
if (toolName === 'Task') {
  const w = 41;
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
