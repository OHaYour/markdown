import React, { useState } from "react";

const Content = ({ blockId, content, isEditable }) => {
    const [editableContent, setEditableContent] = useState(content);

    const handleContentChange = (event) => {
        const newContents = { ...contents };
        newContents[blockId].content = event.target.value;
        setEditableContent(event.target.value);
    };

    if (isEditable) {
        return (
            <textarea className="block-content" value={editableContent} onChange={handleContentChange} />
    );
    } else {
        return <div className="block-content">{content}</div>;
    }
};

export default Content;
