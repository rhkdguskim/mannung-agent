---
name: quick
description: "Fast simple task handler for trivial changes. Use when: fixing typos, renaming variables, simple one-line changes, formatting, or other trivial modifications. Keywords: fix, typo, rename, simple, quick, small, trivial, minor"
---

# Quick — Fast Simple Task Handler

Use the fastest available model for trivial tasks.

## Target Model
Primary: **Gemini 3 Flash** (via antigravity-gemini MCP) — fastest response
Fallback: GLM-4.5-Air → Claude Haiku → Claude

## When to Activate

- Typo fixes
- Variable/function renames
- Simple one-line changes
- Formatting/indentation fixes
- Adding/removing comments
- Simple import additions

## Execution Protocol

1. Identify the exact change needed
2. Read the target file
3. Make the minimal change
4. Done — no over-engineering

## Rules

- ONE change per invocation — don't scope-creep
- Don't refactor surrounding code
- Don't add "improvements" beyond what was asked
- Match existing code style exactly
- If the change is actually complex, escalate to appropriate skill

## Boundaries

**Will**: Fix typos, rename, format, simple edits
**Will Not**: Refactor, add features, change behavior beyond the simple fix
