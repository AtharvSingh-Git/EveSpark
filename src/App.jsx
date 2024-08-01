import React from 'react';
import Host from './host';
import Events from './Events';
import Dashboard from './analysis';
import Profile from './profile';
import ProfileForm from './editprofile';
import List from './components/registerationlist.jsx';
import Header from './components/header';
import Footer from './components/footer';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>  
        
        <Route path="/src/analysis.jsx" element={<Dashboard />} />
        <Route path="/src/host.jsx" element={<Host />} />
        <Route path="/src/Events.jsx" element={<Events />} />
        <Route path="/src/editprofile.jsx" element={<ProfileForm/>} />
        <Route path='/src/profile.jsx' element={<Profile/>}/>
        <Route path='/src/Events.jsx/registerationlist.jsx' element={<List/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;



