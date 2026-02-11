---
name: reflection
description: Perform self-correction and code review before finalizing output.
---

# Reflection Skill

This skill enables the agent to critically evaluate its own work for correctness, security, and best practices.

## When to use
- After generating complex code.
- When fixing bugs to ensure the fix doesn't introduce regressions.
- Before presenting a solution in a high-stakes environment (production code).

## Instructions
1.  **Analyze**: Review the generated code or solution.
2.  **Critique**: Identify potential issues:
    - Logic errors?
    - Security vulnerabilities?
    - Performance bottlenecks?
    - Style guide violations?
3.  **Refine**: If issues are found, re-write the code to address them.
4.  **Verify**: Creating a small test case or mental walkthrough to ensure correctness.
5.  **Report**: If significant issues, design questions, or future improvements are identified that cannot be resolved immediately:
    - Automatically create a GitHub issue to track them.
    - Command: `gh issue create --title "Reflection: [Topic]" --body "[Analysis & Questions]"`
    - This allows the team to provide feedback based on the issue.

## Usage
Simply invoke this thought process using the `sequential-thinking` tool before outputting the final response.
