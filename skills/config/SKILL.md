---
name: config
description: "Manage model backend configuration: API keys, MCP servers, routing settings. Use when: changing API keys, adding/removing MCP servers, updating routing mode, or reconfiguring backends."
---

# Config — Backend Configuration Management

Manage API keys, MCP servers, and routing configuration.
API 키 변경, MCP 서버 관리, 라우팅 설정을 관리합니다.

## Operations

### 1. API Key Management

#### View current key status
```bash
echo "OPENAI_API_KEY: ${OPENAI_API_KEY:+SET (${#OPENAI_API_KEY} chars)}${OPENAI_API_KEY:-NOT SET}"
echo "ZHIPU_API_KEY: ${ZHIPU_API_KEY:+SET (${#ZHIPU_API_KEY} chars)}${ZHIPU_API_KEY:-NOT SET}"
```

#### Update Z.AI API Key

Use AskUserQuestion:
- Question: "Z.AI API 키를 변경하시겠습니까?"
- Options:
  1. "Enter new key" — 새 키 입력
  2. "Remove key" — 키 제거
  3. "Skip" — 변경 없음

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
- Question: "어떤 MCP 서버를 추가/변경하시겠습니까?"
- Options:
  1. "antigravity-gemini" — Gemini Pro/Flash
  2. "codex-shell" — OpenAI Codex
  3. "Z.AI web-search" — Z.AI 웹 검색 MCP
  4. "Custom MCP" — 직접 입력

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
- Question: "기본 라우팅 모드를 변경하시겠습니까?"
- Options:
  1. "balanced (Recommended)" — 작업별 최적 모델
  2. "cost" — 비용 최소화
  3. "quality" — 품질 최대화
  4. "speed" — 속도 최대화

Update `~/.mannung-agent/config.json` routing.mode field.

#### Override model for task type

Use AskUserQuestion:
- Question: "특정 작업 유형의 기본 모델을 변경하시겠습니까?"
- Options:
  1. "exploration" — 현재: Gemini Pro
  2. "frontend" — 현재: Gemini Flash
  3. "reasoning" — 현재: Codex
  4. "planning" — 현재: GLM-4.7

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
