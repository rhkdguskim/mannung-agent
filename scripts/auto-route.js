#!/usr/bin/env node
// auto-route.js — PreToolUse hook for security-critical auto-detection
// Warns when security-sensitive operations are detected in non-Task tools
// Uses shared routing rules from lib/routing-rules.js

try {
  var routing = require('./lib/routing-rules');
  var KEYWORD_RULES = routing.KEYWORD_RULES;

  var toolName = process.env.CLAUDE_TOOL_NAME || '';
  var toolInput = process.env.CLAUDE_TOOL_INPUT || '';

  // Skip Task calls (handled by show-routing.js)
  if (toolName === 'Task' || !toolInput) {
    process.exit(0);
  }

  var inputLc = toolInput.toLowerCase();

  // Only check for security-critical patterns in code-modifying tools
  var securityRule = null;
  for (var i = 0; i < KEYWORD_RULES.length; i++) {
    if (KEYWORD_RULES[i].category === 'security') {
      securityRule = KEYWORD_RULES[i];
      break;
    }
  }
  if (securityRule && securityRule.pattern.test(inputLc)) {
    console.log('[mannung-agent] CRITICAL: Security-sensitive code detected -> recommended model: Codex');
  }
} catch (e) {
  // Silently ignore all errors to prevent hook failures
}
process.exit(0);
