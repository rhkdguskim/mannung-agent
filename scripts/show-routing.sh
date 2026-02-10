#!/bin/bash
# show-routing.sh — Display real-time model routing info
# Called by PreToolUse hook when Task tool is invoked

TOOL_INPUT="${CLAUDE_TOOL_INPUT:-}"

if [ -z "$TOOL_INPUT" ]; then
  exit 0
fi

# Extract subagent_type and prompt from JSON input
AGENT=$(echo "$TOOL_INPUT" | grep -o '"subagent_type":"[^"]*"' | cut -d'"' -f4)
PROMPT=$(echo "$TOOL_INPUT" | grep -o '"prompt":"[^"]*"' | cut -d'"' -f4 | head -c 80)
DESCRIPTION=$(echo "$TOOL_INPUT" | grep -o '"description":"[^"]*"' | cut -d'"' -f4)

# Map agent types to models
case "$AGENT" in
  Explore)
    MODEL="Gemini Pro"
    BACKEND="antigravity-gemini MCP"
    ;;
  Plan)
    MODEL="GLM-4.7"
    BACKEND="Z.AI API"
    ;;
  general-purpose)
    MODEL="Auto-detect"
    BACKEND="Multi-model"
    ;;
  Bash)
    MODEL="Local"
    BACKEND="Shell"
    ;;
  *)
    MODEL="Claude"
    BACKEND="Native"
    ;;
esac

# Check if prompt contains routing hints
PROMPT_LOWER=$(echo "$PROMPT $DESCRIPTION" | tr '[:upper:]' '[:lower:]')

# Detect model from prompt content keywords
if echo "$PROMPT_LOWER" | grep -qE 'gemini.pro|explorer|explore|codebase|search|find|grep'; then
  MODEL="Gemini Pro"
  BACKEND="antigravity-gemini MCP"
elif echo "$PROMPT_LOWER" | grep -qE 'gemini.flash|frontend|react|vue|css|ui|ux|component|style'; then
  MODEL="Gemini Flash"
  BACKEND="antigravity-gemini MCP"
elif echo "$PROMPT_LOWER" | grep -qE 'codex|reason|algorithm|optimize|debug|complex|tdd|test|review|refactor'; then
  MODEL="Codex"
  BACKEND="codex-shell MCP"
elif echo "$PROMPT_LOWER" | grep -qE 'glm|plan|document|doc|readme|changelog'; then
  MODEL="GLM-4.7"
  BACKEND="Z.AI API"
fi

# Output routing info
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " mannung-agent routing"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Model:   $MODEL"
echo " Backend: $BACKEND"
[ -n "$DESCRIPTION" ] && echo " Task:    $DESCRIPTION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
