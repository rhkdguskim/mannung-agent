#!/usr/bin/env node
// show-progress.js — PostToolUse hook for progress and token cost display
// Uses shared routing rules from lib/routing-rules.js

try {
  var routing = require('./lib/routing-rules');
  var detectModel = routing.detectModel;
  var getCostTier = routing.getCostTier;
  var getCostIndicator = routing.getCostIndicator;
  var BOX_WIDTH = routing.BOX_WIDTH;

  var input = process.env.CLAUDE_TOOL_INPUT || '';
  var toolName = process.env.CLAUDE_TOOL_NAME || '';
  var fs = require('fs');
  var os = require('os');
  var path = require('path');
  var sessionFile = path.join(os.tmpdir(), 'mannung-agent-session-' + (process.ppid || 'default') + '.json');

  // Load or init session state
  var session = { taskCount: 0, startTime: Date.now(), tools: {} };
  try {
    if (fs.existsSync(sessionFile)) {
      session = JSON.parse(fs.readFileSync(sessionFile, 'utf-8'));
    }
  } catch (e) { /* ignore */ }

  session.taskCount++;
  session.tools[toolName] = (session.tools[toolName] || 0) + 1;

  // Detect model and cost from shared rules
  var model = 'Claude';
  var costTier = 'medium-high';

  if (toolName === 'Task') {
    try {
      var parsed = JSON.parse(input);
      var combined = (parsed.description || '') + ' ' + (parsed.prompt || '');
      var detected = detectModel(combined);

      if (detected) {
        model = detected.model;
        costTier = getCostTier(detected.model);
      }

      if (parsed.run_in_background) {
        costTier = costTier + '-parallel';
      }
    } catch (e) { /* ignore parse errors */ }
  }

  var costDisplay = getCostIndicator(costTier);

  // Elapsed time
  var elapsed = Math.round((Date.now() - session.startTime) / 1000);
  var mins = Math.floor(elapsed / 60);
  var secs = elapsed % 60;
  var timeStr = mins > 0 ? mins + 'm ' + secs + 's' : secs + 's';

  // Only show for Task tool calls (model routing events)
  if (toolName === 'Task') {
    var w = BOX_WIDTH;
    var h = '\u2500'.repeat(w);

    console.log('');
    console.log('\u250C' + h + '\u2510');
    console.log('\u2502 ' + 'mannung-agent progress'.padEnd(w - 1) + '\u2502');
    console.log('\u251C' + h + '\u2524');
    console.log('\u2502 Model:   ' + model.padEnd(w - 11) + '\u2502');
    console.log('\u2502 Cost:    ' + costDisplay.padEnd(w - 11) + '\u2502');
    console.log('\u2502 Tasks:   ' + String(session.taskCount).padEnd(w - 11) + '\u2502');
    console.log('\u2502 Elapsed: ' + timeStr.padEnd(w - 11) + '\u2502');
    console.log('\u2514' + h + '\u2518');
    console.log('');
  }

  // Save session state
  try {
    fs.writeFileSync(sessionFile, JSON.stringify(session));
  } catch (e) { /* ignore */ }
} catch (e) {
  // Silently ignore all errors to prevent hook failures
}
process.exit(0);
