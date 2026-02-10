# Mode: Cost (Minimize Spending)

## Activation
- Flag: `--cost`
- Setting: `routing.mode: "cost"` in config

## Behavior Changes

When Cost mode is active:
- **Model Priority**: Always prefer cheapest available model
- **Routing Chain**: GLM-4.5-Air → Gemini Flash → GLM-4.7 → Gemini Pro → Codex → Claude
- **Task Batching**: Combine related small tasks to reduce API calls
- **Context Management**: Be conservative with context window usage

## Routing Override

| Task Type | Cost Mode Model | Normal Model |
|-----------|----------------|--------------|
| Exploration | GLM-4.7 | Gemini Pro |
| Frontend | Gemini Flash | Gemini Flash |
| Reasoning | GLM-4.7 | Codex |
| Planning | GLM-4.7 | GLM-4.7 |
| Quick | GLM-4.5-Air | Gemini Flash |
| Deep | GLM-4.7 | Codex |
| Documentation | GLM-4.7 | GLM-4.7 |
| Review | GLM-4.7 | Codex |
| Refactoring | GLM-4.7 | Codex |
| TDD | GLM-4.7 | Codex |
| Code Generation | GLM-4.7 | Sonnet |

## Exception
- Security-critical tasks STILL use Codex (never downgrade security)
