
import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './index.scss';

const ResponsiveGridLayout = WidthProvider(Responsive);


class GridLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compactType: 'vertical',
            layouts:props.layout,
        };
    }
    componentWillMount() {
        this.getUserInfo()

    };
    componentWillUnmount() {
        // componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
        this.setState = () => {
            return;
        };
    }

    //props发生变化时触发
    componentWillReceiveProps(props) {
        console.log({props})
        this.setState({
            layouts: [...props.layout]
        });
    }

    getUserInfo=()=>{
        var _EUlayoutArr = JSON.parse(localStorage.getItem("layoutArr"))
        if (_EUlayoutArr === null || _EUlayoutArr === undefined) {
            // console.log("--null----")
            this.setState({
                layouts:[
                    { i: 'a', x: 0, y: 0, w: 15, h: 5 }, // w:8 是中， w:15 是大
                    { i: 'b', x: 0, y: 0, w: 4, h: 5 }, // h:10, 是中， h:4,是小
                    { i: 'c', x: 0, y: 0, w: 8, h: 10 },// w:8,是大，w:4,是中
                    { i: 'd', x: 0, y: 0, w: 8, h: 10 }, // w:8,是大，w:4,是中
                ]})
            // this.setState({
            //     layout: [
            //         { i: 'a', x: 0, y: 0, w: 15, h: 5 }, // w:8 是中， w:15 是大
            //         { i: 'b', x: 0, y: 0, w: 4, h: 5 }, // h:10, 是中， h:4,是小
            //         { i: 'c', x: 0, y: 0, w: 8, h: 10 },// w:8,是大，w:4,是中
            //         { i: 'd', x: 0, y: 0, w: 8, h: 10 }, // w:8,是大，w:4,是中
            //     ]
            // })

        }
        else {
            // console.log("youzhi----")
            this.props.setLayout([..._EUlayoutArr])
            this.setState({
                layout: _EUlayoutArr
            })
            // this.state.layout = _EUlayoutArr
        }
    }

    //存储拖拽移动的位置到缓存
    onLayoutChange = (layout, layouts) => {
        console.log(layout, "=----layout----",layouts)
        let layoutArr = [];

        var index = -1;
        // localStorage.removeItem('CPlayoutArr')
        layout.forEach(({ i, x, y, w, h }) => {
            index++;
            layoutArr[index] = { i, x, y, w, h }
        })

        localStorage.setItem('layoutArr', JSON.stringify(layoutArr))
        this.props.setLayout([...layoutArr])
    }

    render() {
        // console.log('this.state.layouts', this.state.layouts )
        const {list} = this.props;
        return (
            <>
                <div className="dashboardContent">
                    <ResponsiveGridLayout
                        className="layout"
                        draggableCancel=".react-drag" // 加了这个类名是不能被移动的
                        layouts={{ lg: this.state.layouts }}
                        measureBeforeMount={false}
                        rowHeight={30}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        isResizable={false}
                        onLayoutChange={this.onLayoutChange}
                        margin={[24, 24]}
                        compactType={this.state.compactType}
                        preventCollision={!this.state.compactType}
                    >
                        {list.map(i => {
                            return <div className='dragcontent' key={i.key}>
                                {i.component}
                            </div>
                        })}

                    </ResponsiveGridLayout>
                </div>
            </>
        );
    }
}

export default GridLayout;

