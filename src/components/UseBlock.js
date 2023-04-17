import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Content from "./Content";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const UseBlock = ({ blocks, contents, onBlockResize }) => {
    const [selectedBlock, setSelectedBlock] = useState(null);

    return (
        <ResponsiveReactGridLayout
    className="layout"
    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    rowHeight={30}
    isResizable={true}
    onResizeStop={onBlockResize}
        >
        {blocks.map((block) => (
                <div
            key={block.id}
            className={`block ${block.id === selectedBlock ? "focused" : ""}`}
    data-grid={{ x: block.size.x, y: block.size.y, w: block.size.w, h: block.size.h }}
    onClick={() => setSelectedBlock(block.id)}
>
<div className="block-title">{contents[block.id].title}</div>
        <Content
    blockId={block.id}
    content={contents[block.id].content}
    isEditable={block.id === selectedBlock}
    />
    </div>
))}
</ResponsiveReactGridLayout>
);
};

export default UseBlock;
