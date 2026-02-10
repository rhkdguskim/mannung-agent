---
description: "Test-driven development: write failing test first, implement minimum code to pass, refactor. Enforces red-green-refactor cycle with 80%+ coverage target."
---

# /tdd — Test-Driven Development

Disciplined TDD cycle enforcement.

## Usage
```
/tdd <feature description>
/tdd add user login validation
/tdd 로그인 검증 테스트 추가
```

## Behavior

1. Understand the requirement
2. Write a failing test (RED)
3. Implement minimum code to pass (GREEN)
4. Refactor while tests stay green (REFACTOR)
5. Add edge case tests
6. Report coverage

## Invokes
- Agent: tdd-guide (Codex via codex-shell MCP)
