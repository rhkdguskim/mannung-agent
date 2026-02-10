// routing-rules.js — Shared routing configuration
// Single source of truth for keyword detection and model mapping
// Used by: show-routing.js, show-progress.js, auto-route.js

const AGENT_MODEL_MAP = {
  'Explore': ['Gemini Pro', 'antigravity-gemini MCP'],
  'Plan': ['GLM-4.7', 'Z.AI API'],
  'mannung-agent:explorer': ['Gemini Pro', 'antigravity-gemini MCP'],
  'mannung-agent:frontend-dev': ['Gemini Flash', 'antigravity-gemini MCP'],
  'mannung-agent:reasoner': ['Codex', 'codex-shell MCP'],
  'mannung-agent:planner': ['GLM-4.7', 'Z.AI API'],
  'mannung-agent:reviewer': ['Codex', 'codex-shell MCP'],
  'mannung-agent:refactorer': ['Codex', 'codex-shell MCP'],
  'mannung-agent:tdd-guide': ['Codex', 'codex-shell MCP'],
  'mannung-agent:architect': ['Claude Opus', 'Native'],
  'mannung-agent:orchestrator': ['Claude', 'Native'],
  'mannung-agent:vibe-coder': ['Auto', 'Multi-model'],
  'mannung-agent:autopilot': ['Auto', 'Multi-model (chained)'],
};

// Priority order: highest first. First match wins.
const KEYWORD_RULES = [
  { model: 'Autopilot', backend: 'Auto (chained)', cost: '~', category: 'autopilot',
    pattern: /autopilot|finish\s+it|do\s+everything|end\s+to\s+end|build\s+it|complete\s+this|start\s+to\s+finish/ },
  { model: 'Codex', backend: 'codex-shell MCP', cost: '$$$$', category: 'security',
    pattern: /security|vulnerabilit|injection|xss|csrf|auth\s*bypass/ },
  { model: 'Codex', backend: 'codex-shell MCP', cost: '$$$$', category: 'reasoning',
    pattern: /codex|algorithm|optimiz|debug|reason|complex|tdd|test[\s-]*driven|review|refactor|performance|concurrent|deadlock|race\s*condition/ },
  { model: 'Gemini Pro', backend: 'antigravity-gemini MCP', cost: '$$', category: 'exploration',
    pattern: /explore|search|find|grep|codebase|structure|navigate|directory|scan|locate|survey|traverse/ },
  { model: 'Gemini Flash', backend: 'antigravity-gemini MCP', cost: '$', category: 'frontend',
    pattern: /frontend|react|vue|angular|svelte|\bcss\b|\bhtml\b|\bui\b|\bux\b|component|style|layout|tailwind|design|animation/ },
  { model: 'GLM-4.7', backend: 'Z.AI API', cost: '$', category: 'planning',
    pattern: /glm|plan\b|document|readme|changelog|tutorial|guide|specification|roadmap|estimate/ },
  { model: 'Sonnet', backend: 'Claude (native)', cost: '$$$', category: 'code-generation',
    pattern: /implement|create\s+(a\s+)?(function|class|component|module|endpoint|api|service|feature)|build|write\s*code|generate|add\s*feature|develop|scaffold|new\s*endpoint|new\s*module|new\s*file/ },
  { model: 'Gemini Flash', backend: 'antigravity-gemini MCP', cost: '$', category: 'quick',
    pattern: /fix\s+typo|rename|simple|trivial|one[\s-]line|minor\s+fix|formatting/ },
];

const COST_INDICATORS = {
  'low': '$',
  'medium': '$$',
  'medium-high': '$$$',
  'high': '$$$$',
  'varies': '~',
  'low-parallel': '$ (parallel)',
  'medium-parallel': '$$ (parallel)',
  'medium-high-parallel': '$$$ (parallel)',
  'high-parallel': '$$$$ (parallel)',
  'varies-parallel': '~ (parallel)',
};

const COST_TIER_MAP = {
  'Autopilot': 'varies',
  'Codex': 'high',
  'Gemini Pro': 'medium',
  'Gemini Flash': 'low',
  'Sonnet': 'medium-high',
  'GLM-4.7': 'low',
  'Claude Opus': 'high',
  'Claude': 'medium-high',
  'Auto': 'varies',
};

const BOX_WIDTH = 41;

function detectModel(text) {
  const lc = text.toLowerCase();
  for (const rule of KEYWORD_RULES) {
    if (rule.pattern.test(lc)) {
      return { model: rule.model, backend: rule.backend, cost: rule.cost, category: rule.category };
    }
  }
  return null;
}

function resolveAgent(agentType) {
  return AGENT_MODEL_MAP[agentType] || null;
}

function getCostIndicator(tier) {
  return COST_INDICATORS[tier] || tier;
}

function getCostTier(model) {
  return COST_TIER_MAP[model] || 'medium';
}

module.exports = {
  AGENT_MODEL_MAP,
  KEYWORD_RULES,
  COST_INDICATORS,
  COST_TIER_MAP,
  BOX_WIDTH,
  detectModel,
  resolveAgent,
  getCostIndicator,
  getCostTier,
};
