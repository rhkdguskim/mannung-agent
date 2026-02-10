#!/usr/bin/env node
// show-routing.js — PreToolUse hook for Task tool routing display
// Uses shared routing rules from lib/routing-rules.js

const { resolveAgent, detectModel, BOX_WIDTH } = require('./lib/routing-rules');

const input = process.env.CLAUDE_TOOL_INPUT || '';
if (!input) process.exit(0);

let agent = '';
let desc = '';
let bg = false;

try {
  const parsed = JSON.parse(input);
  agent = parsed.subagent_type || '';
  desc = parsed.description || '';
  bg = parsed.run_in_background || false;
} catch {
  const agentMatch = input.match(/"subagent_type"\s*:\s*"([^"]*)"/);
  const descMatch = input.match(/"description"\s*:\s*"([^"]*)"/);
  const bgMatch = input.match(/"run_in_background"\s*:\s*true/);
  if (agentMatch) agent = agentMatch[1];
  if (descMatch) desc = descMatch[1];
  if (bgMatch) bg = true;
}

let model = 'Claude';
let backend = 'Native';
let cost = '--';

// 1. Try agent type mapping
const agentResult = resolveAgent(agent);
if (agentResult) {
  [model, backend] = agentResult;
}

// 2. Try keyword detection from prompt
const detected = detectModel(input);
if (detected) {
  model = detected.model;
  backend = detected.backend;
  cost = detected.cost;
}

// Format output
const w = BOX_WIDTH;
const h = '\u2500'.repeat(w);
const mode = bg ? ' [PARALLEL]' : '';
const tag = `mannung-agent routing${mode}`;

console.log('');
console.log(`\u250C${h}\u2510`);
console.log(`\u2502 ${tag.padEnd(w - 1)}\u2502`);
console.log(`\u251C${h}\u2524`);
console.log(`\u2502 Model:   ${model.padEnd(w - 11)}\u2502`);
console.log(`\u2502 Backend: ${backend.padEnd(w - 11)}\u2502`);
console.log(`\u2502 Cost:    ${cost.padEnd(w - 11)}\u2502`);
if (desc) {
  const t = desc.length > (w - 11) ? desc.substring(0, w - 14) + '...' : desc;
  console.log(`\u2502 Task:    ${t.padEnd(w - 11)}\u2502`);
}
if (bg) {
  console.log(`\u2502 Mode:    ${'Background (parallel)'.padEnd(w - 11)}\u2502`);
}
console.log(`\u2514${h}\u2518`);
console.log('');
