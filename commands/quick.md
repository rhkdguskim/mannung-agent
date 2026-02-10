---
description: "Fast handler for simple tasks: typo fixes, renames, one-line changes. Uses the fastest available model."
---

# /quick — Fast Simple Task

Minimal changes with minimal overhead.

## Usage
```
/quick fix typo in README
/quick rename getUserData to fetchUserData
/quick 오타 수정
```

## Behavior

1. Identify exact change needed
2. Read target file
3. Make minimal change
4. Done — no over-engineering

## Invokes
- Agent: uses Gemini Flash (antigravity-gemini MCP) or fastest available
