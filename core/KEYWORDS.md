# Keyword Detection Matrix

## Detection Algorithm

```
1. Normalize input (lowercase, strip punctuation)
2. Score each category by keyword match count
3. Apply priority weights:
   - Autopilot keywords: weight 4 (overrides all — chains skills)
   - Reasoning keywords: weight 3 (highest priority)
   - Security keywords: weight 3 (critical)
   - Deep keywords: weight 2.5
   - Exploration keywords: weight 2
   - Frontend keywords: weight 2
   - Code generation keywords: weight 1.5 (-> Sonnet)
   - Planning keywords: weight 1.5
   - Quick keywords: weight 1
4. Route to highest-scoring category
5. If tie or no matches -> Sonnet for code tasks, default model for others
```

## Category Keywords

### code-generation (-> Claude Sonnet)
```
implement, create, build, write code, generate, add feature,
develop, make function, make class, new endpoint, new component,
new module, new file, scaffold, boilerplate, starter, setup project
```

### exploration (-> Gemini Pro)
```
search, find, grep, glob, explore, codebase, file, directory,
where, locate, scan, structure, tree, navigate, browse, list,
walk, traverse, index, catalog, map, overview, survey
```

### frontend (-> Gemini Flash)
```
react, vue, angular, svelte, next, nuxt, css, scss, sass,
html, jsx, tsx, component, ui, ux, frontend, style, layout,
responsive, animation, tailwind, styled, theme, dark mode,
light mode, mobile, tablet, breakpoint, grid, flexbox, design,
button, form, input, modal, dropdown, navbar, sidebar, card
```

### reasoning (-> Codex)
```
algorithm, optimize, performance, debug, logic, math, complex,
reasoning, proof, analyze, architecture, design pattern,
data structure, concurrent, thread, async, deadlock, race,
memory leak, time complexity, space complexity, big-o,
dynamic programming, recursion, graph, tree algorithm,
sort, binary search, hash, cache, distributed
```

### planning (-> GLM-4.7)
```
plan, design, blueprint, strategy, roadmap, estimate, scope,
requirement, specification, proposal, approach, decision,
trade-off, milestone, phase, sprint, epic, story, task breakdown
```

### quick (-> Gemini Flash / GLM-4.5-Air)
```
fix, typo, rename, simple, small, quick, trivial, one-line,
minor, tweak, adjust, change name, update text, correct,
formatting, indent, whitespace, comment out, uncomment
```

### deep (-> Codex / GLM-4.7)
```
deep, thorough, comprehensive, research, investigate,
root cause, audit, security review, penetration, vulnerability,
profiling, benchmark, regression, forensic, trace, diagnose
```

### documentation (-> GLM-4.7)
```
document, readme, changelog, api doc, jsdoc, docstring,
comment, explain, tutorial, guide, wiki, specification,
write up, summarize, describe, annotate
```

### review (-> Codex + Gemini Pro)
```
review, code review, pull request, pr, diff, check quality,
smell, anti-pattern, best practice, convention, lint, static analysis
```

### refactoring (-> Codex)
```
refactor, restructure, extract, inline, move, rename class,
decompose, simplify, clean up, reduce duplication, DRY,
SOLID, single responsibility, modularize, decouple
```

### tdd (-> Codex)
```
test, tdd, unit test, integration test, e2e, spec, assert,
mock, stub, fixture, coverage, jest, pytest, vitest, playwright
```

### autopilot (-> Auto, chains all skills)
```
autopilot, finish it, do everything, end to end, build it,
complete this, full implementation, start to finish,
do it all, make it happen, ship it
```
