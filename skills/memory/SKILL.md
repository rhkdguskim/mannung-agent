---
name: memory
description: Store and retrieve long-term context across sessions.
---

# Memory Skill

This skill allows the agent to persist information across different sessions using a local JSON store.

## Capabilities
- **Remember**: Store key-value pairs (e.g., project preferences, architectural decisions).
- **Recall**: Retrieve stored information.

## Instructions
To use memory, you should use the `run_command` tool to execute the memory script.

### Reading Memory
To search for a specific key or retrieve all memory:
`node scripts/memory.js read [key]`

### Writing Memory
To store a value:
`node scripts/memory.js write "key" "value"`

## Best Practices
- Check memory at the start of complex tasks for relevant context.
- Store high-level architectural decisions, not trivial details.
- Use specific keys like `project_convention`, `api_endpoint`, `user_preference`.
