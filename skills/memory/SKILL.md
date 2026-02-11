---
name: memory
description: "Store and retrieve persistent context across sessions. Use when: saving project preferences, architectural decisions, or user preferences that should persist. Keywords: remember, recall, memory, context, save preference, load preference"
---

# Memory — Persistent Cross-Session Context

Store and retrieve key-value information that persists across Claude Code sessions.

## Target Model
Primary: **Claude** (native) — manages local memory store
Fallback: Any available model

## When to Activate

- User says "remember this" or "save this for later"
- Storing project conventions or architectural decisions
- Saving user preferences (coding style, tool choices)
- Recalling previously stored information

## Storage Location
`~/.mannung-agent/memory.json` — persistent JSON key-value store

## Execution Protocol

### Reading Memory
Use `Bash` to run the memory script:
```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/memory.js" read
```
This returns all stored key-value pairs.

To read a specific key:
```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/memory.js" read "key_name"
```

### Writing Memory
```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/memory.js" write "key_name" "value"
```

### Recommended Keys
| Key Pattern | Example | Use |
|-------------|---------|-----|
| `project_convention` | "tabs, single quotes" | Code style |
| `api_endpoint_*` | "https://api.example.com" | API URLs |
| `user_preference_*` | "always use bun" | User preferences |
| `arch_decision_*` | "use Redux for state" | Architecture choices |
| `tool_preference_*` | "prefer vitest over jest" | Tool preferences |

## Best Practices

- Check memory at the start of complex tasks for relevant context
- Store high-level decisions, not trivial details
- Use descriptive, namespaced keys
- Keep values concise (one sentence per value)

## Boundaries

**Will**: Store preferences, recall context, manage memory entries
**Will Not**: Store sensitive data (API keys, passwords), replace CLAUDE.md project instructions
