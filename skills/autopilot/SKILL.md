---
name: autopilot
description: "Autonomous goal-driven development mode. Use when: user provides a high-level goal and wants fully automated execution — auto-chains explore, plan, implement, test, review skills until goal is complete. Keywords: autopilot, 자동, 오토, auto, 끝까지, 완성해, finish it, do everything, 전부 해줘, 알아서 끝까지"
---

# Autopilot — Goal-Driven Persistent Execution

Fully autonomous mode that chains skills together and runs persistently until the goal is achieved.

## Target Model
**Auto-select per phase** — dynamically routes to the optimal model for each step.

## When to Activate

- User provides a high-level goal: "build a login system", "로그인 시스템 만들어줘"
- User says "autopilot", "자동으로", "알아서 끝까지", "전부 해줘"
- User wants end-to-end delivery without manual intervention
- User says "끝까지 해줘", "완성해줘", "finish it"

## Execution Pipeline

```
GOAL RECEIVED
    │
    ▼
╔══════════════════════════════════════╗
║  PHASE 1: UNDERSTAND (Explore)      ║
║  Model: Gemini Pro (antigravity)    ║
║  • Scan codebase structure          ║
║  • Identify existing patterns       ║
║  • Find related files               ║
║  • Assess current state             ║
╚══════════════════╤═══════════════════╝
                   │
                   ▼
╔══════════════════════════════════════╗
║  PHASE 2: PLAN (GLM-4.7 / Opus)    ║
║  • Break goal into subtasks         ║
║  • Define acceptance criteria       ║
║  • Identify dependencies            ║
║  • Estimate complexity per subtask  ║
║  • Assign optimal model per task    ║
╚══════════════════╤═══════════════════╝
                   │
                   ▼
╔══════════════════════════════════════╗
║  PHASE 3: IMPLEMENT (Loop)          ║
║  For each subtask:                  ║
║  ┌─────────────────────────────┐    ║
║  │ Select model by task type:  │    ║
║  │ • Code gen → Sonnet         │    ║
║  │ • Frontend → Gemini Flash   │    ║
║  │ • Algorithm → Codex         │    ║
║  │ • Simple → Gemini Flash     │    ║
║  └──────────┬──────────────────┘    ║
║             │                       ║
║  ┌──────────▼──────────────────┐    ║
║  │ Execute subtask             │    ║
║  └──────────┬──────────────────┘    ║
║             │                       ║
║  ┌──────────▼──────────────────┐    ║
║  │ Validate result             │    ║
║  │ • Does code compile/run?    │    ║
║  │ • Does it meet criteria?    │    ║
║  └──────────┬──────────────────┘    ║
║             │                       ║
║         Pass? ──No──→ Retry/Fix     ║
║             │                       ║
║            Yes                      ║
║             │                       ║
║      Next subtask                   ║
╚══════════════════╤═══════════════════╝
                   │
                   ▼
╔══════════════════════════════════════╗
║  PHASE 4: VERIFY (Codex)            ║
║  • Run existing tests               ║
║  • Check for regressions            ║
║  • Validate acceptance criteria     ║
║  • Security check                   ║
╚══════════════════╤═══════════════════╝
                   │
                   ▼
╔══════════════════════════════════════╗
║  PHASE 5: REVIEW (Codex + Gemini)   ║
║  • Code quality review              ║
║  • Self-review for issues           ║
║  • Fix any issues found             ║
╚══════════════════╤═══════════════════╝
                   │
                   ▼
╔══════════════════════════════════════╗
║  PHASE 6: DELIVER                   ║
║  • Summarize what was done          ║
║  • List files changed               ║
║  • Report any remaining issues      ║
║  • Suggest next steps               ║
╚══════════════════════════════════════╝
```

## Persistent Execution Rules

### Never Stop Until Goal is Achieved
- Do NOT stop after a single subtask — continue to the next
- Do NOT ask for permission between phases unless blocked
- Do NOT give up on first error — try alternative approaches
- Track progress against the acceptance criteria defined in Phase 2

### Self-Recovery on Failure
```
Error occurred?
    │
    ├── Compilation error → Read error, fix code, retry
    ├── Test failure → Analyze failure, fix, re-run
    ├── Model unavailable → Use fallback chain
    ├── File conflict → Resolve automatically
    └── Unknown error → Log it, try different approach
        └── 3 retries failed → Report to user with context
```

### Progress Tracking
At each phase transition, output a progress update:
```
[autopilot] Phase 2/6: Planning complete
[autopilot] Subtasks: 5 identified
[autopilot] Progress: ██░░░░░░░░ 20%
[autopilot] Next: Implementing subtask 1/5 — Create user model
```

## Master Keyword Detection

When ANY of these master keywords are detected, activate autopilot:

| Keyword | Language | Example |
|---------|----------|---------|
| `autopilot` | EN | "autopilot: build a REST API" |
| `자동` | KR | "자동으로 로그인 기능 만들어줘" |
| `오토` | KR | "오토 파일럿으로 해줘" |
| `끝까지` | KR | "끝까지 완성해줘" |
| `완성해` | KR | "이 기능 완성해줘" |
| `전부` | KR | "전부 다 해줘" |
| `알아서 다` | KR | "알아서 다 해줘" |
| `finish it` | EN | "finish it" |
| `do everything` | EN | "do everything for this feature" |
| `build it` | EN | "build it end to end" |
| `end to end` | EN | "implement this end to end" |

## Skill Chaining Matrix

Based on the goal type, chain these skills automatically:

| Goal Type | Skill Chain |
|-----------|-------------|
| New feature | explore → plan → implement (Sonnet) → tdd → review |
| Bug fix | explore → reason (Codex) → implement → tdd |
| Refactoring | explore → plan → refactor (Codex) → tdd → review |
| UI feature | explore → frontend (Flash) → review |
| Performance | explore → deep (Codex) → reason → implement → tdd |
| Full project | explore → plan → implement → frontend → tdd → review → doc |

## Quality Guardrails

Even in full autopilot, ALWAYS enforce:
- Run tests after implementation if test infrastructure exists
- Check for security vulnerabilities (no hardcoded secrets, SQL injection, XSS)
- Match existing code style and patterns
- Validate that all acceptance criteria from Phase 2 are met
- Never overwrite user's uncommitted changes without warning

## Boundaries

**Will**: Make all decisions autonomously, chain multiple skills, retry on failure, run to completion
**Will Not**: Push to git without asking, delete existing functionality, ignore test failures, skip security checks
