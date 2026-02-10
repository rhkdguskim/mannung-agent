---
name: router-status
description: Check router status, proxy health, and model quotas
---

# Router Status

Display current status of all routing components.

## Step 1: Check Configuration

```bash
CONFIG_FILE="$HOME/.claude-model-router/config.json"
if [ -f "$CONFIG_FILE" ]; then
  echo "=== Configuration ==="
  cat "$CONFIG_FILE" | jq '.'
else
  echo "Configuration: NOT FOUND"
  echo "Run /claude-model-router:router-setup first"
fi
```

## Step 2: Check Antigravity Proxy

```bash
echo ""
echo "=== Antigravity Proxy ==="

HEALTH=$(curl -s http://localhost:8080/health 2>/dev/null)

if [ -z "$HEALTH" ]; then
  echo "Status: NOT RUNNING"
  echo ""
  echo "To start: antigravity-claude-proxy start"
else
  echo "Status: RUNNING"
  echo ""
  echo "$HEALTH" | jq -r '
    "Accounts: \(.counts.total) total, \(.counts.available) available",
    "Rate Limited: \(.counts.rateLimited)",
    "",
    "Model Quotas:"
  '
  echo "$HEALTH" | jq -r '
    .accounts[0].models | to_entries[] |
    "  \(.key): \(.value.remaining) (reset: \(.value.resetTime | split("T")[0]))"
  ' 2>/dev/null | sort
fi
```

## Step 3: Check Codex MCP

```bash
echo ""
echo "=== Codex MCP ==="

MCP_STATUS=$(claude mcp list 2>/dev/null)

if echo "$MCP_STATUS" | grep -q "codex"; then
  echo "$MCP_STATUS" | grep codex
else
  echo "Status: NOT CONFIGURED"
  echo ""
  echo "To add: claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp"
fi
```

## Step 4: Check Codex CLI

```bash
echo ""
echo "=== Codex CLI ==="

if which codex > /dev/null 2>&1; then
  echo "Status: INSTALLED"
  codex --version 2>/dev/null || echo "Version: unknown"
else
  echo "Status: NOT INSTALLED"
  echo ""
  echo "To install: npm install -g @openai/codex"
fi
```

## Step 5: Summary Report

Generate a summary table:

```
┌────────────────────────────────────────────────────────┐
│              claude-model-router Status                │
├────────────────┬───────────┬───────────────────────────┤
│ Component      │ Status    │ Details                   │
├────────────────┼───────────┼───────────────────────────┤
│ Config         │ [OK/MISS] │ ~/.claude-model-router/   │
│ Antigravity    │ [OK/DOWN] │ Port 8080                 │
│ Codex MCP      │ [OK/MISS] │ codex-shell               │
│ Codex CLI      │ [OK/MISS] │ v0.98.0                   │
├────────────────┴───────────┴───────────────────────────┤
│ Available Models:                                      │
│   - gemini-3-pro-high: [quota]                        │
│   - gemini-3-flash: [quota]                           │
│   - codex: [available/unavailable]                    │
└────────────────────────────────────────────────────────┘
```

## Step 6: Recommendations

If any component is missing or down, provide specific fix commands:

```
Recommendations:
- [If proxy down] Start proxy: antigravity-claude-proxy start
- [If no accounts] Add account: antigravity-claude-proxy accounts add
- [If MCP missing] Add MCP: claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp
- [If Codex missing] Install: npm install -g @openai/codex
```
