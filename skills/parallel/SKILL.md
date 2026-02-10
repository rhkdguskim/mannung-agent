---
name: parallel
description: "Run multiple agents in parallel for faster results. Use when: multiple independent subtasks can run simultaneously, multi-model analysis needed, or user wants maximum speed. Keywords: parallel, concurrent, simultaneously, 병렬, 동시에, 한꺼번에"
---

# Parallel — Multi-Agent Parallel Execution

Run multiple agents simultaneously on independent subtasks.

## When to Activate

- Complex task with independent subtasks
- Multi-model analysis (get perspectives from different models)
- User explicitly requests parallel execution
- /multi-plan or /multi-execute commands
- 병렬 실행, 동시 처리가 필요한 경우

## Parallel Execution Patterns

### Pattern 1: Fan-Out Analysis
Multiple models analyze the same codebase from different angles simultaneously.

```
         ┌→ Explorer (Gemini Pro)  — structure analysis
task ────┼→ Reasoner (Codex)       — logic analysis
         └→ Reviewer (Codex)       — quality analysis
              ↓
         Orchestrator:  synthesize all results
```

**When**: Comprehensive code review, architecture assessment, pre-refactoring analysis

### Pattern 2: Parallel Implementation
Different parts of a feature built simultaneously by different models.

```
         ┌→ Frontend Dev (Gemini Flash) — UI components
task ────┤
         └→ Reasoner (Codex)            — business logic
              ↓
         Integration:  connect frontend + backend
```

**When**: Full-stack feature with independent frontend/backend work

### Pattern 3: Multi-Model Consensus
Same question sent to multiple models, results compared.

```
         ┌→ Codex      — approach A
task ────┼→ Gemini Pro  — approach B
         └→ GLM-4.7    — approach C
              ↓
         Compare:  best elements from each
```

**When**: Architecture decisions, algorithm design, critical code changes

### Pattern 4: Pipeline with Parallel Stages
Sequential stages where each stage has parallel subtasks.

```
Stage 1: [Explore codebase] (single)
              ↓
Stage 2: [Frontend] + [Backend] + [Tests] (parallel)
              ↓
Stage 3: [Integration test] (single)
              ↓
Stage 4: [Review] + [Security audit] (parallel)
```

**When**: End-to-end feature implementation

## Execution Protocol

1. **Decompose**: Break task into independent subtasks
2. **Classify**: Determine which subtasks are independent (can run in parallel)
3. **Route**: Assign each subtask to optimal model
4. **Launch**: Use `Task` tool with `run_in_background: true` for parallel tasks
5. **Monitor**: Track progress of all running tasks
6. **Collect**: Gather results as tasks complete
7. **Synthesize**: Merge results into coherent output
8. **Report**: Show what each model contributed

## UX: Progress Display

When parallel agents are running, display:
```
┌─────────────────────────────────────────┐
│ mannung-agent parallel execution        │
├─────────────────────────────────────────┤
│ [1/3] Explorer (Gemini Pro)   Running   │
│ [2/3] Reasoner (Codex)        Running   │
│ [3/3] Reviewer (Codex)        Running   │
├─────────────────────────────────────────┤
│ Status: 0/3 completed                   │
└─────────────────────────────────────────┘
```

## When NOT to Use Parallel

- Subtasks depend on each other's output
- Single focused task (no benefit from splitting)
- User explicitly wants step-by-step execution
- Debug/investigation (need sequential reasoning)

## Boundaries

**Will**: Decompose tasks, launch parallel agents, track progress, merge results
**Will Not**: Run dependent tasks in parallel, lose context between stages
