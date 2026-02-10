---
name: route
description: Route a task to the appropriate AI model based on task type
---

# Route Task

Intelligently route tasks to the optimal AI model.

## Usage Patterns

The user can invoke this skill in several ways:

1. **Auto-routing**: `route: <task>` - Automatically detect task type
2. **Explicit model**: `route:gemini-pro <task>` or `route:codex <task>`
3. **Direct invoke**: `/claude-model-router:route <task>`

## Step 1: Parse Input

Extract the task and any explicit model specification from the user's input.

If input contains `route:gemini-pro`, `route:gemini-flash`, or `route:codex`:
- Extract the specified model
- Set EXPLICIT_MODEL = true

Otherwise:
- Set EXPLICIT_MODEL = false
- Proceed to auto-detection

## Step 2: Load Configuration

```bash
CONFIG_FILE="$HOME/.claude-model-router/config.json"
if [ -f "$CONFIG_FILE" ]; then
  cat "$CONFIG_FILE"
else
  echo "CONFIG_NOT_FOUND"
fi
```

If CONFIG_NOT_FOUND:
- Inform user to run `/claude-model-router:router-setup` first
- Stop execution

## Step 3: Auto-Detect Task Type (if EXPLICIT_MODEL = false)

Analyze the task description for keywords:

### Exploration Keywords (→ Gemini Pro)
- English: search, find, grep, glob, explore, codebase, file, directory, where, locate, scan
- Korean: 탐색, 검색, 찾아, 파일, 디렉토리, 코드베이스, 어디, 위치

### Frontend Keywords (→ Gemini Flash)
- English: react, vue, angular, svelte, next, nuxt, css, scss, sass, html, jsx, tsx, component, ui, ux, frontend, style, layout, responsive, animation, tailwind
- Korean: 프론트엔드, 컴포넌트, 스타일, 레이아웃, 반응형, 애니메이션

### Reasoning Keywords (→ Codex)
- English: algorithm, optimize, performance, debug, logic, math, complex, reasoning, proof, analyze, refactor, architecture, design pattern, data structure
- Korean: 알고리즘, 최적화, 성능, 디버깅, 로직, 수학, 복잡한, 추론, 증명, 분석, 리팩토링, 아키텍처

### Detection Priority
1. If reasoning keywords found → Codex
2. If exploration keywords found → Gemini Pro
3. If frontend keywords found → Gemini Flash
4. Default → Gemini Flash

## Step 4: Check Model Availability

### For Gemini Models (via Antigravity):

```bash
HEALTH=$(curl -s http://localhost:8080/health 2>/dev/null)
if [ -z "$HEALTH" ]; then
  echo "ANTIGRAVITY_NOT_RUNNING"
else
  echo "$HEALTH" | jq -r '.accounts[0].models["gemini-3-pro-high"].remaining // "unknown"'
fi
```

If ANTIGRAVITY_NOT_RUNNING:
- Warn user: "Antigravity proxy not running. Start with: `antigravity-claude-proxy start`"
- Fall back to Codex if available, otherwise abort

### For Codex:

```bash
claude mcp list 2>/dev/null | grep -q codex && echo "CODEX_AVAILABLE" || echo "CODEX_NOT_AVAILABLE"
```

If CODEX_NOT_AVAILABLE and Codex was selected:
- Fall back to Gemini Flash
- Warn user about fallback

## Step 5: Execute Task with Selected Model

### If Gemini Model Selected:

Set environment and inform user which model is being used:

```
Selected model: gemini-3-pro-high (via Antigravity)
Reason: Task involves file exploration/search

Executing task...
```

Then use the Task tool with the appropriate prompt, instructing the subagent to use the Antigravity proxy:

```
ANTHROPIC_BASE_URL=http://localhost:8080
Model: gemini-3-pro-high
Task: <user's task>
```

### If Codex Selected:

```
Selected model: Codex (via MCP)
Reason: Task involves complex reasoning/algorithms

Executing task...
```

Use the Codex MCP tools (codex-shell) to execute the task.

## Step 6: Report Result

After task completion, report:

```
Task completed using: <model>
Route type: <exploration|frontend|reasoning|default>

[Result summary]
```

## Fallback Chain

If primary model unavailable:
1. Codex unavailable → Gemini Pro → Gemini Flash
2. Gemini unavailable → Codex → Claude (current session)
3. All unavailable → Use current Claude session with warning
