import os
import sys
import argparse

def create_skill_structure(base_path, skill_name):
    # Normalize skill name (gerund form, lowercase, hyphenated)
    skill_name = skill_name.lower().replace(" ", "-")
    skill_dir = os.path.join(base_path, ".agent", "skills", skill_name)
    
    directories = [
        "scripts",
        "examples",
        "resources"
    ]
    
    print(f"Creating skill: {skill_name} at {skill_dir}")
    
    # Create main skill directory
    os.makedirs(skill_dir, exist_ok=True)
    
    # Create subdirectories
    for d in directories:
        os.makedirs(os.path.join(skill_dir, d), exist_ok=True)
        # Create a .gitkeep to ensure empty dirs are tracked if needed, 
        # or just leave them for the agent to populate
        with open(os.path.join(skill_dir, d, ".gitkeep"), "w") as f:
            f.write("")

    # Create empty SKILL.md with template
    skill_md_path = os.path.join(skill_dir, "SKILL.md")
    if not os.path.exists(skill_md_path):
        with open(skill_md_path, "w") as f:
            f.write(f"---\nname: {skill_name}\ndescription: [3rd-person description of what this skill does]\n---\n# {skill_name.replace('-', ' ').title()}\n\n## When to use this skill\n- [Trigger 1]\n\n## Prerequisites\n- [Pip packages or MCP Servers]\n\n## Workflow\n- [ ] Step 1\n\n## Instructions\n[Detailed instructions here]\n")

    print(f"Successfully scaffolded {skill_name}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Scaffold a new Antigravity skill.")
    parser.add_argument("name", help="Name of the skill (e.g., 'testing-code')")
    parser.add_argument("--path", default=".", help="Base path of the project")
    
    args = parser.parse_args()
    
    create_skill_structure(os.path.abspath(args.path), args.name)
