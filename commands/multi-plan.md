---
description: "Multi-model parallel planning. Sends the same task to multiple models simultaneously for diverse perspectives, then synthesizes the best approach."
---

# /multi-plan — Multi-Model Parallel Planning

Get planning perspectives from multiple models simultaneously.

## Usage
```
/multi-plan <task description>
/multi-plan redesign the authentication system
```

## Behavior

1. Parse task description
2. Send to multiple models in parallel:
   - Codex (codex-shell MCP): algorithm/architecture perspective
   - Gemini Pro (antigravity-gemini MCP): codebase context perspective
   - GLM-4.7 (Z.AI): cost-effective broad analysis
3. Collect all responses
4. Synthesize: compare approaches, identify consensus and divergence
5. Present unified plan with best elements from each

## Execution Pattern
```
         ┌→ Codex:      Architecture & logic analysis
task ────┼→ Gemini Pro:  Codebase context & patterns
         └→ GLM-4.7:    Broad analysis & alternatives
              ↓
         Orchestrator:  Synthesize best approach
```

## Invokes
- Agent: orchestrator
- Delegates to: reasoner, explorer, planner (in parallel)
