import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import './DimmerSwitchVisual.css';

const DimmerSwitchVisual = () => {
  const svgRef = useRef();
  const [sliderValue, setSliderValue] = useState(50);

  useEffect(() => {
    renderSpectrum();
  }, [sliderValue]);

  const getInterpretabilityInfo = (value) => {
    if (value <= 20) {
      return {
        level: "Fully Transparent",
        icon: "🔓",
        color: "#4caf50",
        description: "These models are completely interpretable. Every decision can be traced step-by-step, making them ideal for high-stakes applications where trust and accountability are crucial.",
        examples: ["Decision Trees", "Linear Regression", "Rule-based Systems"],
        pros: ["Complete transparency", "Easy to debug", "Regulatory compliance"],
        cons: ["Limited complexity", "May not capture complex patterns"]
      };
    } else if (value <= 40) {
      return {
        level: "Mostly Transparent",
        icon: "🔍",
        color: "#66bb6a",
        description: "These models offer good interpretability with some complexity. While not every detail is visible, the main decision factors are clear and understandable.",
        examples: ["Logistic Regression", "Naive Bayes", "Simple Neural Networks"],
        pros: ["Good balance", "Main factors visible", "Reasonable complexity"],
        cons: ["Some opacity", "Limited to simpler patterns"]
      };
    } else if (value <= 60) {
      return {
        level: "The Messy Middle",
        icon: "🎭",
        color: "#ffd700",
        description: "Multimodal AI systems live here. We can visualize attention maps showing which image regions correspond to which words, but mysteries remain about how they learn abstract concepts.",
        examples: ["Multimodal Transformers", "Vision-Language Models", "Cross-modal Attention"],
        pros: ["Visual attention maps", "Cross-modal insights", "Powerful capabilities"],
        cons: ["Partial understanding", "Abstract concepts unclear", "Complex interactions"]
      };
    } else if (value <= 80) {
      return {
        level: "Mostly Opaque",
        icon: "🧠",
        color: "#ff9800",
        description: "These models produce amazing results but their reasoning is largely opaque. While we can extract some insights, the full decision process remains mysterious.",
        examples: ["Large Language Models", "Deep CNNs", "Complex Transformers"],
        pros: ["High performance", "Some interpretability tools", "Impressive capabilities"],
        cons: ["Limited transparency", "Hard to debug", "Black box reasoning"]
      };
    } else {
      return {
        level: "Completely Opaque",
        icon: "🔒",
        color: "#e74c3c",
        description: "These models are essentially black boxes. They can recognize patterns and make predictions, but provide no insight into how they reach their conclusions.",
        examples: ["Deep Neural Networks", "Ensemble Methods", "Complex Architectures"],
        pros: ["High accuracy", "Handles complex data", "State-of-the-art performance"],
        cons: ["No interpretability", "Cannot debug failures", "Trust issues"]
      };
    }
  };

  const renderSpectrum = () => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 800;
    const height = 500;
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create gradient background that changes with slider
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "spectrumGradient")
      .attr("x1", "0%")
      .attr("x2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#e3f2fd")
      .attr("stop-opacity", 1);

    gradient.append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "#ffd700")
      .attr("stop-opacity", 0.8);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#1a1a1a")
      .attr("stop-opacity", 1);

    // Background spectrum bar
    svg.append("rect")
      .attr("x", 40)
      .attr("y", 200)
      .attr("width", 700)
      .attr("height", 80)
      .attr("fill", "url(#spectrumGradient)")
      .attr("rx", 40)
      .attr("opacity", 0.3);

    // Add glow effect
    const glowFilter = defs.append("filter")
      .attr("id", "glow");
    glowFilter.append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "coloredBlur");
    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Models along the spectrum (transparent on left, opaque on right)
    const models = [
      { 
        name: "Linear\nRegression", 
        pos: 10, 
        icon: "📊",
        color: "#66bb6a",
        desc: "Simple equations\neasy to interpret"
      },
      { 
        name: "Decision\nTree", 
        pos: 20, 
        icon: "🌳",
        color: "#4caf50",
        desc: "Crystal clear\nevery step visible"
      },
      { 
        name: "Multimodal AI\n(The Messy Middle)", 
        pos: 50, 
        icon: "🎭",
        color: "#ffd700",
        desc: "Can see attention\nbut mysteries remain",
        special: true
      },
      { 
        name: "GPT-4", 
        pos: 75, 
        icon: "🧠",
        color: "#ff9800",
        desc: "Amazing results\nopaque reasoning"
      },
      { 
        name: "Deep CNN", 
        pos: 90, 
        icon: "🔮",
        color: "#e74c3c",
        desc: "Millions of params\ncompletely mysterious"
      }
    ];

    // Draw models
    models.forEach(model => {
      const x = 40 + (model.pos / 100) * 700;
      const isActive = Math.abs(model.pos - sliderValue) < 15;
      const isSelected = Math.abs(model.pos - sliderValue) < 5; // Only the closest model gets full animation
      const size = model.special ? 80 : (isSelected ? 70 : 50);

      const g = svg.append("g")
        .attr("class", "model-group")
        .style("cursor", "pointer")
        .on("click", () => setSliderValue(model.pos));

      // Pulse effect only for the selected model
      if (isSelected) {
        g.append("circle")
          .attr("cx", x)
          .attr("cy", 240)
          .attr("r", size + 15)
          .attr("fill", model.color)
          .attr("opacity", 0.3)
          .attr("class", "pulse-circle")
          .style("animation", "pulse 2s infinite");
      }

      // Model circle
      g.append("circle")
        .attr("cx", x)
        .attr("cy", 240)
        .attr("r", size)
        .attr("fill", model.color)
        .attr("opacity", isSelected ? 0.9 : (isActive ? 0.7 : 0.5))
        .attr("stroke", isSelected ? "#fff" : model.color)
        .attr("stroke-width", isSelected ? 4 : 2)
        .attr("filter", isSelected ? "url(#glow)" : "none");

      // Icon
      g.append("text")
        .attr("x", x)
        .attr("y", 240 + 10)
        .attr("text-anchor", "middle")
        .style("font-size", model.special ? "40px" : "30px")
        .text(model.icon);

      // Model name
      const lines = model.name.split("\n");
      lines.forEach((line, i) => {
        g.append("text")
          .attr("x", x)
          .attr("y", 120 + i * 16)
          .attr("text-anchor", "middle")
          .style("font-size", model.special ? "14px" : "12px")
          .style("font-weight", model.special ? "bold" : "600")
          .style("fill", model.special ? "#ffd700" : "#e8eef5")
          .text(line);
      });

      // Description (show only for selected model)
      if (isSelected) {
        const descLines = model.desc.split("\n");
        descLines.forEach((line, i) => {
          g.append("text")
            .attr("x", x)
            .attr("y", 340 + i * 14)
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .style("fill", "#b0c4de")
            .text(line);
        });
      }
    });

    // Labels at ends
    svg.append("text")
      .attr("x", 40)
      .attr("y", 180)
      .attr("text-anchor", "start")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "#4caf50")
      .text("🔓 Transparent");

    svg.append("text")
      .attr("x", 740)
      .attr("y", 180)
      .attr("text-anchor", "end")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "#e74c3c")
      .text("🔒 Opaque");

    // Slider indicator
    const sliderX = 40 + (sliderValue / 100) * 700;
    svg.append("line")
      .attr("x1", sliderX)
      .attr("y1", 195)
      .attr("x2", sliderX)
      .attr("y2", 285)
      .attr("stroke", "#fff")
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")
      .attr("filter", "url(#glow)");

    // Dimmer switch visual at bottom
    const switchG = svg.append("g").attr("transform", "translate(180, 420)");
    
    switchG.append("rect")
      .attr("x", 10)
      .attr("y", 15)
      .attr("width", 200)
      .attr("height", 30)
      .attr("rx", 15)
      .attr("fill", "#152238")
      .attr("stroke", "#1a2b45")
      .attr("stroke-width", 2);

    // Dimmer levels with color gradient from green (transparent) to yellow to red (opaque)
    for (let i = 0; i <= 10; i++) {
      const opacity = i / 10;
      const position = i / 10; // 0 to 1
      
      // Color interpolation from green (transparent) to yellow to red (opaque)
      let color;
      if (position <= 0.5) {
        // Green to yellow transition
        const t = position * 2; // 0 to 1
        color = d3.interpolateRgb("#4caf50", "#ffd700")(t);
      } else {
        // Yellow to red transition
        const t = (position - 0.5) * 2; // 0 to 1
        color = d3.interpolateRgb("#ffd700", "#e74c3c")(t);
      }
      
      switchG.append("circle")
        .attr("cx", 20 + i * 18)
        .attr("cy", 30)
        .attr("r", 5)
        .attr("fill", color)
        .attr("opacity", sliderValue >= i * 10 ? opacity : 0.1);
    };
  };

  return (
    <div className="dimmer-container">
      {/* <div className="dimmer-title">The Explainability Spectrum</div> */}
      <div className="dimmer-subtitle">
        Like a dimmer switch, not an on/off button
      </div>
      
      <svg ref={svgRef}></svg>

      <div className="dimmer-slider-container">
        <div className="dimmer-slider-label">
          <span>🔓 Transparent</span>
          <span>Current: {sliderValue}%</span>
          <span>🔒 Opaque</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(parseInt(e.target.value))}
          className="dimmer-slider"
        />
        <div className="dimmer-instruction">
          👆 Drag the slider or click on any model to explore the spectrum
        </div>
      </div>

      <div className="dimmer-callout">
        <div className="dimmer-callout-icon">{getInterpretabilityInfo(sliderValue).icon}</div>
        <div className="dimmer-callout-content">
          <div className="dimmer-callout-title">{getInterpretabilityInfo(sliderValue).level}</div>
          <div className="dimmer-callout-text">
            {getInterpretabilityInfo(sliderValue).description}
          </div>
        </div>
      </div>

      <div className="dimmer-examples">
        <div className="dimmer-example" style={{backgroundColor: getInterpretabilityInfo(sliderValue).color + '20', borderColor: getInterpretabilityInfo(sliderValue).color}}>
          <div className="dimmer-example-title">
            {getInterpretabilityInfo(sliderValue).icon} {getInterpretabilityInfo(sliderValue).level}
          </div>
          <div className="dimmer-example-desc">
            <strong>Examples:</strong> {getInterpretabilityInfo(sliderValue).examples.join(", ")}
          </div>
          <div className="dimmer-example-desc">
            <strong>Pros:</strong> {getInterpretabilityInfo(sliderValue).pros.join(", ")}
          </div>
          <div className="dimmer-example-desc">
            <strong>Cons:</strong> {getInterpretabilityInfo(sliderValue).cons.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimmerSwitchVisual;
