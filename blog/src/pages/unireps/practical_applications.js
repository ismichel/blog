import React, { useState } from "react";
import { Tab, Tabs, Button, Alert } from "react-bootstrap";


const PracticalApplications = ({ models }) => {
  const [activeTab, setActiveTab] = useState("stitching");
  const [stitchingDemo, setStitchingDemo] = useState(null);

  const demonstrateStitching = () => {
    // Simulate model stitching
    setStitchingDemo({
      sourceModel: "CLIP",
      targetModel: "ALIGN",
      component: "Image Encoder",
      accuracyBefore: 0.847,
      accuracyAfter: 0.831,
      message: "Successfully stitched! Only 1.6% performance drop."
    });
  };

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Practical Applications of Representational Convergence</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          Understanding that different models learn similar representations opens up powerful practical applications. Let's explore how this insight enables new capabilities in model deployment, training, and development.
          <br /><br />
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
          style={{marginTop: 30}}
        >
          <Tab eventKey="stitching" title="Model Stitching">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">What is Model Stitching?</h4>
              <p>
                <span className="emph">Model stitching</span> is the ability to swap components between different models because their intermediate representations are compatible. If CLIP and ALIGN learn similar image embeddings, we can use CLIP's image encoder with ALIGN's text encoder!
              </p>

              <div style={{backgroundColor: "#e8f4f8", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>How It Works:</strong>
                <ol style={{marginTop: 10}}>
                  <li>Train models A and B independently on similar tasks</li>
                  <li>Verify representational similarity (CKA &gt; 0.7)</li>
                  <li>Replace a component from A with the corresponding component from B</li>
                  <li>Optionally fine-tune connection layers</li>
                  <li>Deploy the hybrid model</li>
                </ol>
              </div>

              <h4 className="display-8">Why Stitch Models?</h4>
              <ul>
                <li><strong>Performance:</strong> Combine strengths of different models (CLIP's vision + ALIGN's language)</li>
                <li><strong>Efficiency:</strong> Use smaller, faster components where possible</li>
                <li><strong>Specialization:</strong> Keep domain-specific encoder, swap general one</li>
                <li><strong>Privacy:</strong> Replace components trained on sensitive data</li>
              </ul>

              <div style={{marginTop: 20, marginBottom: 20}}>
                <Button variant="primary" onClick={demonstrateStitching}>
                  Demonstrate Stitching
                </Button>
              </div>

              {stitchingDemo && (
                <Alert variant="success">
                  <Alert.Heading>Stitching Result</Alert.Heading>
                  <p>
                    <strong>Source:</strong> {stitchingDemo.sourceModel} ({stitchingDemo.component})<br />
                    <strong>Target:</strong> {stitchingDemo.targetModel}<br />
                    <strong>Original Accuracy:</strong> {(stitchingDemo.accuracyBefore * 100).toFixed(1)}%<br />
                    <strong>Stitched Accuracy:</strong> {(stitchingDemo.accuracyAfter * 100).toFixed(1)}%<br />
                    <strong>Performance Drop:</strong> {((stitchingDemo.accuracyBefore - stitchingDemo.accuracyAfter) * 100).toFixed(1)}%
                  </p>
                  <hr />
                  <p className="mb-0">{stitchingDemo.message}</p>
                </Alert>
              )}

              <h4 className="display-8">Real-World Example</h4>
              <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8}}>
                <strong>Scenario:</strong> You have a CLIP model trained on general images and an industry-specific model trained on medical images. You want medical understanding with general language capabilities.
                <br /><br />
                <strong>Solution:</strong> Stitch the medical image encoder with CLIP's text encoder. Because they learned similar representational structures, they're compatible with minimal fine-tuning!
              </div>
            </div>
          </Tab>

          <Tab eventKey="merging" title="Model Merging">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">Weight Space Merging</h4>
              <p>
                If models converge to similar representations, their weights occupy similar regions of parameter space. We can <span className="emph">merge</span> them by averaging weights or using more sophisticated techniques.
              </p>

              <div style={{backgroundColor: "#e8f4f8", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Simple Average Merging:</strong>
                <div style={{fontFamily: "monospace", marginTop: 10}}>
                  θ_merged = (θ_model1 + θ_model2) / 2
                </div>
                <p style={{marginTop: 10, marginBottom: 0}}>
                  Surprisingly effective when models are trained on similar data! Often achieves performance between or even better than individual models.
                </p>
              </div>

              <h4 className="display-8">Advanced Merging Techniques</h4>
              
              <strong>1. Task Arithmetic</strong>
              <ul>
                <li>Learn task-specific directions in weight space</li>
                <li>Add/subtract these directions to control capabilities</li>
                <li>Example: θ_multilingual = θ_base + (θ_french - θ_base) + (θ_spanish - θ_base)</li>
              </ul>

              <strong>2. SLERP (Spherical Linear Interpolation)</strong>
              <ul>
                <li>Interpolate along geodesics in weight space</li>
                <li>Preserves normalization and representational geometry</li>
                <li>Better than linear averaging for normalized embeddings</li>
              </ul>

              <strong>3. Fisher-Weighted Merging</strong>
              <ul>
                <li>Weight parameters by their importance (Fisher information)</li>
                <li>Preserve critical parameters, average less important ones</li>
                <li>Maintains performance better than simple averaging</li>
              </ul>

              <div style={{backgroundColor: "#d4edda", padding: 20, borderRadius: 8, marginTop: 20}}>
                <strong>Why Merging Works:</strong> Representational convergence means models have learned similar functions. In weight space, this translates to parameters occupying nearby regions. Averaging finds a point that approximates both functions, often with minimal performance loss.
              </div>

              <h4 className="display-8">Applications</h4>
              <ul>
                <li><strong>Multi-Task Models:</strong> Merge specialists into generalist</li>
                <li><strong>Continual Learning:</strong> Merge new knowledge without forgetting</li>
                <li><strong>Ensemble Without Inference Cost:</strong> Get ensemble benefits in single model</li>
                <li><strong>Federated Learning:</strong> Merge models trained on distributed data</li>
              </ul>
            </div>
          </Tab>

          <Tab eventKey="transfer" title="Transfer & Reuse">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">Zero-Shot Transfer Across Models</h4>
              <p>
                Representational convergence enables <span className="emph">cross-model transfer</span>: train a classifier on Model A's representations, deploy on Model B.
              </p>

              <div style={{backgroundColor: "#e8f4f8", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Example Workflow:</strong>
                <ol style={{marginTop: 10}}>
                  <li>Extract embeddings from CLIP for your dataset</li>
                  <li>Train a linear classifier on these embeddings</li>
                  <li>Deploy using ALIGN embeddings (no retraining!)</li>
                  <li>Performance degrades only ~5-10% despite different models</li>
                </ol>
              </div>

              <h4 className="display-8">Knowledge Distillation</h4>
              <p>
                Use a large model's representations to train a smaller, faster model:
              </p>
              <ul>
                <li><strong>Traditional Distillation:</strong> Match output distributions</li>
                <li><strong>Representation Distillation:</strong> Match intermediate embeddings</li>
                <li><strong>Cross-Model Distillation:</strong> Distill from any model with similar representations</li>
              </ul>

              <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Key Insight:</strong> Because large models converge on similar representations, distillation targets are interchangeable. Train once, distill from any teacher!
              </div>

              <h4 className="display-8">Representation Reuse</h4>
              <strong>Scenario 1: New Modality</strong>
              <ul>
                <li>Have: Trained image-text model</li>
                <li>Want: Add audio modality</li>
                <li>Solution: Train audio encoder to match existing embedding space</li>
                <li>Benefit: Leverage existing text and image understanding</li>
              </ul>

              <strong>Scenario 2: Domain Adaptation</strong>
              <ul>
                <li>Have: Model trained on natural images</li>
                <li>Want: Work on medical images</li>
                <li>Solution: Fine-tune medical encoder to match general representation structure</li>
                <li>Benefit: Transfer semantic understanding to new domain</li>
              </ul>

              <div style={{backgroundColor: "#d4edda", padding: 20, borderRadius: 8, marginTop: 20}}>
                <strong>Research Finding:</strong> Models fine-tuned on different downstream tasks maintain high representational similarity (CKA ≈ 0.75-0.85) in early layers, enabling significant reuse of learned features.
              </div>
            </div>
          </Tab>

          <Tab eventKey="development" title="Development Benefits">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">Faster Model Development</h4>
              <p>
                Understanding representational convergence accelerates the development cycle:
              </p>

              <div style={{backgroundColor: "#e8f4f8", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>1. Architecture Search</strong>
                <ul style={{marginTop: 10}}>
                  <li>Focus on efficiency rather than representation quality</li>
                  <li>If convergence is guaranteed, optimize for speed/size</li>
                  <li>Use smaller proxy models during search</li>
                  <li>Validate final architecture produces converged representations</li>
                </ul>

                <strong>2. Hyperparameter Tuning</strong>
                <ul>
                  <li>Measure convergence to known good models as optimization target</li>
                  <li>Early stopping when representational similarity plateaus</li>
                  <li>Transfer hyperparameters across similar architectures</li>
                </ul>

                <strong>3. Training Validation</strong>
                <ul>
                  <li>Check intermediate representations against reference models</li>
                  <li>Detect training bugs when representations diverge unexpectedly</li>
                  <li>Verify new technique doesn't break learned structure</li>
                </ul>
              </div>

              <h4 className="display-8">Debugging and Interpretability</h4>
              <ul>
                <li><strong>Universal Features:</strong> Features consistent across models are more likely meaningful</li>
                <li><strong>Anomaly Detection:</strong> Representations that diverge indicate potential issues</li>
                <li><strong>Probing:</strong> Probe classifiers transfer across models with similar representations</li>
                <li><strong>Explanation:</strong> Can use explanations from one model to understand another</li>
              </ul>

              <h4 className="display-8">Efficient Experimentation</h4>
              <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Practical Workflow:</strong>
                <ol style={{marginTop: 10, marginBottom: 0}}>
                  <li>Experiment with small, fast model</li>
                  <li>Verify it converges to similar representations as SOTA</li>
                  <li>Only scale up if convergence is good</li>
                  <li>Saves compute: train 10 small models vs 1 large model</li>
                </ol>
              </div>

              <h4 className="display-8">Quality Assurance</h4>
              <p>
                Use representational similarity as a quality metric:
              </p>
              <ul>
                <li><strong>Model Updates:</strong> Ensure new version maintains representation quality</li>
                <li><strong>Deployment:</strong> Check production model matches research model</li>
                <li><strong>Quantization:</strong> Verify compressed model preserves representations</li>
                <li><strong>Hardware Migration:</strong> Confirm representations survive platform changes</li>
              </ul>

              <div style={{backgroundColor: "#d4edda", padding: 20, borderRadius: 8, marginTop: 20}}>
                <strong>Best Practice:</strong> Establish a "representation test suite"—a set of reference embeddings from validated models. Check new models against this suite before deployment.
              </div>
            </div>
          </Tab>

          <Tab eventKey="future" title="Future Directions">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">Emerging Research Directions</h4>

              <strong>1. Universal Representation Spaces</strong>
              <div style={{backgroundColor: "#e8f4f8", padding: 15, borderRadius: 8, marginTop: 10, marginBottom: 20}}>
                <p>Goal: Create a single, shared embedding space that all models can plug into.</p>
                <ul style={{marginBottom: 0}}>
                  <li>Any model can encode to this space</li>
                  <li>Any application can consume from this space</li>
                  <li>Enables true modularity in AI systems</li>
                </ul>
              </div>

              <strong>2. Compositional Model Building</strong>
              <div style={{backgroundColor: "#e8f4f8", padding: 15, borderRadius: 8, marginTop: 10, marginBottom: 20}}>
                <p>Build complex models by composing simpler components:</p>
                <ul style={{marginBottom: 0}}>
                  <li>Library of verified, converged encoders</li>
                  <li>Mix and match for specific applications</li>
                  <li>Formal guarantees on composed model behavior</li>
                </ul>
              </div>

              <strong>3. Automatic Architecture Discovery</strong>
              <ul>
                <li>Search for architectures that converge to target representations</li>
                <li>Use representation similarity as search objective</li>
                <li>Discover efficient architectures that match SOTA representations</li>
              </ul>

              <strong>4. Cross-Modal Universal Models</strong>
              <ul>
                <li>ImageBind: Single model for 6+ modalities</li>
                <li>Any-to-Any models: Input any modality, output any modality</li>
                <li>Leverages representational convergence across modalities</li>
              </ul>

              <h4 className="display-8">Open Questions</h4>
              <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <ul style={{marginBottom: 0}}>
                  <li>What are the theoretical limits of representational convergence?</li>
                  <li>Can we predict convergence without training to completion?</li>
                  <li>How does model capacity affect convergence patterns?</li>
                  <li>What features are truly universal vs. dataset-specific?</li>
                  <li>Can we enforce convergence during training for better interoperability?</li>
                </ul>
              </div>

              <h4 className="display-8">Industry Impact</h4>
              <strong>Model Marketplaces</strong>
              <ul>
                <li>Standardized embedding spaces enable model interchangeability</li>
                <li>Compare models objectively via representation similarity</li>
                <li>Guarantee backward compatibility</li>
              </ul>

              <strong>Federated and Collaborative AI</strong>
              <ul>
                <li>Different organizations train models independently</li>
                <li>Merge or stitch for collective benefit</li>
                <li>Privacy-preserving through representation alignment</li>
              </ul>

              <strong>Efficient AI Development</strong>
              <ul>
                <li>Reduce redundant training: reuse converged representations</li>
                <li>Focus innovation on novel components</li>
                <li>Lower barriers to entry: start from validated representations</li>
              </ul>

              <div style={{backgroundColor: "#d4edda", padding: 20, borderRadius: 8, marginTop: 20}}>
                <strong>The Vision:</strong> A future where AI models are modular, interoperable, and composable—much like software libraries today. Representational convergence is the foundation that makes this vision possible.
              </div>
            </div>
          </Tab>
        </Tabs>

        <div style={{textAlign: "justify", marginTop: 30}}>
          <h4 className="display-8">Try It Yourself</h4>
          <p>
            The cross-model comparison tool above demonstrates these principles. Upload different types of images and observe how models produce similar matching scores—evidence of representational convergence in action!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PracticalApplications;