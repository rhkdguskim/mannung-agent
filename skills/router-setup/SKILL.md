---
name: router-setup
description: Setup and configure claude-model-router (Antigravity + Codex integration)
---

# Router Setup

Initialize the multi-model routing environment.

## Step 1: Check Prerequisites

First, verify that required tools are installed:

```bash
# Check Antigravity Proxy
which antigravity-claude-proxy && antigravity-claude-proxy --version || echo "NOT_INSTALLED: antigravity-claude-proxy"

# Check Codex CLI
which codex && codex --version || echo "NOT_INSTALLED: codex"

# Check Codex MCP
claude mcp list 2>/dev/null | grep -i codex || echo "NOT_CONFIGURED: codex-mcp"
```

### If Antigravity NOT_INSTALLED:

```bash
npm install -g antigravity-claude-proxy@latest
```

### If Codex NOT_INSTALLED:

```bash
npm install -g @openai/codex
```

### If Codex MCP NOT_CONFIGURED:

```bash
claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp
```

## Step 2: Configure Antigravity Accounts

Check if accounts are configured:

```bash
antigravity-claude-proxy accounts list 2>&1
```

If "No accounts configured", prompt user:

Use AskUserQuestion:
- Question: "Antigravity 계정이 없습니다. Google 계정을 추가할까요?"
- Options:
  1. "Yes, add account" - Run `antigravity-claude-proxy accounts add`
  2. "Skip" - Continue without Antigravity (Gemini models won't work)

## Step 3: Start Antigravity Proxy

Check if proxy is already running:

```bash
curl -s http://localhost:8080/health 2>/dev/null | head -1 || echo "PROXY_NOT_RUNNING"
```

If PROXY_NOT_RUNNING:

```bash
# Start in background
nohup antigravity-claude-proxy start > ~/.claude-model-router/proxy.log 2>&1 &
echo $! > ~/.claude-model-router/proxy.pid
sleep 2
curl -s http://localhost:8080/health | head -1
```

## Step 4: Create Configuration

```bash
mkdir -p ~/.claude-model-router

cat > ~/.claude-model-router/config.json << 'EOF'
{
  "version": "1.0.0",
  "setupCompleted": "$(date -Iseconds)",
  "antigravityPort": 8080,
  "routing": {
    "exploration": {
      "model": "gemini-3-pro-high",
      "keywords": ["search", "find", "grep", "glob", "explore", "codebase", "file", "directory", "탐색", "검색", "찾아", "파일"]
    },
    "frontend": {
      "model": "gemini-3-flash",
      "keywords": ["react", "vue", "angular", "svelte", "css", "html", "component", "ui", "ux", "frontend", "style", "프론트엔드", "컴포넌트", "스타일"]
    },
    "reasoning": {
      "model": "codex",
      "keywords": ["algorithm", "optimize", "debug", "logic", "math", "complex", "reasoning", "알고리즘", "최적화", "디버깅", "로직", "수학"]
    },
    "default": {
      "model": "gemini-3-flash"
    }
  }
}
EOF
```

## Step 5: Verify Setup

```bash
echo "=== Router Setup Complete ==="
echo ""
echo "Antigravity Proxy:"
curl -s http://localhost:8080/health | jq -r '.summary // "Not running"' 2>/dev/null || echo "Not running"
echo ""
echo "Codex MCP:"
claude mcp list 2>/dev/null | grep codex || echo "Not configured"
echo ""
echo "Config:"
cat ~/.claude-model-router/config.json | jq -r '.routing | keys[]' 2>/dev/null
```

## Step 6: Report Success

Report to user:

```
Router setup complete!

Available routing modes:
- exploration: Gemini Pro (large context, file search)
- frontend: Gemini Flash (fast UI/UX work)
- reasoning: Codex (complex algorithms)
- default: Gemini Flash

Usage:
  route: <your task description>
  route:gemini-pro <task>
  route:codex <task>

Check status:
  /claude-model-router:router-status
```
