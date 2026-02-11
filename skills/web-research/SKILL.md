---
name: web-research
description: Browse the web to find latest information.
---

# Web Research Skill

This skill enables the agent to gather information from the internet using `search_web` and `read_url_content`.

## Instructions
1.  **Search**: Use `search_web` to find relevant pages.
2.  **Read**: Use `read_url_content` to extract details from promising URLs.
3.  **Synthesize**: Combine information from multiple sources.
4.  **Cite**: Always provide URLs for the information found.

## Use Cases
- Finding documentation for new libraries.
- API references.
- Solving obscure error messages.

## Example
1. `search_web("React 19 useTransition hook example")`
2. `read_url_content("https://react.dev/reference/react/useTransition")`
3. Explain the usage based on the content.
