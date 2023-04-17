const fs = require('fs');

function generateCustomUUID() {
    return Math.random().toString(36).substr(2, 8);
}

function headingOfMd(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const headingRegex = /^(#+)\s*(.+)$/gm;

    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2];
        const id = generateCustomUUID();

        const heading = {
            id,
            level,
            text,
            children: [],
        };

        if (level === 1) {
            headings.push(heading);
        } else {
            let parent = headings[headings.length - 1];

            while (parent.level !== level - 1) {
                parent = parent.children[parent.children.length - 1];
            }

            parent.children.push(heading);
        }
    }

    return headings;
}

function contentOfMd(filePath, headings) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const output = { content: {} };

    headings.forEach(heading => {
        extractContent(output.content, content, heading);
    });

    return output;
}

function extractContent(output, content, heading) {
    const regex = new RegExp(
        `(?<=^${'#'.repeat(heading.level)} ${heading.text}\\n)([\\s\\S]*?)(?=^${'#'.repeat(
            heading.level,
        )} |\\Z)`,
        'gm',
    );

    const match = regex.exec(content);
    if (match) {
        output[heading.id] = {
            title: heading.text,
            content: match[1].trim(),
        };
    }

    heading.children.forEach(child => {
        extractContent(output, content, child);
    });
}

// Generate an example markdown file
const exampleMd = `# Introduction

This is a simple example markdown file.

## Section 1

This is the first section.

### Subsection 1.1

This is the first subsection of the first section.

### Subsection 1.2

This is the second subsection of the first section.

## Section 2

This is the second section.

### Subsection 2.1

This is the first subsection of the second section.

### Subsection 2.2

This is the second subsection of the second section.
`;

fs.writeFileSync('./example.md', exampleMd);

// Parse the markdown file and write the output to a JSON file
const filePath = exampleMd;
const headings = headingOfMd(filePath);
const extractedContent = contentOfMd(filePath, headings);
fs.writeFileSync('./output.json', JSON.stringify(extractedContent, null, 2));

console.log('Done.');
