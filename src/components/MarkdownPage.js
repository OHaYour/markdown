import React from "react";
import { extractHeadings } from "../utils/markdown";
import ReactMarkdown from 'react-markdown';

function MarkdownPage(markdown) {

    const headings = extractHeadings(markdown.content);


    return (
        <div>
        {headings}

        <ReactMarkdown>{headings}</ReactMarkdown>

        </div>
);
}

export default MarkdownPage;
