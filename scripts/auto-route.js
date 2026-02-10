#!/usr/bin/env node
// auto-route.js — PreToolUse hook for security-critical auto-detection
// Warns when security-sensitive operations are detected in non-Task tools
// Uses shared routing rules from lib/routing-rules.js

const { KEYWORD_RULES } = require('./lib/routing-rules');

const toolName = process.env.CLAUDE_TOOL_NAME || '';
const toolInput = process.env.CLAUDE_TOOL_INPUT || '';

// Skip Task calls (handled by show-routing.js)
if (toolName === 'Task' || !toolInput) {
  process.exit(0);
}

const inputLc = toolInput.toLowerCase();

// Only check for security-critical patterns in code-modifying tools
const securityRule = KEYWORD_RULES.find(r => r.category === 'security');
if (securityRule && securityRule.pattern.test(inputLc)) {
  console.log(`[mannung-agent] CRITICAL: Security-sensitive code detected -> recommended model: Codex`);
}
