# Routing Rules

## Priority Levels

### RED CRITICAL (Never Compromise)

1. **Security-sensitive tasks MUST use high-capability models**
   - Trigger: security, vulnerability, authentication, authorization, injection, XSS, CSRF
   - Action: Route to Codex -> Claude Opus. NEVER use Flash/Air for security.

2. **Never execute destructive operations without confirmation**
   - Trigger: delete, drop, rm -rf, force push, reset --hard
   - Action: STOP and ask user. No model routes around this.

3. **Respect explicit model overrides**
   - Trigger: User specifies `route:codex`, `route:gemini-pro`, etc.
   - Action: Use specified model, skip auto-detection.

### YELLOW IMPORTANT (Strong Preference)

4. **Reasoning tasks should prefer Codex**
   - Trigger: algorithm, optimize, debug complex, proof, concurrent
   - Action: Codex first, then GLM-4.7, then Claude Opus

5. **Large codebase tasks should prefer Gemini Pro**
   - Trigger: explore entire, scan all files, project-wide, grep codebase
   - Action: Gemini Pro first (1M context), then GLM-4.7

6. **Frontend iteration should prefer fast models**
   - Trigger: UI tweaks, CSS changes, component styling
   - Action: Gemini Flash first, then GLM-4.5-Air

7. **Check model availability before routing**
   - Action: Health check target backend, auto-fallback if unavailable

### GREEN RECOMMENDED (Apply When Practical)

8. **Use cost-effective models for simple tasks**
   - Trigger: typo, rename, simple fix, formatting
   - Action: GLM-4.5-Air or Gemini Flash

9. **Documentation tasks prefer GLM-4.7**
   - Trigger: write docs, README, comments, API documentation
   - Action: GLM-4.7 (128K output window is ideal for docs)

10. **Multi-file changes should be planned first**
    - Trigger: Changes spanning 3+ files
    - Action: Route to planner agent first, then execute

## Mode-Specific Rule Overrides

### Cost Mode
- ALL tasks -> cheapest available model first
- Chain: GLM-4.5-Air -> Gemini Flash -> GLM-4.7 -> others

### Quality Mode
- ALL tasks -> highest capability model first
- Chain: Codex -> Claude Opus -> Gemini Pro -> GLM-4.7

### Speed Mode
- ALL tasks -> fastest response model first
- Chain: Gemini Flash -> GLM-4.5-Air -> Claude Haiku -> others

### Balanced Mode (Default)
- Use keyword detection matrix as-is
- No overrides applied

## Token Optimization Rules (Always Active)

### BLUE ENFORCED (Cost Efficiency)

11. **Use Glob/Grep before Read**
    - ALWAYS search first, read specific files second
    - Glob is free (no tokens). Grep is cheap. Read is expensive.
    - Pattern: `Glob -> Grep -> Read only matching files`

12. **Never load entire directories into context**
    - Load files incrementally, not all at once
    - For codebase exploration: structure scan first, then targeted reads

13. **Start with cheapest capable model, escalate only on failure**
    - Try Flash/Air first for simple tasks
    - Only escalate to Codex/Opus when lower-tier model fails
    - Pass only the failing part to the next model, not everything

14. **Batch related operations into single prompts**
    - Multiple small questions -> one combined prompt
    - Reduces per-request overhead and cache misses

15. **Request concise output for simple tasks**
    - Typo fix: no explanation needed, just the fix
    - Code gen: output only changed code, not surrounding context
    - Analysis: structured results, not narrative prose

## Progress Reporting Rules (Always Active)

### BLUE ENFORCED (User Communication)

16. **Report progress at every phase transition**
    - Format: `[mannung-agent] Phase N/M: <phase name>`
    - Include: current subtask, model being used, elapsed time
    - Show progress bar for multi-subtask phases

17. **For tasks taking >30 seconds, show status updates**
    - What is currently being done
    - How many subtasks remain
    - Which model is being used and why

18. **On completion, show summary**
    - Files changed/created
    - Models used and their cost tiers
    - Total elapsed time
