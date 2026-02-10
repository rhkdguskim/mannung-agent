---
name: doctor
description: "Diagnose and verify all model backend connections. Use when: checking if backends are actually working (not just configured), troubleshooting connectivity, verifying API keys, or after setup to confirm everything works."
---

# Doctor — Backend Connectivity Diagnostics

Run comprehensive health checks on all model backends.
Performs actual connection tests, not just configuration checks.

## What It Checks

### 1. antigravity-gemini MCP
- MCP server registered? (`claude mcp list`)
- Models available: gemini-3-pro-high, gemini-3-flash

### 2. codex-shell MCP
- MCP server registered?
- OPENAI_API_KEY set?
- Models available: codex

### 3. Z.AI (GLM)
- ZHIPU_API_KEY set?
- API connectivity test (HTTPS to api.z.ai)
- Auth validation (401 = bad key, 200 = OK)
- Models available: glm-4.7, glm-4.5-air

### 4. Claude (native)
- Always available
- Models: opus, sonnet, haiku

## Execution

```bash
node ./scripts/doctor.js
```

## Output

```
┌───────────────────────────────────────────────────────┐
│ mannung-agent doctor v2.0                             │
│ Diagnosing backend connectivity...                    │
├───────────────────────────────────────────────────────┤
│ ✔ antigravity-gemini                                  │
│   Status: CONFIGURED                                  │
│   Models: gemini-3-pro-high, gemini-3-flash           │
│                                                       │
│ ✔ codex-shell                                         │
│   Status: READY                                       │
│   Models: codex                                       │
│                                                       │
│ ✔ Z.AI (GLM)                                         │
│   Status: CONNECTED                                   │
│   Models: glm-4.7, glm-4.5-air                       │
│                                                       │
│ ✔ Claude (native)                                     │
│   Status: ALWAYS READY                                │
│   Models: opus, sonnet, haiku                         │
├───────────────────────────────────────────────────────┤
│ Backends: 4/4 ready                                   │
│ All backends connected!                               │
└───────────────────────────────────────────────────────┘
```

## If Issues Found

Doctor will show specific fix commands:
```
┌───────────────────────────────────────────────────────┐
│ Fixes needed:                                         │
├───────────────────────────────────────────────────────┤
│ Z.AI (GLM):                                          │
│   Check ZHIPU_API_KEY — may be expired or invalid     │
└───────────────────────────────────────────────────────┘
```

## Boundaries

**Will**: Test connectivity, validate auth, show available models, suggest fixes
**Will Not**: Automatically modify keys or configs (use /config for that)
