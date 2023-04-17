import {marked} from 'marked';

export function extractHeadings(markdown) {

    // alert(111)
    function extractHeadings(markdown) {
        // 提取所有标题
        const regex = /^#+\s(.+)/gm;
        const matches = [];
        let match;
        while ((match = regex.exec(markdown)) !== null) {
            const heading = match[0];
            const text = match[1];
            const level = heading.match(/#/g).length;
            matches.push({ text, level });
        }

        // 遍历所有标题，将文档按照标题分割成多个部分
        const result = [];
        let startIndex = 0;
        for (let i = 0; i < matches.length; i++) {
            const endIndex = matches[i].index;
            result.push(markdown.substring(startIndex, endIndex));
            startIndex = endIndex;
        }
        result.push(markdown.substring(startIndex));

        alert("as"+result)

        return result;

        // alert("222"+markdown)
        // const regex = /^#\s(.+)$/m;
        // const headings = [];
        // let match;
        // while ((match = regex.exec(markdown))) {
        //     headings.push({ level: match[1].length, text: match[2] });
        // }
        // alert(headings)
        // return headings;
    }

return extractHeadings(markdown);
}




