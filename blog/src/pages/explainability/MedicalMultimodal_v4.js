import React, { useEffect, useState } from "react";
import DimmerSwitchVisual from "./DimmerSwitchVisual";
import BlackBoxProblem from "./BlackBoxProblem";
import InformationFlow from "./InformationFlow";
import AttentionFusion from "./AttentionFusion";
import ExplanationComparison from "./ExplanationComparison";

const ExplainableMultimodalUpdated = () => {
  const [selectedImage, setSelectedImage] = useState("dog");
  const [selectedText, setSelectedText] = useState("a golden retriever");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '60px 40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.6',
      color: '#2c3e50',
      backgroundColor: '#ffffff'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '80px',
        borderBottom: '1px solid #e8e8e8',
        paddingBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '300',
          color: '#1a1a1a',
          marginBottom: '20px',
          letterSpacing: '-0.02em',
          lineHeight: '1.2'
        }}>
          From Black Box to Glass Box: Explainability as a Lens on Multimodal Representation Learning
        </h1>
        <p style={{
          fontSize: '24px',
          color: '#666',
          fontWeight: '300',
          marginBottom: '30px',
          fontStyle: 'italic'
        }}>
          An Interactive Tutorial with Applications to Medical AI
        </p>
        <div style={{
          width: '60px',
          height: '2px',
          backgroundColor: '#667eea',
          margin: '0 auto'
        }}></div>
      </header>

      {/* Main Content */}
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Introduction - UPDATED: Medical AI Focus */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            The Multimodal Revolution in Medical AI
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Medical AI is experiencing explosive growth. From just 3 papers in 2018, the field expanded 
            to 150 papers by 2024—a 50-fold increase in six years. Models like CLIP bridge vision and 
            language, GPT-4V integrates text and images seamlessly, and medical systems like MedCLIP 
            combine radiology with clinical notes to achieve unprecedented diagnostic accuracy.
          </p>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Nearly half of all multimodal medical AI research combines radiology images with clinical 
            text—a combination that's readily available through PACS (Picture Archiving and Communication 
            Systems) and EHRs (Electronic Health Records). This represents "low-hanging fruit" where 
            substantial performance gains can be achieved with relatively straightforward fusion techniques: 
            apply a pre-trained encoder to imaging data, concatenate with clinical variables, and pass 
            through a final prediction layer.
          </p>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Yet despite this success, multimodal medical AI systems remain largely research prototypes, 
            lagging behind unimodal models in clinical deployment. Why? Because we don't fully understand 
            what these models learn—and critically, we don't know if different architectures learn similar 
            things.
          </p>

          <div style={{
            backgroundColor: '#e3f2fd',
            border: '2px solid #2196f3',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            borderLeft: '6px solid #2196f3'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1565c0',
              marginBottom: '15px'
            }}>
              The Core Question: Representation Convergence
            </h3>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              color: '#555',
              marginBottom: '15px'
            }}>
              If models trained with different architectures or fusion strategies converge on similar 
              internal representations when processing the same medical data, what does that tell us? 
              Does it mean they're learning genuine medical concepts rather than architecture-specific 
              artifacts?
            </p>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              color: '#555',
              margin: 0
            }}>
              This question sits at the intersection of explainability and representation learning—
              and it's crucial for clinical deployment. Can explainability metrics help us quantify 
              when different models converge on similar representations? This tutorial explores these 
              questions through interactive examples from medical AI.
            </p>
          </div>

          <div style={{
            backgroundColor: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            borderLeft: '6px solid #ffc107'
          }}>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#856404',
              marginBottom: '15px'
            }}>
              A Motivating Example: When Models Learn the Wrong Thing
            </h4>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              margin: 0,
              color: '#856404'
            }}>
              A radiologist examines a chest X-ray showing possible COVID-19 pneumonia. The AI 
              confidently predicts "98% COVID-19 positive." But when researchers investigated, they 
              discovered the model wasn't looking at lung pathology at all—it was reading the hospital 
              metadata printed in the corner of the image. The model achieved high accuracy by exploiting 
              spurious correlations, not by learning genuine medical representations.
            </p>
          </div>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            This failure reveals why understanding representations matters. When we deploy multimodal AI 
            in medicine, we're not just asking "does it work?" but "what has it learned?" and crucially, 
            "is that learning consistent across different architectures?" If a CLIP-based model and a 
            custom fusion architecture both attend to the same anatomical features for "pneumonia," it 
            suggests robust learning. If they diverge, we need to understand why.
          </p>

          <div style={{
            backgroundColor: '#f3e5f5',
            border: '2px solid #9c27b0',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            borderLeft: '6px solid #9c27b0'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#6a1b9a',
              marginBottom: '15px'
            }}>
              🧠 The UniReps Connection
            </h3>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              color: '#555',
              marginBottom: '15px'
            }}>
              This question—whether different neural models converge on similar representations—extends 
              beyond artificial systems. In neuroscience, expert radiologists develop remarkably consistent 
              patterns of neural activation when identifying pathology, suggesting biological neural networks 
              also converge on similar representations through training.
            </p>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              color: '#555',
              margin: 0
            }}>
              By studying representation similarity in multimodal AI systems, we may uncover general 
              principles of learning that transcend individual architectures—whether biological or 
              artificial. And explainability techniques give us the tools to study this empirically.
            </p>
          </div>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            This blog post is an interactive tutorial that explores how explainability techniques serve 
            dual purposes: they make individual models trustworthy for clinical deployment, AND they 
            provide tools for studying whether different models converge on similar representations. 
            Through examples from medical AI—where the stakes are highest—we'll see how attention 
            visualization, attribution methods, and embedding analysis illuminate both individual model 
            behavior and cross-model similarity.
          </p>

          <div style={{
            backgroundColor: '#e8f5e9',
            borderRadius: '12px',
            padding: '30px',
            border: '2px solid #4caf50'
          }}>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#2e7d32',
              marginBottom: '15px'
            }}>
              What You'll Learn
            </h4>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>
                How information flows through multimodal medical AI systems
              </li>
              <li style={{ marginBottom: '8px' }}>
                Why the fusion layer provides a "glass box window" into learned representations
              </li>
              <li style={{ marginBottom: '8px' }}>
                How different explainability methods reveal different aspects of representations
              </li>
              <li style={{ marginBottom: '8px' }}>
                How explainability techniques enable cross-model comparison
              </li>
              <li style={{ marginBottom: '8px' }}>
                What representation convergence means for clinical deployment
              </li>
            </ul>
          </div>
        </section>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>

        {/* Section 1: The Spectrum */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            The Explainability Spectrum
          </h2>
          
          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Think of AI explainability like a dimmer switch rather than an on/off button. At one end, you've got 
            completely opaque systems—those mysterious deep learning models that somehow recognize patterns but 
            can't tell you why. At the other end, there are simple decision trees where every choice is crystal clear.
          </p>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Medical multimodal AI lives somewhere in the messy middle. We can visualize attention maps showing which 
            image regions correspond to which clinical notes, but mysteries remain about how these models learn abstract 
            medical concepts like "disease severity" or "treatment urgency."
          </p>

          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            padding: '30px',
            marginTop: '30px'
          }}>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '15px' }}>
              <strong>Integration point:</strong> Add your <code>DimmerSwitchVisual</code> component here to show 
              the interactive spectrum visualization.
            </p>
          </div>
        </section>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>

        {/* Section 2: The Black Box Problem */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            The Black Box Problem: Why Understanding Representations Matters
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            The opacity problem in unimodal AI is already challenging. In multimodal systems, it's exponentially worse. 
            You're not just dealing with one black box—you're dealing with multiple black boxes that interact in 
            complex, often unpredictable ways.
          </p>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            But there's a deeper issue: even when multiple models achieve similar performance, they might learn 
            completely different representations. Without explainability, we can't tell if convergence is happening 
            at the representational level or just at the output level.
          </p>

          <div style={{
            backgroundColor: '#fff',
            border: '3px solid #e74c3c',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#e74c3c',
              marginBottom: '20px'
            }}>
              The Amplified Challenges
            </h3>
            
            <ul style={{
              fontSize: '17px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '15px' }}>
                <strong>Validation Complexity:</strong> We need to validate not just performance, but whether models 
                learn the right representations
              </li>
              <li style={{ marginBottom: '15px' }}>
                <strong>Model Drift:</strong> Without understanding representations, we can't detect when models start 
                learning spurious correlations
              </li>
              <li style={{ marginBottom: '15px' }}>
                <strong>Cross-Model Comparison:</strong> How do we know if different architectures learn similar 
                underlying concepts?
              </li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            padding: '30px',
            marginTop: '30px'
          }}>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '15px' }}>
              <strong>Integration point:</strong> Add your <code>BlackBoxProblem</code> component with the COVID-Net 
              case study visualization here.
            </p>
          </div>
        </section>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>

        {/* Section 3: Information Flow */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            How Information Flows Through Multimodal Models
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Let's trace how data transforms from raw inputs to final predictions in multimodal AI. Understanding this 
            flow reveals where representations are formed—and where we can probe them with explainability techniques.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#ffebee',
              borderRadius: '12px',
              padding: '25px',
              border: '2px solid #f44336'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚠️</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#c62828',
                marginBottom: '10px'
              }}>
                Opaque: Encoders
              </h4>
              <p style={{ fontSize: '15px', color: '#555', margin: 0 }}>
                Complex transformations with millions of parameters. Hard to trace exactly why features emerge. 
                But can we compare encoder representations across models?
              </p>
            </div>

            <div style={{
              backgroundColor: '#e8f5e9',
              borderRadius: '12px',
              padding: '25px',
              border: '2px solid #4caf50'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>✓</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2e7d32',
                marginBottom: '10px'
              }}>
                Inspectable: Embeddings
              </h4>
              <p style={{ fontSize: '15px', color: '#555', margin: 0 }}>
                Vector representations we can measure, visualize, and compare. Do different models create similar 
                embedding spaces?
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff9c4',
              borderRadius: '12px',
              padding: '25px',
              border: '2px solid #fbc02d'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>⭐</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#f57c00',
                marginBottom: '10px'
              }}>
                Glass Box: Fusion
              </h4>
              <p style={{ fontSize: '15px', color: '#555', margin: 0 }}>
                Cross-attention shows exactly how modalities interact—the key window for understanding and comparing 
                representations.
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            padding: '30px',
            marginTop: '30px'
          }}>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '15px' }}>
              <strong>Integration point:</strong> Add your <code>InformationFlow</code> component to visualize the 
              complete pipeline here.
            </p>
          </div>
        </section>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>

        {/* Section 4: Attention & Fusion - UPDATED */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            Cross-Modal Attention: The Glass Box Window
          </h2>

          <div style={{
            backgroundColor: '#fff9c4',
            border: '3px solid #fbc02d',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px' }}>⭐</div>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#555',
              margin: 0,
              textAlign: 'center'
            }}>
              <strong>This is THE key insight:</strong> The fusion layer, where modalities interact through 
              cross-attention, provides a natural window into the model's reasoning process—and a way to compare 
              representations across different models.
            </p>
          </div>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Cross-attention weights explicitly show which image regions correspond to which text tokens or clinical 
            variables. When the model processes "pneumonia" in a radiology report, we can see it attending to specific 
            lung regions. This is multimodal reasoning made visible!
          </p>

          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#667eea',
            marginBottom: '20px',
            marginTop: '40px'
          }}>
            Explainability as a Lens on Representation Learning
          </h3>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            When we visualize attention weights or compute feature attributions, we're not just explaining individual 
            predictions—we're <strong>probing the model's learned representations</strong>. These explainability tools 
            reveal what the model has encoded: which image features correspond to which text concepts, how modalities 
            are aligned, and what relationships the model has discovered.
          </p>

          <div style={{
            backgroundColor: '#e3f2fd',
            border: '2px solid #2196f3',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '24px'
          }}>
            <h4 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1565c0',
              marginBottom: '15px'
            }}>
              The Key Reframing
            </h4>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
              Crucially, explainability techniques give us a methodology for comparing representations ACROSS different 
              models. If we train two different architectures (say, early fusion vs. late fusion) on the same medical 
              imaging data, we can use attention visualization to ask:
            </p>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li>Do they learn to attend to similar anatomical features?</li>
              <li>Do their cross-modal alignments converge?</li>
              <li>What does similarity or divergence tell us about the representations they've learned?</li>
            </ul>
          </div>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            This reframes explainability: not just as a tool for trust, but as an <strong>empirical lens for studying 
            representation learning itself</strong>.
          </p>

          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            padding: '30px',
            marginTop: '30px'
          }}>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '15px' }}>
              <strong>Integration point:</strong> Add your <code>AttentionFusion</code> component to show interactive 
              attention weights here.
            </p>
          </div>
        </section>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>

        {/* Section 5: Explanation Methods */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            Explanation Methods: Different Views of Representations
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Different explanation methods reveal different aspects of learned representations. Interestingly, they 
            sometimes disagree! Understanding these methods helps us probe what models learn—and potentially compare 
            representations across models.
          </p>

          <div style={{
            backgroundColor: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <h4 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#856404',
              marginBottom: '15px'
            }}>
              When Methods Disagree—What Does It Mean?
            </h4>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '15px' }}>
              Different explanation methods can highlight different regions for the same prediction. This isn't a 
              bug—it's because they measure different aspects of learned representations:
            </p>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li><strong>Attention:</strong> Where the model looks (correlation in representation space)</li>
              <li><strong>SHAP:</strong> What features matter most (contribution to representation)</li>
              <li><strong>Grad-CAM:</strong> What changes prediction (sensitivity of representations)</li>
              <li><strong>Integrated Gradients:</strong> Path of attribution (causal chain through representations)</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            padding: '30px',
            marginTop: '30px'
          }}>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '15px' }}>
              <strong>Integration point:</strong> Add your <code>ExplanationComparison</code> component to show 
              interactive comparisons here.
            </p>
          </div>
        </section>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>

        {/* NEW Section 5.5: Cross-Model Similarity */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            Cross-Model Similarity and Alignment: The UniReps Question
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Here's where explainability intersects with fundamental questions about representation learning: 
            <strong>If different multimodal models trained on similar data converge on similar internal representations, 
            what does that tell us?</strong>
          </p>

          <div style={{
            backgroundColor: '#e3f2fd',
            border: '3px solid #2196f3',
            borderRadius: '12px',
            padding: '35px',
            marginBottom: '30px',
            borderLeft: '6px solid #2196f3'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1565c0',
              marginBottom: '20px'
            }}>
              The Representation Convergence Hypothesis
            </h3>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#555', margin: 0 }}>
              When multiple models—whether using different architectures, training procedures, or even different 
              initialization—learn similar representations, it suggests these representations capture fundamental 
              structure in the data. In medical AI, if both a CLIP-based model and a custom fusion architecture 
              attend to the same lung regions when processing "pneumonia," this convergence suggests these features 
              are universally important, not architecture-specific artifacts.
            </p>
          </div>

          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#667eea',
            marginBottom: '20px',
            marginTop: '40px'
          }}>
            Can Explainability Metrics Quantify Convergence?
          </h3>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            The explainability techniques we've discussed provide potential metrics for measuring representation 
            similarity across models:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #667eea',
              borderRadius: '12px',
              padding: '25px'
            }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#667eea',
                marginBottom: '10px'
              }}>
                1. Attention Pattern Similarity
              </h4>
              <p style={{ fontSize: '15px', color: '#555', margin: 0 }}>
                Do different models' attention maps correlate when processing the same input? High correlation 
                suggests similar cross-modal representations.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #4caf50',
              borderRadius: '12px',
              padding: '25px'
            }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2e7d32',
                marginBottom: '10px'
              }}>
                2. Attribution Consistency
              </h4>
              <p style={{ fontSize: '15px', color: '#555', margin: 0 }}>
                Do SHAP values or Integrated Gradients highlight similar features across models? Consistency 
                indicates aligned representations.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #ff9800',
              borderRadius: '12px',
              padding: '25px'
            }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#e65100',
                marginBottom: '10px'
              }}>
                3. Embedding Alignment
              </h4>
              <p style={{ fontSize: '15px', color: '#555', margin: 0 }}>
                Can we measure the geometric similarity of multimodal embeddings across architectures using 
                techniques like CKA or RSA?
              </p>
            </div>
          </div>

          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#667eea',
            marginBottom: '20px',
            marginTop: '40px'
          }}>
            Open Research Questions
          </h3>

          <div style={{
            backgroundColor: '#f8f9fa',
            border: '2px solid #667eea',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
              These questions remain largely unexplored in multimodal medical AI:
            </p>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Architecture Comparison:</strong> Do early fusion and late fusion architectures converge on 
                similar cross-modal representations despite different training dynamics?
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Universal Concepts:</strong> Are there "universal" medical concepts (inflammation, mass effect, 
                edema) that ALL models represent similarly, regardless of architecture?
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Predictability:</strong> Can we predict when models will have aligned representations based on 
                their training data and objectives?
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Explanation-Representation Link:</strong> Does representation similarity correlate with explanation 
                consistency—and if not, what does that divergence tell us?
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Transfer Learning:</strong> Do models with more similar representations enable better knowledge 
                transfer between architectures or domains?
              </li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#667eea',
            marginBottom: '20px',
            marginTop: '40px'
          }}>
            Why This Matters for Medical AI
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#e8f5e9',
              borderRadius: '12px',
              padding: '25px',
              border: '2px solid #4caf50'
            }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2e7d32',
                marginBottom: '15px'
              }}>
                ✓ If Models Converge
              </h4>
              <ul style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#555',
                paddingLeft: '20px',
                margin: 0
              }}>
                <li>Robustness: Learned features reflect genuine medical patterns</li>
                <li>Transferability: Knowledge transfers easily between architectures</li>
                <li>Reliability: Convergence provides confidence for deployment</li>
              </ul>
            </div>

            <div style={{
              backgroundColor: '#ffebee',
              borderRadius: '12px',
              padding: '25px',
              border: '2px solid #f44336'
            }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#c62828',
                marginBottom: '15px'
              }}>
                ⚠ If Models Diverge
              </h4>
              <ul style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#555',
                paddingLeft: '20px',
                margin: 0
              }}>
                <li>Architecture-dependent biases we need to understand</li>
                <li>Potentially brittle learned features</li>
                <li>Need for more careful validation before deployment</li>
              </ul>
            </div>
          </div>

          <div style={{
            backgroundColor: '#fff9c4',
            borderRadius: '12px',
            padding: '30px',
            marginTop: '30px',
            border: '2px solid #fbc02d',
            borderLeft: '6px solid #fbc02d'
          }}>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              color: '#555',
              margin: 0
            }}>
              <strong style={{ color: '#f57c00' }}>The Research Frontier:</strong> Understanding cross-model 
              representation similarity in multimodal medical AI could inform better model selection, ensemble 
              methods, and transfer learning strategies. The explainability techniques discussed in this tutorial 
              provide the methodological tools to study these questions empirically—we just need to ask them.
            </p>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            padding: '30px',
            marginTop: '30px'
          }}>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '15px' }}>
              <strong>Visual opportunity:</strong> This would be an excellent place for a side-by-side comparison 
              visualization showing attention patterns from two hypothetical models on the same medical image + text pair. 
              Even if illustrative rather than from real data, it would make the concept concrete.
            </p>
          </div>
        </section>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>

        {/* Section 6: Real-World Challenges */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            Real-World Challenges: Missing Data & Research Disparities
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Most multimodal AI assumes data completeness: all modalities must be available for every patient. But 
            clinical reality is messy. Data silos, retrospective constraints, privacy concerns, and workflow variability 
            all create missing data problems.
          </p>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Understanding how representations adapt when modalities are missing—and whether different models adapt 
            similarly—is crucial for deployment.
          </p>

          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#667eea',
            marginBottom: '20px'
          }}>
            Systematic Disparities in Development
          </h3>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Systematic reviews of multimodal medical AI reveal striking imbalances in where and how research is conducted:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #ff9800',
              borderRadius: '12px',
              padding: '25px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🏥</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#e65100',
                marginBottom: '10px'
              }}>
                Medical Disciplines
              </h4>
              <p style={{ fontSize: '15px', color: '#555', margin: 0 }}>
                Nervous and respiratory systems dominate. Musculoskeletal and urinary systems severely underrepresented.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #9c27b0',
              borderRadius: '12px',
              padding: '25px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#6a1b9a',
                marginBottom: '10px'
              }}>
                Modality Combinations
              </h4>
              <p style={{ fontSize: '15px', color: '#555', margin: 0 }}>
                Radiology + text is 50% of papers. Radiology + pathology integration remains rare and challenging.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #f44336',
              borderRadius: '12px',
              padding: '25px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎯</div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#c62828',
                marginBottom: '10px'
              }}>
                Task Focus
              </h4>
              <p style={{ fontSize: '15px', color: '#555', margin: 0 }}>
                Automated diagnosis dominates. Disease progression and survival prediction are understudied despite high clinical value.
              </p>
            </div>
          </div>
        </section>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>

        {/* Section 7: Future Directions - UPDATED */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            The Path Forward: Research Directions
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Medical foundational models (which are inherently multimodal) are accelerating progress on both explainability 
            and representation learning. As these models become more prevalent, the questions we've explored become more 
            urgent.
          </p>

          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#667eea',
            marginBottom: '20px',
            marginTop: '40px'
          }}>
            Key Research Directions
          </h3>

          <div style={{ marginBottom: '30px' }}>
            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #667eea',
              borderRadius: '12px',
              padding: '25px',
              marginBottom: '20px'
            }}>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#667eea',
                marginBottom: '15px'
              }}>
                1. Explainability for Cross-Model Comparison
              </h4>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                Develop standardized metrics using explainability techniques (attention similarity, attribution consistency, 
                embedding alignment) to quantify representation similarity across multimodal architectures. This requires 
                both methodological innovation and large-scale empirical studies.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #4caf50',
              borderRadius: '12px',
              padding: '25px',
              marginBottom: '20px'
            }}>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#2e7d32',
                marginBottom: '15px'
              }}>
                2. Representation-Aware Missing Data Handling
              </h4>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                When modalities are missing, how do representations adapt? Do different models adapt similarly? 
                Understanding this could improve robustness and enable more reliable deployment with incomplete data.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #ff9800',
              borderRadius: '12px',
              padding: '25px',
              marginBottom: '20px'
            }}>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#e65100',
                marginBottom: '15px'
              }}>
                3. Universal Medical Representations
              </h4>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                Can we identify medical concepts that are represented similarly across all models? These "universal 
                representations" could inform better pre-training objectives and transfer learning strategies.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              border: '2px solid #9c27b0',
              borderRadius: '12px',
              padding: '25px'
            }}>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#6a1b9a',
                marginBottom: '15px'
              }}>
                4. Public Benchmarks for Representation Similarity
              </h4>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                We need standardized datasets and evaluation protocols to compare representations across models. 
                This would enable systematic study of when and why models converge on similar representations.
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: '#e8f5e9',
            borderRadius: '12px',
            padding: '35px',
            marginTop: '50px',
            borderLeft: '6px solid #4caf50'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2e7d32',
              marginBottom: '20px'
            }}>
              Conclusion: From Explanation to Understanding
            </h3>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#555',
              marginBottom: '20px'
            }}>
              Multimodal AI in medicine has proven its performance value. Recent research shows substantial gains from 
              combining radiology images with clinical text. But performance alone isn't enough for deployment.
            </p>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#555',
              marginBottom: '20px'
            }}>
              Through this tutorial, we've seen how explainability techniques—from attention visualization to 
              gradient-based methods—serve dual purposes: they make individual models trustworthy AND provide tools 
              for studying representation learning across models.
            </p>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#555',
              marginBottom: '20px'
            }}>
              The question of whether different multimodal medical AI systems converge on similar representations—and 
              what that convergence means—remains largely unexplored. But the methods we've discussed offer a path 
              forward: using attention visualization, attribution methods, and embedding analysis to empirically study 
              representation similarity across models, architectures, and training paradigms.
            </p>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#555',
              margin: 0
            }}>
              <strong style={{ color: '#2e7d32' }}>
                The fusion layer gives us a natural window into multimodal reasoning. Early fusion architectures make 
                this window larger and clearer. Now it's time to look through that window not just at individual models, 
                but to compare what different models see—and understand what representation convergence tells us about 
                building reliable, trustworthy medical AI systems.
              </strong>
            </p>
          </div>
        </section>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>

        {/* Recommended Readings & Resources */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            Recommended Readings & Resources
          </h2>

          <div style={{
            backgroundColor: '#e3f2fd',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            border: '2px solid #2196f3'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#1565c0',
              marginBottom: '20px'
            }}>
              📚 Foundational Papers on Multimodal AI
            </h3>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>CLIP (OpenAI):</strong> Radford et al., "Learning Transferable Visual Models From Natural Language Supervision" (2021)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>ALBEF (Salesforce):</strong> Li et al., "Align before Fuse: Vision and Language Representation Learning with Momentum Distillation" (2021)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Flamingo (DeepMind):</strong> Alayrac et al., "Flamingo: a Visual Language Model for Few-Shot Learning" (2022)
              </li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#fff3e0',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            border: '2px solid #ff9800'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#e65100',
              marginBottom: '20px'
            }}>
              🏥 Multimodal AI in Medicine
            </h3>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>MedCLIP:</strong> Medical vision-language models
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Medical Foundation Models:</strong> Moor et al., "Foundation Models for Generalist Medical Artificial Intelligence" (2023)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Systematic Reviews:</strong> Recent surveys of multimodal medical AI (add specific citations)
              </li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#f3e5f5',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            border: '2px solid #9c27b0'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#6a1b9a',
              marginBottom: '20px'
            }}>
              🔍 Explainability Methods & Techniques
            </h3>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Attention Visualization:</strong> Xu et al., "Show, Attend and Tell" (2015)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>SHAP:</strong> Lundberg & Lee, "A Unified Approach to Interpreting Model Predictions" (2017)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Grad-CAM:</strong> Selvaraju et al., "Grad-CAM: Visual Explanations from Deep Networks" (2017)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Integrated Gradients:</strong> Sundararajan et al., "Axiomatic Attribution for Deep Networks" (2017)
              </li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#e8f5e9',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            border: '2px solid #4caf50'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#2e7d32',
              marginBottom: '20px'
            }}>
              🔗 Representation Learning & Alignment
            </h3>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>CKA (Centered Kernel Alignment):</strong> Kornblith et al., "Similarity of Neural Network Representations" (2019)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>RSA (Representational Similarity Analysis):</strong> Kriegeskorte et al., "Representational similarity analysis" (2008)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Model Stitching:</strong> Bansal et al., "Revisiting Model Stitching to Compare Neural Representations" (2021)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>UniReps Workshop:</strong> Proceedings and papers on unifying representations in neural models
              </li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#fff9c4',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            border: '2px solid #fbc02d'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#f57c00',
              marginBottom: '20px'
            }}>
              🛠️ Tools & Frameworks
            </h3>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>SHAP Library:</strong> <a href="https://github.com/slundberg/shap" style={{ color: '#667eea' }}>github.com/slundberg/shap</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Captum:</strong> <a href="https://captum.ai" style={{ color: '#667eea' }}>captum.ai</a> - PyTorch interpretability library
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Hugging Face Transformers:</strong> Pre-trained multimodal models with attention visualization
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>OpenAI CLIP:</strong> <a href="https://github.com/openai/CLIP" style={{ color: '#667eea' }}>github.com/openai/CLIP</a>
              </li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#e3f2fd',
            borderRadius: '12px',
            padding: '25px',
            marginTop: '30px',
            borderLeft: '6px solid #2196f3'
          }}>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: '#555',
              margin: 0
            }}>
              <strong style={{ color: '#1565c0' }}>Note:</strong> This is a living resource. As the field evolves rapidly, 
              we recommend checking recent proceedings from NeurIPS (especially UniReps workshop), ICLR, CVPR, and medical 
              AI conferences for the latest advances in multimodal explainability and representation learning.
            </p>
          </div>
        </section>

        {/* Acknowledgments */}
        <section style={{ 
          marginTop: '60px',
          paddingTop: '40px',
          borderTop: '2px solid #e8e8e8'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#667eea',
            marginBottom: '20px'
          }}>
            Acknowledgments
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#666',
            marginBottom: '20px'
          }}>
            This tutorial draws upon insights from the broader research community working on explainable AI, 
            multimodal learning, representation alignment, and medical AI. We are particularly grateful to the 
            UniReps workshop organizers for creating a space to explore questions about representation similarity 
            across neural models.
          </p>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#666'
          }}>
            Interactive visualizations were designed to make complex concepts accessible to a broad audience, 
            inspired by the principles of visual explanation pioneered by Distill and similar educational platforms.
          </p>
        </section>

      </article>

      {/* Footer */}
      <footer style={{
        marginTop: '80px',
        paddingTop: '40px',
        borderTop: '2px solid #e8e8e8',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '10px'
        }}>
          Interactive Tutorial on Explainability and Representation Learning
        </p>
        <p style={{
          fontSize: '14px',
          color: '#999'
        }}>
          Submitted to UniReps Workshop @ NeurIPS 2025
        </p>
      </footer>
    </div>
  );
};

export default ExplainableMultimodalUpdated;