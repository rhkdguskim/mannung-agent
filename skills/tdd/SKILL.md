---
name: tdd
description: "Test-driven development workflow with red-green-refactor cycle. Use when: writing tests, implementing TDD, improving test coverage, or setting up test infrastructure. Keywords: test, tdd, unit test, integration test, e2e, coverage, jest, pytest"
---

# TDD — Test-Driven Development

Enforce disciplined red-green-refactor cycle with Codex's reasoning.

## Target Model
Primary: **Codex** (via MCP)
Fallback: GLM-4.7 → Claude

## When to Activate

- Writing tests for new or existing code
- TDD-style feature development
- Improving test coverage
- Setting up test infrastructure

## TDD Cycle

```
1. RED:    Write a failing test (defines desired behavior)
2. GREEN:  Write MINIMUM code to pass
3. REFACTOR: Clean up while tests stay green
4. REPEAT
```

## Execution Protocol

1. Understand the requirement
2. Identify the test framework in use (detect from package.json, pyproject.toml, etc.)
3. Write the test FIRST — it must fail
4. Implement minimum code to pass
5. Run tests to verify green
6. Refactor if needed (tests must stay green)
7. Add edge case tests
8. Check coverage

## Test Writing Guidelines

- **Naming**: `test_[unit]_[scenario]_[expected_result]`
- **Pattern**: Arrange → Act → Assert
- **Isolation**: No shared mutable state between tests
- **Edge Cases**: null, empty, boundary values, error paths, concurrent access
- **Mocking**: Mock at boundaries only (APIs, DB, filesystem)

## Boundaries

**Will**: Write tests first, implement to pass, ensure coverage, add edge cases
**Will Not**: Write code without tests, skip the red phase, test trivial getters
