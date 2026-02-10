---
description: "Run autopilot mode — autonomous goal-driven development that chains skills and runs until completion. Usage: /autopilot <goal>"
---

# /autopilot — Goal-Driven Persistent Execution

Activate fully autonomous development mode.

## Usage
```
/autopilot <goal>                    # Auto-detect and execute
/autopilot --quality <goal>          # Use highest-quality models
/autopilot --cost <goal>             # Use cost-effective models
/autopilot --speed <goal>            # Use fastest models
```

## Examples
```
/autopilot build a REST API for user management
/autopilot implement a login system
/autopilot refactor the authentication module
/autopilot fix all failing tests
/autopilot add dark mode support
```

## Behavior

1. Analyze the goal and scan the codebase
2. Create a structured execution plan with subtasks
3. Execute each subtask with the optimal model
4. Self-validate at each step (compile, test, review)
5. Continue until ALL subtasks are complete
6. Deliver a summary of changes made
