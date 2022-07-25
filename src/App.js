import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About';
import HowToPlay from './pages/HowToPlay/HowToPlay';
import Lobby from './pages/Lobby/Lobby';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/howtoplay' exact element={<HowToPlay/>} />
        <Route path='/about' exact element={<About/>} />
        <Route path='/lobby' exact element={<Lobby/>} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
