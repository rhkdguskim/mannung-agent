---
description: "Fully autonomous vibe coding mode. Give a rough idea and the agent handles everything: architecture, model selection, implementation, testing. For when you want to say 'just build it' or '대충 만들어줘'."
---

# /vibe — Autonomous Development

Interpret user intent and build autonomously.

## Usage
```
/vibe <rough idea or description>
/vibe make it look better
/vibe add user authentication
/vibe 이거 좀 고쳐줘
```

## Behavior

1. Interpret the user's intent generously
2. Quick codebase scan to understand context
3. Auto-select model per subtask:
   - Codebase understanding → Gemini Pro (antigravity-gemini MCP)
   - UI/frontend work → Gemini Flash (antigravity-gemini MCP)
   - Complex logic → Codex (codex-shell MCP)
   - Simple changes → fastest available
4. Build, self-review, ship
5. Present concise summary of changes

## Invokes
- Agent: vibe-coder (auto model selection)
- Delegates to specialist agents as needed
