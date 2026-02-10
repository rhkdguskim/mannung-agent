---
description: "Manage API keys, MCP servers, and routing configuration. Change ZHIPU_API_KEY, OPENAI_API_KEY, add/remove MCP servers, or update routing mode."
---

# /config — Configuration Management

Manage backend auth and routing settings.

## Usage
```
/config                   # Interactive configuration menu
/config api-keys          # Manage API keys
/config mcp               # Manage MCP servers
/config routing           # Change routing mode/overrides
```

## Behavior

1. Show current configuration status
2. Present interactive menu for what to change
3. Guide through the change step-by-step
4. Auto-run `/doctor` to verify after changes
