import { Responsive, WidthProvider } from 'react-grid-layout';
import React, {useState} from 'react';


const ResponsiveGridLayout = WidthProvider(Responsive);

const MyLayout_01 = () => {
    const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
    const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
    const layouts = {
        lg: [
            { i: 'a', x: 0, y: 0, w: 6, h: 4 },
            { i: 'b', x: 6, y: 0, w: 6, h: 4 },
            // { i: 'a', x: 0, y: 0, w: 4, h: 2 },
            // { i: 'b', x: 6, y: 0, w: 4, h: 2 },
        ],
        md: [
            { i: 'a', x: 0, y: 0, w: 5, h: 4 },
            { i: 'b', x: 5, y: 0, w: 5, h: 4 },
        ],
        sm: [
            { i: 'a', x: 0, y: 0, w: 6, h: 4 },
            { i: 'b', x: 6, y: 0, w: 6, h: 4 },
        ],
        xs: [
            { i: 'a', x: 0, y: 0, w: 2, h: 4 },
            { i: 'b', x: 2, y: 0, w: 2, h: 4 },
        ],
        xxs: [
            { i: 'a', x: 0, y: 0, w: 2, h: 4 },
            { i: 'b', x: 0, y: 4, w: 2, h: 4 },
        ],
    };

    const handleDebugChange = (event) => {
        // Update the layout based on the debug value
    };

    const DisablePartA =() =>{
        // this.flag=!this.flag;
        alert(this.state.cls)
    };

    const [visible, setVisible] = useState(true);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <>
        <div>
        <button onClick={toggleVisibility}>改变box A的可见性</button>
        </div>

    <ResponsiveGridLayout
    breakpoints={breakpoints}
    cols={cols}
    layouts={layouts}>

        {visible && <div key="a" style={{ background: '#4526'}} >Box A</div>}

        <div key="b"  style={{ background: '#2635'}}>Box B</div>
        <input type="checkbox" onChange={handleDebugChange} />

    </ResponsiveGridLayout>

        </>
);
};


export default MyLayout_01;
