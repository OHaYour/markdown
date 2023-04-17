const fs = require('fs');
const readline = require('readline');
const MarkdownIt = require('markdown-it');


function extractContent() {
    const md = new MarkdownIt();
    const headings = {};

    md.use((md) => {
        md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const level = token.tag.slice(1); // get heading level from tag name
            const uuid = generateCustomUUID(); // generate unique ID for heading

            headings[uuid] = { title: '', content: '' };
            headings[uuid].title = token.children.reduce((acc, cur) => acc + cur.content, ''); // get text content of heading

            while (tokens[idx + 1].tag.slice(1) > level) {
                // get text content of all subheadings
                idx++;
                const subHeading = tokens[idx];
                headings[uuid].content += md.renderer.render(subHeading);
            }

            return `<${token.tag} id="${uuid}">`;
        };

        md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
            return `</${tokens[idx].tag}>`;
        };
    });

    const output = { content: headings };
    return output;
}



//生成一个8字符字符串形式的唯一标识符(UUID)，用于标识Markdown文件中的每个标题。
function generateCustomUUID() {
    return Math.random().toString(36).substr(2, 8);
}

//读取由filePath指定的Markdown文件的内容，提取文件中的所有标题(以一个或多个#字符开头的行)，并根据它们的级别将它们组织成层次结构。
//该函数返回一个标题对象数组，其中每个对象都有id、level、text和children属性。
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

//这个函数读取filePath指定的Markdown文件的内容，并使用headingOfMd()生成的标题数组提取每个标题之间的内容。
// 该函数返回一个对象，该对象将每个标题的id映射到包含标题(标题的文本)和内容(标题和下一个标题之间的文本)的对象。
function contentOfMd(filePath, headings) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const output = { content: {} };

    headings.forEach(heading => {
        extractContent(output.content, content, heading);
        // parseMarkdown(content, heading);
    });

    return output;
}


//这是由contentOfMd()使用的辅助函数。给定一个输出对象、Markdown文件的内容和一个标题对象，
// 该函数提取给定标题和下一个标题之间的内容，并将其添加到标题id下的输出对象中。
// function extractContent(output, content, heading) {
//     const regex = new RegExp(
//         `(?<=^${'#'.repeat(heading.level)} ${heading.text}\\n)([\\s\\S]*?)(?=^${'#'.repeat(
//             heading.level,
//         )} |\\Z)`,
//         'gm',
//     );
//
//     const match = regex.exec(content);
//     if (match) {
//         output[heading.id] = {
//             title: heading.text,
//             content: match[1].trim(),
//         };
//     }
//
//     heading.children.forEach(child => {
//         extractContent(output, content, child);
//     });
// }

function parseMarkdown(markdown) {
    const lines = markdown.split('\n');
    const result = { content: {} };
    let currentHeading = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if line is a heading
        const match = line.match(/^#+\s(.*)/);
        if (match) {
            const headingText = match[1];
            const level = line.match(/^#+/)[0].length;

            // Create new heading object in result
            const uuid = generateCustomUUID();
            result.content[uuid] = { title: headingText, content: '' };
            currentHeading = { uuid, level };
        } else if (currentHeading) {
            // Add content to current heading
            result.content[currentHeading.uuid].content += line + '\n';
        }
    }

    return result;
}


//它将headingOfMd()和contenttofmd()的功能联系在一起。它返回一个包含标题数组和内容对象的对象。
function extractOutput(filePath) {
    const headings = headingOfMd(filePath);
    const extractedContent = contentOfMd(filePath, headings);

    const output = {
        headings,
        content: extractedContent.content,
    };

    return output;
}



//这个函数接受由contentOfMd()返回的提取的内容对象，以及一些可选的字体大小、容器宽度和标题字体大小参数，
//并根据其长度和标题的顺序计算每个内容块的大小和位置。该函数返回与React-Grid-Layout库兼容的块对象数组。
function content2block(extractedContent, fontSize = 14, containerWidth = 100, titleFontSize = 14) {
    //这里有一个名为“content2block”的函数，它接受提取的内容，并根据标题顺序、内容行数和每个标题的内容长度计算块大小和位置。
    // 块对象格式与React-Grid-Layout库兼容。注意，这个函数假设容器的字体大小和宽度是固定的:
    //加上了对标题大小的考虑
    const blocks = [];
    let currentY = 0;

    for (const uuid in extractedContent.content) {
        const content = extractedContent.content[uuid];
        const lines = content.content.split('\n');
        const lineCount = lines.length;

        let maxLineLength = 0;
        lines.forEach((line) => {
            if (line.length > maxLineLength) {
                maxLineLength = line.length;
            }
        });

        const blockWidth = containerWidth;
        const blockHeight = lineCount * fontSize + titleFontSize; // Updated to include space for heading title

        const block = {
            id: uuid,
            size: {
                x: 0,
                y: currentY,
                w: blockWidth,
                h: blockHeight,
            },
        };

        blocks.push(block);
        currentY += blockHeight;
    }

    return blocks;
}





// 从命令行参数获取输入和输出文件路径
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

if (!inputFilePath || !outputFilePath) {
    console.error('Please provide both input and output file paths.');
    process.exit(1);
}

const extractedContent = extractOutput(inputFilePath);
const blocks = content2block(extractedContent);


const finalOutput = {
    headings: extractedContent.headings,
    content: extractedContent.content,
    blocks: blocks,
};

fs.writeFileSync(outputFilePath, JSON.stringify(finalOutput, null, 2));


