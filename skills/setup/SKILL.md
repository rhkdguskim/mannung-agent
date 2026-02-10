---
name: setup
description: "Interactive installation wizard for 만능 에이전트. Use when: first-time setup, configuring backends, adding MCP servers, setting up API keys, or troubleshooting configuration. Guides user through each backend step-by-step."
---

# Setup — Interactive Installation Wizard

Interactive step-by-step setup for all model backends.
사용자와 대화하며 단계별로 MCP 설정 및 인증을 진행합니다.

## Overview

This wizard checks each backend, asks the user if they want to configure it, and guides them through the process interactively using AskUserQuestion.

## Step 1: Welcome & Backend Selection

Use AskUserQuestion:
- Question: "만능 에이전트에 오신 것을 환영합니다! 어떤 백엔드를 설정하시겠습니까?"
- Header: "Backends"
- Options (multiSelect: true):
  1. "Gemini (antigravity-gemini)" — Gemini Pro/Flash models for exploration and frontend
  2. "Codex (codex-shell)" — OpenAI Codex for complex reasoning
  3. "Z.AI (GLM)" — GLM-4.7/4.5-Air for cost-effective general tasks
  4. "All backends (Recommended)" — Configure everything

## Step 2: antigravity-gemini MCP Setup

If user selected Gemini:

### 2a. Check existing configuration
```bash
claude mcp list 2>/dev/null | grep antigravity-gemini
```

### 2b. If NOT configured, guide setup:

Use AskUserQuestion:
- Question: "antigravity-gemini MCP를 어떻게 설치하셨나요? 설치 명령어를 선택해주세요."
- Header: "Gemini MCP"
- Options:
  1. "npm global install" — `npm install -g antigravity-gemini` 후 MCP 추가
  2. "npx (no install)" — npx로 바로 실행
  3. "Already installed" — 이미 설치됨, MCP 등록만 필요
  4. "Skip" — Gemini 모델 사용하지 않음

Based on answer, execute:
```bash
# Option 1: npm global
claude mcp add antigravity-gemini -- antigravity-gemini

# Option 2: npx
claude mcp add antigravity-gemini -- npx -y antigravity-gemini

# Option 3: already installed — just verify
claude mcp list 2>/dev/null | grep antigravity-gemini
```

### 2c. Verify Gemini access:
Use AskUserQuestion:
- Question: "Antigravity에 Google 계정이 연결되어 있나요?"
- Header: "Auth"
- Options:
  1. "Yes, configured" — 이미 설정됨
  2. "Need to add account" — 계정 추가 필요
  3. "Skip authentication" — 나중에 설정

If "Need to add account":
```bash
antigravity-gemini accounts add
```

### 2d. Confirm setup:
```bash
claude mcp list 2>/dev/null | grep -q antigravity-gemini && echo "antigravity-gemini: OK" || echo "antigravity-gemini: FAILED"
```

## Step 3: codex-shell MCP Setup

If user selected Codex:

### 3a. Check existing configuration
```bash
claude mcp list 2>/dev/null | grep codex
```

### 3b. If NOT configured:

Use AskUserQuestion:
- Question: "OpenAI Codex MCP를 설정합니다. OpenAI API 키가 있으신가요?"
- Header: "Codex Auth"
- Options:
  1. "Yes, OPENAI_API_KEY is set" — 환경변수에 키가 설정됨
  2. "I have a key but need to set it" — 키는 있지만 설정 필요
  3. "No key yet" — 아직 키 없음
  4. "Skip" — Codex 사용하지 않음

If "I have a key but need to set it":
- Instruct user: "OPENAI_API_KEY를 환경변수로 설정해주세요."
- Guide: Add to `~/.zshrc` or `~/.bashrc`: `export OPENAI_API_KEY=your-key-here`

If API key is available:
```bash
claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp
```

### 3c. Confirm:
```bash
claude mcp list 2>/dev/null | grep -q codex && echo "codex-shell: OK" || echo "codex-shell: FAILED"
```

## Step 4: Z.AI GLM Setup

If user selected Z.AI:

### 4a. Check existing configuration
```bash
echo ${ZHIPU_API_KEY:+SET}${ZHIPU_API_KEY:-NOT_SET}
```

### 4b. If NOT configured:

Use AskUserQuestion:
- Question: "Z.AI Coding Plan API 키가 있으신가요? (z.ai/subscribe에서 구독)"
- Header: "Z.AI Auth"
- Options:
  1. "Yes, I have an API key" — 키가 있음
  2. "No, I need to subscribe first" — 먼저 구독 필요
  3. "Skip" — GLM 모델 사용하지 않음

If "Yes, I have an API key":
- Instruct user to set the environment variable:
```
다음을 ~/.zshrc 또는 ~/.bashrc에 추가하세요:
export ZHIPU_API_KEY=your-api-key-here

그리고 Claude Code settings에도 추가합니다:
```

Guide user to add to `~/.claude/settings.json`:
```json
{
  "env": {
    "ZHIPU_API_KEY": "your-api-key-here"
  }
}
```

If "No, I need to subscribe":
- Inform: "z.ai/subscribe에서 Coding Plan을 구독하세요. Lite 플랜은 월 $3부터 시작합니다."

### 4c. Optional: Z.AI MCP servers

Use AskUserQuestion:
- Question: "Z.AI MCP 서버도 설정하시겠습니까? (웹 검색, 웹 리더, GitHub 탐색)"
- Header: "Z.AI MCP"
- Options:
  1. "Web Search + Web Reader (Recommended)" — 웹 검색과 읽기
  2. "All Z.AI MCPs" — 웹 검색 + 리더 + Zread (GitHub)
  3. "Skip" — MCP 서버 필요 없음

## Step 5: Create Configuration

```bash
mkdir -p ~/.mannung-agent

# Detect which backends are available
ANTIGRAVITY=$(claude mcp list 2>/dev/null | grep -q antigravity-gemini && echo "true" || echo "false")
CODEX=$(claude mcp list 2>/dev/null | grep -q codex && echo "true" || echo "false")
ZAI=$([ -n "$ZHIPU_API_KEY" ] && echo "true" || echo "false")

cat > ~/.mannung-agent/config.json << ENDCONFIG
{
  "version": "2.0.0",
  "plugin": "mannung-agent",
  "setupCompleted": true,
  "backends": {
    "antigravity-gemini": { "enabled": $ANTIGRAVITY, "method": "mcp" },
    "codex": { "enabled": $CODEX, "method": "mcp" },
    "zai": { "enabled": $ZAI, "method": "api" },
    "claude": { "enabled": true, "method": "native" }
  },
  "routing": {
    "mode": "balanced"
  }
}
ENDCONFIG
```

## Step 6: Final Verification & Report

```bash
echo "=== 만능 에이전트 v2.0 Setup Complete ==="
echo ""
claude mcp list 2>/dev/null | grep -q antigravity-gemini && echo "  [OK] antigravity-gemini (Gemini Pro, Flash)" || echo "  [--] antigravity-gemini (not configured)"
claude mcp list 2>/dev/null | grep -q codex && echo "  [OK] codex-shell (OpenAI Codex)" || echo "  [--] codex-shell (not configured)"
[ -n "$ZHIPU_API_KEY" ] && echo "  [OK] Z.AI (GLM-4.7, GLM-4.5-Air)" || echo "  [--] Z.AI (not configured)"
echo "  [OK] Claude (always available)"
```

Report:
```
만능 에이전트 v2.0 Setup Complete!

Configured Backends: [list of OK backends]
Available Models: [list of available models]

Quick Start:
  /mannung-agent:route <task>     — Auto-route to optimal model
  /mannung-agent:vibe <idea>      — Fully autonomous vibe coding
  /mannung-agent:status           — Check backend health
  /mannung-agent:explore <query>  — Explore codebase

나중에 설정을 변경하려면: /mannung-agent:setup
```
