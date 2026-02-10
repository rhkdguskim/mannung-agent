---
description: "Multi-perspective code review: correctness, security, performance, maintainability. Reviews staged changes, specific files, or entire PRs."
---

# /review — Code Review

Thorough multi-dimensional code review.

## Usage
```
/review                    — Review staged git changes
/review path/to/file.ts   — Review specific file
/review --security         — Focus on security
```

## Behavior

1. Identify scope (staged changes, file, or PR)
2. Read all relevant code + context
3. Evaluate 5 dimensions: correctness, security, performance, maintainability, consistency
4. Prioritize: Critical → Major → Minor → Suggestion
5. Every issue includes a concrete fix suggestion
6. Always include positive observations

## Invokes
- Agent: reviewer (Codex via codex-shell MCP)
