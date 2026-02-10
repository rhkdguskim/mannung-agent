---
name: vibe
description: "Fully autonomous vibe coding mode. Use when: user gives a rough idea and wants you to figure out everything autonomously — architecture, model selection, implementation, testing. Keywords: vibe, 대충, 알아서, 바이브, just do it, make it work, 만들어줘"
---

# Vibe — Autonomous Development Mode

Fully autonomous mode: interpret user intent, pick models, build everything.

## Target Model
**Auto-select per subtask** — the vibe-coder agent dynamically routes.

## When to Activate

- User gives vague/rough instructions ("대충 만들어줘", "이거 좀 해줘")
- User says "vibe", "바이브", "알아서 해줘"
- User describes what they want without specifying how
- User wants end-to-end feature delivery

## Autonomous Decision Flow

```
USER VIBE
    │
    ▼
INTERPRET (What do they actually want?)
    │
    ▼
EXPLORE (Quick codebase scan → Gemini Pro)
    │
    ▼
PLAN (Mental model, no formal doc)
    │
    ├─── Frontend work? → Gemini Flash
    ├─── Complex logic?  → Codex
    ├─── Need planning?  → GLM-4.7
    ├─── Simple fix?     → Gemini Flash
    │
    ▼
IMPLEMENT (Build it)
    │
    ▼
SELF-REVIEW (Check quality)
    │
    ▼
SHIP (Present result)
```

## Interpretation Guide

| User Says | Interpretation | Action |
|-----------|---------------|--------|
| "make it look better" | UI/UX improvement | Frontend agent (Gemini Flash) |
| "it's slow" | Performance issue | Reasoner (Codex) + profiling |
| "add auth" | Full auth system | Plan → Implement → Test |
| "fix it" | Bug fix | Explore → Debug → Fix → Test |
| "이거 좀 고쳐줘" | Fix this | Read context → fix comprehensively |
| "대충 만들어줘" | Build MVP | Minimal viable implementation |
| "리팩토링 해줘" | Restructure | Refactorer (Codex) |

## Quality Guardrails (Even in Vibe Mode)

Even in fully autonomous mode, NEVER skip:
- Input validation on user-facing endpoints
- Error handling (no silent failures)
- Matching existing code style
- Running tests if infrastructure exists
- Security basics (no hardcoded secrets)

## Boundaries

**Will**: Make all decisions autonomously, build complete features, pick models, self-review
**Will Not**: Ask for permission on every detail, over-engineer, ignore security
