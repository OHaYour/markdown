import React, { useState, useEffect } from 'react';
import {marked} from 'marked';

function ReadMarkdown() {
    // var marked = require('marked');
    const [headings, setHeadings] = useState([]);
    const [headings2, setHeadings2] = useState([]);
    const [headings3, setHeadings3] = useState([]);

    const  text=
    '# Table of Contents\n' +
    '## Demos(#demos)\n' +
    '### Features(#features)\n' +
    '- Installation(#installation)\n' +
    '# Usage(#usage)\n' +
    '## Responsive Usage(#responsive-usage)\n' +
    '- Providing Grid Width(#providing-grid-width)\n' +
    '### Grid Layout Props(#grid-layout-props)\n' +
    '- Responsive Grid Layout Props(#responsive-grid-layout-props)\n' +
    '- Grid Item Props(#grid-item-props)\n' +
    '- User Recipes(../../wiki/Users-recipes)\n' +
    '## Performance(#performance)\n' +
    '- Contribute(#contribute)\n' +
    '- TODO List(#todo-list)';

    useEffect(() => {
        // 将 Markdown 文档转换为 HTML
        const html = marked(text);
        // 创建一个虚拟的 DOM 节点
        const div = document.createElement('div');
        div.innerHTML = html;
        // 获取所有的一级标题
        const h1s = div.querySelectorAll('h1');
        const h2s = div.querySelectorAll('h2');
        const h3s = div.querySelectorAll('h3');
        // 将一级标题保存到 state 中
        const headingList = Array.from(h1s).map((h1) => h1.innerHTML);
        setHeadings(headingList);
        const headingList2 = Array.from(h2s).map((h2) => h2.innerHTML);
        setHeadings2(headingList2);
        const headingList3 = Array.from(h3s).map((h3) => h3.innerHTML);
        setHeadings3(headingList3);
    }, [text]);

    //添加时间戳
    const timestamp = Date.now();


    return (
        <div>
        <p>{timestamp}</p>

        <ul>
        <p>一级标题</p>
        {headings.map((heading, index) => (
                <li key={index}>{heading}</li>
        ))}
        <p>二级标题</p>
        {headings2.map((heading2, index) => (
            <li key={index}>{heading2}</li>
        ))}
        <p>三级标题</p>
        {headings3.map((heading3, index) => (
            <li key={index}>{heading3}</li>
        ))}
        </ul>
        </div>
);
}

export default ReadMarkdown;
