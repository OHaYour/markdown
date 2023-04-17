import React from "react";
import marked from "marked";

function extractHeadings() {
    const headings = [];
    // 从markdown文档中提取标题和内容
    const markdownText = `# Title 1
            This is content of title 1.
            
            ## Title 1.1
            This is content of title 1.1.
            
            ## Title 1.2
            This is content of title 1.2.
            
            # Title 2
            This is content of title 2.`;
    const tokens = marked.lexer(markdownText);
    tokens.forEach(token => {
        if (token.type === "heading") {
            headings.push({
                text: token.text,
                depth: token.depth,
                children: []
            });
        }
    });

    let stack = [];
    headings.forEach((heading, index) => {
        while (stack.length && heading.depth <= stack[stack.length - 1].depth) {
            stack.pop();
        }
        if (stack.length) {
            stack[stack.length - 1].children.push(heading);
        } else {
            headings[index] = heading;
        }
        stack.push(heading);
    });

    return stack[0].children;
}

function renderHeadings(headings) {
    return (
        <ul>
        {headings.map((heading, index) => (
                <li key={index}>
            {heading.text}
    {heading.children.length ? renderHeadings(heading.children) : null}
</li>
))}
</ul>
);
}

function MarkdownHeadings({ markdownText }) {
    const headings = extractHeadings(markdownText);

    return (
        <div>
        <h1>Markdown Headings</h1>
    {renderHeadings(headings)}
</div>
);
}

export default MarkdownHeadings;
