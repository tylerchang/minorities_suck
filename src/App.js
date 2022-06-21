import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import HowToPlay from './pages/HowToPlay';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/howtoplay' exact element={<HowToPlay/>} />
        <Route path='/about' exact element={<About/>} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
