import React from "react";
import { Image } from "react-bootstrap";


const MultimodalIntro = () => {
  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">What Are Multimodal Models?</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          Traditional machine learning models typically work with one type of data at a time. An image classifier processes only images, while a text classifier processes only text. But humans naturally integrate information from multiple sources - we see, hear, read, and touch simultaneously to understand the world around us.
          <br /><br />
          <span className="emph">Multimodal models</span> aim to replicate this ability by learning from multiple types of data together. One of the most influential multimodal architectures is <a href="https://arxiv.org/abs/2103.00020">CLIP (Contrastive Language-Image Pre-training)</a>, developed by OpenAI in 2021. CLIP learns to understand images and text in a unified way by training on 400 million (image, text) pairs from the internet.
          <br /><br />
          <h4 className="display-8">How CLIP Works</h4>
          CLIP uses a clever training approach called <span className="emph">contrastive learning</span>:
          <div className="container-sm" style={{justifyContent: 'center', display: 'flex'}}>
            <ul>
              <li>It takes a batch of image-text pairs (e.g., an image of a dog with the caption "a golden retriever playing in a park")</li>
              <li>It encodes the image through an image encoder (like a ResNet or Vision Transformer)</li>
              <li>It encodes the text through a text encoder (like a Transformer)</li>
              <li>It learns to make matching pairs have similar embeddings (close together in space)</li>
              <li>It learns to make non-matching pairs have different embeddings (far apart in space)</li>
            </ul>
          </div>
          <br />
          <h4 className="display-8">Why This Matters</h4>
          Once trained, CLIP can perform <span className="emph">zero-shot classification</span> - it can recognize new categories it has never explicitly been trained on, just by comparing an image to text descriptions. For example, if you want to detect "unicorns" in images, you don't need to retrain the model with unicorn images. You simply provide the text "a unicorn" and CLIP can find images that match this description!
          <br /><br />
          This capability has profound implications for <a href="https://www.unesco.org/en/artificial-intelligence">accessibility</a>, enabling applications like:
          <ul>
            <li>Helping visually impaired users understand image content through text descriptions</li>
            <li>Searching large image databases using natural language queries</li>
            <li>Content moderation and safety systems that work across languages</li>
            <li>Educational tools that can explain visual concepts</li>
          </ul>
          <br />
          <h4 className="display-8">Ethical Considerations</h4>
          As with any AI system, multimodal models raise important ethical questions:
          <ul>
            <li><span className="emph">Bias</span>: Models trained on internet data can reflect societal biases present in captions and descriptions. For example, certain professions might be stereotypically associated with specific genders or ethnicities.</li>
            <li><span className="emph">Privacy</span>: Models that can search through images using text make it easier to find specific people or locations, raising surveillance concerns.</li>
            <li><span className="emph">Misinformation</span>: The ability to match images with text can be misused to spread false narratives or deepfakes.</li>
            <li><span className="emph">Environmental Impact</span>: Training large multimodal models requires significant computational resources and energy.</li>
          </ul>
          Understanding how these models work is the first step toward using them responsibly and addressing these concerns.
        </div>
      </div>
    </div>
  );
};

export default MultimodalIntro;
