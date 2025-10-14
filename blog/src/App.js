import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import CNN from "./pages/CNN"
import Multimodal from "./pages/multimodal/Multimodal"
import UniReps from "./pages/unireps/UniReps"
import ExplainableMultimodal from "./pages/explainability/ExplainableMultimodal"  


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cnn" element={<CNN />} />
        <Route path="/multimodal" element={<Multimodal />} />
        <Route path="/unireps" element={<UniReps />} />
        <Route path="/explainability" element={<ExplainableMultimodal />} />  {/* */}
      </Routes>
    </div>
  );
}

export default App;
