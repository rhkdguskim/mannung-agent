---
description: "Run diagnostic checks on all model backends. Verifies actual connectivity (not just config), validates API keys, and shows available models with fix suggestions."
---

# /doctor — Backend Diagnostics

Verify all backends are actually working.

## Usage
```
/doctor
```

## Behavior

1. Run `node ./scripts/doctor.js`
2. Tests each backend:
   - antigravity-gemini MCP: registration check
   - codex-shell MCP: registration + API key check
   - Z.AI: API key + HTTPS connectivity + auth validation
   - Claude: always ready
3. Shows available models for code generation
4. Lists specific fix commands for any issues found
