---
description: "Execute a multi-model plan by routing subtasks to specialized models. Typically used after /multi-plan produces an approved plan."
---

# /multi-execute — Multi-Model Execution

Execute planned subtasks with optimal model routing.

## Usage
```
/multi-execute              — Execute the most recent plan
/multi-execute <plan-ref>   — Execute a specific plan
```

## Behavior

1. Load the approved plan (from /multi-plan or /plan)
2. For each subtask, route to optimal model:
   - Frontend tasks → Gemini Flash (antigravity-gemini MCP)
   - Logic/algorithm → Codex (codex-shell MCP)
   - Documentation → GLM-4.7 (Z.AI)
   - Simple tasks → Gemini Flash
3. Execute independent subtasks in parallel
4. Execute dependent subtasks sequentially
5. Coordinate handoffs between agents
6. Report results per subtask and overall

## Invokes
- Agent: orchestrator (coordinates everything)
- Delegates to: frontend-dev, reasoner, tdd-guide, etc.
