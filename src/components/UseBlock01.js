import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { AutoSizer, List } from 'react-virtualized';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ReactMarkdown from 'react-markdown';
import Markdown from 'markdown-to-jsx';

const ResponsiveGridLayout = WidthProvider(Responsive);

const blocks = [
    {
        id: 'uuid1',
        size: {
            x: 0,
            y: 0,
            w: 10,
            h: 10,
        },
        title: 'Main Heading',
        content: 'This is the content for Main Heading.\nIt spans two lines.',
    },
    {
        id: 'uuid2',
        size: {
            x: 0,
            y: 42,
            w: 10,
            h: 10,
        },
        title: 'Subheading 1',
        content: 'Content for Subheading 1.\nIt also spans two lines.',
    },
    {
        id: 'uuid3',
        size: {
            x: 0,
            y: 84,
            w: 10,
            h: 10,
        },
        title: 'Sub-subheading 1.1',
        content: 'Content for Sub-subheading 1.1.\nThis is the second line.',
    },
    {
        id: 'uuid4',
        size: {
            x: 0,
            y: 126,
            w: 10,
            h: 10,
        },
        title: 'Sub-subheading 1.2',
        content: 'Content for Sub-subheading 1.2.\nAnother two lines of content.',
    },
    {
        id: 'uuid5',
        size: {
            x: 0,
            y: 168,
            w: 10,
            h: 10,
        },
        title: 'Secondary Main Heading',
        content: 'This is the content for Secondary Main Heading.\nIt spans two lines as well.',
    },
];

function UseBlock() {
    const [layout, setLayout] = React.useState(
        blocks.map((block) => ({
            i: block.id,
            x: block.size.x,
            y: block.size.y,
            w: block.size.w,
            h: block.size.h,
        }))
    );
    const [focusedBlock, setFocusedBlock] = React.useState(null);

    const onLayoutChange = (newLayout) => {
        setLayout(newLayout);
    };

    const onBlockClick = (id) => {
        setFocusedBlock(id);
    };

    const onTextAreaChange = (id, value) => {
        const newBlocks = blocks.map((block) => {
            if (block.id === id) {
                return {
                    ...block,
                    content: value,
                };
            }
            return block;
        });
        setBlocks(newBlocks);
    };

    return (
        <div className="App">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
<div style={{ flex: 1 }}>
<ResponsiveGridLayout
    className="layout"
    rowHeight={20}
    layouts={{ lg: layout }}
    breakpoints={{ lg: 1200 }}
    cols={{ lg: 12 }}
    onLayoutChange={onLayoutChange}
    isDraggable={true}
    isResizable={true}
    compactType="vertical"
        >
                {blocks.map((block) => {
                        const title = contents[block.id]?.title || '';
                        const content = contents[block.id]?.content || '';
                        const onBlockClick = () => {
                            setFocusedBlock(block.id);
                        };

                        const onContentChange = (event) => {
                            const newContents = { ...contents };
                            newContents[block.id].content = event.target.value;
                            setContents(newContents);
                        };

                        const onTitleChange = (event) => {
                            const newContents = { ...contents };
                            newContents[block.id].title = event.target.value;
                            setContents(newContents);
                        };

                        return (
                            <div key={block.id} style={{ border: '1px solid black', padding: '1em' }}>
                    <input type="text" value={title} onChange={onTitleChange} onClick={onBlockClick} />
                        <textarea value={content} onChange={onContentChange} onClick={onBlockClick} />
                        </div>
                    );
                    })}
        </ResponsiveGridLayout>
        </div>
        <div style={{ flex: 1 }}>
<MarkupPanel focusedBlock={focusedBlock} />
    </div>
    </div>
    </div>
);
}

export default UseBlock;
