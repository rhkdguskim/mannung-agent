---
name: web-research
description: "Search the web for up-to-date information, documentation, and solutions. Use when: finding latest docs, researching libraries, solving obscure errors, or gathering current information. Keywords: research, web search, google, internet, browse, online docs"
---

# Web Research — Internet-Powered Research

Search and read web content for up-to-date information.

## Target Model
Primary: **Gemini Pro** (via antigravity-gemini MCP) — large context for synthesizing multiple sources
Fallback: Claude (native)

## When to Activate

- Finding documentation for new libraries or frameworks
- Researching API references and usage patterns
- Solving obscure error messages
- Checking latest versions or changelog info
- Comparing tools, libraries, or approaches

## Execution Protocol

### Phase 1: Search
Use the `WebSearch` tool to find relevant pages:
```
WebSearch: "React 19 useTransition hook example"
```

Tips for effective searches:
- Include the current year (2026) for latest info
- Use specific terms, not vague queries
- Include framework/library name + version if known

### Phase 2: Read
Use the `WebFetch` tool to extract details from promising URLs:
```
WebFetch:
  url: "https://react.dev/reference/react/useTransition"
  prompt: "Extract the API signature and usage examples for useTransition"
```

### Phase 3: Synthesize
- Combine information from multiple sources
- Cross-reference to verify accuracy
- Prefer official documentation over blog posts

### Phase 4: Cite
- **Always** provide source URLs for information found
- Format as a Sources section at the end:
```
Sources:
- [React useTransition](https://react.dev/reference/react/useTransition)
- [Migration Guide](https://react.dev/blog/2024/react-19)
```

## Boundaries

**Will**: Search web, read pages, synthesize findings, cite sources
**Will Not**: Access authenticated pages (Google Docs, Jira, private repos), fabricate sources
