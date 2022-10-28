import './App.css';

import React, { useState } from 'react'
import Navbar from './components/NavBar'
import News from './components/News';
import {Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App=()=> {
  const apikey=process.env.REACT_APP_API;
  const [progress,setProgress]=useState(0);

  return (
    <div>
      <Navbar/>
      <LoadingBar
      height={5}
      color='#f11946'
      progress={progress}
      />
      <Routes>
        <Route path="/" element={<News setProgress={setProgress} apikey={apikey}/>}/>
        <Route path="/business" element={<News setProgress={setProgress} apikey={apikey}   key="business" category="business"/>}/>
        <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apikey}   key="entertainment" category="entertainment"/>}/>
        <Route path="/general" element={<News setProgress={setProgress} apikey={apikey}   key="general" category="general"/>}/>
        <Route path="/health" element={<News setProgress={setProgress} apikey={apikey}   key="health" category="health"/>}/>
        <Route path="/science" element={<News setProgress={setProgress} apikey={apikey}   key="science" category="science"/>}/>
        <Route path="/sports" element={<News setProgress={setProgress} apikey={apikey}   key="sports" category="sports"/>}/>
        <Route path="/technology" element={<News setProgress={setProgress} apikey={apikey}   key="technology" category="technology"/>}/>
      </Routes>
    </div>
  )
}
export default App;