---
name: git-advanced
description: Advanced git operations like feature branching and conventional commits.
---

# Git Advanced Skill

This skill provides a structured way to handle git operations.

## Instructions
Use `run_command` to execute git operations.

### Workflow
1.  **Check Status**: `git status`
2.  **Create Branch**: `git checkout -b feature/name`
3.  **Commit**: Use Conventional Commits format (e.g., `feat: add login`).
    - `git add .`
    - `git commit -m "feat: description"`
4.  **Squash**: `git rebase -i HEAD~n` (interactive) or `git reset --soft HEAD~n` then commit.

## Safety
- Always check `git status` before committing.
- Avoid `git push --force` unless absolutely necessary and user approved.
