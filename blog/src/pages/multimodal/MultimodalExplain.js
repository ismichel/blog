import React, { useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";


const MultimodalExplain = ({ model }) => {
  const [activeTab, setActiveTab] = useState("architecture");

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Understanding Multimodal Architecture</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          Let's dive deeper into how multimodal models are structured and what makes them work. Understanding these architectural choices helps us think critically about their capabilities and limitations.
          <br /><br />
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
          style={{marginTop: 30}}
        >
          <Tab eventKey="architecture" title="Architecture">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">Dual Encoder Architecture</h4>
              CLIP and similar models use a <span className="emph">dual encoder architecture</span>:
              <br /><br />
              <div style={{backgroundColor: "#f8f9fa", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Image Encoder:</strong>
                <ul>
                  <li>Processes raw images (typically 224×224 or larger)</li>
                  <li>Can be a ResNet, Vision Transformer (ViT), or other CNN</li>
                  <li>Outputs a fixed-size embedding vector (e.g., 512 dimensions)</li>
                  <li>Learns visual features: edges, textures, shapes, objects</li>
                </ul>
                
                <strong>Text Encoder:</strong>
                <ul>
                  <li>Processes text using tokenization (breaking text into pieces)</li>
                  <li>Usually a Transformer model</li>
                  <li>Outputs a fixed-size embedding vector (same dimensions as image encoder)</li>
                  <li>Learns semantic meaning, context, and relationships between words</li>
                </ul>
              </div>

              The key innovation is that both encoders project their inputs into the <span className="emph">same embedding space</span>, making direct comparison possible.
              <br /><br />

              <h4 className="display-8">Training Process</h4>
              <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Contrastive Learning:</strong>
                <ol>
                  <li>Take a batch of N (image, text) pairs from the dataset</li>
                  <li>Encode all images and all texts</li>
                  <li>Compute N × N similarity matrix (every image vs. every text)</li>
                  <li>Maximize similarity for the N correct pairs (diagonal)</li>
                  <li>Minimize similarity for the N² - N incorrect pairs</li>
                </ol>
                This creates N positive examples and N² - N negative examples per batch!
              </div>

              <h4 className="display-8">Why This Works</h4>
              By training on millions of diverse (image, text) pairs from the internet:
              <ul>
                <li>The model learns visual concepts and their linguistic descriptions</li>
                <li>It discovers relationships between objects, actions, and attributes</li>
                <li>It builds robust representations that generalize to new examples</li>
                <li>It enables zero-shot transfer: recognizing new categories without retraining</li>
              </ul>
            </div>
          </Tab>

          <Tab eventKey="applications" title="Applications">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">Real-World Applications</h4>
              Multimodal models have enabled numerous practical applications:
              <br /><br />

              <div style={{marginBottom: 20}}>
                <strong>1. Image Search & Retrieval</strong>
                <ul>
                  <li>Search massive image databases using natural language</li>
                  <li>Find specific photos in your library: "beach sunset 2022"</li>
                  <li>E-commerce: "red leather jacket with zipper"</li>
                </ul>
              </div>

              <div style={{marginBottom: 20}}>
                <strong>2. Content Moderation</strong>
                <ul>
                  <li>Detect inappropriate content across languages</li>
                  <li>Find policy violations without language-specific training</li>
                  <li>Flag misinformation or harmful imagery</li>
                </ul>
              </div>

              <div style={{marginBottom: 20}}>
                <strong>3. Accessibility</strong>
                <ul>
                  <li>Describe images for visually impaired users</li>
                  <li>Generate alt text automatically</li>
                  <li>Answer questions about visual content</li>
                </ul>
              </div>

              <div style={{marginBottom: 20}}>
                <strong>4. Creative Tools</strong>
                <ul>
                  <li>Text-to-image generation (DALL-E, Stable Diffusion)</li>
                  <li>Image editing via text instructions</li>
                  <li>Style transfer and manipulation</li>
                </ul>
              </div>

              <div style={{marginBottom: 20}}>
                <strong>5. Robotics & Autonomous Systems</strong>
                <ul>
                  <li>Robots understanding natural language commands</li>
                  <li>Visual navigation with linguistic goals</li>
                  <li>Human-robot interaction</li>
                </ul>
              </div>

              <h4 className="display-8">Emerging Directions</h4>
              <ul>
                <li><strong>Video Understanding:</strong> Extending to temporal sequences</li>
                <li><strong>Audio-Visual Models:</strong> Connecting sound with vision</li>
                <li><strong>3D Understanding:</strong> Spatial reasoning with language</li>
                <li><strong>Multilingual Models:</strong> Supporting hundreds of languages</li>
              </ul>
            </div>
          </Tab>

          <Tab eventKey="limitations" title="Limitations & Ethics">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">Technical Limitations</h4>
              <div style={{backgroundColor: "#f8d7da", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <ul>
                  <li><strong>Compositionality:</strong> Struggles with complex scenes requiring spatial reasoning (e.g., "cat to the left of dog" vs. "dog to the left of cat")</li>
                  <li><strong>Counting:</strong> Difficulty with precise quantities ("three apples" vs. "five apples")</li>
                  <li><strong>Abstract Concepts:</strong> Better at concrete objects than abstract ideas</li>
                  <li><strong>Fine-grained Distinctions:</strong> May confuse similar categories without additional training</li>
                  <li><strong>Context Dependence:</strong> Performance varies based on image quality, lighting, angles</li>
                </ul>
              </div>

              <h4 className="display-8">Ethical Concerns & Bias</h4>
              <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>1. Training Data Bias</strong>
                <ul>
                  <li>Models trained on internet data inherit societal biases</li>
                  <li>Gender stereotypes (e.g., nurses as female, engineers as male)</li>
                  <li>Cultural bias toward Western/English content</li>
                  <li>Underrepresentation of certain demographics</li>
                </ul>

                <strong>2. Privacy & Surveillance</strong>
                <ul>
                  <li>Powerful search capabilities enable mass surveillance</li>
                  <li>Can identify individuals, locations, private information</li>
                  <li>Raises questions about consent and data collection</li>
                  <li><a href="https://www.unesco.org/en/artificial-intelligence">UNESCO</a> emphasizes right to privacy in AI systems</li>
                </ul>

                <strong>3. Misinformation & Deepfakes</strong>
                <ul>
                  <li>Can be used to match misleading text with images</li>
                  <li>Enables sophisticated fake content generation</li>
                  <li>Difficult to detect manipulated content</li>
                  <li>Potential for electoral interference and propaganda</li>
                </ul>

                <strong>4. Environmental Impact</strong>
                <ul>
                  <li>Training large models requires massive computational resources</li>
                  <li>Significant carbon footprint and energy consumption</li>
                  <li>Concentrates resources in wealthy organizations</li>
                  <li>Questions of sustainability and accessibility</li>
                </ul>
              </div>

              <h4 className="display-8">Responsible Development</h4>
              To address these concerns, the AI community should:
              <ul>
                <li><strong>Dataset Transparency:</strong> Document data sources, collection methods, and known biases</li>
                <li><strong>Fairness Audits:</strong> Test models across diverse demographics and scenarios</li>
                <li><strong>Privacy Protections:</strong> Implement safeguards against identifying individuals</li>
                <li><strong>Access Controls:</strong> Consider who can use powerful models and for what purposes</li>
                <li><strong>Efficiency Research:</strong> Develop smaller, more efficient models</li>
                <li><strong>Human Oversight:</strong> Keep humans in decision-making loops</li>
                <li><strong>Education:</strong> Help users understand capabilities and limitations</li>
              </ul>

              <div style={{backgroundColor: "#d1ecf1", padding: 20, borderRadius: 8, marginTop: 20}}>
                <strong>Remember:</strong> Understanding how these models work empowers us to use them responsibly, identify their limitations, and advocate for ethical AI development. As users and developers, we have a responsibility to consider the broader societal impacts of these technologies.
              </div>
            </div>
          </Tab>

          <Tab eventKey="future" title="Future Directions">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">The Evolution of Multimodal AI</h4>
              
              <div style={{marginBottom: 20}}>
                <strong>From Dual-Modal to Any-Modal</strong>
                <p>Current research is moving beyond just image-text models:</p>
                <ul>
                  <li><strong>ImageBind (Meta):</strong> Learns joint embeddings across 6+ modalities (images, text, audio, depth, thermal, IMU)</li>
                  <li><strong>Unified Models:</strong> Single model handling any combination of inputs/outputs</li>
                  <li><strong>Cross-modal Generation:</strong> Generate audio from images, images from audio, etc.</li>
                </ul>
              </div>

              <div style={{marginBottom: 20}}>
                <strong>Improved Reasoning</strong>
                <ul>
                  <li>Better compositional understanding (spatial relationships, temporal sequences)</li>
                  <li>Mathematical and logical reasoning over visual content</li>
                  <li>Chain-of-thought reasoning for complex visual questions</li>
                  <li>Integration with large language models for enhanced capabilities</li>
                </ul>
              </div>

              <div style={{marginBottom: 20}}>
                <strong>Efficiency & Accessibility</strong>
                <ul>
                  <li><strong>Model Compression:</strong> Smaller models that run on phones/edge devices</li>
                  <li><strong>Few-shot Learning:</strong> Adapt to new tasks with minimal examples</li>
                  <li><strong>Open-source Models:</strong> Democratizing access (OpenCLIP, LLaVA)</li>
                  <li><strong>Energy Efficiency:</strong> Reducing computational and environmental costs</li>
                </ul>
              </div>

              <div style={{marginBottom: 20}}>
                <strong>Embodied AI</strong>
                <ul>
                  <li>Robots that understand both language commands and visual scenes</li>
                  <li>Virtual assistants with true multimodal understanding</li>
                  <li>AR/VR applications with natural language interaction</li>
                </ul>
              </div>

              <div style={{marginBottom: 20}}>
                <strong>Medical & Scientific Applications</strong>
                <ul>
                  <li>Medical image analysis with clinical text integration</li>
                  <li>Drug discovery combining molecular structures and literature</li>
                  <li>Climate science analyzing satellite imagery with textual data</li>
                </ul>
              </div>

              <h4 className="display-8">Challenges Ahead</h4>
              <div style={{backgroundColor: "#f8f9fa", padding: 20, borderRadius: 8}}>
                <ul>
                  <li><strong>Hallucination:</strong> Models generating plausible but incorrect information</li>
                  <li><strong>Grounding:</strong> Ensuring models truly understand rather than pattern-match</li>
                  <li><strong>Evaluation:</strong> How do we measure "understanding" across modalities?</li>
                  <li><strong>Safety:</strong> Preventing harmful outputs and misuse</li>
                  <li><strong>Alignment:</strong> Ensuring models behave according to human values</li>
                </ul>
              </div>

              <div style={{backgroundColor: "#d4edda", padding: 20, borderRadius: 8, marginTop: 20}}>
                <strong>Your Role in AI's Future</strong>
                <p>As you've learned about multimodal AI, consider:</p>
                <ul>
                  <li>How can these technologies be used to benefit society?</li>
                  <li>What safeguards are needed to prevent harm?</li>
                  <li>How can we ensure equitable access and representation?</li>
                  <li>What questions should we be asking as these systems become more powerful?</li>
                </ul>
                <p>Your understanding and critical thinking about AI will help shape its responsible development and deployment!</p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default MultimodalExplain;
