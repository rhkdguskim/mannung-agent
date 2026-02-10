---
name: route
description: "Auto-route any task to the optimal AI model. Use when: user says 'route:', wants model routing, or you need to delegate to a specific backend. Supports explicit model selection (route:codex, route:gemini-pro, route:glm) and auto-detection via keywords."
---

# Route — Intelligent Task Router

Route any development task to the optimal AI model backend.

## Usage Patterns

1. **Auto-routing**: `route: <task>` — detect task type and route automatically
2. **Explicit model**: `route:gemini-pro <task>`, `route:codex <task>`, `route:glm <task>`
3. **With mode**: `route --cost <task>`, `route --quality <task>`, `route --speed <task>`

## Step 1: Parse Input

Extract task description and check for explicit model specification.

If input contains explicit model tag:
- `route:gemini-pro` → Gemini 3 Pro via antigravity-gemini MCP
- `route:gemini-flash` → Gemini 3 Flash via antigravity-gemini MCP
- `route:codex` → OpenAI Codex via MCP
- `route:glm` → GLM-4.7 via Z.AI
- `route:glm-air` → GLM-4.5-Air via Z.AI

Check for mode flags:
- `--cost` → Cost mode (cheapest first)
- `--quality` → Quality mode (best first)
- `--speed` → Speed mode (fastest first)
- `--balanced` → Balanced mode (default)

## Step 2: Load Configuration

```bash
CONFIG_FILE="$HOME/.mannung-agent/config.json"
if [ -f "$CONFIG_FILE" ]; then
  cat "$CONFIG_FILE"
else
  echo "CONFIG_NOT_FOUND"
fi
```

If CONFIG_NOT_FOUND: inform user to run `/mannung-agent:setup` first.

## Step 3: Auto-Detect Task Type

If no explicit model specified, analyze task description against keyword matrix:

**Detection Priority (highest to lowest):**
1. Security keywords detected → Codex (CRITICAL — never downgrade)
2. Reasoning keywords detected → Codex (weight 3)
3. Deep analysis keywords detected → Codex / GLM-4.7 (weight 2.5)
4. Exploration keywords detected → Gemini Pro (weight 2)
5. Frontend keywords detected → Gemini Flash (weight 2)
6. Review keywords detected → Codex (weight 2)
7. Refactoring keywords detected → Codex (weight 2)
8. TDD keywords detected → Codex (weight 2)
9. Planning keywords detected → GLM-4.7 (weight 1.5)
10. Documentation keywords detected → GLM-4.7 (weight 1.5)
11. Quick keywords detected → Gemini Flash / GLM-4.5-Air (weight 1)
12. No match → Default based on mode

**Mode-based defaults:**
- Cost → GLM-4.5-Air
- Quality → Claude Opus (current session)
- Speed → Gemini Flash
- Balanced → Gemini Flash

## Step 4: Check Model Availability

### antigravity-gemini MCP (Gemini models)
```bash
claude mcp list 2>/dev/null | grep -q antigravity-gemini && echo "AVAILABLE" || echo "UNAVAILABLE"
```

### codex-shell MCP (Codex)
```bash
claude mcp list 2>/dev/null | grep -q codex && echo "AVAILABLE" || echo "UNAVAILABLE"
```

### Z.AI API (GLM models)
```bash
[ -n "$ZHIPU_API_KEY" ] && echo "API_KEY_SET" || echo "UNAVAILABLE"
```

If selected model unavailable → follow fallback chain from core/FALLBACKS.md.

## Step 5: Execute with Selected Model

Report the routing decision:
```
Model: [selected model] ([backend])
Route: [task category]
Reason: [why this model was selected]
Fallback: [next in chain if this fails]
```

Then execute the task with the appropriate agent and model backend.

## Step 6: Report Result

```
Task completed.
Model used: [model name]
Route type: [category]
Backend: [Antigravity/Codex MCP/Z.AI/Claude]
```
