import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import CNN from './components/CNN';
import Multimodal from './components/Multimodal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />
          
          {/* Existing CNN module */}
          <Route path="/cnn" element={<CNN />} />
          
          {/* NEW: Multimodal module */}
          <Route path="/multimodal" element={<Multimodal />} />
          
          {/* Catch-all redirect to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
