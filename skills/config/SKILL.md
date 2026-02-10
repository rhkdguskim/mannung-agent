---
name: config
description: "Manage model backend configuration: API keys, MCP servers, routing settings. Use when: changing API keys, adding/removing MCP servers, updating routing mode, or reconfiguring backends."
---

# Config — Backend Configuration Management

Manage API keys, MCP servers, and routing configuration.

## Operations

### 1. API Key Management

#### View current key status
```bash
echo "OPENAI_API_KEY: ${OPENAI_API_KEY:+SET (${#OPENAI_API_KEY} chars)}${OPENAI_API_KEY:-NOT SET}"
echo "ZHIPU_API_KEY: ${ZHIPU_API_KEY:+SET (${#ZHIPU_API_KEY} chars)}${ZHIPU_API_KEY:-NOT SET}"
```

#### Update Z.AI API Key

Use AskUserQuestion:
- Question: "Would you like to change the Z.AI API key?"
- Options:
  1. "Enter new key" — Enter a new key
  2. "Remove key" — Remove the key
  3. "Skip" — No changes

If "Enter new key":
Guide user to update `~/.claude/settings.json`:
```json
{
  "env": {
    "ZHIPU_API_KEY": "new-api-key-here"
  }
}
```

Or add to shell profile:
```bash
# ~/.zshrc or ~/.bashrc (macOS/Linux)
export ZHIPU_API_KEY="new-api-key-here"

# PowerShell profile (Windows)
$env:ZHIPU_API_KEY = "new-api-key-here"
```

#### Update OpenAI API Key

Same pattern — guide user to set OPENAI_API_KEY.

### 2. MCP Server Management

#### List configured MCPs
```bash
claude mcp list 2>&1
```

#### Add MCP server

Use AskUserQuestion:
- Question: "Which MCP server would you like to add or modify?"
- Options:
  1. "antigravity-gemini" — Gemini Pro/Flash
  2. "codex-shell" — OpenAI Codex
  3. "Z.AI web-search" — Z.AI web search MCP
  4. "Custom MCP" — Enter manually

Based on selection:
```bash
# antigravity-gemini
claude mcp add antigravity-gemini -- <command>

# codex-shell
claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp

# Z.AI web-search
claude mcp add zai-search -- npx -y @anthropic/zai-search-mcp
```

#### Remove MCP server
```bash
claude mcp remove <server-name>
```

### 3. Routing Configuration

#### Change routing mode

Use AskUserQuestion:
- Question: "Would you like to change the default routing mode?"
- Options:
  1. "balanced (Recommended)" — Optimal model per task
  2. "cost" — Minimize cost
  3. "quality" — Maximize quality
  4. "speed" — Maximize speed

Update `~/.mannung-agent/config.json` routing.mode field.

#### Override model for task type

Use AskUserQuestion:
- Question: "Would you like to change the default model for a specific task type?"
- Options:
  1. "exploration" — Current: Gemini Pro
  2. "frontend" — Current: Gemini Flash
  3. "reasoning" — Current: Codex
  4. "planning" — Current: GLM-4.7

Then ask which model to use for that task type.

### 4. Verify Changes

After any configuration change, automatically run `/doctor` to verify.

## Platform-Specific Notes

### macOS / Linux
- Environment variables: `~/.zshrc`, `~/.bashrc`, or `~/.profile`
- Claude settings: `~/.claude/settings.json`
- Restart shell after env changes: `source ~/.zshrc`

### Windows
- Environment variables: System Settings → Environment Variables
- Or PowerShell: `$env:VAR = "value"` (session only)
- Or PowerShell profile: `notepad $PROFILE`
- Claude settings: `%USERPROFILE%\.claude\settings.json`

## Boundaries

**Will**: Guide through API key setup, MCP management, routing config, verify changes
**Will Not**: Store API keys in plugin files, auto-modify shell profiles without user consent
