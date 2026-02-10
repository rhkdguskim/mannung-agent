---
description: "Documentation generation: README, API docs, code comments, changelogs, tutorials. Uses GLM-4.7's 128K output window for comprehensive docs."
---

# /doc — Documentation Generation

Create or update documentation.

## Usage
```
/doc generate README for this project
/doc write API documentation
/doc update changelog
/doc 이 모듈 설명 문서 작성
```

## Behavior

1. Read the code thoroughly
2. Identify audience
3. Structure content logically
4. Write clearly with working examples
5. Reference actual code paths

## Invokes
- Agent: uses GLM-4.7 (Z.AI) for long-form docs
- Fallback: Gemini Flash → Claude
