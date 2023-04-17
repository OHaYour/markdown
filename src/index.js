import React from 'react';
// import React, {useState} from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.min.css"
// import {CardChecklist} from "react-bootstrap-icons"
import {Button, InputGroup} from "react-bootstrap";
// import {Button, Container, InputGroup, Navbar} from "react-bootstrap";
import {FormControl} from "react-bootstrap";

import { Responsive, WidthProvider } from 'react-grid-layout';


// 自定义用户数据
// function fetchTodos(){
//     return[
//         {
//             id:1,
//             title:"吃饭",
//             completed:true,
//         },
//         {
//             id:2,
//             title:"睡觉",
//             completed:false,
//         },
//         {
//             id:3,
//             title:"学习",
//             completed:true,
//         },
//         {
//             id:4,
//             title:"看电视",
//             completed:false,
//         },
//         {
//             id:5,
//             title:"运动",
//             completed:true,
//         },
//         {
//             id:6,
//             title:"看书",
//             completed:false,
//         }
//     ]
// }
//
// function TodoItem(props){
//     return (
//
//         <InputGroup key={props.id}>
//             <InputGroup.Checkbox
//                 checked={props.completed}
//                 onChange={props.onToggle}
//             />
//             <FormControl
//                 value={props.title}
//                 //由状态增加删除线效果
//                 style={{
//                     textDecoration: props.completed ? "line-through 4px" : "none",
//                 }}
//             />
//             <Button variant="outline-danger" onClick={props.onDelete}>
//                删除
//             </Button>
//
//         </InputGroup>
//     );
// }
//
// function App(){
//
//     const [todos,setTodos]=useState(fetchTodos());
//     // const todos=fetchTodos();
//     return (
//         <>
//             <Navbar bg="dark" variant="dark">
//                 <Container>
//                     <Navbar.Brand href="home">
//                          代办事项
//                     </Navbar.Brand>
//                 </Container>
//             </Navbar>
//             <Container>
//                 {todos.map((todo)=>(
//
//                     <TodoItem
//                         key={todo.id}
//                         title={todo.title}
//                         completed={todo.completed}
//                         onDelete={()=>{
//                             setTodos(todos.filter((x)=>x.id !==todo.id));
//                         }}
//                         onToggle={()=>{
//                             setTodos(
//                                 todos.map((x)=>
//                                     x.id===todo.id?{...x,completed: !x.completed}:x
//                                 )
//                             );
//                         }}
//                     />
//
//
//                 ))}
//
//             </Container>
//         </>
//     );
// }
//
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
//
// );



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();









ReactDOM.render(<App />, document.getElementById('root'));


