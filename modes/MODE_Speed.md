# Mode: Speed (Minimize Latency)

## Activation
- Flag: `--speed`
- Setting: `routing.mode: "speed"` in config

## Behavior Changes

When Speed mode is active:
- **Model Priority**: Always prefer fastest responding model
- **Routing Chain**: Gemini Flash → GLM-4.5-Air → Claude Haiku → GLM-4.7 → others
- **Parallelization**: Maximize parallel execution
- **Communication**: Minimal — results only

## Routing Override

| Task Type | Speed Mode Model | Normal Model |
|-----------|-----------------|--------------|
| Exploration | Gemini Flash | Gemini Pro |
| Frontend | Gemini Flash | Gemini Flash |
| Reasoning | Gemini Flash | Codex |
| Planning | Gemini Flash | GLM-4.7 |
| Quick | Gemini Flash | Gemini Flash |
| Deep | Gemini Flash | Codex |
| Documentation | Gemini Flash | GLM-4.7 |
| Review | Gemini Flash | Codex |

## Trade-off
- Speed mode sacrifices accuracy for responsiveness
- Not recommended for security-critical or algorithm-heavy tasks
- Best for rapid prototyping, quick iterations, UI tweaks
