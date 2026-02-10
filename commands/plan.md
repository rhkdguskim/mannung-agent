---
description: "Create a detailed implementation plan before writing code. Analyzes requirements, explores codebase, breaks down tasks, assesses risks. WAIT for user CONFIRM before any code changes."
---

# /plan — Implementation Planning

Create a thorough plan before implementation.

## Usage
```
/plan <feature or task description>
/plan add authentication system
/plan 사용자 인증 시스템 추가
```

## Behavior

1. Analyze requirements and acceptance criteria
2. Explore codebase for existing patterns (via Gemini Pro)
3. Break down into ordered tasks with dependencies
4. Assess risks and propose mitigations
5. Define testing strategy
6. Present plan and WAIT for user approval
7. Only after approval: hand off to implementation agents

## Invokes
- Agent: planner (GLM-4.7 via Z.AI — 128K output)
- For codebase exploration: explorer (Gemini Pro via antigravity-gemini MCP)
