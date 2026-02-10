# Keyword Detection Matrix / 키워드 감지 매트릭스

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
   - Code generation keywords: weight 1.5 (→ Sonnet)
   - Planning keywords: weight 1.5
   - Quick keywords: weight 1
4. Route to highest-scoring category
5. If tie or no matches → Sonnet for code tasks, default model for others
```

## Category Keywords

### code-generation (→ Claude Sonnet)
```
EN: implement, create, build, write code, generate, add feature,
    develop, make function, make class, new endpoint, new component,
    new module, new file, scaffold, boilerplate, starter, setup project
KR: 구현, 생성, 빌드, 작성, 코드, 만들어, 기능추가, 개발,
    새로운, 함수, 클래스, 엔드포인트, 모듈, 파일
```

### exploration (→ Gemini Pro)
```
EN: search, find, grep, glob, explore, codebase, file, directory,
    where, locate, scan, structure, tree, navigate, browse, list,
    walk, traverse, index, catalog, map, overview, survey
KR: 탐색, 검색, 찾아, 파일, 디렉토리, 코드베이스, 어디, 위치,
    구조, 훑어, 살펴, 목록, 전체, 조사
```

### frontend (→ Gemini Flash)
```
EN: react, vue, angular, svelte, next, nuxt, css, scss, sass,
    html, jsx, tsx, component, ui, ux, frontend, style, layout,
    responsive, animation, tailwind, styled, theme, dark mode,
    light mode, mobile, tablet, breakpoint, grid, flexbox, design,
    button, form, input, modal, dropdown, navbar, sidebar, card
KR: 프론트엔드, 컴포넌트, 스타일, 레이아웃, 반응형, 애니메이션,
    디자인, 테마, 다크모드, 모바일, 버튼, 폼, 입력, 모달
```

### reasoning (→ Codex)
```
EN: algorithm, optimize, performance, debug, logic, math, complex,
    reasoning, proof, analyze, architecture, design pattern,
    data structure, concurrent, thread, async, deadlock, race,
    memory leak, time complexity, space complexity, big-o,
    dynamic programming, recursion, graph, tree algorithm,
    sort, binary search, hash, cache, distributed
KR: 알고리즘, 최적화, 성능, 디버깅, 로직, 수학, 복잡한, 추론,
    증명, 분석, 아키텍처, 디자인패턴, 자료구조, 동시성, 스레드,
    비동기, 데드락, 메모리누수, 시간복잡도, 공간복잡도
```

### planning (→ GLM-4.7)
```
EN: plan, design, blueprint, strategy, roadmap, estimate, scope,
    requirement, specification, proposal, approach, decision,
    trade-off, milestone, phase, sprint, epic, story, task breakdown
KR: 계획, 설계, 전략, 로드맵, 견적, 범위, 요구사항, 명세,
    제안, 접근법, 결정, 트레이드오프, 마일스톤, 단계
```

### quick (→ Gemini Flash / GLM-4.5-Air)
```
EN: fix, typo, rename, simple, small, quick, trivial, one-line,
    minor, tweak, adjust, change name, update text, correct,
    formatting, indent, whitespace, comment out, uncomment
KR: 수정, 오타, 이름변경, 간단한, 작은, 빠른, 사소한, 한줄,
    조정, 텍스트변경, 포맷팅, 들여쓰기, 주석
```

### deep (→ Codex / GLM-4.7)
```
EN: deep, thorough, comprehensive, research, investigate,
    root cause, audit, security review, penetration, vulnerability,
    profiling, benchmark, regression, forensic, trace, diagnose
KR: 심층, 철저한, 포괄적, 연구, 조사, 근본원인, 감사,
    보안검토, 취약점, 프로파일링, 벤치마크, 추적, 진단
```

### documentation (→ GLM-4.7)
```
EN: document, readme, changelog, api doc, jsdoc, docstring,
    comment, explain, tutorial, guide, wiki, specification,
    write up, summarize, describe, annotate
KR: 문서, 리드미, 변경로그, API문서, 주석, 설명, 튜토리얼,
    가이드, 위키, 명세, 작성, 요약, 설명, 주석달기
```

### review (→ Codex + Gemini Pro)
```
EN: review, code review, pull request, pr, diff, check quality,
    smell, anti-pattern, best practice, convention, lint, static analysis
KR: 리뷰, 코드리뷰, 풀리퀘스트, 차이, 품질검사, 코드스멜,
    안티패턴, 모범사례, 컨벤션, 정적분석
```

### refactoring (→ Codex)
```
EN: refactor, restructure, extract, inline, move, rename class,
    decompose, simplify, clean up, reduce duplication, DRY,
    SOLID, single responsibility, modularize, decouple
KR: 리팩토링, 재구조화, 추출, 인라인, 이동, 분해,
    단순화, 정리, 중복제거, 모듈화, 디커플링
```

### tdd (→ Codex)
```
EN: test, tdd, unit test, integration test, e2e, spec, assert,
    mock, stub, fixture, coverage, jest, pytest, vitest, playwright
KR: 테스트, 단위테스트, 통합테스트, 스펙, 어설트, 목,
    픽스처, 커버리지
```

### autopilot (→ Auto, chains all skills)
```
EN: autopilot, finish it, do everything, end to end, build it,
    complete this, full implementation, start to finish,
    do it all, make it happen, ship it
KR: 자동, 오토, 끝까지, 완성해, 전부 해줘, 알아서 다 해줘,
    처음부터 끝까지, 전체 구현, 다 만들어줘
```
