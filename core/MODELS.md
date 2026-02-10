# Model Profiles

## Gemini 3 Pro (via antigravity-gemini MCP)
- **Access**: antigravity-gemini MCP tool (claude mcp add antigravity-gemini)
- **Context**: 1M tokens (largest available)
- **Strengths**: Massive context window, file exploration, codebase-wide analysis
- **Weaknesses**: Slower than Flash, higher cost per token
- **Best For**: Large codebase search, multi-file analysis, architecture review
- **Cost Tier**: Medium

## Gemini 3 Flash (via antigravity-gemini MCP)
- **Access**: antigravity-gemini MCP tool (claude mcp add antigravity-gemini)
- **Context**: 1M tokens
- **Strengths**: Fast responses, good for iterative UI work
- **Weaknesses**: Less deep reasoning than Pro
- **Best For**: Frontend development, quick fixes, UI/UX iteration
- **Cost Tier**: Low

## OpenAI Codex (via codex-shell MCP)
- **Access**: codex-shell MCP tool (claude mcp add codex-shell)
- **Context**: 200K tokens
- **Strengths**: Superior reasoning, algorithm design, complex debugging
- **Weaknesses**: Slower, higher cost, MCP overhead
- **Best For**: Algorithm optimization, complex debugging, architectural decisions
- **Cost Tier**: High

## GLM-4.7 (via Z.AI API)
- **Access**: ANTHROPIC_BASE_URL=https://api.z.ai/api/anthropic, ANTHROPIC_AUTH_TOKEN=<z-ai-key>
- **Context**: 200K tokens, 128K max output
- **Strengths**: Cost-effective, large output window, good general coding
- **Weaknesses**: ~80% Claude quality, occasional inconsistency
- **Best For**: Documentation, planning, cost-sensitive general tasks
- **Cost Tier**: Very Low ($3-15/month plan)

## GLM-4.5-Air (via Z.AI API)
- **Access**: Same as GLM-4.7, model maps to haiku tier
- **Context**: 131K tokens
- **Strengths**: Cheapest option, fast
- **Weaknesses**: Lower quality, basic tasks only
- **Best For**: Trivial fixes, typos, simple renames
- **Cost Tier**: Minimal

## Claude Sonnet (Current Session)
- **Access**: Native (no configuration needed)
- **Context**: 200K tokens
- **Strengths**: Excellent code generation, strong reasoning, fast, cost-balanced
- **Weaknesses**: Less capable than Opus for architecture-level decisions
- **Best For**: General code generation, implementation, multi-file changes, iterative coding
- **Cost Tier**: Medium-High
- **Note**: Best balance of quality and speed for everyday code generation tasks

## Claude Opus (Current Session)
- **Access**: Native (no configuration needed)
- **Context**: 200K tokens
- **Strengths**: Best overall quality, deepest reasoning, best architectural decisions
- **Weaknesses**: Slowest, most expensive, rate limited
- **Best For**: Architecture design, complex multi-step tasks, critical decisions
- **Cost Tier**: Very High

## Claude Haiku (Current Session)
- **Access**: Native (no configuration needed)
- **Context**: 200K tokens
- **Strengths**: Fastest Claude model, cheapest Claude option
- **Weaknesses**: Lower quality than Sonnet/Opus
- **Best For**: Simple queries, quick lookups, trivial fixes
- **Cost Tier**: Low

## Model Selection Matrix

| Task Type | Priority 1 | Priority 2 | Priority 3 | Fallback |
|-----------|-----------|-----------|-----------|----------|
| Codebase exploration | Gemini Pro (MCP) | GLM-4.7 | Codex | Claude |
| Frontend/UI | Gemini Flash (MCP) | GLM-4.5-Air | Claude Haiku | Claude |
| Complex reasoning | Codex (MCP) | GLM-4.7 | Claude Opus | Claude |
| Planning/Design | GLM-4.7 | Gemini Pro (MCP) | Claude Opus | Claude |
| Quick fixes | Gemini Flash (MCP) | GLM-4.5-Air | Claude Haiku | Claude |
| Deep analysis | Codex (MCP) | GLM-4.7 | Gemini Pro | Claude |
| Documentation | GLM-4.7 | Gemini Flash (MCP) | Claude | Claude |
| Code review | Codex (MCP) | Gemini Pro (MCP) | Claude Opus | Claude |
| Refactoring | Codex (MCP) | GLM-4.7 | Claude Opus | Claude |
| TDD/Testing | Codex (MCP) | GLM-4.7 | Claude | Claude |
| Code generation | Sonnet (native) | Codex (MCP) | GLM-4.7 | Claude |
| Vibe coding | Auto-select per subtask | | | Claude |
