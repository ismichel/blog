import React, { useEffect, useState } from "react";

const MedicalMultimodalComplete = () => {
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
          From Black Box to Glass Box: Understanding Multimodal Medical AI
        </h1>
        <p style={{
          fontSize: '24px',
          color: '#666',
          fontWeight: '300',
          marginBottom: '30px',
          fontStyle: 'italic'
        }}>
          An Interactive Tutorial on Explainability Techniques
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
        
        {/* Introduction */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{
            backgroundColor: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            borderLeft: '6px solid #ffc107'
          }}>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              margin: 0,
              color: '#856404'
            }}>
              <strong>Imagine this:</strong> A radiologist examines a chest X-ray showing possible COVID-19 pneumonia. 
              The AI confidently predicts "98% COVID-19 positive." But when researchers investigated, they discovered 
              the model wasn't looking at lung pathology at all—it was reading the hospital metadata printed in the 
              corner of the image.
            </p>
          </div>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            This isn't just an embarrassing failure. It's a wake-up call about the black box problem in medical AI. 
            When we deploy models that combine multiple data sources—radiology images, electronic health records, 
            pathology slides, genomic data—the stakes are too high for opacity.
          </p>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Multimodal AI in medicine holds extraordinary promise. Recent systematic reviews show that performance 
            gains through multimodal data integration are widely documented—in certain application areas, combining 
            radiology images with clinical text can be considered low-hanging fruit. But without explainability, 
            these systems will remain research prototypes, never crossing into clinical practice.
          </p>
          
          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            This blog post is a tutorial on explainability in multimodal medical AI. Through interactive visualizations, 
            we'll explore how these systems work, where opacity creeps in, and which techniques can make them interpretable. 
            Whether you're a researcher, clinician, or simply curious about trustworthy AI, you'll leave understanding 
            why the "black box era" in medical AI must end.
          </p>
        </section>

        {/* Section 1: The Spectrum */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            The Explainability Spectrum in Medical AI
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
            The Amplified Black Box Problem in Clinical Settings
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            The opacity problem in unimodal AI is already challenging. In multimodal systems, it's exponentially worse. 
            You're not just dealing with one black box—you're dealing with multiple black boxes that interact in 
            complex, often unpredictable ways.
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
                <strong>Validation Complexity:</strong> External validation requires cross-departmental multimodal 
                data—a logistical nightmare
              </li>
              <li style={{ marginBottom: '15px' }}>
                <strong>Model Drift Amplification:</strong> When one modality changes (new imaging equipment, updated 
                EHR system), the entire model can fail
              </li>
              <li style={{ marginBottom: '15px' }}>
                <strong>Explainability Requirements:</strong> Clinicians need to understand not just what each modality 
                contributes, but how they interact
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
            How Information Flows: Finding the Glass Box Windows
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Let's trace how data transforms from raw inputs to final predictions in medical multimodal AI. 
            Understanding this flow reveals where opacity creeps in and where we have natural "inspection points" 
            for explanations.
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
                Vector representations we can measure, visualize, and understand relationships between.
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
                Cross-attention shows exactly how modalities interact—the key explainability window.
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
              complete pipeline here (inputs → encoders → embeddings → fusion → output).
            </p>
          </div>
        </section>

        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>

        {/* Section 4: Attention & Fusion */}
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
              <strong>This is THE key insight for multimodal explainability:</strong> The fusion layer, where 
              modalities interact through cross-attention, provides a natural window into the model's reasoning process.
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
            The Evolution: From Late to Early Fusion
          </h3>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Research trends show a clear evolution: most early fusion papers have appeared in the past two years. 
            This shift matters for explainability because early fusion allows modalities to inform each other's 
            encoding—creating richer, more interpretable interaction patterns. As foundational models provide 
            stronger pre-trained encoders, researchers can focus on designing optimal fusion methods that are 
            explainable by design.
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
              attention weights between image regions and text tokens here.
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
            Explanation Methods: When They Agree and Disagree
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Different explanation methods can reveal different aspects of how a medical AI model works. Interestingly, 
            they sometimes disagree! Understanding the strengths and limitations of each method is crucial for building 
            trust in clinical AI systems.
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
              ⚠️ When Methods Disagree
            </h4>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '15px' }}>
              Different explanation methods can highlight different regions for the same prediction. This isn't a 
              bug—it's because they measure different things:
            </p>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li><strong>Attention:</strong> Where the model looks (correlation)</li>
              <li><strong>SHAP:</strong> What features matter most (contribution)</li>
              <li><strong>Grad-CAM:</strong> What changes prediction (sensitivity)</li>
              <li><strong>Integrated Gradients:</strong> Path of attribution (causal chain)</li>
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
              interactive comparisons of different explanation methods here.
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
            Real-World Challenges: Missing Data & Disparities
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Most multimodal AI assumes data completeness: all modalities must be available for every patient. But 
            clinical reality is messy. Data silos, retrospective constraints, privacy concerns, and workflow variability 
            all create missing data problems.
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

        {/* Section 7: Future Directions */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            The Path Forward: Building Glass Box Systems
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Medical foundational models (which are inherently multimodal) are accelerating a crucial shift: from 
            training encoders to designing optimal fusion methods. This is exactly what we need for explainability.
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
                1. Bespoke Multimodal Explainability
              </h4>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                Traditional methods (Shapley values, Grad-CAM) explain individual modalities but fail at fusion. 
                We need purpose-built techniques that reveal how modalities interact through cross-modal attention 
                visualization and feature attribution across modality boundaries.
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
                2. Robust Handling of Missing Modalities
              </h4>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                Models must gracefully degrade when modalities are unavailable, with uncertainty quantification 
                that reflects missing data impact and explanations showing how predictions would change with 
                complete data.
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
                3. Public Multimodal Datasets
              </h4>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                Only 14% of papers fuse more than two modalities. We need standardized datasets with 3+ modalities, 
                diverse patient populations, and annotations enabling evaluation of explainability methods.
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
              The Bottom Line
            </h3>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#555',
              margin: 0
            }}>
              Multimodal AI in medicine has proven its performance value. Recent research shows that the low-hanging 
              fruit is real—nearly 50% of published work achieves substantial gains simply by combining radiology 
              images with clinical text. But without explainability, these systems will remain research prototypes.
              <br /><br />
              The fusion layer gives us a natural window into multimodal reasoning. Early fusion architectures make 
              this window larger and clearer. Foundational models are accelerating progress. The pieces are in place.
              <br /><br />
              <strong style={{ color: '#2e7d32' }}>
                Through this tutorial, we've seen how explainability techniques—from attention visualization to 
                gradient-based methods—can illuminate the black box. Now it's time to build the glass box systems 
                that medicine deserves, where clinicians can see, understand, and trust how AI reasons across 
                multiple data sources to support patient care.
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
                <strong>CLIP (OpenAI):</strong> Radford et al., "Learning Transferable Visual Models From Natural Language Supervision" (2021) - Foundational work on vision-language pretraining
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>ALBEF (Salesforce):</strong> Li et al., "Align before Fuse: Vision and Language Representation Learning with Momentum Distillation" (2021) - Explicit fusion architecture
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Flamingo (DeepMind):</strong> Alayrac et al., "Flamingo: a Visual Language Model for Few-Shot Learning" (2022) - Gated cross-attention for multimodal learning
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
                <strong>Systematic Review:</strong> [Add the systematic review you referenced] - Comprehensive overview of 432 papers on multimodal medical AI
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>COVID-Net Case Study:</strong> [Add citation] - Example of the black box problem in clinical deployment
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Medical Foundation Models:</strong> Moor et al., "Foundation Models for Generalist Medical Artificial Intelligence" (2023) - Overview of multimodal medical AI
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Clinical Deployment Challenges:</strong> [Add relevant citations on AI deployment in healthcare]
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
                <strong>Attention Visualization:</strong> Xu et al., "Show, Attend and Tell: Neural Image Caption Generation with Visual Attention" (2015) - Foundational work on attention mechanisms
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>SHAP:</strong> Lundberg & Lee, "A Unified Approach to Interpreting Model Predictions" (2017) - Game-theoretic explanation method
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Grad-CAM:</strong> Selvaraju et al., "Grad-CAM: Visual Explanations from Deep Networks via Gradient-based Localization" (2017) - Gradient-based visual explanations
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Integrated Gradients:</strong> Sundararajan et al., "Axiomatic Attribution for Deep Networks" (2017) - Path-based attribution method
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Attention is Not Explanation:</strong> Jain & Wallace, "Attention is not Explanation" (2019) - Critical analysis of attention as explanation
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
              📖 Surveys & Tutorials
            </h3>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Multimodal Machine Learning:</strong> Liang et al., "Foundations & Trends in Multimodal Machine Learning" (2024) - Comprehensive survey
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Explainable AI:</strong> Arrieta et al., "Explainable Artificial Intelligence (XAI): Concepts, taxonomies, opportunities and challenges" (2020)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Medical AI Trust:</strong> Ghassemi et al., "The false hope of current approaches to explainable artificial intelligence in health care" (2021)
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
                <strong>SHAP Library:</strong> <a href="https://github.com/slundberg/shap" style={{ color: '#667eea' }}>github.com/slundberg/shap</a> - Python library for SHAP values
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Captum:</strong> <a href="https://captum.ai" style={{ color: '#667eea' }}>captum.ai</a> - PyTorch interpretability library (includes Integrated Gradients, Grad-CAM)
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Hugging Face Transformers:</strong> <a href="https://huggingface.co/transformers" style={{ color: '#667eea' }}>huggingface.co/transformers</a> - Pre-trained multimodal models with attention visualization
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>OpenAI CLIP:</strong> <a href="https://github.com/openai/CLIP" style={{ color: '#667eea' }}>github.com/openai/CLIP</a> - Vision-language model implementation
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Alibi Explain:</strong> <a href="https://github.com/SeldonIO/alibi" style={{ color: '#667eea' }}>github.com/SeldonIO/alibi</a> - Machine learning model inspection toolkit
              </li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#ffebee',
            borderRadius: '12px',
            padding: '30px',
            border: '2px solid #f44336'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#c62828',
              marginBottom: '20px'
            }}>
              ⚖️ Regulation & Ethics
            </h3>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>EU AI Act:</strong> <a href="https://artificialintelligenceact.eu" style={{ color: '#667eea' }}>artificialintelligenceact.eu</a> - Regulatory requirements for high-risk AI systems
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>FDA AI/ML Guidelines:</strong> <a href="https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices" style={{ color: '#667eea' }}>FDA AI/ML Medical Devices</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>WHO Ethics & Governance of AI:</strong> Guidelines for trustworthy AI in healthcare
              </li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            padding: '30px',
            marginTop: '40px',
            border: '2px solid #667eea'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#667eea',
              marginBottom: '20px'
            }}>
              🌐 Online Resources & Communities
            </h3>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Distill.pub:</strong> <a href="https://distill.pub" style={{ color: '#667eea' }}>distill.pub</a> - Clear explanations of machine learning concepts
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Papers with Code:</strong> <a href="https://paperswithcode.com" style={{ color: '#667eea' }}>paperswithcode.com</a> - Browse multimodal learning and explainability papers with code
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>ML4H (Machine Learning for Health):</strong> Annual workshop and community
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>MICCAI (Medical Image Computing):</strong> Premier conference for medical AI research
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Interpretable ML Book:</strong> <a href="https://christophm.github.io/interpretable-ml-book/" style={{ color: '#667eea' }}>christophm.github.io/interpretable-ml-book</a> - Free online textbook
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
              we recommend checking recent proceedings from NeurIPS, ICLR, CVPR, and medical AI conferences for the latest 
              advances in multimodal explainability. The arXiv preprint server is also an excellent source for cutting-edge research.
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
            multimodal learning, and medical AI. We are particularly grateful to the authors of the systematic 
            reviews and foundational papers cited throughout this work.
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
          Blog Post Tutorial on Explainable Multimodal Medical AI
        </p>
        <p style={{
          fontSize: '14px',
          color: '#999'
        }}>
          From Black Box to Glass Box: Understanding Multimodal Medical AI
        </p>
      </footer>
    </div>
  );
};

export default MedicalMultimodalComplete;