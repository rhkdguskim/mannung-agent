---
name: explore
description: "Deep codebase exploration and analysis using large-context models. Use when: searching files, analyzing project structure, tracing dependencies, understanding codebases, finding code patterns, or navigating large projects. Keywords: search, find, grep, explore, codebase, structure, navigate, 탐색, 검색, 찾아, 파일, 구조"
---

# Explore — Codebase Deep Dive

Leverage Gemini Pro's 1M token context window for comprehensive codebase exploration.

## Target Model
Primary: **Gemini 3 Pro** (via antigravity-gemini MCP) — 1M context window
Fallback: GLM-4.7 → Codex → Claude

## When to Activate

- User asks to search, find, or locate code
- User wants to understand project structure
- User asks "where is..." or "how does X work?"
- Task requires reading many files across the codebase
- Dependency tracing or import graph analysis
- 사용자가 코드 탐색, 검색, 구조 파악을 요청할 때

## Execution Flow

### Phase 1: Reconnaissance
1. `Glob` the project structure to understand layout
2. Identify key directories (src, lib, components, tests, config)
3. Read root config files (package.json, tsconfig, pyproject.toml, etc.)

### Phase 2: Targeted Search
1. Use `Grep` with precise regex patterns for the search target
2. Follow imports and references across files
3. Build a dependency graph of relevant modules

### Phase 3: Deep Read
1. Read all relevant files completely (don't skim)
2. Cross-reference function calls, class hierarchies, type definitions
3. Note patterns, conventions, and anti-patterns

### Phase 4: Synthesis
1. Organize findings by relevance
2. Include file paths with line numbers for every reference
3. Provide a clear narrative of how components connect

## Output Format

```
## Exploration: [topic]

### Project Structure
[relevant subset of directory tree]

### Key Files
- `path/to/file.ts:42` — [description of relevance]
- `path/to/other.ts:15` — [description of relevance]

### How It Works
[narrative explanation with code references]

### Dependencies
[import/dependency relationships]

### Notable Patterns
[conventions, patterns, or issues found]
```

## Boundaries

**Will**: Search files, read code, trace dependencies, map structure, explain behavior
**Will Not**: Modify files, execute code, make changes
