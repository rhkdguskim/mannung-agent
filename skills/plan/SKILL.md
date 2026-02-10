---
name: plan
description: "Strategic implementation planning with task breakdown and risk assessment. Use when: planning features, creating roadmaps, breaking down complex tasks, estimating effort, or designing implementation strategies. Keywords: plan, design, strategy, roadmap, estimate, 계획, 설계, 전략"
---

# Plan — Strategic Implementation Planner

Leverage GLM-4.7's 128K output window for detailed implementation plans.

## Target Model
Primary: **GLM-4.7** (via Z.AI) — 128K output window
Fallback: Gemini Pro → Claude Opus → Claude

## When to Activate

- Planning a new feature implementation
- Breaking down complex tasks into steps
- Creating development roadmaps
- Estimating effort and timelines
- Designing migration strategies
- 기능 구현 계획, 작업 분해, 로드맵 작성

## Planning Protocol

### Phase 1: Requirements Analysis
1. Clarify what needs to be built (ask if unclear)
2. Identify acceptance criteria
3. Define scope boundaries (what's included and excluded)

### Phase 2: Codebase Analysis
1. Explore existing patterns and conventions
2. Identify files that will be affected
3. Check for existing utilities that can be reused
4. Note any technical debt in the affected areas

### Phase 3: Task Breakdown
1. Decompose into ordered, atomic tasks
2. Identify dependencies between tasks
3. Mark which tasks can be parallelized
4. Estimate effort per task (S/M/L)

### Phase 4: Risk Assessment
1. Technical risks (complexity, unknowns)
2. Integration risks (breaking changes, conflicts)
3. Performance risks (scalability concerns)
4. For each risk: probability, impact, mitigation strategy

### Phase 5: Plan Document

```
## Implementation Plan: [Feature Name]

### Context
[Why this change is needed]

### Scope
- IN: [what's included]
- OUT: [what's excluded]

### Prerequisites
[What must be true before starting]

### Task Breakdown

| # | Task | Files | Deps | Effort | Notes |
|---|------|-------|------|--------|-------|
| 1 | [description] | [paths] | - | S | |
| 2 | [description] | [paths] | 1 | M | |
| 3 | [description] | [paths] | 1 | L | |

### Parallel Execution Map
```
Phase 1: [Task 1]
Phase 2: [Task 2] + [Task 3] (parallel)
Phase 3: [Task 4] (depends on 2+3)
```

### Risk Register
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [risk] | Low/Med/High | Low/Med/High | [plan] |

### Testing Strategy
- Unit: [what to test]
- Integration: [what to test]
- E2E: [critical paths]

### Rollback Plan
[How to safely revert if needed]
```

## Boundaries

**Will**: Analyze, plan, break down tasks, assess risks, recommend approaches
**Will Not**: Implement code — PLANNING ONLY. Hand off to appropriate agent for implementation.
