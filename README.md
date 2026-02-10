# claude-model-router

**Intelligent multi-model routing plugin for Claude Code**

작업 유형에 따라 자동으로 최적의 AI 모델을 선택합니다.

## Features

| 작업 유형 | 모델 | 이유 |
|----------|------|------|
| **파일 탐색/검색** | Gemini Pro | 대용량 컨텍스트, 빠른 검색 |
| **Frontend 개발** | Gemini Flash | 빠른 응답, UI/UX 작업에 적합 |
| **논리적 추론** | Codex (GPT-5/o3) | 복잡한 알고리즘, 디버깅 |
| **일반 작업** | Gemini Flash | 비용 효율적 |

## Quick Start

### Step 1: Install Plugin

```bash
/plugin marketplace add https://github.com/rhkdguskim/claude-model-router
/plugin install claude-model-router
```

### Step 2: Setup

```bash
/claude-model-router:router-setup
```

### Step 3: Use

자동 라우팅:
```
route: React 컴포넌트 만들어줘
```

또는 직접 모델 지정:
```
route:gemini-pro 이 코드베이스 분석해줘
route:codex 이 알고리즘 최적화해줘
```

## Requirements

- [Claude Code](https://docs.anthropic.com/claude-code) CLI
- [Antigravity Proxy](https://github.com/badrisnarayanan/antigravity-claude-proxy) (Gemini 모델용)
- [Codex CLI](https://github.com/openai/codex) (논리적 추론용)

## Installation

### Prerequisites

```bash
# 1. Antigravity Proxy 설치 및 계정 추가
npm install -g antigravity-claude-proxy@latest
antigravity-claude-proxy accounts add

# 2. Codex CLI 설치
npm install -g @openai/codex

# 3. Codex MCP 서버 등록
claude mcp add codex-shell -- npx -y @openai/codex-shell-tool-mcp
```

### Plugin Installation

```bash
/plugin marketplace add https://github.com/rhkdguskim/claude-model-router
/plugin install claude-model-router
/claude-model-router:router-setup
```

## Commands

| Command | Description |
|---------|-------------|
| `/claude-model-router:router-setup` | 초기 설정 및 프록시 시작 |
| `/claude-model-router:route` | 작업 라우팅 (자동 모델 선택) |
| `/claude-model-router:router-status` | 현재 상태 및 모델 쿼터 확인 |

## Routing Rules

### 자동 감지 키워드

**Gemini Pro (파일 탐색)**
- `search`, `find`, `grep`, `glob`, `탐색`, `검색`, `찾아`, `파일`

**Gemini Flash (Frontend)**
- `react`, `vue`, `angular`, `css`, `html`, `component`, `ui`, `ux`, `frontend`, `프론트엔드`, `컴포넌트`, `스타일`

**Codex (논리적 추론)**
- `algorithm`, `optimize`, `debug`, `logic`, `math`, `알고리즘`, `최적화`, `디버깅`, `로직`, `수학`, `추론`

## Configuration

`~/.claude-model-router/config.json`:

```json
{
  "defaultModel": "gemini-flash",
  "antigravityPort": 8080,
  "routing": {
    "exploration": "gemini-3-pro-high",
    "frontend": "gemini-3-flash",
    "reasoning": "codex"
  }
}
```

## License

MIT
