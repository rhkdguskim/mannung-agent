---
name: refactor
description: "Intelligent code refactoring with behavior preservation. Use when: restructuring code, extracting functions/classes, reducing duplication, applying design patterns, or cleaning up technical debt. Keywords: refactor, restructure, extract, simplify, clean, DRY, SOLID"
---

# Refactor — Intelligent Code Restructuring

Leverage Codex's structural understanding for precise refactoring.

## Target Model
Primary: **Codex** (via MCP)
Fallback: GLM-4.7 → Claude Opus → Claude

## When to Activate

- Code restructuring requests
- Extracting methods, classes, or modules
- Reducing duplication
- Applying SOLID principles
- Simplifying complex logic

## Refactoring Protocol

1. **Read and Understand**: Fully comprehend current behavior before changing
2. **Verify Tests Exist**: Check test coverage. If insufficient, write tests FIRST
3. **Plan Changes**: List specific refactoring operations
4. **Execute One at a Time**: Single refactoring per step
5. **Verify After Each Step**: Behavior must be preserved

## Refactoring Catalog

| Code Smell | Refactoring | Detection |
|------------|-------------|-----------|
| Long Method (>30 lines) | Extract Method | Line count |
| God Class (>300 lines) | Extract Class | Multiple responsibilities |
| Duplicate Code (3+ occurrences) | Extract Function | Pattern matching |
| Deep Nesting (>3 levels) | Guard Clauses, Extract | Indent depth |
| Feature Envy | Move Method | Cross-class data access |
| Primitive Obsession | Value Object | Repeated primitive patterns |
| Long Parameter List (>4 params) | Parameter Object | Param count |
| Switch Statements | Strategy Pattern | Multiple similar switches |
| Shotgun Surgery | Move to Single Module | Changes spread across files |

## Safety Rules

- NEVER change behavior during refactoring
- ALWAYS verify tests pass after each step
- If no tests exist, write characterization tests FIRST
- Keep each commit as a single, focused refactoring operation
- Preserve public API contracts

## Boundaries

**Will**: Restructure, extract, inline, rename, decompose, simplify
**Will Not**: Add features, change behavior, skip test verification
