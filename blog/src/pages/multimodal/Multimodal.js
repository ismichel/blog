import React, { useEffect, useState } from "react";
import MultimodalIntro from "./MultimodalIntro";
import MultimodalEmbeddings from "./MultimodalEmbeddings";
import MultimodalMatching from "./MultimodalMatching";
import MultimodalExplain from "./MultimodalExplain";


const Multimodal = () => {
  const [model, setModel] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  

  return (
    <div className="container-sm" style={{maxWidth: 1000}}>
      <div className="frame" style={{backgroundColor: "#e0f7fa", justifyContent: "center"}}>
        <h1 className="display-4">Understanding Multimodal AI:<br />Image-Text Matching</h1>
        <div className="container-sm" style={{marginTop: 50, maxWidth: 800, textAlign: "justify"}}>
          Multimodal AI refers to systems that can understand and process multiple types of data simultaneously - such as images, text, audio, and video. Unlike traditional models that work with only one type of data, multimodal models can find connections and relationships across different modalities. For example, they can match images with text descriptions, answer questions about images, or generate captions for photos.
          <div className="container-sm" style={{justifyContent: 'center', display: 'flex'}}>
            <ul>
              <li><span className="emph">Cross-Modal Understanding</span>: The model learns to connect concepts across different types of data, like linking the word "cat" with images of cats.</li>
              <li><span className="emph">Shared Representation Space</span>: Both images and text are transformed into a common "language" (embeddings) where similar concepts are close together.</li>
              <li><span className="emph">Zero-Shot Learning</span>: Once trained, these models can recognize new categories without additional training, just by using text descriptions.</li>
            </ul>
          </div>
        </div>
        <hr style={{margin: "30px 20px"}} />
        <MultimodalIntro />
        <hr style={{margin: "30px 20px"}} />
        <MultimodalEmbeddings />
        <hr style={{margin: "30px 20px"}} />
        <MultimodalMatching setModel={setModel} />
        <hr style={{margin: "30px 20px"}} />
        <MultimodalExplain model={model} />
        <hr style={{margin: "30px 20px"}} />
      </div>
      <hr style={{margin: 0}} className="border border-2 "/>
    </div>
  );
};

export default Multimodal;
