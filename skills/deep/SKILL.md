---
name: deep
description: "Deep analysis and thorough investigation. Use when: investigating root causes, security auditing, comprehensive code analysis, performance profiling, or research. Keywords: deep, thorough, investigate, root cause, audit, security, research, 심층, 철저, 조사, 근본원인, 감사"
---

# Deep — Thorough Investigation & Analysis

Leverage Codex + GLM-4.7 for comprehensive deep analysis.

## Target Model
Primary: **Codex** (via MCP) for reasoning-intensive analysis
Secondary: **GLM-4.7** (via Z.AI) for broad context analysis
Fallback: Gemini Pro → Claude Opus → Claude

## When to Activate

- Root cause analysis of complex bugs
- Security audit or vulnerability assessment
- Performance bottleneck investigation
- Comprehensive code quality assessment
- Technical research and feasibility studies
- 근본원인 분석, 보안 감사, 성능 조사

## Investigation Protocol

### For Root Cause Analysis
```
1. SYMPTOM: What exactly is happening?
2. REPRODUCE: Minimal reproduction steps
3. TIMELINE: When did it start? What changed?
4. ISOLATE: Narrow down to specific module/function
5. HYPOTHESIZE: Form 2-3 testable hypotheses
6. TEST: Verify each hypothesis systematically
7. ROOT CAUSE: Identify the actual cause
8. FIX: Design fix addressing root cause (not symptoms)
9. PREVENT: How to prevent recurrence
```

### For Security Audit
```
1. SCOPE: Define what to audit
2. THREAT MODEL: What are the assets and threat vectors?
3. STATIC ANALYSIS: Review code for OWASP Top 10
4. DATA FLOW: Trace user input through the system
5. AUTH/AUTHZ: Verify access control at every layer
6. DEPENDENCIES: Check for known vulnerabilities
7. REPORT: Prioritized findings with fix recommendations
```

### For Performance Investigation
```
1. BASELINE: Current metrics (latency, throughput, resource usage)
2. PROFILE: Identify actual bottlenecks with data
3. ANALYZE: Why is this slow? (I/O, CPU, memory, network)
4. HYPOTHESIZE: What change would improve this?
5. ESTIMATE: Expected improvement percentage
6. RECOMMEND: Prioritized optimization plan
```

## Boundaries

**Will**: Investigate deeply, analyze thoroughly, form hypotheses, provide detailed findings
**Will Not**: Make hasty fixes, skip steps, assume without evidence
