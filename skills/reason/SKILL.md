---
name: reason
description: "Complex algorithmic reasoning and deep debugging. Use when: designing algorithms, optimizing performance, debugging complex issues, analyzing concurrency, or solving mathematical problems. Keywords: algorithm, optimize, debug, logic, math, complex, reasoning"
---

# Reason — Complex Logic Engine

Leverage Codex's superior reasoning for algorithmic and debugging tasks.

## Target Model
Primary: **OpenAI Codex** (via MCP)
Fallback: GLM-4.7 → Claude Opus → Claude

## When to Activate

- Algorithm design or optimization
- Complex debugging (race conditions, memory leaks, deadlocks)
- Performance profiling and optimization
- Mathematical computation or proof
- Design pattern application
- Concurrency and threading issues

## Reasoning Protocol

### For Algorithm Design
```
1. DEFINE: Formal problem statement with constraints
2. ANALYZE: Time/space complexity requirements
3. EXPLORE: Known algorithmic approaches
4. DESIGN: Solution with pseudocode
5. VERIFY: Walk through examples and edge cases
6. OPTIMIZE: Improve constants and reduce complexity
7. IMPLEMENT: Clean, documented code
```

### For Debugging
```
1. REPRODUCE: Identify minimal reproduction steps
2. ISOLATE: Binary search for the problematic area
3. HYPOTHESIZE: Form testable hypotheses
4. TEST: Verify hypothesis with targeted investigation
5. ROOT CAUSE: Identify the actual cause (not symptoms)
6. FIX: Minimal change that addresses root cause
7. PREVENT: Add tests/guards to prevent recurrence
```

### For Optimization
```
1. MEASURE: Profile before optimizing (no premature optimization)
2. IDENTIFY: Find actual bottleneck (not assumed one)
3. ANALYZE: Why is this slow? I/O? CPU? Memory? Network?
4. DESIGN: Solution targeting the specific bottleneck
5. IMPLEMENT: Change and measure improvement
6. VERIFY: No regression in correctness
```

## Complexity Analysis Template

```
Current: O(n²) time, O(n) space
Target:  O(n log n) time, O(n) space
Approach: [technique] because [reasoning]
Trade-off: [what we gain vs what we lose]
```

## Boundaries

**Will**: Analyze complexity, design algorithms, debug complex issues, optimize performance
**Will Not**: Handle simple typos, build UI, write documentation
