import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { AutoSizer, List } from 'react-virtualized';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ReactMarkdown from 'react-markdown';
import Markdown from 'markdown-to-jsx';
// import { block2md } from './AnalysisMd01'; // Import block2md from md2json.js

const ResponsiveGridLayout = WidthProvider(Responsive);


const blocks = [
    {
        "id": "uuid1",
        "size": {
            "x": 0,
            "y": 0,
            "w": 10,
            "h": 3
        }
    },
    {
        "id": "uuid2",
        "size": {
            "x": 0,
            "y": 42,
            "w": 10,
            "h": 3
        }
    },
    {
        "id": "uuid3",
        "size": {
            "x": 0,
            "y": 84,
            "w": 10,
            "h": 3
        }
    },
    {
        "id": "uuid4",
        "size": {
            "x": 0,
            "y": 126,
            "w": 10,
            "h": 3
        }
    },
    {
        "id": "uuid5",
        "size": {
            "x": 0,
            "y": 168,
            "w": 10,
            "h": 3
        }
    },



];

const contents = {
    "uuid1": {
        "title": "# Main Heading",
        "content": "This is the content for Main Heading.\nIt spans two lines."
    },
    "uuid2": {
        "title": "## Subheading 1",
        "content": "Content for Subheading 1.\nIt also spans two lines."
    },
    "uuid3": {
        "title": "### Sub-subheading 1.1",
        "content": "Content for Sub-subheading 1.1.\nThis is the second line."
    },
    "uuid4": {
        "title": "### Sub-subheading 1.2",
        "content": "Content for Sub-subheading 1.2.\nAnother two lines of content."
    },
    "uuid5": {
        "title": "# Secondary Main Heading",
        "content": "This is the content for Secondary Main Heading.\nIt spans two lines as well."
    },
    // Copy the content output from the previous step here
};

function MarkupPanel({ focusedBlock }) {
    if (!focusedBlock) {
        return <div>请选择一个块.</div>;
    }

    const content = contents[focusedBlock]?.content || '';
    return (
        <div>

        {contents[focusedBlock]?.title}
        <pre>{content}</pre>

        </div>
);
}

function MarkdownPreview({ markdown }) {
    return <ReactMarkdown>{markdown}</ReactMarkdown>;
}


function UseBlock() {
//     const [isPreviewVisible, setIsPreviewVisible] = React.useState(false);
//     const handlePreviewClick = () => {
//         setIsPreviewVisible(!isPreviewVisible);
//     };
//     const markdown = [blocks, contents];
//
//     return (
//         <div className="App">
//         {!isPreviewVisible && (
//     <div style={{ display: 'flex', flexDirection: 'row' }}>
//     {/* Existing layout and markup panel */}
// <div style={{ flex: 1 }}>
// <ResponsiveGridLayout
//     className="layout"
//     rowHeight={20}
//     layouts={{ lg: layout }}
//     breakpoints={{ lg: 1200 }}
//     cols={{ lg: 12 }}
//     onLayoutChange={onLayoutChange}
//     isDraggable={true}
//     isResizable={true}
//     compactType="vertical"
//         >
//         {blocks.map((block) => {
//                 const content = contents[block.id]?.content || '';
//
//                 return (
//                     <div key={block.id} style={{ border: '1px solid black', padding: '1em', overflowY: 'auto' }}>
//             <h3>{contents[block.id]?.title}</h3>
//                 <AutoSizer disableWidth>
//                 {({ height }) => (
//                 <textarea
//                 style={{ width: '100%', height }}
//                 value={content}
//                 readOnly
//                 onClick={() => onBlockClick(block.id)}
//                 />
//             )}
//             </AutoSizer>
//                 </div>
//             );
//             })}
//         </ResponsiveGridLayout>
//         </div>
//         <div style={{ flex: 1 }}>
// <MarkupPanel focusedBlock={focusedBlock} />
//     </div>
//     </div>
// )}
//     {isPreviewVisible && (
//     <div>
//     <MarkdownPreview markdown={markdown} />
//     </div>
//     )}
// <div>
//     <button onClick={handlePreviewClick}>
//         {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
//         </button>
//         </div>
//         </div>
// );





    const [layout, setLayout] = React.useState(
        blocks.map((block) => {
            return {
                i: block.id,
                x: block.size.x,
                y: block.size.y,
                w: block.size.w,
                h: block.size.h,
            };
        })
    );
    const [focusedBlock, setFocusedBlock] = React.useState(null);

    const onLayoutChange = (newLayout) => {
        setLayout(newLayout);
    };

    const onBlockClick = (id) => {
        setFocusedBlock(id);
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
                const content = contents[block.id]?.content || '';

                return (
                    <div key={block.id} style={{ border: '1px solid black', padding: '1em', overflowY: 'auto' }}>

                {contents[block.id]?.title}
                <AutoSizer disableWidth>

                {({ height }) => (
                    <div  onClick={() => onBlockClick(block.id)}>

                {content}

            </div>

            )}
            </AutoSizer>

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