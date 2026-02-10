# 만능 에이전트 (All-Purpose Agent)

Multi-model intelligent routing plugin for Claude Code.
모든 개발 작업을 최적의 AI 모델로 자동 라우팅하는 만능 개발 에이전트.

## Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                        만능 에이전트 v2.0                          │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │ Explore  │ │ Frontend │ │ Reason   │ │  Plan    │ │  Vibe  │ │
│  │  Tasks   │ │  Tasks   │ │  Tasks   │ │  Tasks   │ │  Mode  │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └───┬────┘ │
│       │            │            │            │           │      │
│  ┌────▼─────┐ ┌────▼─────┐ ┌────▼─────┐ ┌────▼─────┐ ┌──▼───┐ │
│  │Gemini Pro│ │Gem. Flash│ │  Codex   │ │ GLM-4.7  │ │ Auto │ │
│  │  (MCP)   │ │  (MCP)   │ │  (MCP)   │ │ (Z.AI)   │ │Route │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────┘ │
│                                                                   │
│  Fallback: Claude (current session)                              │
└───────────────────────────────────────────────────────────────────┘
```

## Model Backends

| Backend | Models | Access Method | Best For |
|---------|--------|---------------|----------|
| antigravity-gemini MCP | Gemini 3 Pro, Gemini 3 Flash | `claude mcp add` | Exploration, Frontend |
| codex-shell MCP | OpenAI Codex | `claude mcp add` | Complex Reasoning |
| Z.AI API | GLM-4.7, GLM-4.5-Air | Anthropic-compatible proxy | Cost-effective General |
| Claude Sonnet | Sonnet 4.5 | Current session (native) | Code Generation, Implementation |
| Claude Opus | Opus 4.6 | Current session (native) | Architecture, Critical Decisions |
| Claude Haiku | Haiku 4.5 | Current session (native) | Quick Lookups, Fallback |

## MCP Configuration

```bash
# Gemini models via antigravity-gemini MCP
claude mcp add antigravity-gemini -- <antigravity-gemini-command>

# Codex via codex-shell MCP
claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp

# Z.AI: Set environment variables
# ANTHROPIC_BASE_URL=https://api.z.ai/api/anthropic
# ANTHROPIC_AUTH_TOKEN=<your-z-ai-api-key>
```

## Routing Modes

- **auto**: Keyword-based auto-detection (default)
- **vibe**: Fully autonomous - agent picks everything
- **cost**: Minimize cost (GLM-4.5-Air → Gemini Flash → others)
- **quality**: Maximize quality (Codex → Gemini Pro → Claude Opus)
- **speed**: Minimize latency (Gemini Flash → GLM Flash → Haiku)
- **balanced**: Balanced cost/quality/speed

## Code Generation Strategy

For implementation tasks (writing/editing code), prefer **Claude Sonnet** as the primary code generation model:
- Best balance of quality and speed for everyday coding
- Sonnet handles: feature implementation, bug fixes, multi-file changes, iterative coding
- Escalate to Opus only for: architecture decisions, complex system design, critical security code
- Use Codex for: algorithm optimization, complex debugging, performance-critical code
- Use Gemini Flash for: simple UI changes, CSS tweaks, quick edits

### Code Generation Keywords → Sonnet (native)
- EN: implement, create, build, write, code, generate, add feature, develop, make
- KR: 구현, 생성, 빌드, 작성, 코드, 만들어, 기능추가, 개발

## Autopilot Mode

**Master keyword activation**: When user provides a high-level goal with autopilot keywords, the agent autonomously chains skills and runs persistently until completion.

- Trigger keywords: autopilot, 자동, 오토, 끝까지, 완성해, 전부 해줘, finish it, do everything, end to end
- Execution: explore → plan → implement → test → review → deliver
- Self-recovery: retries on failure, uses fallback models, never stops until goal is met
- Progress tracking: reports phase/subtask progress at each step

## Skills (18)

| Skill | Description | Default Model |
|-------|-------------|---------------|
| `route` | Auto-route task to optimal model | Auto-detect |
| `autopilot` | Goal-driven persistent execution | Auto (chains all) |
| `setup` | Interactive installation wizard | - |
| `status` | Health check all backends | - |
| `doctor` | Verify backend connectivity | - |
| `config` | Manage API keys & MCP settings | - |
| `explore` | Codebase analysis & search | Gemini Pro (MCP) |
| `frontend` | UI/UX development | Gemini Flash (MCP) |
| `reason` | Complex logic & algorithms | Codex (MCP) |
| `plan` | Implementation planning | GLM-4.7 / Claude Opus |
| `review` | Multi-model code review | Codex (MCP) |
| `refactor` | Intelligent refactoring | Codex (MCP) |
| `tdd` | Test-driven development | Codex (MCP) |
| `vibe` | Fully autonomous vibe coding | Auto |
| `quick` | Fast simple tasks | Gemini Flash (MCP) |
| `deep` | Deep analysis & research | Codex / GLM-4.7 |
| `doc` | Documentation generation | GLM-4.7 |
| `parallel` | Multi-agent parallel execution | Auto |

## Agents (11)

| Agent | Persona | Model | Tools |
|-------|---------|-------|-------|
| explorer | Codebase Navigator | Gemini Pro (MCP) | Read, Grep, Glob |
| frontend-dev | UI/UX Specialist | Gemini Flash (MCP) | Read, Edit, Write, Bash |
| reasoner | Logic Engine | Codex (MCP) | Read, Grep, Glob, Bash |
| planner | Strategic Architect | GLM-4.7 | Read, Grep, Glob |
| reviewer | Quality Guardian | Codex (MCP) | Read, Grep, Glob |
| refactorer | Code Surgeon | Codex (MCP) | Read, Edit, Write, Grep, Glob |
| tdd-guide | Test Champion | Codex (MCP) | Read, Edit, Write, Bash |
| architect | System Designer | Claude Opus | Read, Grep, Glob |
| orchestrator | Multi-Model Conductor | Claude | All |
| vibe-coder | Autonomous Builder | Auto | All |
| autopilot | Goal-Driven Executor | Auto | All |

## Commands (18)

`/route`, `/autopilot`, `/vibe`, `/plan`, `/review`, `/refactor`, `/tdd`, `/explore`,
`/quick`, `/deep`, `/doc`, `/parallel`, `/status`, `/setup`, `/doctor`,
`/config`, `/multi-plan`, `/multi-execute`

## Keyword Detection

### Exploration → Gemini Pro (antigravity-gemini MCP)
- EN: search, find, grep, glob, explore, codebase, file, directory, where, locate, scan, structure, tree, navigate
- KR: 탐색, 검색, 찾아, 파일, 디렉토리, 코드베이스, 어디, 위치, 구조

### Frontend → Gemini Flash (antigravity-gemini MCP)
- EN: react, vue, angular, svelte, next, nuxt, css, scss, sass, html, jsx, tsx, component, ui, ux, frontend, style, layout, responsive, animation, tailwind, design
- KR: 프론트엔드, 컴포넌트, 스타일, 레이아웃, 반응형, 애니메이션, 디자인

### Reasoning → Codex (codex-shell MCP)
- EN: algorithm, optimize, performance, debug, logic, math, complex, reasoning, proof, analyze, architecture, design pattern, data structure, concurrent, thread
- KR: 알고리즘, 최적화, 성능, 디버깅, 로직, 수학, 복잡한, 추론, 증명, 분석, 아키텍처

### Planning → GLM-4.7 (Z.AI API)
- EN: plan, design, blueprint, strategy, roadmap, estimate, scope, requirement, specification
- KR: 계획, 설계, 전략, 로드맵, 견적, 범위, 요구사항, 명세

### Quick → Gemini Flash (antigravity-gemini MCP)
- EN: fix, typo, rename, simple, small, quick, trivial, one-line, minor
- KR: 수정, 오타, 이름변경, 간단한, 작은, 빠른, 사소한

### Deep → Codex (codex-shell MCP) / GLM-4.7
- EN: deep, thorough, comprehensive, research, investigate, root cause, audit, security
- KR: 심층, 철저한, 포괄적, 연구, 조사, 근본원인, 감사, 보안

### Autopilot → Auto (chains all skills)
- EN: autopilot, finish it, do everything, end to end, build it, complete this
- KR: 자동, 오토, 끝까지, 완성해, 전부 해줘, 알아서 다 해줘

## Priority Rules

1. **RED CRITICAL**: Security vulnerabilities → always Codex + security-reviewer
2. **RED CRITICAL**: Data loss risk → always confirm before execution
3. **YELLOW IMPORTANT**: Explicit model override → respect user choice
4. **YELLOW IMPORTANT**: Reasoning keywords → Codex (highest accuracy)
5. **GREEN RECOMMENDED**: Exploration keywords → Gemini Pro (largest context)
6. **GREEN RECOMMENDED**: Frontend keywords → Gemini Flash (fastest)
7. **GREEN RECOMMENDED**: Default → cost-effective model based on mode

## Fallback Chains

```
Gemini Pro unavailable  → GLM-4.7 → Codex → Claude
Gemini Flash unavailable → GLM-4.5-Air → Claude Haiku → Claude
Codex unavailable       → GLM-4.7 → Claude Opus → Claude
GLM-4.7 unavailable     → Gemini Pro → Codex → Claude
All backends down       → Claude (current session) with warning
```

## Hooks

- **PreToolUse**: Auto-detect task type and suggest optimal model routing
- **PostToolUse**: Log model usage for routing analytics
- **SessionStart**: Load routing config and check backend availability
