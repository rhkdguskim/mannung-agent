---
name: multi-plan
description: "Multi-model parallel planning. Sends the same task to multiple models simultaneously for diverse perspectives, then synthesizes the best approach."
---

# Multi-Plan — Parallel Multi-Model Planning

Get planning perspectives from multiple AI models simultaneously and synthesize the best approach.

## Target Models
- **Codex** (codex-shell MCP): Algorithm/architecture perspective
- **Gemini Pro** (antigravity-gemini MCP): Codebase context perspective
- **GLM-4.7** (Z.AI): Cost-effective broad analysis
- Synthesis: **Claude** (native)

## When to Activate

- Complex architectural decisions with multiple valid approaches
- Feature design that needs diverse perspectives
- Migration strategies or major refactoring plans
- When user wants to compare model opinions

## Execution Flow

### Phase 1: Fan-Out (Parallel)
Send the same task to 3 models simultaneously:
1. **Codex**: Focus on algorithm design, complexity, and technical correctness
2. **Gemini Pro**: Focus on codebase context, existing patterns, and integration points
3. **GLM-4.7**: Focus on broad analysis, alternatives, and risk assessment

### Phase 2: Collect
Wait for all responses. If a model is unavailable, proceed with available responses.

### Phase 3: Synthesize
Compare all plans and produce a unified recommendation:
- Identify consensus points (all models agree)
- Highlight divergence points (models disagree)
- Select best elements from each plan
- Produce final recommendation with reasoning

## Output Format

```
## Multi-Model Plan: [task]

### Consensus (All Models Agree)
- [point 1]
- [point 2]

### Divergence
| Aspect | Codex | Gemini Pro | GLM-4.7 |
|--------|-------|------------|---------|
| [topic] | [view] | [view] | [view] |

### Synthesized Recommendation
[unified plan taking best from each]

### Risk Assessment
- [risks identified across models]
```

## Boundaries

**Will**: Send to multiple models in parallel, compare perspectives, synthesize recommendations
**Will Not**: Implement changes, make decisions without presenting alternatives
