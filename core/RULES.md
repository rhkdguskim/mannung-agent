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
