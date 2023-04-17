import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';

const GridLayoutWithAddRemove = () => {
    const [layout, setLayout] = useState([]);

    const handleAddElement = () => {
        const newElement = {
            i: `new-${layout.length}`,
            x: 0,
            y: Infinity,
            w: 2,
            h: 6,
        };
        setLayout([...layout, newElement]);
    };

    const handleRemoveElement = (id) => {
        const newLayout = layout.filter((el) => el.i !== id);
        setLayout(newLayout);
    };

    const onLayoutChange = (newLayout) => {
        setLayout(newLayout);
    };

    return (
        <div>
        <button onClick={handleAddElement}>Add Element</button>
    <GridLayout className="layout" layout={layout} cols={4} rowHeight={30} width={1200} onLayoutChange={onLayoutChange}>
        {layout.map((el) => (
                <div key={el.i} >
            <div>id: {el.i}</div>
    <div>x: {el.x}</div>
    <div>y: {el.y}</div>
    <div>w: {el.w}</div>
    <div>h: {el.h}</div>
    <button onClick={() => handleRemoveElement(el.i)}>Remove</button>
    </div>
))}
</GridLayout>
    </div>
);
};

export default GridLayoutWithAddRemove;
