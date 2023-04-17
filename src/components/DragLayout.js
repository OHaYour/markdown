import React, { PureComponent } from 'react';
import {useState} from 'react';
// import { Layout,Button } from 'antd';
import { Layout } from 'antd';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import ReactEcharts from 'echarts-for-react';
import { getBarChart,getLineChart,getPieChart,toDoItem } from "./chart";

import GridLayout from 'react-grid-layout';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';



// import React, {useState} from 'react';
// import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css"
// import {CardChecklist} from "react-bootstrap-icons"
import {Button, Container, InputGroup, Navbar} from "react-bootstrap";
import {FormControl} from "react-bootstrap";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { Header, Content} = Layout;

// const ResponsiveGridLayout = WidthProvider(Responsive);



export default class MyResponsiveGrid extends React.Component {
// export default class DragLayout extends PureComponent {
  /**
   * 默认生成框大小
   * 长度 lg 数字越大长度越短
   * 宽度 rowHeight
   */
  static defaultProps = {
    cols: { lg: 12, md: 100, sm: 60, xs: 40, xxs: 20 },
    rowHeight: 150,
  };

  constructor(props) {
    super(props);

    this.state = {
      layouts: this.getFromLS("layouts") || {},
      widgets:[]
    }
  }

  getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
  generateDOM = () => {
    return _.map(this.state.widgets, (l, i) => {
      let option;
      if (l.type === 'bar') {
        option = getBarChart();
      }else if (l.type === 'line') {
        option = getLineChart();
      }else if (l.type === 'pie') {
        option = getPieChart();
      }else if (l.type ==='todo'){

        option = toDoItem();
      }
      let component = (
        <ReactEcharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          style={{width: '100%',height:'100%'}}
        />
      )
      return (
          //删除操作
        <div key={l.i} data-grid={l}>
          <span className='remove' onClick={this.onRemoveItem.bind(this, i)}>x</span>
          {component}
        </div>
      );
    });
  };

  //添加内容
  addChart(type) {
    const addItem = {
      x: (this.state.widgets.length * 3) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 2,
      i: new Date().getTime().toString(),
    };
    this.setState(
      {
        widgets: this.state.widgets.concat({
          ...addItem,
          type,
        }),
      },
    );
  };

  //移除内容
  onRemoveItem(i) {
    console.log(this.state.widgets)
    this.setState({
      widgets: this.state.widgets.filter((item,index) => index !=i)
    });

  }

  onLayoutChange(layout, layouts) {
    this.saveToLS("layouts", layouts);
    this.setState({ layouts });
  }




  render() {
    // {lg: layout1, md: layout2, ...}
    /**
     * 定义了一个网格布局，其中有a、b、c三个项，
     * 其中a因为设置了 static: true，因此它是固定的，不可拖拽和缩放，
     * 而b因为设置了 minW: 2 和 maxW: 4，因此它在缩放时的宽度被限定到2到4个单位格之间，
     * 而c项只设置了最基本的属性，它可以被自由的拖拽和缩放。
     */
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];

    function getLayoutsFromSomewhere(){
      const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
      ]
    }

    function fetchTodos(){
      return[
        {
          id:1,
          title:"吃饭",
          completed:true,
        },
        {
          id:2,
          title:"睡觉",
          completed:false,
        },
        {
          id:3,
          title:"学习",
          completed:true,
        },
        {
          id:4,
          title:"看电视",
          completed:false,
        },
        {
          id:5,
          title:"运动",
          completed:true,
        },
        {
          id:6,
          title:"看书",
          completed:false,
        }
      ]
    }

    function TodoItem(props){
      return (

          <InputGroup key={props.id}>
            <InputGroup.Checkbox
                checked={props.completed}
                onChange={props.onToggle}
            />
            <FormControl
                value={props.title}
                //由状态增加删除线效果
                style={{
                  textDecoration: props.completed ? "line-through 4px" : "none",
                }}
            />
            <Button variant="outline-danger" onClick={props.onDelete}>
              删除
            </Button>

          </InputGroup>
      );
    }

    const [todos,setTodos]=useState(fetchTodos());

    return (
        // <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        //   <div key="a">a</div>
        //   <div key="b">b</div>
        //   <div key="c">c</div>
        // </GridLayout>

        <>



           <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%','padding': '0 30px' }}>
              <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'bar')}>添加柱状图</Button>
              <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'line')}>添加折线图</Button>
              <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'pie')}>添加饼图</Button>
              <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'todo')}>添加事件</Button>
            </Header>
            {/*<Content style={{ marginTop: 44 }}>*/}
            {/*  //背景颜色background #fff*/}
            {/*  //边距padding   50*/}
            {/*  //初始渲染高度  1000*/}
            {/*  <div style={{ background: '#fff', padding: 50, minHeight: 900 }}>*/}
            {/*    <ResponsiveReactGridLayout*/}
            {/*      className="layout"*/}
            {/*      {...this.props}*/}
            {/*      layouts={this.state.layouts}*/}
            {/*      onLayoutChange={(layout, layouts) =>*/}
            {/*        this.onLayoutChange(layout, layouts)*/}
            {/*      }*/}
            {/*    >*/}
            {/*      {this.generateDOM()}*/}
            {/*    </ResponsiveReactGridLayout>*/}
            {/*  </div>*/}
            {/*</Content>*/}

             <Content>
                 <div style={{ background: '#fff', padding: 50, minHeight: 900 }}>


                   <Container>
                     {todos.map((todo)=>(

                         <TodoItem
                             key={todo.id}
                             title={todo.title}
                             completed={todo.completed}
                             onDelete={()=>{
                               setTodos(todos.filter((x)=>x.id !==todo.id));
                             }}
                             onToggle={()=>{
                               setTodos(
                                   todos.map((x)=>
                                       x.id===todo.id?{...x,completed: !x.completed}:x
                                   )
                               );
                             }}
                         />


                     ))}

                   </Container>


                   {/*<GridLayout className="layout" cols={12} rowHeight={100} width={1800}>*/}
                   {/*  <div key="b2" style={{ background: '#4ECB73'}}  data-grid={{x: 0, y: 1, w: 3, h: 1, minW: 2, maxW: 4}}>*/}
                   {/*    <InputGroup key="1">*/}
                   {/*      <InputGroup.Checkbox*/}
                   {/*          checked="false"*/}
                   {/*      />*/}
                   {/*      <FormControl*/}
                   {/*          value="eat"*/}
                   {/*          //由状态增加删除线效果*/}
                   {/*          style={{*/}
                   {/*            textDecoration: true ? "line-through 4px" : "none",*/}
                   {/*          }}*/}
                   {/*      />*/}
                   {/*      <Button variant="outline-danger" >*/}
                   {/*        删除*/}
                   {/*      </Button>*/}
                   {/*    </InputGroup>*/}
                   {/*  </div>*/}
                   {/*  <div key="b3" style={{ background: '#4ECB73'}}  data-grid={{x: 3, y: 1, w: 3, h: 1, minW: 10, maxW: 10}}>b13</div>*/}
                   {/*  <div key="b4" style={{ background: '#4ECB73'}}  data-grid={{x: 6, y: 1, w: 3, h: 1, minW: 10, maxW: 10}}>b23</div>*/}
                   {/*  <div key="b5" style={{ background: '#4ECB73'}}  data-grid={{x: 9, y: 1, w: 3, h: 1, minW: 10, maxW: 10}}>b33</div>*/}
                   {/*  <div key="b31" style={{ background: '#4ECB73'}}  data-grid={{x: 3, y: 1, w: 3, h: 1, minW: 10, maxW: 10}}>b31</div>*/}
                   {/*  <div key="b41" style={{ background: '#4ECB73'}}  data-grid={{x: 6, y: 1, w: 3, h: 1, minW: 10, maxW: 10}}>b32</div>*/}
                   {/*  <div key="b51" style={{ background: '#4ECB73'}}  data-grid={{x: 9, y: 1, w: 3, h: 1, minW: 10, maxW: 10}}>b33</div>*/}
                   {/*  <div key="b52" style={{ background: '#4ECB73'}}  data-grid={{x: 9, y: 1, w: 3, h: 1, minW: 10, maxW: 10}}>b34</div>*/}
                   {/*  <div key="b53" style={{ background: '#4ECB73'}}  data-grid={{x: 9, y: 1, w: 3, h: 1, minW: 10, maxW: 10}}>b35</div>*/}
                   {/*</GridLayout>*/}


                   <ResponsiveReactGridLayout
                     className="layout"
                     {...this.props}
                     layouts={this.state.layouts}
                     onLayoutChange={(layout, layouts) =>
                       this.onLayoutChange(layout, layouts)
                     }
                   >
                     {this.generateDOM()}
                   </ResponsiveReactGridLayout>
                 </div>

             </Content>

          </Layout>



          {/*在子组件中来设置相关布局属性*/}
          {/*x   初始位置  由w长度决定*/}
          {/*y*/}
          {/*w  长度*/}
          {/*h  高度*/}

    {/*<GridLayout className="layout" cols={12} rowHeight={100} width={1800}>*/}
    {/*  <div key="b2" style={{ background: '#4ECB73'}}  data-grid={{x: 0, y: 1, w: 3, h: 2, minW: 10, maxW: 10}}>*/}
    {/*    <InputGroup key="1">*/}
    {/*      <InputGroup.Checkbox*/}
    {/*          checked="false"*/}
    {/*      />*/}
    {/*      <FormControl*/}
    {/*          value="eat"*/}
    {/*          //由状态增加删除线效果*/}
    {/*          style={{*/}
    {/*            textDecoration: true ? "line-through 4px" : "none",*/}
    {/*          }}*/}
    {/*      />*/}
    {/*      <Button variant="outline-danger" >*/}
    {/*        删除*/}
    {/*      </Button>*/}

    {/*    </InputGroup>*/}

    {/*  </div>*/}
    {/*  <div key="b3" style={{ background: '#4ECB73'}}  data-grid={{x: 3, y: 1, w: 3, h: 2, minW: 10, maxW: 10}}>b3</div>*/}
    {/*  <div key="b4" style={{ background: '#4ECB73'}}  data-grid={{x: 6, y: 1, w: 3, h: 2, minW: 10, maxW: 10}}>b3</div>*/}
    {/*  <div key="b5" style={{ background: '#4ECB73'}}  data-grid={{x: 9, y: 1, w: 3, h: 2, minW: 10, maxW: 10}}>b3</div>*/}

    {/*  /!*<InputGroup key={props.id}>*!/*/}
    {/*  /!*  <InputGroup.Checkbox*!/*/}
    {/*  /!*      checked={props.completed}*!/*/}
    {/*  /!*      onChange={props.onToggle}*!/*/}
    {/*  /!*  />*!/*/}
    {/*  /!*  <FormControl*!/*/}
    {/*  /!*      value={props.title}*!/*/}
    {/*  /!*      //由状态增加删除线效果*!/*/}
    {/*  /!*      style={{*!/*/}
    {/*  /!*        textDecoration: props.completed ? "line-through 4px" : "none",*!/*/}
    {/*  /!*      }}*!/*/}
    {/*  /!*  />*!/*/}
    {/*  /!*  <Button variant="outline-danger" onClick={props.onDelete}>*!/*/}
    {/*  /!*    删除*!/*/}
    {/*  /!*  </Button>*!/*/}
    {/*  /!*</InputGroup>*!/*/}




    {/*  /!*<div key="b1" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>*!/*/}

    {/*  /!*<div key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}>a</div>*!/*/}
    {/*  /!*<div key="c" data-grid={{x: 4, y: 0, w: 1, h: 2}}>c</div>*!/*/}
    {/*</GridLayout>*/}
        </>
    )





    // var layouts = getLayoutsFromSomewhere();
    // return (
    //     <ResponsiveGridLayout className="layout" layouts={layouts}
    //                           breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
    //                           cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
    //       <div key="1">1</div>
    //       <div key="2">2</div>
    //       <div key="3">3</div>
    //     </ResponsiveGridLayout>
    // )



  }






  // render() {
  //  return(
  //    <Layout>
  //     <Header style={{ position: 'fixed', zIndex: 1, width: '100%','padding': '0 30px' }}>
  //       <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'bar')}>添加柱状图</Button>
  //       <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'line')}>添加折线图</Button>
  //       <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'pie')}>添加饼图</Button>
  //       <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'todo')}>添加事件</Button>
  //     </Header>
  //     <Content style={{ marginTop: 44 }}>
  //       //背景颜色background #fff
  //       //边距padding   50
  //       //初始渲染高度  1000
  //       <div style={{ background: '#4ECB73', padding: 50, minHeight: 900 }}>
  //         <ResponsiveReactGridLayout
  //           className="layout"
  //           {...this.props}
  //           layouts={this.state.layouts}
  //           onLayoutChange={(layout, layouts) =>
  //             this.onLayoutChange(layout, layouts)
  //           }
  //         >
  //           {this.generateDOM()}
  //         </ResponsiveReactGridLayout>
  //       </div>
  //     </Content>
  //   </Layout>
  //  )}
}
