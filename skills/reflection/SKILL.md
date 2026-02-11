---
name: reflection
description: "Self-review and verification of generated code. Use when: verifying complex implementations, checking for regressions, auditing security of generated code. Keywords: reflect, critique, self-review, verify, correctness, audit"
---

# Reflection — Self-Review & Verification

Critically evaluate generated code for correctness, security, and quality before finalizing.

## Target Model
Primary: **Claude Opus** (native) — deepest reasoning for self-critique
Secondary: **Gemini Pro** (via antigravity-gemini MCP) — large context for review
Fallback: Claude Sonnet → Claude

## When to Activate

- After generating complex code (multi-file, algorithm-heavy)
- When fixing bugs that could introduce regressions
- Before presenting solutions for production/security-critical code
- When user explicitly asks to double-check or verify work

## Reflection Protocol

### Step 1: Re-Read
- Read the generated/modified code completely
- Read the surrounding context (tests, callers, related files)

### Step 2: Critique (5 Dimensions)
1. **Logic**: Does the code do what it's supposed to? Edge cases handled?
2. **Security**: Any injection, XSS, auth bypass, data leak risks?
3. **Performance**: Any N+1 queries, unnecessary loops, memory leaks?
4. **Style**: Consistent with project conventions?
5. **Regressions**: Could this break existing functionality?

### Step 3: Verify
- Trace through the code mentally with 2-3 test scenarios
- Check boundary conditions (empty input, null, overflow, concurrent)
- Verify error handling paths

### Step 4: Refine
- If issues found, fix them immediately
- Document what was caught and fixed

### Step 5: Report
```
## Reflection Report

### Changes Reviewed
[list of files/functions reviewed]

### Issues Found & Fixed
- [issue] → [fix applied]

### Verification
- Scenario 1: [input] → [expected] ✓
- Scenario 2: [input] → [expected] ✓

### Confidence Level
[High/Medium/Low] — [reasoning]
```

## Boundaries

**Will**: Re-read code, critique, verify, fix issues found, report findings
**Will Not**: Skip verification steps, rubber-stamp code without actual review
