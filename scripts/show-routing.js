#!/usr/bin/env node
// show-routing.js — PreToolUse hook for Task tool routing display
// Uses shared routing rules from lib/routing-rules.js

try {
  var routing = require('./lib/routing-rules');
  var resolveAgent = routing.resolveAgent;
  var detectModel = routing.detectModel;
  var BOX_WIDTH = routing.BOX_WIDTH;

  var input = process.env.CLAUDE_TOOL_INPUT || '';
  if (!input) {
    process.exit(0);
  }

  var agent = '';
  var desc = '';
  var bg = false;

  try {
    var parsed = JSON.parse(input);
    agent = parsed.subagent_type || '';
    desc = parsed.description || '';
    bg = parsed.run_in_background || false;
  } catch (e) {
    var agentMatch = input.match(/"subagent_type"\s*:\s*"([^"]*)"/);
    var descMatch = input.match(/"description"\s*:\s*"([^"]*)"/);
    var bgMatch = input.match(/"run_in_background"\s*:\s*true/);
    if (agentMatch) agent = agentMatch[1];
    if (descMatch) desc = descMatch[1];
    if (bgMatch) bg = true;
  }

  var model = 'Claude';
  var backend = 'Native';
  var cost = '--';

  // 1. Try agent type mapping
  var agentResult = resolveAgent(agent);
  if (agentResult) {
    model = agentResult[0];
    backend = agentResult[1];
  }

  // 2. Try keyword detection from prompt
  var detected = detectModel(input);
  if (detected) {
    model = detected.model;
    backend = detected.backend;
    cost = detected.cost;
  }

  // Format output
  var w = BOX_WIDTH;
  var h = '\u2500'.repeat(w);
  var mode = bg ? ' [PARALLEL]' : '';
  var tag = 'mannung-agent routing' + mode;

  console.log('');
  console.log('\u250C' + h + '\u2510');
  console.log('\u2502 ' + tag.padEnd(w - 1) + '\u2502');
  console.log('\u251C' + h + '\u2524');
  console.log('\u2502 Model:   ' + model.padEnd(w - 11) + '\u2502');
  console.log('\u2502 Backend: ' + backend.padEnd(w - 11) + '\u2502');
  console.log('\u2502 Cost:    ' + cost.padEnd(w - 11) + '\u2502');
  if (desc) {
    var t = desc.length > (w - 11) ? desc.substring(0, w - 14) + '...' : desc;
    console.log('\u2502 Task:    ' + t.padEnd(w - 11) + '\u2502');
  }
  if (bg) {
    console.log('\u2502 Mode:    ' + 'Background (parallel)'.padEnd(w - 11) + '\u2502');
  }
  console.log('\u2514' + h + '\u2518');
  console.log('');
} catch (e) {
  // Silently ignore all errors to prevent hook failures
}
process.exit(0);
