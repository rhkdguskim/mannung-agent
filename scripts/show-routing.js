#!/usr/bin/env node
// show-routing.js — Cross-platform model routing display
// Works on macOS, Linux, and Windows

const input = process.env.CLAUDE_TOOL_INPUT || '';
if (!input) process.exit(0);

let agent = '';
let desc = '';
let bg = false;
let promptLc = input.toLowerCase();

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

// Detect from subagent_type
const agentModelMap = {
  'Explore': ['Gemini Pro', 'antigravity-gemini MCP'],
  'Plan': ['GLM-4.7', 'Z.AI API'],
};
if (agentModelMap[agent]) {
  [model, backend] = agentModelMap[agent];
}

// Detect from prompt keywords (priority order: highest first)
const rules = [
  { model: 'Autopilot', backend: 'Auto (chained)', cost: '~', pattern: /autopilot|finish.it|do.everything|end.to.end|build.it|complete.this|start.to.finish/ },
  { model: 'Codex', backend: 'codex-shell MCP', cost: '$$$$', pattern: /codex|algorithm|optimize|debug|reason|complex|tdd|test.*driven|review|refactor|security|performance|concurrent|deadlock|race.condition/ },
  { model: 'Gemini Pro', backend: 'antigravity-gemini MCP', cost: '$$', pattern: /explore|search|find|grep|codebase|structure|navigate|directory|scan|locate|survey|traverse/ },
  { model: 'Gemini Flash', backend: 'antigravity-gemini MCP', cost: '$', pattern: /frontend|react|vue|angular|svelte|css|html|ui|ux|component|style|layout|tailwind|design|animation/ },
  { model: 'Sonnet', backend: 'Claude (native)', cost: '$$$', pattern: /implement|create|build|write.*code|generate|add.*feature|develop|scaffold|new.*endpoint|new.*module|new.*file/ },
  { model: 'GLM-4.7', backend: 'Z.AI API', cost: '$', pattern: /glm|plan\b|document|readme|changelog|tutorial|guide|specification|roadmap|estimate/ },
];

let cost = '--';

for (const rule of rules) {
  if (rule.pattern.test(promptLc)) {
    model = rule.model;
    backend = rule.backend;
    cost = rule.cost;
    break;
  }
}

// Format output
const w = 41;
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
