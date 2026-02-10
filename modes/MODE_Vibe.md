# Mode: Vibe (Fully Autonomous)

## Activation
- User says "vibe", "auto", "just do it", or uses /vibe command
- Flag: `--vibe`

## Behavior Changes

When Vibe mode is active:
- **Decision Making**: Autonomous — don't ask, just do
- **Model Selection**: Auto-pick per subtask
- **Planning**: Mental model only, no formal docs
- **Implementation**: Build complete features end-to-end
- **Review**: Self-review before presenting
- **Communication**: Concise — show results, not process

## Model Routing Override
- No routing override — auto-select based on each subtask type
- Prefer speed over perfection
- Skip confirmation steps (except for destructive operations)

## Quality Guardrails (Still Apply)
- Input validation on user-facing endpoints
- Error handling (no silent failures)
- Match existing code style
- Security basics (no hardcoded secrets)

## Exit Condition
- Vibe mode ends when the task is complete
- User can interrupt with specific instructions at any time
