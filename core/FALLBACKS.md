# Fallback Chains / 폴백 체인

## Health Check Protocol

Before routing to any backend, verify availability:

```bash
# antigravity-gemini MCP (Gemini models)
claude mcp list 2>/dev/null | grep -q antigravity-gemini

# Codex MCP
claude mcp list 2>/dev/null | grep -q codex

# Z.AI (GLM models) - check API key and connectivity
[ -n "$ZHIPU_API_KEY" ] && curl -s -o /dev/null -w "%{http_code}" https://api.z.ai/api/anthropic/v1/models -H "Authorization: Bearer $ZHIPU_API_KEY"
```

## Fallback Chain Definitions

### Chain A: Exploration
```
Gemini Pro (MCP) → GLM-4.7 → Codex (MCP) → Claude
```
Rationale: Large context needed. Gemini Pro has 1M, GLM-4.7 has 200K.

### Chain B: Frontend
```
Gemini Flash (MCP) → GLM-4.5-Air → Claude Haiku → Claude
```
Rationale: Speed is priority. Flash models respond fastest.

### Chain C: Reasoning
```
Codex (MCP) → GLM-4.7 → Claude Opus → Claude
```
Rationale: Accuracy is critical. Codex leads in algorithmic reasoning.

### Chain D: Planning
```
GLM-4.7 → Gemini Pro (MCP) → Claude Opus → Claude
```
Rationale: Large output window (128K) ideal for detailed plans.

### Chain E: Quick
```
Gemini Flash (MCP) → GLM-4.5-Air → Claude Haiku → Claude
```
Rationale: Minimize cost and latency for trivial tasks.

### Chain F: Deep Analysis
```
Codex (MCP) → GLM-4.7 → Gemini Pro (MCP) → Claude Opus → Claude
```
Rationale: Deep reasoning + large context both important.

### Chain G: Documentation
```
GLM-4.7 → Gemini Flash (MCP) → Claude
```
Rationale: GLM-4.7's 128K output window perfect for long docs.

### Chain H: Code Review
```
Codex (MCP) → Gemini Pro (MCP) → Claude Opus → Claude
```
Rationale: Need both reasoning (Codex) and large context (Gemini Pro).

### Chain I: Refactoring
```
Codex (MCP) → GLM-4.7 → Claude Opus → Claude
```
Rationale: Structural understanding + reasoning ability.

### Chain J: TDD
```
Codex (MCP) → GLM-4.7 → Claude
```
Rationale: Test logic requires strong reasoning.

## Fallback Behavior

1. Try primary model via its MCP tool
2. If MCP tool unavailable or returns error:
   - Log warning: "Primary model [X] unavailable, falling back to [Y]"
   - Try next in chain
3. If all external backends fail:
   - Use Claude (current session) with warning
   - Inform user: "All external backends unavailable. Using current Claude session."
4. Never silently fail — always report which model was used and why
