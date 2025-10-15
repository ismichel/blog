import React, { useEffect, useState } from "react";
import DimmerSwitchVisual from "./DimmerSwitchVisual";
import BlackBoxProblem from "./BlackBoxProblem";
import InformationFlow from "./InformationFlow";
import AttentionFusion from "./AttentionFusion";
import ExplanationComparison from "./ExplanationComparison";
import spectrum from '../../assets/images/spectrum.png';
import attention from '../../assets/images/attention.png';
import bidirectional_cross_attention from '../../assets/images/bidirectional_crossmodal.png';
import encoder from '../../assets/images/encoder.png';
import audio_encoder from '../../assets/images/audio_encoder.png';

const ExplainableMultimodal = () => {
  const [selectedImage, setSelectedImage] = useState("dog");
  const [selectedText, setSelectedText] = useState("a golden retriever");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '60px 40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      lineHeight: '1.6',
      color: '#2c3e50',
      backgroundColor: '#ffffff'
    }}>
      {/* Header Section */}
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
          Explainable Multimodal AI
        </h1>
        <p style={{
          fontSize: '24px',
          color: '#666',
          fontWeight: '300',
          marginBottom: '30px',
          fontStyle: 'italic'
        }}>
          From Black Box to Glass Box
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
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            The Transparency Spectrum
          </h2>
          
          <div style={{
            fontSize: '18px',
            lineHeight: '1.7',
            marginBottom: '40px',
            color: '#444'
          }}>
            <p style={{ marginBottom: '24px' }}>
              Think of AI explainability like a dimmer switch rather than an on/off button. At one end, you've got completely opaque systems—those mysterious deep learning models that somehow recognize cats in videos but can't tell you why. At the other end, there are simple decision trees where every choice is crystal clear.

            </p>
          </div>

          <img 
              src={spectrum}
              alt="Model Complexity Spectrum"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                marginBottom: "20px"
              }}
              onError={(e) => {
                console.log("Image failed to load:", e.target.src);
              }}
              onLoad={() => {
                console.log("Image loaded successfully!");
              }}
            />
          
          <DimmerSwitchVisual />
          
          <div style={{
            fontSize: '18px',
            lineHeight: '1.7',
            marginTop: '40px',
            color: '#444'
          }}>
          </div>
        </section>

        {/* Section Dividers */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>
        
        <BlackBoxProblem />
        
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>
        
        <InformationFlow 
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          selectedText={selectedText}
          setSelectedText={setSelectedText}
        />
        
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>
        
        <AttentionFusion 
          selectedImage={selectedImage}
          selectedText={selectedText}
        />
        
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>
        
        <ExplanationComparison 
          selectedImage={selectedImage}
          selectedText={selectedText}
        />
        
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #e8e8e8, transparent)',
          margin: '80px 0'
        }}></div>
        
        {/* Future Directions Section */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            Future Directions
          </h2>
          
          <div style={{
            fontSize: '18px',
            lineHeight: '1.7',
            marginBottom: '40px',
            color: '#444'
          }}>
            <p style={{ marginBottom: '30px' }}>
              The frontier of explainable multimodal AI is full of challenges and possibilities:
            </p>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              marginBottom: '40px'
            }}>
              <li style={{
                marginBottom: '20px',
                paddingLeft: '30px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#667eea',
                  borderRadius: '50%',
                  marginTop: '8px'
                }}></div>
                <strong style={{ color: '#2c3e50' }}>Emergent Capabilities:</strong> We're seeing behaviors that even creators can't explain, requiring new mathematical frameworks
              </li>
              <li style={{
                marginBottom: '20px',
                paddingLeft: '30px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#667eea',
                  borderRadius: '50%',
                  marginTop: '8px'
                }}></div>
                <strong style={{ color: '#2c3e50' }}>Real-Time Systems:</strong> Current explanation methods are too slow for deployment (10-100x overhead)
              </li>
              <li style={{
                marginBottom: '20px',
                paddingLeft: '30px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#667eea',
                  borderRadius: '50%',
                  marginTop: '8px'
                }}></div>
                <strong style={{ color: '#2c3e50' }}>Personalized Explanations:</strong> Different stakeholders need different views—doctors want anatomical details, patients want analogies
              </li>
              <li style={{
                marginBottom: '20px',
                paddingLeft: '30px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#667eea',
                  borderRadius: '50%',
                  marginTop: '8px'
                }}></div>
                <strong style={{ color: '#2c3e50' }}>Trust Calibration:</strong> Finding the balance between transparency and overwhelming users with information
              </li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            padding: '30px',
            marginTop: '40px',
            borderLeft: '4px solid #667eea'
          }}>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.7',
              margin: 0,
              color: '#2c3e50'
            }}>
              <strong style={{ color: '#667eea' }}>Key Takeaway:</strong> The black box era is ending. As AI systems become more powerful and deployed in high-stakes domains, interpretability isn't optional—it's essential for trust, debugging, and regulatory compliance.
            </p>
          </div>
        </section>
 
        {/*Other Images Section */} 
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '30px',
            letterSpacing: '-0.01em'
          }}>
            Other Rough Draft Images
          </h2>
          
          <img 
              src={attention}
              alt="Interpretability Visual"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                marginBottom: "20px"
              }}
              onError={(e) => {
                console.log("Image failed to load:", e.target.src);
              }}
              onLoad={() => {
                console.log("Image loaded successfully!");
              }}
            />

<img 
              src={encoder}
              alt="Interpretability Visual"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                marginBottom: "20px"
              }}
              onError={(e) => {
                console.log("Image failed to load:", e.target.src);
              }}
              onLoad={() => {
                console.log("Image loaded successfully!");
              }}
            />

<img 
              src={audio_encoder}
              alt="Interpretability Visual"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                marginBottom: "20px"
              }}
              onError={(e) => {
                console.log("Image failed to load:", e.target.src);
              }}
              onLoad={() => {
                console.log("Image loaded successfully!");
              }}
            />

<img 
              src={bidirectional_cross_attention}
              alt="Interpretability Visual"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                marginBottom: "20px"
              }}
              onError={(e) => {
                console.log("Image failed to load:", e.target.src);
              }}
              onLoad={() => {
                console.log("Image loaded successfully!");
              }}
            />
        </section>
      </article>
    </div>
  );
};

export default ExplainableMultimodal;
