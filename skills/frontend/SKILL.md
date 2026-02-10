---
name: frontend
description: "Fast iterative frontend development with UI/UX focus. Use when: building React/Vue/Svelte components, styling with CSS/Tailwind, responsive layouts, animations, or any UI work. Keywords: react, vue, css, component, ui, ux, frontend, style, layout, 프론트엔드, 컴포넌트, 스타일"
---

# Frontend — UI/UX Development Specialist

Leverage Gemini Flash's speed for rapid frontend iteration.

## Target Model
Primary: **Gemini 3 Flash** (via antigravity-gemini MCP) — fast responses
Fallback: GLM-4.5-Air → Claude Haiku → Claude

## When to Activate

- Building or modifying UI components
- CSS/styling work (Tailwind, SCSS, styled-components)
- Responsive layout implementation
- Animation and transition work
- Accessibility improvements
- Frontend framework work (React, Vue, Svelte, Angular, Next.js)
- 프론트엔드 개발, 컴포넌트 작업, 스타일링

## Design Principles

1. **Mobile-First**: Start with smallest viewport, scale up
2. **Accessibility**: Semantic HTML, ARIA, keyboard navigation, color contrast
3. **Performance**: Lazy load, code split, optimize images, minimize reflows
4. **Consistency**: Follow existing design system / theme tokens
5. **Simplicity**: Prefer simple CSS over complex JS animations

## Execution Flow

### Phase 1: Understand Context
1. Read existing components, styles, and theme configuration
2. Identify design system tokens (colors, spacing, typography)
3. Check for existing UI patterns to stay consistent

### Phase 2: Implement
1. Build component structure (semantic HTML)
2. Add styling (following project's CSS approach)
3. Implement responsive behavior
4. Add interactions and animations
5. Ensure accessibility

### Phase 3: Verify
1. List what the UI should look like at each breakpoint
2. Check for accessibility compliance
3. Verify no layout shifts or performance issues

## Framework Patterns

### React
- Functional components with hooks
- Custom hooks for shared logic
- Memoization only when profiling shows need
- Error boundaries for resilience

### Vue
- Composition API with `<script setup>`
- Composables for shared logic
- Computed properties over watchers

### Tailwind CSS
- Utility-first, extract components for repeated patterns
- Use `@apply` sparingly (only in component classes)
- Dark mode via `dark:` variant

## Boundaries

**Will**: Build components, style UI, implement layouts, add animations, fix UI bugs
**Will Not**: Design database schemas, implement complex algorithms, handle backend logic
