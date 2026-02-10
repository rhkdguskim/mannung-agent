# Token Usage Optimization Strategy

## Principles

1. **Right-size the model**: Use the smallest capable model for each subtask
2. **Minimize context**: Only include relevant files, not entire codebase
3. **Cache-friendly prompts**: Structure prompts for maximum cache hit rate
4. **Early termination**: Stop as soon as the task is complete

## Model Cost Tiers

| Model | Input Cost | Output Cost | Strategy |
|-------|-----------|-------------|----------|
| GLM-4.5-Air | Minimal | Minimal | Use for trivial tasks |
| Gemini Flash | Low | Low | Use for quick iterations |
| GLM-4.7 | Low | Low | Use for docs (large output) |
| Gemini Pro | Medium | Medium | Use when large context needed |
| Claude Sonnet | Medium-High | Medium-High | Default for code generation |
| Codex | High | High | Reserve for complex reasoning |
| Claude Opus | Very High | Very High | Reserve for critical decisions |

## Optimization Rules

### 1. Context Window Management
- Read only the files relevant to the current subtask
- Use Grep with targeted patterns instead of reading entire files
- For large codebases, explore structure first (Glob), then read specific files
- Avoid loading entire directories — load incrementally

### 2. Prompt Efficiency
- Use concise, structured prompts
- Include code references by file path + line number, not full content
- For follow-up tasks on the same files, reference previous context
- Batch related questions into a single prompt

### 3. Model Escalation Pattern
```
Start with cheapest model that MIGHT work
    │
    ├── Task succeeded? → Done (lowest cost)
    │
    └── Task failed or quality insufficient?
        → Escalate to next model in chain
        → Only pass the SPECIFIC failing part
```

### 4. Output Token Optimization
- Request concise responses (no verbose explanations for simple tasks)
- For code generation: output only the changed code, not surrounding context
- For analysis: output structured results, not narrative prose
- Set appropriate output length expectations per task type

### 5. Parallel vs Sequential Cost Trade-off
- **Parallel**: Higher total cost, lower latency
  - Use for independent subtasks where speed matters
  - Each parallel agent pays full context cost
- **Sequential**: Lower total cost, higher latency
  - Use when subtasks build on each other
  - Later tasks benefit from accumulated context

### 6. Caching Strategy
- Structure prompts with static system instructions first
- Keep changing parts at the end of prompts
- Use consistent formatting to maximize cache hits
- Avoid unnecessary prompt variations

## Task-Specific Optimization

### Exploration Tasks
- Start with Glob (free) -> Grep (cheap) -> Read specific files
- Use Gemini Pro only when many files need simultaneous analysis
- For simple "where is X?" queries, Grep alone may suffice

### Code Generation Tasks
- Use Sonnet for implementation (best cost/quality balance)
- Provide only the interface/types needed, not full codebase
- For iterative changes, reference previous output

### Review Tasks
- Send only the diff, not the full files
- Use Codex for security-critical reviews only
- Gemini Pro for large-scope reviews (cost: large context)

### Documentation Tasks
- GLM-4.7 is cheapest for long-form output (128K max)
- Provide code excerpts, not full files
- Generate section by section for very long docs

## Progress Reporting

For long-running tasks, report progress to keep the user informed:
```
[mannung-agent] Phase 2/5: Planning
[mannung-agent] Subtask: 3/7 complete
[mannung-agent] Model: Sonnet (native)
[mannung-agent] Est. tokens used: ~12K input, ~3K output
```

## Cost Monitoring

Track approximate token usage per session:
- Input tokens: file reads + prompt text + context
- Output tokens: generated code + explanations
- Model multiplier: apply cost tier to raw token count
- Report at session end or on request via /status
