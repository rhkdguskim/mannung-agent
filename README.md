# mannung-agent (만능 에이전트)

> All-Purpose AI Development Agent for Claude Code
> 모든 개발 작업을 최적의 AI 모델로 자동 라우팅하는 만능 개발 에이전트

```
┌─────────────────────────────────────────┐
│ mannung-agent v2.0                     │
├─────────────────────────────────────────┤
│ Gemini:  Ready (antigravity-gemini)    │
│ Codex:   Ready (codex-shell)           │
│ GLM:     Ready (Z.AI API)              │
│ Claude:  Ready (native)                │
└─────────────────────────────────────────┘
```

## What It Does

하나의 작업을 입력하면, 자동으로 최적의 AI 모델을 선택해서 실행합니다.

| You Say | Model Used | Why |
|---------|-----------|-----|
| "코드베이스 분석해줘" | Gemini Pro | 1M context window |
| "React 컴포넌트 만들어줘" | Gemini Flash | Fast UI iteration |
| "알고리즘 최적화해줘" | Codex | Best reasoning |
| "구현 계획 세워줘" | GLM-4.7 | 128K output, cost-effective |
| "오타 고쳐줘" | Gemini Flash | Fastest response |
| "대충 만들어줘" | Auto-select | Vibe mode |
| "끝까지 완성해줘" | Auto (chained) | Autopilot mode |

Real-time routing display:
```
┌─────────────────────────────────────────┐
│ mannung-agent routing                  │
├─────────────────────────────────────────┤
│ Model:   Codex                          │
│ Backend: codex-shell MCP                │
│ Task:    Optimize algorithm             │
└─────────────────────────────────────────┘
```

Parallel execution:
```
┌─────────────────────────────────────────┐
│ mannung-agent routing [PARALLEL]       │
├─────────────────────────────────────────┤
│ Model:   Gemini Pro                     │
│ Backend: antigravity-gemini MCP         │
│ Task:    Structure analysis             │
│ Mode:    Background (parallel)          │
└─────────────────────────────────────────┘
```

---

## Installation

### 1. Add marketplace & install

```bash
claude plugin marketplace add https://github.com/rhkdguskim/mannung-agent
claude plugin install mannung-agent
```

### 2. Run setup wizard

Restart Claude Code, then:

```
/mannung-agent:setup
```

The wizard asks which backends to configure and guides you through MCP installation and authentication step-by-step.

### 3. Done!

```
/mannung-agent:status    # Check what's ready
```

---

## Quick Start

```bash
# Auto-route (keywords detected automatically)
/route optimize this sorting algorithm
/route React 로그인 폼 만들어줘

# Vibe coding (fully autonomous)
/vibe add user authentication
/vibe 대충 만들어줘

# Explicit model selection
/route:codex debug this race condition
/route:gemini-pro explore the entire codebase

# Autopilot (goal-driven, runs until complete)
/autopilot build a REST API for user management
/autopilot 로그인 시스템 끝까지 완성해줘

# Parallel execution (multiple models simultaneously)
/parallel analyze codebase (structure + logic + security)

# Diagnostics & config
/doctor                    # Check all backend connections
/config                    # Manage API keys & MCP settings

# Routing modes
/route --cost fix this typo        # cheapest model
/route --quality security audit    # best model
/route --speed quick CSS fix       # fastest model
```

---

## Commands

### Core

| Command | Description |
|---------|-------------|
| `/route <task>` | Auto-route to optimal model |
| `/autopilot <goal>` | Goal-driven persistent execution (chains skills until done) |
| `/vibe <idea>` | Fully autonomous vibe coding |
| `/parallel <task>` | Multi-agent parallel execution |
| `/plan <task>` | Implementation planning (read-only) |
| `/review` | Multi-perspective code review |

### Development

| Command | Description |
|---------|-------------|
| `/explore <query>` | Deep codebase exploration |
| `/frontend <task>` | UI/UX development |
| `/refactor` | Intelligent refactoring |
| `/tdd <feature>` | Test-driven development |
| `/deep <topic>` | Root cause / security audit |
| `/quick <fix>` | Fast simple tasks |
| `/doc <topic>` | Documentation generation |

### Multi-Model

| Command | Description |
|---------|-------------|
| `/multi-plan <task>` | Get plans from multiple models |
| `/multi-execute` | Execute approved multi-model plan |

### System

| Command | Description |
|---------|-------------|
| `/setup` | Interactive setup wizard |
| `/status` | Backend health check |
| `/doctor` | Verify all backend connections |
| `/config` | Manage API keys & MCP settings |

---

## Model Backends

| Backend | Models | Setup |
|---------|--------|-------|
| **antigravity-gemini** MCP | Gemini Pro, Gemini Flash | `claude mcp add antigravity-gemini -- <cmd>` |
| **codex-shell** MCP | OpenAI Codex | `claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp` |
| **Z.AI** API | GLM-4.7, GLM-4.5-Air | Set `ZHIPU_API_KEY` ([subscribe](https://z.ai/subscribe)) |
| **Claude** | Opus, Sonnet, Haiku | Always available (native) |

---

## Routing Modes

| Mode | Flag | Strategy |
|------|------|----------|
| Balanced | `--balanced` (default) | Right model for the right task |
| Cost | `--cost` | Cheapest model first |
| Quality | `--quality` | Best model first |
| Speed | `--speed` | Fastest model first |
| Vibe | `/vibe` | Fully autonomous |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   mannung-agent v2.0                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  18 Skills   11 Agents   18 Commands   5 Modes         │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │Gemini Pro│ │Gem. Flash│ │  Codex   │ │ GLM-4.7  │  │
│  │  (MCP)   │ │  (MCP)   │ │  (MCP)   │ │ (Z.AI)   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                         │
│  Fallback: Claude (native session)                     │
│                                                         │
│  Hooks: SessionStart | PreToolUse | PostToolUse | Stop │
│  Real-time routing display on every task delegation    │
└─────────────────────────────────────────────────────────┘
```

### Agents

| Agent | Role | Model |
|-------|------|-------|
| explorer | Codebase navigation | Gemini Pro |
| frontend-dev | UI/UX development | Gemini Flash |
| reasoner | Complex logic | Codex |
| planner | Strategic planning | GLM-4.7 |
| reviewer | Code quality | Codex |
| refactorer | Code restructuring | Codex |
| tdd-guide | Test-driven development | Codex |
| architect | System design | Claude Opus |
| orchestrator | Multi-model coordination | Claude |
| vibe-coder | Autonomous building | Auto-select |
| autopilot | Goal-driven persistent execution | Auto (chained) |

### Cross-Platform

- macOS, Linux, Windows supported
- Hook scripts use Node.js (no bash dependency)
- MCP-based model access (no proxy servers needed)

---

## License

MIT
