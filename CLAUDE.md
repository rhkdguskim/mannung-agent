# mannung-agent (All-Purpose Agent)

Multi-model intelligent routing plugin for Claude Code.
Automatically routes every development task to the optimal AI model.

## Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                      mannung-agent v2.0                           │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │ Explore  │ │ Frontend │ │ Reason   │ │  Plan    │ │  Vibe  │ │
│  │  Tasks   │ │  Tasks   │ │  Tasks   │ │  Tasks   │ │  Mode  │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └───┬────┘ │
│       │            │            │            │           │      │
│  ┌────▼─────┐ ┌────▼─────┐ ┌────▼─────┐ ┌────▼─────┐ ┌──▼───┐ │
│  │Gemini Pro│ │Gem. Flash│ │  Claude  │ │ GLM-4.7  │ │ Auto │ │
│  │  (MCP)   │ │  (MCP)   │ │  Opus   │ │ (Z.AI)   │ │Route │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────┘ │
│                                                                   │
│  Fallback: Claude (current session)                              │
└───────────────────────────────────────────────────────────────────┘
```

## Model Backends

| Backend | Models | Access Method | Best For |
|---------|--------|---------------|----------|
| antigravity-gemini MCP | Gemini 3 Pro, Gemini 3 Flash | `claude mcp add` | Exploration, Frontend |
| Z.AI API | GLM-4.7, GLM-4.5-Air | Anthropic-compatible proxy | Cost-effective Planning/Docs |
| Claude Opus | Opus 4.6 | Current session (native) | Reasoning, Review, Architecture |
| Claude Sonnet | Sonnet 4.5 | Current session (native) | Code Generation, Implementation |
| Claude Haiku | Haiku 4.5 | Current session (native) | Quick Lookups, Fallback |
| codex-shell MCP (optional) | OpenAI Codex | `claude mcp add` | Complex Reasoning (if configured) |

## MCP Configuration

```bash
# Gemini models via antigravity-gemini MCP
claude mcp add antigravity-gemini -- npx -y github:rhkdguskim/antigravity-gemini-mcp

# (Optional) Codex via codex-shell MCP — requires OPENAI_API_KEY
# claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp

# Z.AI: Set ZHIPU_API_KEY environment variable
```

## Routing Modes

- **auto**: Keyword-based auto-detection (default)
- **vibe**: Fully autonomous - agent picks everything
- **cost**: Minimize cost (GLM-4.5-Air -> Gemini Flash -> others)
- **quality**: Maximize quality (Claude Opus -> Gemini Pro -> Sonnet)
- **speed**: Minimize latency (Gemini Flash -> Haiku -> GLM Flash)
- **balanced**: Balanced cost/quality/speed

## Code Generation Strategy

For implementation tasks (writing/editing code), prefer **Claude Sonnet** as the primary code generation model:
- Best balance of quality and speed for everyday coding
- Sonnet handles: feature implementation, bug fixes, multi-file changes, iterative coding
- Escalate to Opus only for: architecture decisions, complex system design, critical security code
- Use Gemini Flash for: simple UI changes, CSS tweaks, quick edits

### Code Generation Keywords -> Sonnet (native)
implement, create, write code, generate, add feature, develop, scaffold

## Autopilot Mode

**Master keyword activation**: When user provides a high-level goal with autopilot keywords, the agent autonomously chains skills and runs persistently until completion.

- Trigger keywords: autopilot, finish it, do everything, end to end, build it, complete this, start to finish
- Execution pipeline: explore -> plan -> implement -> test -> review -> deliver
- Self-recovery: retries on failure, uses fallback models, never stops until goal is met
- Parallel execution: internally dispatches independent subtasks in parallel when possible
- Progress tracking: reports phase/subtask progress at each step

## Skills (23)

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
| `reason` | Complex logic & algorithms | Claude Opus |
| `plan` | Implementation planning | GLM-4.7 / Claude Opus |
| `planning` | Task decomposition (alias for plan) | GLM-4.7 / Claude Opus |
| `review` | Multi-model code review | Claude Opus |
| `refactor` | Intelligent refactoring | Claude Sonnet |
| `tdd` | Test-driven development | Claude Sonnet |
| `vibe` | Fully autonomous vibe coding | Auto |
| `quick` | Fast simple tasks | Gemini Flash (MCP) |
| `deep` | Deep analysis & research | Claude Opus / GLM-4.7 |
| `doc` | Documentation generation | GLM-4.7 |
| `multi-plan` | Multi-model parallel planning | Auto (parallel) |
| `git-advanced` | Git workflow & conventional commits | Claude |
| `memory` | Persistent cross-session context | Claude |
| `reflection` | Self-review & verification | Claude Opus |
| `web-research` | Internet-powered research | Gemini Pro |

## Agents (11)

| Agent | Persona | Model | Tools |
|-------|---------|-------|-------|
| explorer | Codebase Navigator | Gemini Pro (MCP) | Read, Grep, Glob |
| frontend-dev | UI/UX Specialist | Gemini Flash (MCP) | Read, Edit, Write, Bash, Glob, Grep |
| reasoner | Logic Engine | Claude Opus | Read, Grep, Glob, Bash |
| planner | Strategic Architect | GLM-4.7 | Read, Grep, Glob |
| reviewer | Quality Guardian | Claude Opus | Read, Grep, Glob |
| refactorer | Code Surgeon | Claude Sonnet | Read, Edit, Write, Grep, Glob |
| tdd-guide | Test Champion | Claude Sonnet | Read, Edit, Write, Bash, Grep, Glob |
| architect | System Designer | Claude Opus | Read, Grep, Glob |
| orchestrator | Multi-Model Conductor | Claude | All |
| vibe-coder | Autonomous Builder | Auto | All |
| autopilot | Goal-Driven Executor | Auto | All |

## Commands (23)

`/route`, `/autopilot`, `/vibe`, `/plan`, `/planning`, `/review`, `/refactor`, `/tdd`, `/explore`,
`/frontend`, `/reason`, `/quick`, `/deep`, `/doc`, `/status`, `/setup`, `/doctor`,
`/config`, `/multi-plan`, `/git-advanced`, `/memory`, `/reflection`, `/web-research`

## Keyword Detection

### Exploration -> Gemini Pro (antigravity-gemini MCP)
search, find, grep, explore, codebase, structure, navigate, directory, scan, locate, traverse

### Frontend -> Gemini Flash (antigravity-gemini MCP)
react, vue, angular, svelte, css, html, ui, ux, component, style, layout, tailwind, design, animation

### Reasoning -> Claude Opus (native)
algorithm, optimize, debug, reason, tdd, test-driven, review, refactor, concurrent, deadlock, race condition

### Planning -> GLM-4.7 (Z.AI API)
plan, decompose, break down, write readme, write doc, write changelog, specification, roadmap, estimate

### Security -> Claude Opus (native)
security, vulnerability, injection, xss, csrf, auth bypass

### Web Research -> Gemini Pro (antigravity-gemini MCP)
research, web search, google, internet, browse, online docs

### Code Generation -> Sonnet (native)
implement, create, write code, generate, add feature, develop, scaffold

### Review -> Claude Opus (native)
review, code quality, pull request review, pr review

### Quick -> Gemini Flash (antigravity-gemini MCP)
fix typo, rename, simple, trivial, one-line, minor fix, formatting

### Autopilot -> Auto (chains all skills)
autopilot, finish it, do everything, end to end, build it, complete this, start to finish

## Auto-Routing on First Message (MANDATORY)

When a user sends their first message in a session, BEFORE executing any tools:
1. Analyze the user's message against the Keyword Detection matrix above
2. Determine the optimal model/skill for the task
3. Report the routing decision:
   ```
   [mannung-agent] Auto-detected: <category> -> <model> (<backend>)
   ```
4. If the task matches a specific skill (e.g., explore, frontend, reason, review), invoke that skill's agent via the Task tool with the appropriate `subagent_type`
5. If no specific keyword match, use Claude Sonnet (native) for code generation tasks or Claude (current session) for general tasks

### Auto-Routing Decision Table

| User Intent | Detection Signal | Action |
|-------------|-----------------|--------|
| Codebase exploration | "find", "search", "where is", "how does X work" | Invoke explorer agent (Gemini Pro) |
| UI/frontend work | "react", "css", "component", "layout", "style" | Invoke frontend-dev agent (Gemini Flash) |
| Algorithm/debugging | "optimize", "debug", "algorithm", "performance" | Invoke reasoner agent (Claude Opus) |
| Planning/design | "plan", "design", "how should we", "approach" | Invoke planner agent (GLM-4.7) |
| Code review | "review", "check quality", "pr review" | Invoke reviewer agent (Claude Opus) |
| Documentation | "write readme", "write docs" | Invoke doc skill (GLM-4.7) |
| Simple fix | "fix typo", "rename", "small change" | Handle directly with quick skill |
| Code generation | "implement", "create", "add feature" | Use Sonnet (native) |
| Autonomous | "autopilot", "vibe", "build it" | Invoke autopilot/vibe skill |
| Web research | "research", "search the web" | Invoke web-research skill (Gemini Pro) |
| Ambiguous/general | No clear match | Use Claude (current session) |

## Priority Rules

1. **RED CRITICAL**: Security vulnerabilities -> always Claude Opus + security review
2. **RED CRITICAL**: Data loss risk -> always confirm before execution
3. **YELLOW IMPORTANT**: Explicit model override -> respect user choice
4. **YELLOW IMPORTANT**: Reasoning keywords -> Claude Opus (highest accuracy)
5. **GREEN RECOMMENDED**: Exploration keywords -> Gemini Pro (largest context)
6. **GREEN RECOMMENDED**: Frontend keywords -> Gemini Flash (fastest)
7. **GREEN RECOMMENDED**: Default -> cost-effective model based on mode

## Fallback Chains

```
Gemini Pro unavailable  -> GLM-4.7 -> Claude Opus -> Claude
Gemini Flash unavailable -> Claude Haiku -> Claude
GLM-4.7 unavailable     -> Gemini Pro -> Claude Opus -> Claude
All backends down       -> Claude (current session) with warning
```

## Token Optimization

- **Right-size models**: Use smallest capable model per subtask
- **Minimize context**: Load only relevant files, use Grep before Read
- **Model escalation**: Start cheap, escalate only on failure
- **Parallel cost trade-off**: Parallel = faster but higher total cost
- See `core/TOKEN_OPTIMIZATION.md` for full strategy

## Progress Reporting

For long-running tasks (autopilot, vibe, deep), report progress:
```
[mannung-agent] Phase 2/5: Planning
[mannung-agent] Subtask: 3/7 complete
[mannung-agent] Model: Sonnet (native)
```

## Hooks

- **PreToolUse**: Auto-detect task type and suggest optimal model routing
- **PostToolUse**: Log model usage for routing analytics
- **SessionStart**: Load routing config and check backend availability
