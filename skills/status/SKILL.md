---
name: status
description: "Health check for all model backends and routing configuration. Use when: checking if backends are running, diagnosing connection issues, or viewing configuration."
---

# Status — Backend Health Dashboard

Display real-time status of all model backends and routing configuration.

## Step 1: Check Configuration

```bash
CONFIG_FILE="$HOME/.mannung-agent/config.json"
if [ -f "$CONFIG_FILE" ]; then
  echo "=== Configuration ==="
  cat "$CONFIG_FILE" | jq '.version, .routing.mode' 2>/dev/null
else
  echo "Configuration: NOT FOUND"
  echo "Run /mannung-agent:setup first"
fi
```

## Step 2: Check All Backends

```bash
echo ""
echo "=== Backend Health ==="

# antigravity-gemini MCP
echo -n "antigravity-gemini MCP: "
if claude mcp list 2>/dev/null | grep -q antigravity-gemini; then
  echo "CONFIGURED"
  claude mcp list 2>/dev/null | grep antigravity-gemini
else
  echo "NOT CONFIGURED"
  echo "  Fix: claude mcp add antigravity-gemini -- <command>"
fi

echo ""

# codex-shell MCP
echo -n "codex-shell MCP: "
if claude mcp list 2>/dev/null | grep -q codex; then
  echo "CONFIGURED"
  claude mcp list 2>/dev/null | grep codex
else
  echo "NOT CONFIGURED"
  echo "  Fix: claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp"
fi

echo ""

# Z.AI
echo -n "Z.AI (GLM): "
if [ -n "$ZHIPU_API_KEY" ]; then
  echo "API KEY SET"
else
  echo "NOT CONFIGURED (no API key)"
  echo "  Fix: Set ZHIPU_API_KEY environment variable"
fi

echo ""

# Claude
echo "Claude: ALWAYS AVAILABLE (native session)"
```

## Step 3: Summary Table

```
┌──────────────────────────────────────────────────────────┐
│               mannung-agent Status v2.0                  │
├──────────────────┬──────────┬────────────────────────────┤
│ Backend          │ Status   │ Models                     │
├──────────────────┼──────────┼────────────────────────────┤
│ antigravity-     │ [OK/MISS]│ Gemini Pro, Gemini Flash   │
│   gemini MCP     │          │                            │
│ codex-shell MCP  │ [OK/MISS]│ OpenAI Codex               │
│ Z.AI API         │ [OK/MISS]│ GLM-4.7, GLM-4.5-Air      │
│ Claude           │ OK       │ Opus, Sonnet, Haiku        │
├──────────────────┴──────────┴────────────────────────────┤
│ Routing Mode: [balanced/cost/quality/speed]              │
│ Skills: 18 | Agents: 11 | Commands: 18                  │
└──────────────────────────────────────────────────────────┘
```

## Step 4: Recommendations

For each unavailable backend, provide the specific fix command.
