import React from "react";
import './BlackBoxGlassBoxVisual.css';

const BlackBoxGlassBoxVisual = () => {
  return (
    <div className="bb-container">
      <div className="bb-title">From Black Box to Glass Box</div>
      
      <div className="bb-comparison">
        {/* Black Box */}
        <div className="bb-box-container">
          <div className="bb-box-title">❌ Black Box</div>
          <div className="bb-black-box">
            <div className="bb-inputs-outputs bb-input-icon">📊</div>
            <div className="bb-question-marks">???</div>
            <div className="bb-black-box-label">Opaque & Mysterious</div>
            <div className="bb-inputs-outputs bb-output-icon">🎯</div>
          </div>
        </div>
        
        {/* Arrow */}
        <div className="bb-arrow">→</div>
        
        {/* Glass Box */}
        <div className="bb-box-container">
          <div className="bb-box-title">✓ Glass Box</div>
          <div className="bb-glass-box">
            <div className="bb-sparkle" style={{top: '20px', right: '30px', animationDelay: '0s'}}>✨</div>
            <div className="bb-sparkle" style={{top: '60px', left: '25px', animationDelay: '0.5s'}}>✨</div>
            <div className="bb-sparkle" style={{bottom: '50px', right: '25px', animationDelay: '1s'}}>✨</div>
            <div className="bb-sparkle" style={{bottom: '30px', left: '30px', animationDelay: '1.5s'}}>✨</div>
            <div className="bb-connection"></div>
            <div className="bb-glass-content">
              <div className="bb-layer">
                <div className="bb-node">📊</div>
              </div>
              <div className="bb-layer" style={{animationDelay: '0.2s'}}>
                <div className="bb-node">⚙️</div>
                <div className="bb-node">⚙️</div>
                <div className="bb-node">⚙️</div>
              </div>
              <div className="bb-layer" style={{animationDelay: '0.4s'}}>
                <div className="bb-node">🔍</div>
                <div className="bb-node">🔍</div>
              </div>
              <div className="bb-layer">
                <div className="bb-node">🎯</div>
              </div>
            </div>
            <div className="bb-glass-box-label">Transparent & Interpretable</div>
          </div>
        </div>
      </div>
      
      {/* Features Comparison */}
      <div className="bb-features">
        <div className="bb-feature">
          <div className="bb-feature-title">Black Box Problems</div>
          <div className="bb-feature-items">
            <div className="bb-feature-item bb-black-feature">
              <span className="bb-icon">🚫</span>
              <span>Can't understand decisions</span>
            </div>
            <div className="bb-feature-item bb-black-feature">
              <span className="bb-icon">❌</span>
              <span>Hard to debug failures</span>
            </div>
            <div className="bb-feature-item bb-black-feature">
              <span className="bb-icon">⚠️</span>
              <span>Hidden biases</span>
            </div>
            <div className="bb-feature-item bb-black-feature">
              <span className="bb-icon">🤷</span>
              <span>Low trust</span>
            </div>
          </div>
        </div>
        
        <div className="bb-feature">
          <div className="bb-feature-title">Glass Box Benefits</div>
          <div className="bb-feature-items">
            <div className="bb-feature-item bb-glass-feature">
              <span className="bb-icon">👁️</span>
              <span>See how it works</span>
            </div>
            <div className="bb-feature-item bb-glass-feature">
              <span className="bb-icon">🔧</span>
              <span>Easy to debug</span>
            </div>
            <div className="bb-feature-item bb-glass-feature">
              <span className="bb-icon">⚖️</span>
              <span>Detect bias early</span>
            </div>
            <div className="bb-feature-item bb-glass-feature">
              <span className="bb-icon">🤝</span>
              <span>Build trust</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bb-tagline">
        Making AI decisions visible, understandable, and trustworthy
      </div>
    </div>
  );
};

export default BlackBoxGlassBoxVisual;
