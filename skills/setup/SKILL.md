---
name: setup
description: "Interactive installation wizard for mannung-agent. Use when: first-time setup, configuring backends, adding MCP servers, setting up API keys, or troubleshooting configuration. Guides user through each backend step-by-step."
---

# Setup — Interactive Installation Wizard

Interactive step-by-step setup for all model backends.
Guides the user through MCP configuration and authentication step by step.

## Overview

This wizard checks each backend, asks the user if they want to configure it, and guides them through the process interactively using AskUserQuestion.

## Step 1: Welcome & Backend Selection

Use AskUserQuestion:
- Question: "Welcome to mannung-agent! Which backends would you like to configure?"
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
- Question: "How did you install antigravity-gemini MCP? Please select the install method."
- Header: "Gemini MCP"
- Options:
  1. "npm global install" — Run `npm install -g antigravity-gemini` then add MCP
  2. "npx (no install)" — Run directly via npx
  3. "Already installed" — Already installed, just need MCP registration
  4. "Skip" — Do not use Gemini models

Based on answer, execute:
```bash
# Option 1: npm global
claude mcp add antigravity-gemini -- antigravity-gemini

# Option 2: npx
claude mcp add antigravity-gemini -- npx -y github:rhkdguskim/antigravity-gemini-mcp

# Option 3: already installed — just verify
claude mcp list 2>/dev/null | grep antigravity-gemini
```

### 2c. Verify Gemini access:
Use AskUserQuestion:
- Question: "Is your Google account connected to Antigravity?"
- Header: "Auth"
- Options:
  1. "Yes, configured" — Already configured
  2. "Need to add account" — Need to add account
  3. "Skip authentication" — Configure later

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
- Question: "Setting up OpenAI Codex MCP. Do you have an OpenAI API key?"
- Header: "Codex Auth"
- Options:
  1. "Yes, OPENAI_API_KEY is set" — Key is set in environment variables
  2. "I have a key but need to set it" — Have a key but need to configure it
  3. "No key yet" — No key available yet
  4. "Skip" — Do not use Codex

If "I have a key but need to set it":
- Instruct user: "Please set OPENAI_API_KEY as an environment variable."
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
- Question: "Do you have a Z.AI Coding Plan API key? (Subscribe at z.ai/subscribe)"
- Header: "Z.AI Auth"
- Options:
  1. "Yes, I have an API key" — Key is available
  2. "No, I need to subscribe first" — Need to subscribe first
  3. "Skip" — Do not use GLM models

If "Yes, I have an API key":
- Instruct user to set the environment variable:
```
Add the following to ~/.zshrc or ~/.bashrc:
export ZHIPU_API_KEY=your-api-key-here

Also add it to Claude Code settings:
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
- Inform: "Subscribe to a Coding Plan at z.ai/subscribe. The Lite plan starts at $3/month."

### 4c. Optional: Z.AI MCP servers

Use AskUserQuestion:
- Question: "Would you also like to set up Z.AI MCP servers? (Web search, web reader, GitHub explorer)"
- Header: "Z.AI MCP"
- Options:
  1. "Web Search + Web Reader (Recommended)" — Web search and reader
  2. "All Z.AI MCPs" — Web search + reader + Zread (GitHub)
  3. "Skip" — No MCP servers needed

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
echo "=== mannung-agent v2.0 Setup Complete ==="
echo ""
claude mcp list 2>/dev/null | grep -q antigravity-gemini && echo "  [OK] antigravity-gemini (Gemini Pro, Flash)" || echo "  [--] antigravity-gemini (not configured)"
claude mcp list 2>/dev/null | grep -q codex && echo "  [OK] codex-shell (OpenAI Codex)" || echo "  [--] codex-shell (not configured)"
[ -n "$ZHIPU_API_KEY" ] && echo "  [OK] Z.AI (GLM-4.7, GLM-4.5-Air)" || echo "  [--] Z.AI (not configured)"
echo "  [OK] Claude (always available)"
```

Report:
```
mannung-agent v2.0 Setup Complete!

Configured Backends: [list of OK backends]
Available Models: [list of available models]

Quick Start:
  /mannung-agent:route <task>     — Auto-route to optimal model
  /mannung-agent:vibe <idea>      — Fully autonomous vibe coding
  /mannung-agent:status           — Check backend health
  /mannung-agent:explore <query>  — Explore codebase

To change settings later: /mannung-agent:setup
```
