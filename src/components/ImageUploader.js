import React, {useState} from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const ImageUploader = () => {
    const [image, setImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };


    //图片的分布式

    const breakpoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0};
    const cols = {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2};
    const layouts = {
        lg: [
            {i: 'a', x: 0, y: 0, w: 6, h: 4},
            {i: 'b', x: 6, y: 0, w: 6, h: 4},
            {i: 'c', x: 0, y: 0, w: 3, h: 1},
            {i: 'd', x: 0, y: 0, w: 3, h: 2},
            {i: 'e', x: 0, y: 0, w: 3, h: 1},
        ],
        md: [
            {i: 'a', x: 0, y: 0, w: 5, h: 4},
            {i: 'b', x: 5, y: 0, w: 5, h: 4},
            {i: 'c', x: 0, y: 0, w: 3, h: 1},
            {i: 'd', x: 0, y: 0, w: 3, h: 2},
            {i: 'e', x: 0, y: 0, w: 3, h: 1},
        ],
        sm: [
            {i: 'a', x: 0, y: 0, w: 6, h: 4},
            {i: 'b', x: 6, y: 0, w: 6, h: 4},
            {i: 'c', x: 0, y: 0, w: 3, h: 1},
            {i: 'd', x: 0, y: 0, w: 3, h: 2},
            {i: 'e', x: 0, y: 0, w: 3, h: 1},
        ],
        xs: [
            {i: 'a', x: 0, y: 0, w: 2, h: 4},
            {i: 'b', x: 2, y: 0, w: 2, h: 4},
            {i: 'c', x: 0, y: 0, w: 3, h: 1},
            {i: 'd', x: 0, y: 0, w: 3, h: 2},
            {i: 'e', x: 0, y: 0, w: 3, h: 1},
        ],
        xxs: [
            {i: 'a', x: 0, y: 0, w: 2, h: 4},
            {i: 'b', x: 0, y: 4, w: 2, h: 4},
            {i: 'c', x: 0, y: 0, w: 3, h: 1},
            {i: 'd', x: 0, y: 0, w: 3, h: 2},
            {i: 'e', x: 0, y: 0, w: 3, h: 1},
        ],
    };

    const handleDebugChange = (event) => {
        // Update the layout based on the debug value
    };


    return (

        <>

        <div>
        < input type = "file" onChange = {handleFileChange}/>
        </div>

    < ResponsiveGridLayout breakpoints = {breakpoints} cols = {cols} layouts = {layouts} >
        < div key = "a" style = {{background: '#4526'}}>
        {image && < img src = {image} alt = "Uploaded Image" / >}
        Box A < /div>
        < div key = "b" style = {{background: '#9536'}}>

        In this TAB, this is the title.


        </div>

    < div key = "c" style = {{background: '#4456'}}>

    In this TAB, this is the 表头.

    </div>
    < div key = "d" style = {{background: '#7548'}}>

    In this TAB, this is the 内容.

    </div>
    < div key = "e" style = {{background: '#6569'}}>

    In this TAB, this is the 表尾.

    </div>



    < /ResponsiveGridLayout>

    </>

)
    ;
};

export default ImageUploader;
