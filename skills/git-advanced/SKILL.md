---
name: git-advanced
description: "Advanced git operations: feature branching, conventional commits, squash, rebase, release workflow. Use when: managing branches, creating commits, preparing releases, or handling complex git operations. Keywords: git, commit, branch, merge, rebase, squash, release, pull request, pr"
---

# Git Advanced — Smart Git Workflow

Structured git operations with safety checks and conventional commits.

## Target Model
Primary: **Claude** (native) — understands git context deeply
Fallback: Any available model

## When to Activate

- Creating feature branches or managing branch strategy
- Committing with conventional commit format
- Squashing commits before merge
- Preparing pull requests
- Release tagging and versioning
- Resolving merge conflicts

## Execution Protocol

### Phase 1: Status Check
1. Use `Bash` to run `git status` — always verify current state first
2. Check current branch with `git branch --show-current`
3. Verify no uncommitted changes that could be lost

### Phase 2: Branch Operations
```
Feature:  git checkout -b feature/<name>
Bugfix:   git checkout -b fix/<name>
Release:  git checkout -b release/v<version>
```

### Phase 3: Conventional Commits
Format: `<type>(<scope>): <description>`

| Type | When |
|------|------|
| feat | New feature |
| fix | Bug fix |
| refactor | Code restructure (no behavior change) |
| docs | Documentation only |
| test | Adding/updating tests |
| chore | Build, CI, tooling changes |
| perf | Performance improvement |

### Phase 4: Squash & Cleanup
- Use `git reset --soft HEAD~N` then recommit (safer than interactive rebase)
- Verify with `git log --oneline` before and after

### Phase 5: Pull Request
- Use `gh pr create` with clear title and description
- Include summary of changes and test plan

## Safety Rules

- **ALWAYS** check `git status` before any destructive operation
- **NEVER** `git push --force` without explicit user approval
- **NEVER** use `--no-verify` unless user explicitly requests it
- **NEVER** amend published commits without confirmation
- Prefer creating new commits over amending
- Stage specific files, not `git add -A`

## Boundaries

**Will**: Create branches, commit, squash, prepare PRs, tag releases, resolve simple conflicts
**Will Not**: Force push without approval, skip hooks, delete remote branches without confirmation
