import React, { useEffect, useState } from "react";
import UniRepsIntro from "./UniRepsIntro";
import CrossModelComparison from "./CrossModelComparison";
import RepresentationConvergence from "./rep_convergence";
import PracticalApplications from "./practical_applications";
import TheoreticalFoundations from "./theoretical_foundations";


const UniRepsMultimodal = () => {
  const [models, setModels] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="container-sm" style={{maxWidth: 1000}}>
      <div className="frame" style={{backgroundColor: "#f0f4ff", justifyContent: "center"}}>
        <h1 className="display-4">Universal Representations in Multimodal Learning</h1>
        <h2 className="display-5" style={{color: '#646161', padding: "0 20px", marginTop: 20}}>
          Why Different Models Converge on Similar Image-Text Embeddings
        </h2>
        <div className="container-sm" style={{marginTop: 50, maxWidth: 800, textAlign: "justify"}}>
          A fascinating phenomenon emerges when training multimodal models: <span className="emph">despite differences in architecture, training procedures, and datasets, different models learn remarkably similar representations</span>. CLIP, ALIGN, BLIP, and other vision-language models all converge on similar ways of organizing visual and linguistic concepts in their embedding spaces.
          <div className="container-sm" style={{justifyContent: 'center', display: 'flex'}}>
            <ul>
              <li><span className="emph">Representational Convergence</span>: Different models cluster "dog" images and text near each other in similar ways</li>
              <li><span className="emph">Emergent Structure</span>: The geometry of learned representations reflects the underlying structure of visual-linguistic data</li>
              <li><span className="emph">Universal Features</span>: Certain features (edges, colors, semantic concepts) emerge consistently across architectures</li>
            </ul>
          </div>
        </div>
        <hr style={{margin: "30px 20px"}} />
        <UniRepsIntro />
        <hr style={{margin: "30px 20px"}} />
        <RepresentationConvergence />
        <hr style={{margin: "30px 20px"}} />
        <CrossModelComparison setModels={setModels} />
        <hr style={{margin: "30px 20px"}} />
        <TheoreticalFoundations />
        <hr style={{margin: "30px 20px"}} />
        <PracticalApplications models={models} />
        <hr style={{margin: "30px 20px"}} />
      </div>
      <hr style={{margin: 0}} className="border border-2 "/>
    </div>
  );
};

export default UniRepsMultimodal;
