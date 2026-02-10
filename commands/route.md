---
description: "Auto-route a task to the optimal AI model. Detects task type from keywords and routes to Gemini Pro (exploration), Gemini Flash (frontend), Codex (reasoning), GLM-4.7 (planning), or Claude (fallback). Supports explicit model selection and routing modes."
---

# /route — Intelligent Task Router

Route any task to the best available model.

## Usage
```
/route <task description>
/route --cost <task>
/route --quality <task>
/route --speed <task>
/route:gemini-pro <task>
/route:codex <task>
/route:glm <task>
```

## Behavior

1. Parse input for explicit model tags or mode flags
2. If no explicit model: detect task type via keyword analysis
3. Check selected model availability via MCP
4. Execute with optimal model, or fallback if unavailable
5. Report which model was used and why
