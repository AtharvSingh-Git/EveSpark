import React,{useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Landing from './components/landingpage.jsx';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import User from './components/user.jsx';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> 
      </Routes>
    </Router>
  );
}

export default App;
