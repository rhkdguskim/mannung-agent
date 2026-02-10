# Routing Rules / 라우팅 규칙

## Priority Levels

### RED CRITICAL (Never Compromise / 절대 타협 불가)

1. **Security-sensitive tasks MUST use high-capability models**
   - Trigger: security, vulnerability, authentication, authorization, injection, XSS, CSRF
   - Action: Route to Codex → Claude Opus. NEVER use Flash/Air for security.
   - 보안 관련 작업은 반드시 고성능 모델 사용

2. **Never execute destructive operations without confirmation**
   - Trigger: delete, drop, rm -rf, force push, reset --hard
   - Action: STOP and ask user. No model routes around this.
   - 파괴적 작업은 반드시 사용자 확인 필요

3. **Respect explicit model overrides**
   - Trigger: User specifies `route:codex`, `route:gemini-pro`, etc.
   - Action: Use specified model, skip auto-detection.
   - 사용자가 명시적으로 모델을 지정하면 반드시 따를 것

### YELLOW IMPORTANT (Strong Preference / 강한 선호)

4. **Reasoning tasks should prefer Codex**
   - Trigger: algorithm, optimize, debug complex, proof, concurrent
   - Action: Codex first, then GLM-4.7, then Claude Opus
   - 추론 작업은 Codex 우선

5. **Large codebase tasks should prefer Gemini Pro**
   - Trigger: explore entire, scan all files, project-wide, grep codebase
   - Action: Gemini Pro first (1M context), then GLM-4.7
   - 대규모 코드베이스 작업은 Gemini Pro 우선

6. **Frontend iteration should prefer fast models**
   - Trigger: UI tweaks, CSS changes, component styling
   - Action: Gemini Flash first, then GLM-4.5-Air
   - 프론트엔드 반복 작업은 빠른 모델 우선

7. **Check model availability before routing**
   - Action: Health check target backend, auto-fallback if unavailable
   - 라우팅 전 모델 가용성 확인, 불가시 자동 폴백

### GREEN RECOMMENDED (Apply When Practical / 실용적일 때 적용)

8. **Use cost-effective models for simple tasks**
   - Trigger: typo, rename, simple fix, formatting
   - Action: GLM-4.5-Air or Gemini Flash
   - 단순 작업은 비용 효율적 모델 사용

9. **Documentation tasks prefer GLM-4.7**
   - Trigger: write docs, README, comments, API documentation
   - Action: GLM-4.7 (128K output window is ideal for docs)
   - 문서화 작업은 GLM-4.7 우선 (128K 출력 윈도우)

10. **Multi-file changes should be planned first**
    - Trigger: Changes spanning 3+ files
    - Action: Route to planner agent first, then execute
    - 3개 이상 파일 변경 시 계획 단계 먼저 실행

## Mode-Specific Rule Overrides

### Cost Mode
- ALL tasks → cheapest available model first
- Chain: GLM-4.5-Air → Gemini Flash → GLM-4.7 → others

### Quality Mode
- ALL tasks → highest capability model first
- Chain: Codex → Claude Opus → Gemini Pro → GLM-4.7

### Speed Mode
- ALL tasks → fastest response model first
- Chain: Gemini Flash → GLM-4.5-Air → Claude Haiku → others

### Balanced Mode (Default)
- Use keyword detection matrix as-is
- No overrides applied
