---
name: extracting-github-agents
description: Clones GitHub repositories, identifies agent architectures (system prompts, configs), and generates a technical summary of the agent. Use when the user shares a GitHub link to an agent project.
---
# Extracting GitHub Agents

## When to use this skill
- User provides a GitHub repository link for an agent.
- You need to analyze the internal structure, prompts, and tools of a remote agent.
- You want to add a new agent implementation to our library.

## Prerequisites
- `git` must be installed and in the PATH.
- `node` (Node.js) is required for running the extraction script.

## Workflow
1.  [ ] **Extract Info**: Provide the GitHub URL to the extraction script.
2.  [ ] **Analyze Files**: Review the generated technical summary.
3.  [ ] **Standardize**: Convert the findings into an Antigravity skill or agent component if requested.

## Instructions
1.  Run the extraction script:
    `node scripts/extract_repo.js <REPO_URL>`
2.  The script will:
    - Clone the repository into a temporary directory.
    - Search for keywords like `system_prompt`, `agent`, `chain`, `llm`, `config`, etc.
    - Generate a `technical_summary.md` detailing the agent's architecture, tools, and prompts.
3.  Review the output and summarize the findings for the user.
