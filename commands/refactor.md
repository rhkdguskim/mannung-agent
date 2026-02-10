---
description: "Intelligent code refactoring with behavior preservation. Restructures code while keeping tests green. Detects code smells and applies appropriate refactoring patterns."
---

# /refactor — Code Restructuring

Precise refactoring with safety guarantees.

## Usage
```
/refactor path/to/file.ts     — Refactor specific file
/refactor --extract-method     — Extract long methods
/refactor --reduce-duplication — DRY up duplicated code
/refactor 이 클래스 리팩토링해줘
```

## Behavior

1. Read and fully understand current behavior
2. Check test coverage exists (write tests first if not)
3. Identify code smells and applicable refactorings
4. Execute one refactoring operation at a time
5. Verify tests pass after each step

## Invokes
- Agent: refactorer (Codex via codex-shell MCP)
