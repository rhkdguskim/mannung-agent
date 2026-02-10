# Mode: Balanced (Default)

## Activation
- Default mode — active when no other mode is specified
- Flag: `--balanced`
- Setting: `routing.mode: "balanced"` in config

## Behavior Changes

Balanced mode uses the standard keyword-based routing from CLAUDE.md:
- Each task type goes to its natural best model
- No overrides applied
- Standard fallback chains

## Routing (Default)

| Task Type | Model | Backend |
|-----------|-------|---------|
| Exploration | Gemini Pro | antigravity-gemini MCP |
| Frontend | Gemini Flash | antigravity-gemini MCP |
| Reasoning | Codex | codex-shell MCP |
| Planning | GLM-4.7 | Z.AI API |
| Quick | Gemini Flash | antigravity-gemini MCP |
| Deep | Codex | codex-shell MCP |
| Documentation | GLM-4.7 | Z.AI API |
| Review | Codex | codex-shell MCP |
| Refactoring | Codex | codex-shell MCP |
| TDD | Codex | codex-shell MCP |
| Default | Gemini Flash | antigravity-gemini MCP |

## Philosophy
- Right model for the right task
- Cost-effective without sacrificing quality where it matters
- Speed where it helps, accuracy where it counts
