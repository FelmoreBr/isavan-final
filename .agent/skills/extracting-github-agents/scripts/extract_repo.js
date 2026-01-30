const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARGS = process.argv.slice(2);
const REPO_URL = ARGS[0];

if (!REPO_URL) {
    console.error("Usage: node extract_repo.js <GITHUB_REPO_URL>");
    process.exit(1);
}

const TEMP_DIR = path.join(process.cwd(), '.temp_clone');

function cleanup() {
    if (fs.existsSync(TEMP_DIR)) {
        console.log("Cleaning up...");
        fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
}

try {
    cleanup();
    console.log(`Cloning repository: ${REPO_URL}...`);
    execSync(`git clone --depth 1 ${REPO_URL} ${TEMP_DIR}`, { stdio: 'inherit' });

    console.log("Analyzing files...");
    const FILES_OF_INTEREST = [
        'agent.py',
        'system_prompt.md',
        'prompts.json',
        'config.yaml',
        'main.py',
        'index.ts',
        'README.md'
    ];

    const KEYWORDS = [
        'system_prompt',
        'Anthropic',
        'OpenAI',
        'Claude',
        'agent',
        'tool',
        'function_calling',
        'chain',
        'memory'
    ];

    let summary = "# Technical Summary of Agent\n\n";
    summary += `**Source:** ${REPO_URL}\n\n`;

    const results = [];

    function walkthrough(dir) {
        const list = fs.readdirSync(dir);
        for (const file of list) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                if (file !== '.git') walkthrough(fullPath);
            } else {
                const ext = path.extname(file);
                if (['.py', '.js', '.ts', '.md', '.yaml', '.json'].includes(ext)) {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    let match = false;
                    for (const kw of KEYWORDS) {
                        if (content.includes(kw)) {
                            match = true;
                            break;
                        }
                    }
                    if (match || FILES_OF_INTEREST.includes(file)) {
                        results.push({
                            file: path.relative(TEMP_DIR, fullPath),
                            path: fullPath
                        });
                    }
                }
            }
        }
    }

    walkthrough(TEMP_DIR);

    summary += "## Relevant Files Identified\n";
    results.forEach(r => {
        summary += `- \`${r.file}\`\n`;
    });

    summary += "\n## Content Analysis\n";
    results.slice(0, 10).forEach(r => {
        const content = fs.readFileSync(r.path, 'utf8');
        summary += `### ${r.file}\n\`\`\`${path.extname(r.file).slice(1) || 'text'}\n${content.slice(0, 500)}...\n\`\`\`\n\n`;
    });

    fs.writeFileSync('technical_summary.md', summary);
    console.log("Extraction complete! See technical_summary.md");

} catch (error) {
    console.error("Error during extraction:", error.message);
} finally {
    cleanup();
}
