---
description: "Run multiple agents in parallel for maximum speed. Decomposes task into independent subtasks and executes simultaneously across different models."
---

# /parallel — Multi-Agent Parallel Execution

Execute independent subtasks simultaneously.

## Usage
```
/parallel analyze this codebase thoroughly
/parallel build the login page (frontend + backend + tests)
/parallel 이 코드 전체 분석해줘 (구조 + 로직 + 보안)
```

## Behavior

1. Decompose task into independent subtasks
2. Show execution plan with model assignments:
   ```
   ┌─ Parallel Execution Plan ───────────────┐
   │ [1] Explorer → Structure analysis        │
   │ [2] Reasoner → Logic analysis            │
   │ [3] Reviewer → Security check            │
   │ Mode: All running simultaneously         │
   └─────────────────────────────────────────┘
   ```
3. Launch all tasks with `run_in_background: true`
4. Monitor and report completion
5. Synthesize results

## Invokes
- Agent: orchestrator (coordinates parallel execution)
- Delegates to: multiple agents based on subtask type
