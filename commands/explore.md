---
description: "Deep codebase exploration using large-context models. Search files, trace dependencies, map project structure, find code patterns."
---

# /explore — Codebase Deep Dive

Comprehensive codebase exploration.

## Usage
```
/explore <query>
/explore how does authentication work?
/explore find all API endpoints
/explore understand the authentication system architecture
```

## Behavior

1. Map project structure via Glob
2. Search for relevant patterns via Grep
3. Read and cross-reference relevant files
4. Build a narrative of how things connect
5. Report findings with file:line references

## Invokes
- Agent: explorer (Gemini Pro via antigravity-gemini MCP — 1M context)
