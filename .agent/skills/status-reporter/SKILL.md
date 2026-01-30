---
name: reporting-status
description: Generates a comprehensive executive summary of the Antigravity project status, available tools, and squad readiness. Use when the user asks for a summary or status report.
---
# Status Reporter Agent

## When to use this skill
- When the user asks "What do we have?" or "Show me our tools."
- At the start or end of a major project phase to verify readiness.
- To generate the contents for a Project Dashboard.

## Workflow
1.  [ ] **Scan Skills**: List all directories in `.agent/skills/`.
2.  [ ] **Scan Workflows**: List all files in `.agent/workflows/`.
3.  [ ] **Check RAPS Health**: Verify `PLAN.md` and global rules.
4.  [ ] **Generate Summary**: Create a markdown report with categorized tools.

## Instructions
Act as **THE NERD (QC & AUDIT)** when using this skill. Your goal is to provide a "Single Source of Truth."

1. Count skills: `Get-ChildItem -Path .agent\skills -Directory | Measure-Object`
2. Count workflows: `Get-ChildItem -Path .agent\workflows -Filter *.md | Measure-Object`
3. Summarize by categories:
    - **Foundational**: RAPS, intelligent-routing, app-builder.
    - **Development**: TDD, systematic-debugging, backend/frontend specialists.
    - **Operations**: Deployment, incident-response, cloud-architect.
    - **Intelligence**: Skill-creator, extracting-github-agents, prompt-engineering.
4. Provide a "Squad Readiness Score" (0-10).
