import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
// import { useState } from 'react';
// import GridLayout from './components/GridLayout';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


// import MyLayout_01 from './components/MyLayout_01'
// import ImageUploader from './components/ImageUploader'
// import GridLayoutWithAddRemove from './components/GridLayoutWithButton'
// import ReadMarkdown from './components/ReadMarkdown'
// import SplitMdByTitle from './components/SplitMdByTitle'
// import MarkdownPage from './components/MarkdownPage';
import UseBlock02 from './components/UseBlock02'

import markdownContent from './utils/test01.md';
const markdownData = `# 标题一
        这是一段正文。
        ## 二级标题一
        这是二级标题一的正文。
        ## 二级标题二
        这是二级标题二的正文。
        ### 三级标题一
        这是三级标题一的正文。
        ### 三级标题二
        这是三级标题二的正文。
        # 标题二
        这是另一段正文。
        ## 二级标题三
        这是二级标题三的正文。`;
// export default App;
const App = () => {

    return (
        <div>
        <h1>My Grid Layout</h1>
        <UseBlock02/>







        </div>
);
};

export default App;




