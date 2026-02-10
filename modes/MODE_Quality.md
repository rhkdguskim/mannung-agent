# Mode: Quality (Maximize Accuracy)

## Activation
- Flag: `--quality`
- Setting: `routing.mode: "quality"` in config

## Behavior Changes

When Quality mode is active:
- **Model Priority**: Always prefer highest-capability model
- **Routing Chain**: Codex → Claude Opus → Gemini Pro → GLM-4.7 → Gemini Flash
- **Verification**: Double-check important outputs
- **Review**: Mandatory review step after implementation

## Routing Override

| Task Type | Quality Mode Model | Normal Model |
|-----------|-------------------|--------------|
| Exploration | Gemini Pro | Gemini Pro |
| Frontend | Gemini Pro | Gemini Flash |
| Reasoning | Codex | Codex |
| Planning | Claude Opus | GLM-4.7 |
| Quick | Codex | Gemini Flash |
| Deep | Codex | Codex |
| Documentation | Claude Opus | GLM-4.7 |
| Review | Codex + Gemini Pro | Codex |
| Refactoring | Codex | Codex |
| TDD | Codex | Codex |
| Code Generation | Sonnet + Codex | Sonnet |

## Extra Steps
- After implementation: auto-trigger /review
- After tests: verify coverage meets threshold
- After docs: verify accuracy against code
