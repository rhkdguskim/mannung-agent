# claude-model-router

Multi-model routing plugin for Claude Code.

## Plugin Overview

This plugin provides intelligent model routing based on task type:
- **File exploration** → Gemini Pro (large context window)
- **Frontend development** → Gemini Flash (fast responses)
- **Logical reasoning** → Codex/GPT-5 (complex algorithms)
- **Default** → Gemini Flash (cost-effective)

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Claude Code                             │
├─────────────────────────────────────────────────────────────┤
│                   claude-model-router                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Exploration │  │  Frontend   │  │  Reasoning  │         │
│  │   Tasks     │  │   Tasks     │  │   Tasks     │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         ▼                ▼                ▼                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Gemini Pro  │  │Gemini Flash │  │   Codex     │         │
│  │(Antigravity)│  │(Antigravity)│  │  (MCP)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## Skills

- `router-setup`: Initialize and configure the router
- `route`: Route a task to the appropriate model
- `router-status`: Check proxy status and model quotas

## Routing Keywords

### Exploration (Gemini Pro)
- English: search, find, grep, glob, explore, codebase, file, directory
- Korean: 탐색, 검색, 찾아, 파일, 디렉토리, 코드베이스

### Frontend (Gemini Flash)
- English: react, vue, angular, svelte, css, html, component, ui, ux, frontend, style, layout
- Korean: 프론트엔드, 컴포넌트, 스타일, 레이아웃

### Reasoning (Codex)
- English: algorithm, optimize, debug, logic, math, complex, reasoning, proof
- Korean: 알고리즘, 최적화, 디버깅, 로직, 수학, 복잡한, 추론, 증명
