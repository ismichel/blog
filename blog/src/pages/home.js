import React from "react";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="container-sm" style={{maxWidth: 1000}}>
      <div className="frame">
        <h2 className="display-6" style={{marginTop: 50, marginBottom: 30}}>Modules</h2>
        <div className="container-sm" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <Link to='multimodal' className="link-offset-3 module-link">Multimodal AI: Image-Text Matching</Link>
          <Link to='unireps' className="link-offset-3 module-link">Universal Representations (UniReps)</Link>
          <Link to='explainability' className="link-offset-3 module-link">  {/* ← ADD THIS */}
    Explainable Multimodal AI: From Black Box to Glass Box
  </Link>
        </div>
      </div>
      <hr style={{margin: 0}} className="border border-2 "/>
    </div>
  );
}

export default Home;
