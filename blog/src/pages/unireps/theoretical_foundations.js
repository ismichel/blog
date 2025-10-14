import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";


const TheoreticalFoundations = () => {
  const [activeTab, setActiveTab] = useState("why");

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Why Do Models Converge?</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          The convergence of representations across different models is not accidental—it emerges from fundamental principles of learning, optimization, and the structure of visual-linguistic data itself. Let's explore the theoretical perspectives that explain this phenomenon.
          <br /><br />
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
          style={{marginTop: 30}}
        >
          <Tab eventKey="why" title="Why Convergence?">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">1. Data Manifold Hypothesis</h4>
              <div style={{backgroundColor: "#e8f4f8", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Core Idea:</strong> Natural images and language don't occupy all possible configurations—they lie on a low-dimensional manifold within the high-dimensional input space.
                <br /><br />
                <strong>Implication:</strong> Any learning algorithm that successfully captures this manifold will discover similar structure, regardless of the path taken to get there.
                <ul style={{marginTop: 10}}>
                  <li>Dogs appear in limited poses, lighting conditions, contexts</li>
                  <li>Language describing dogs uses consistent vocabulary and grammar</li>
                  <li>The co-occurrence statistics of (image, text) constrain learned representations</li>
                </ul>
              </div>

              <h4 className="display-8">2. Optimization Landscape</h4>
              <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Core Idea:</strong> The loss landscape for multimodal learning has relatively few "good" solutions. Different optimization trajectories converge to the same basin.
                <br /><br />
                <strong>Key Observations:</strong>
                <ul style={{marginTop: 10}}>
                  <li><strong>Mode Connectivity:</strong> Different local minima are often connected by paths of similar loss</li>
                  <li><strong>Over-parameterization:</strong> Modern models have many parameters, creating multiple equivalent solutions</li>
                  <li><strong>Implicit Regularization:</strong> SGD naturally favors solutions with certain properties (e.g., flat minima)</li>
                  <li><strong>Loss Geometry:</strong> Contrastive loss creates a geometry where similar concepts must be close</li>
                </ul>
              </div>

              <h4 className="display-8">3. Inductive Biases</h4>
              <div style={{backgroundColor: "#f8d7da", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Core Idea:</strong> Despite architectural differences, common design principles guide all models toward similar solutions.
                <br /><br />
                <strong>Shared Biases:</strong>
                <ul style={{marginTop: 10}}>
                  <li><strong>Locality:</strong> Convolutions and local attention bias toward spatial coherence</li>
                  <li><strong>Hierarchy:</strong> Deep networks naturally learn hierarchical features</li>
                  <li><strong>Translation Invariance:</strong> Architectural choices promote position-independent features</li>
                  <li><strong>Compositionality:</strong> Attention mechanisms encourage compositional understanding</li>
                </ul>
              </div>

              <h4 className="display-8">4. Information Bottleneck Theory</h4>
              <div style={{backgroundColor: "#d4edda", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Core Idea:</strong> Neural networks learn to compress inputs while retaining task-relevant information. The optimal compression is largely task-dependent, not architecture-dependent.
                <br /><br />
                <strong>Formulation:</strong>
                <ul style={{marginTop: 10}}>
                  <li>Maximize mutual information I(Z; Y) between representations Z and labels Y</li>
                  <li>Minimize mutual information I(Z; X) between representations Z and inputs X</li>
                  <li>This creates a minimal sufficient statistic—the simplest representation that preserves task information</li>
                  <li>Different architectures converge to similar sufficient statistics</li>
                </ul>
              </div>

              <h4 className="display-8">5. Task-Driven Convergence</h4>
              <p>
                The contrastive learning objective itself strongly constrains learned representations:
              </p>
              <ul>
                <li><strong>Alignment:</strong> Matching pairs must be close → models learn similar concept groupings</li>
                <li><strong>Uniformity:</strong> Non-matching pairs pushed apart → models spread representations uniformly</li>
                <li><strong>Semantic Structure:</strong> Co-occurrence patterns in data enforce similar semantic relationships</li>
                <li><strong>Zero-Shot Transfer:</strong> The need to generalize encourages learning universal features</li>
              </ul>
            </div>
          </Tab>

          <Tab eventKey="when" title="When Does It Occur?">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">Conditions for Strong Convergence</h4>
              
              <div style={{backgroundColor: "#e8f4f8", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>✅ Convergence is High When:</strong>
                <ul style={{marginTop: 10}}>
                  <li><strong>Similar Training Objectives:</strong> All models use contrastive learning</li>
                  <li><strong>Sufficient Capacity:</strong> Models have enough parameters to capture data structure</li>
                  <li><strong>Adequate Training:</strong> Models trained to convergence (not underfitted)</li>
                  <li><strong>Overlapping Data Distributions:</strong> Training sets sample from similar distributions</li>
                  <li><strong>Common Concepts:</strong> Testing on concepts well-represented in all training sets</li>
                  <li><strong>Later Layers:</strong> Higher layers show more convergence than early layers</li>
                </ul>
              </div>

              <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>⚠️ Convergence is Lower When:</strong>
                <ul style={{marginTop: 10}}>
                  <li><strong>Different Objectives:</strong> E.g., contrastive vs. generative vs. discriminative</li>
                  <li><strong>Limited Capacity:</strong> Small models may not capture full data structure</li>
                  <li><strong>Under-training:</strong> Models stopped before convergence</li>
                  <li><strong>Different Data Domains:</strong> One trained on photos, another on drawings</li>
                  <li><strong>Rare Concepts:</strong> Testing on categories not in training data</li>
                  <li><strong>Early Layers:</strong> Low-level features more architecture-dependent</li>
                </ul>
              </div>

              <h4 className="display-8">Empirical Findings from Research</h4>
              <ul>
                <li><strong>Layer-wise Analysis:</strong> CKA similarity increases from ~0.4 in early layers to ~0.85 in final layers</li>
                <li><strong>Dataset Size:</strong> Convergence improves with larger, more diverse training sets</li>
                <li><strong>Architecture Families:</strong> Within family (all CNNs or all Transformers): CKA &gt; 0.9; across families: CKA ≈ 0.7-0.8</li>
                <li><strong>Fine-tuning:</strong> Task-specific fine-tuning reduces convergence slightly but structure remains</li>
              </ul>

              <h4 className="display-8">The "Lottery Ticket" Perspective</h4>
              <div style={{backgroundColor: "#f8d7da", padding: 15, borderRadius: 8, marginTop: 15}}>
                <p>
                  Some researchers propose that there are many equivalent "winning tickets" in the parameter space—different initializations and training runs find different tickets, but they all implement similar functions. This explains why convergence isn't perfect (different tickets) but is very high (all winning tickets solve the same problem similarly).
                </p>
              </div>
            </div>
          </Tab>

          <Tab eventKey="neuro" title="Neuroscience Parallels">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">Biological-Artificial Convergence</h4>
              <p>
                The same principles that drive artificial neural networks to converge may explain why biological brains develop similar representations:
              </p>

              <div style={{backgroundColor: "#e8f4f8", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Visual System Hierarchies</strong>
                <ul style={{marginTop: 10}}>
                  <li><strong>V1 (Primary Visual Cortex):</strong> Edge detectors, orientation selectivity
                    <br />→ <em>Similar to first CNN layer Gabor-like filters</em></li>
                  <li><strong>V2/V4 (Intermediate Areas):</strong> Texture, color, simple shapes
                    <br />→ <em>Similar to mid-layer CNN features</em></li>
                  <li><strong>IT (Inferotemporal Cortex):</strong> Object-selective neurons
                    <br />→ <em>Similar to high-layer CNN features</em></li>
                </ul>
              </div>

              <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Shared Constraints</strong>
                <p>Both biological and artificial systems face similar constraints:</p>
                <ul>
                  <li><strong>Energy Efficiency:</strong> Sparse coding reduces metabolic/computational cost</li>
                  <li><strong>Generalization:</strong> Must handle novel stimuli with limited training</li>
                  <li><strong>Invariance:</strong> Recognize objects despite transformations</li>
                  <li><strong>Speed:</strong> Fast inference for survival/real-time applications</li>
                  <li><strong>Noise Robustness:</strong> Function despite imperfect inputs</li>
                </ul>
              </div>

              <h4 className="display-8">Evidence from Neuroscience Studies</h4>
              <ul>
                <li><strong>fMRI Studies:</strong> Neural response patterns to images correlate with CNN activations (r ≈ 0.6-0.8)</li>
                <li><strong>Representational Similarity:</strong> Human IT cortex and CNN final layers show similar RSA patterns</li>
                <li><strong>Developmental Convergence:</strong> Infant visual systems and trained CNNs both progress from simple to complex features</li>
                <li><strong>Cross-Species:</strong> Macaque and human visual cortex show similar representational structure</li>
              </ul>

              <h4 className="display-8">Efficient Coding Hypothesis</h4>
              <div style={{backgroundColor: "#d4edda", padding: 20, borderRadius: 8, marginTop: 15}}>
                <strong>Barlow's Hypothesis (1961):</strong> Sensory systems evolved to efficiently encode natural stimuli by removing statistical redundancy.
                <br /><br />
                <strong>Modern Interpretation:</strong> Both evolution and gradient descent discover similar efficient codes for the same statistical environment (natural images). This explains convergence across:
                <ul style={{marginTop: 10, marginBottom: 0}}>
                  <li>Different species (evolution found similar solutions)</li>
                  <li>Different neural architectures (SGD found similar solutions)</li>
                  <li>Biological and artificial systems (same optimization problem)</li>
                </ul>
              </div>

              <h4 className="display-8">Implications for AI</h4>
              <p>
                Understanding why biological and artificial systems converge suggests:
              </p>
              <ul>
                <li>There may be fundamental "canonical" representations for visual understanding</li>
                <li>Neuroscience can guide architecture design toward these canonical forms</li>
                <li>Artificial models may help us understand biological computation</li>
                <li>Universal learning principles transcend substrate (neurons vs. silicon)</li>
              </ul>
            </div>
          </Tab>

          <Tab eventKey="math" title="Mathematical Framework">
            <div style={{textAlign: "justify", marginTop: 20}}>
              <h4 className="display-8">Formalizing Representational Similarity</h4>
              
              <div style={{backgroundColor: "#f8f9fa", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Setup:</strong> Consider two models f and g producing representations:
                <ul style={{marginTop: 10}}>
                  <li>f: X → Z_f (model f's representation)</li>
                  <li>g: X → Z_g (model g's representation)</li>
                  <li>Where X is input space, Z_f and Z_g are embedding spaces</li>
                </ul>
              </div>

              <h4 className="display-8">Similarity Metrics</h4>
              
              <strong>1. Centered Kernel Alignment (CKA)</strong>
              <div style={{fontFamily: "monospace", backgroundColor: "#e8f4f8", padding: 15, borderRadius: 8, margin: "10px 0 20px 0"}}>
                CKA(Z_f, Z_g) = ║H·Z_f·Z_f^T·H║_F · ║H·Z_g·Z_g^T·H║_F / 
                                (║H·Z_f·Z_f^T·H║_F · ║H·Z_g·Z_g^T·H║_F)
                <br /><br />
                where H is the centering matrix
              </div>
              <p><strong>Properties:</strong> Invariant to orthogonal transformations and isotropic scaling; ranges [0, 1]</p>

              <strong>2. Representational Similarity Analysis (RSA)</strong>
              <div style={{fontFamily: "monospace", backgroundColor: "#e8f4f8", padding: 15, borderRadius: 8, margin: "10px 0 20px 0"}}>
                RSA(f, g) = corr(RDM_f, RDM_g)
                <br /><br />
                where RDM is the representational dissimilarity matrix:
                <br />
                RDM_f[i,j] = d(f(x_i), f(x_j))
              </div>
              <p><strong>Properties:</strong> Compares pairwise distance structure; robust to monotonic transformations</p>

              <strong>3. Linear Predictability</strong>
              <div style={{fontFamily: "monospace", backgroundColor: "#e8f4f8", padding: 15, borderRadius: 8, margin: "10px 0 20px 0"}}>
                LP(f→g) = max_W ║W·Z_f - Z_g║² 
                <br /><br />
                Find best linear map from f's representations to g's
              </div>
              <p><strong>Properties:</strong> Measures if representations are linearly related; asymmetric</p>

              <h4 className="display-8">Convergence as Optimization</h4>
              <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginBottom: 20}}>
                <strong>Contrastive Learning Objective:</strong>
                <div style={{fontFamily: "monospace", margin: "10px 0"}}>
                  L = -Σ log(exp(sim(z_i, z_i^+)/τ) / Σ_j exp(sim(z_i, z_j)/τ))
                </div>
                where z_i^+ is the matching pair and z_j are negative samples.
                <br /><br />
                <strong>Key Insight:</strong> This objective is (mostly) architecture-agnostic! Any model minimizing this loss must:
                <ul style={{marginTop: 10, marginBottom: 0}}>
                  <li>Place matching pairs close together</li>
                  <li>Spread non-matching pairs uniformly</li>
                  <li>Preserve semantic relationships from data</li>
                </ul>
              </div>

              <h4 className="display-8">Identifiability Theory</h4>
              <p>
                From a theoretical ML perspective, the question is: <em>Under what conditions is the learned representation uniquely determined?</em>
              </p>
              <ul>
                <li><strong>Identifiable:</strong> If the data generating process uniquely determines the representation (up to simple transformations)</li>
                <li><strong>Over-parametrized:</strong> Modern models have many equivalent solutions, but functional form is often similar</li>
                <li><strong>Symmetries:</strong> Some variations (permutations, rotations) don't affect function</li>
              </ul>

              <div style={{backgroundColor: "#d4edda", padding: 20, borderRadius: 8, marginTop: 20}}>
                <strong>Theoretical Result:</strong> Under mild assumptions about the data distribution and assuming convergence, contrastive learning provably recovers representations that are unique up to invertible transformations. This explains why different models converge—they're all finding (essentially) the same solution!
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default TheoreticalFoundations;