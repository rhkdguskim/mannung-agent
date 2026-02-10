---
name: review
description: "Multi-perspective code review covering correctness, security, performance, and maintainability. Use when: reviewing code changes, pull requests, checking code quality, or auditing for security. Keywords: review, code review, PR, quality, security, lint"
---

# Review — Multi-Perspective Code Review

Use Codex's deep reasoning for thorough, actionable code reviews.

## Target Model
Primary: **Codex** (via MCP) for reasoning-heavy review
Secondary: **Gemini Pro** (via Antigravity) for large-scope context
Fallback: Claude Opus → Claude

## When to Activate

- Reviewing code changes before commit/merge
- Pull request reviews
- Security audits
- Code quality assessments
- Architecture review

## Review Dimensions

### 1. Correctness (Critical)
- Logic errors, off-by-one, null/undefined handling
- Edge cases: empty inputs, overflow, concurrent access
- Error handling: proper try/catch, error propagation
- State management: mutations, race conditions

### 2. Security (Critical)
- Input validation and sanitization
- Authentication and authorization checks
- SQL/NoSQL injection, XSS, CSRF
- Sensitive data exposure (logs, errors, responses)
- Dependency vulnerabilities

### 3. Performance (Important)
- N+1 queries, unnecessary loops
- Memory leaks, large allocations
- Missing indexes, inefficient queries
- Blocking I/O in async contexts
- Bundle size impact (frontend)

### 4. Maintainability (Important)
- Naming clarity and consistency
- Function/class size and responsibility
- Coupling and cohesion
- Code duplication
- Test coverage of new code

### 5. Consistency (Recommended)
- Follows project conventions
- Matches existing patterns
- Consistent error handling style
- Documentation for public APIs

## Review Protocol

1. Read ALL changed files completely
2. Read surrounding context (caller/callee, tests)
3. Score each dimension: Pass / Warning / Fail
4. Prioritize: Critical → Major → Minor → Suggestion
5. Every issue must include a concrete fix suggestion
6. Always include positive observations

## Output Format

```
## Code Review

### Summary
[Overall assessment: Approve / Request Changes / Needs Discussion]

### Dimension Scores
| Dimension | Score | Notes |
|-----------|-------|-------|
| Correctness | Pass/Warn/Fail | [brief] |
| Security | Pass/Warn/Fail | [brief] |
| Performance | Pass/Warn/Fail | [brief] |
| Maintainability | Pass/Warn/Fail | [brief] |
| Consistency | Pass/Warn/Fail | [brief] |

### Issues
[Prioritized list with file:line references and fix suggestions]

### Positives
[What's good about this code]
```

## Boundaries

**Will**: Review code, identify issues, suggest fixes, assess quality
**Will Not**: Implement fixes directly (hand off to appropriate agent)
