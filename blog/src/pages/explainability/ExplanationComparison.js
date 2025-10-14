import React, { useRef, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import * as d3 from "d3";


const ExplanationComparison = ({ selectedImage, selectedText }) => {
  const svgRef = useRef();
  const [selectedMethod, setSelectedMethod] = useState("attention");

  useEffect(() => {
    renderExplanation();
  }, [selectedMethod, selectedImage, selectedText]);

  const renderExplanation = () => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 750;
    const height = 450;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(`Explanation Method: ${getMethodName(selectedMethod)}`);

    // Draw image placeholder
    const imgG = svg.append("g").attr("transform", "translate(50, 60)");
    imgG.append("rect")
      .attr("width", 200)
      .attr("height", 200)
      .attr("fill", "#f5f5f5")
      .attr("stroke", "#999")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    imgG.append("text")
      .attr("x", 100)
      .attr("y", 95)
      .attr("text-anchor", "middle")
      .style("font-size", "40px")
      .text("🐕");

    imgG.append("text")
      .attr("x", 100)
      .attr("y", 130)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("Input Image");

    // Render explanation overlay based on method
    if (selectedMethod === "attention") {
      renderAttentionMap(imgG);
    } else if (selectedMethod === "shap") {
      renderSHAPMap(imgG);
    } else if (selectedMethod === "gradcam") {
      renderGradCAM(imgG);
    } else if (selectedMethod === "integrated") {
      renderIntegratedGradients(imgG);
    }

    // Draw text
    const textG = svg.append("g").attr("transform", "translate(50, 280)");
    textG.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(`Text: "${selectedText}"`);

    // Method explanation panel
    const explanationX = 300;
    const explanationY = 60;
    const explainG = svg.append("g").attr("transform", `translate(${explanationX}, ${explanationY})`);

    explainG.append("rect")
      .attr("width", 400)
      .attr("height", 340)
      .attr("fill", "#fff")
      .attr("stroke", "#ddd")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    const methodInfo = getMethodInfo(selectedMethod);

    explainG.append("text")
      .attr("x", 200)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(methodInfo.name);

    // What it shows
    explainG.append("text")
      .attr("x", 15)
      .attr("y", 50)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("What it shows:");

    wrapText(explainG, methodInfo.shows, 15, 65, 370, 12);

    // How it works
    explainG.append("text")
      .attr("x", 15)
      .attr("y", 130)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("How it works:");

    wrapText(explainG, methodInfo.howItWorks, 15, 145, 370, 12);

    // Pros
    explainG.append("text")
      .attr("x", 15)
      .attr("y", 210)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#4caf50")
      .text("✓ Pros:");

    wrapText(explainG, methodInfo.pros, 15, 225, 370, 11);

    // Cons
    explainG.append("text")
      .attr("x", 15)
      .attr("y", 270)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#f44336")
      .text("✗ Cons:");

    wrapText(explainG, methodInfo.cons, 15, 285, 370, 11);
  };

  const renderAttentionMap = (imgG) => {
    // Simulate attention heatmap
    const regions = [
      { x: 60, y: 40, size: 50, opacity: 0.8, label: "Head" },
      { x: 80, y: 100, size: 60, opacity: 0.6, label: "Body" },
      { x: 90, y: 140, size: 30, opacity: 0.3, label: "Legs" },
    ];

    regions.forEach(region => {
      imgG.append("circle")
        .attr("cx", region.x)
        .attr("cy", region.y)
        .attr("r", region.size)
        .attr("fill", "#ff9800")
        .attr("opacity", region.opacity * 0.5);

      imgG.append("text")
        .attr("x", region.x)
        .attr("y", region.y + 4)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("fill", "#fff")
        .text((region.opacity * 100).toFixed(0) + "%");
    });
  };

  const renderSHAPMap = (imgG) => {
    // SHAP shows feature importance
    const grid = 8;
    const cellSize = 200 / grid;

    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        const importance = Math.random();
        const color = importance > 0.5 ? "#4caf50" : "#f44336";
        const opacity = Math.abs(importance - 0.5) * 2;

        imgG.append("rect")
          .attr("x", j * cellSize)
          .attr("y", i * cellSize)
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("fill", color)
          .attr("opacity", opacity * 0.6)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1);
      }
    }

    // Legend
    imgG.append("text")
      .attr("x", 5)
      .attr("y", 15)
      .style("font-size", "9px")
      .style("fill", "#4caf50")
      .style("font-weight", "bold")
      .text("Green: Increases match");

    imgG.append("text")
      .attr("x", 5)
      .attr("y", 27)
      .style("font-size", "9px")
      .style("fill", "#f44336")
      .style("font-weight", "bold")
      .text("Red: Decreases match");
  };

  const renderGradCAM = (imgG) => {
    // GradCAM shows gradient-weighted activation
    const heatmapData = [
      { x: 50, y: 50, intensity: 0.9 },
      { x: 100, y: 80, intensity: 0.7 },
      { x: 80, y: 120, intensity: 0.5 },
      { x: 120, y: 100, intensity: 0.4 },
    ];

    // Create gradient for heatmap
    const defs = imgG.append("defs");
    heatmapData.forEach((point, i) => {
      const gradient = defs.append("radialGradient")
        .attr("id", `heatGrad${i}`);

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ff0000")
        .attr("stop-opacity", point.intensity);

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ff0000")
        .attr("stop-opacity", 0);

      imgG.append("circle")
        .attr("cx", point.x)
        .attr("cy", point.y)
        .attr("r", 40)
        .attr("fill", `url(#heatGrad${i})`);
    });
  };

  const renderIntegratedGradients = (imgG) => {
    // Integrated gradients show path of attribution
    const paths = [
      "M 100 180 Q 80 140 60 80",
      "M 100 180 Q 110 120 100 60",
      "M 100 180 Q 130 140 140 80",
    ];

    paths.forEach((path, i) => {
      imgG.append("path")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "#2196f3")
        .attr("stroke-width", 3)
        .attr("opacity", 0.7)
        .attr("marker-end", "url(#arrowBlue)");
    });

    // Arrow marker
    const defs = imgG.append("defs");
    defs.append("marker")
      .attr("id", "arrowBlue")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#2196f3");

    imgG.append("text")
      .attr("x", 5)
      .attr("y", 15)
      .style("font-size", "9px")
      .style("fill", "#2196f3")
      .style("font-weight", "bold")
      .text("Attribution paths");
  };

  const wrapText = (container, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(" ");
    let line = "";
    let lineNumber = 0;

    words.forEach((word) => {
      const testLine = line + word + " ";
      const testWidth = testLine.length * 6; // Approximate width

      if (testWidth > maxWidth && line !== "") {
        container.append("text")
          .attr("x", x)
          .attr("y", y + lineNumber * lineHeight)
          .style("font-size", "11px")
          .style("fill", "#333")
          .text(line);
        line = word + " ";
        lineNumber++;
      } else {
        line = testLine;
      }
    });

    container.append("text")
      .attr("x", x)
      .attr("y", y + lineNumber * lineHeight)
      .style("font-size", "11px")
      .style("fill", "#333")
      .text(line);
  };

  const getMethodName = (method) => {
    const names = {
      attention: "Attention Maps",
      shap: "SHAP Values",
      gradcam: "Grad-CAM",
      integrated: "Integrated Gradients"
    };
    return names[method];
  };

  const getMethodInfo = (method) => {
    const info = {
      attention: {
        name: "Attention Maps",
        shows: "Which image regions the model attends to when processing specific text tokens. Brighter = higher attention.",
        howItWorks: "Extracts attention weights from the fusion layer. These are built into the model architecture and computed during forward pass.",
        pros: "Fast, interpretable, shows cross-modal interactions directly. No extra computation needed.",
        cons: "Only available in attention-based models. Shows correlation, not causation. May not reflect actual decision process."
      },
      shap: {
        name: "SHAP Values (Shapley Additive Explanations)",
        shows: "How much each image region contributes to the prediction. Green = positive contribution, Red = negative contribution.",
        howItWorks: "Uses game theory to fairly distribute credit among features. Computes contribution by testing all possible feature combinations.",
        pros: "Theoretically grounded (satisfies efficiency, symmetry). Works for any model. Shows actual feature importance.",
        cons: "Very slow (exponential in features). Can't show cross-modal interactions directly. High computational cost."
      },
      gradcam: {
        name: "Gradient-weighted Class Activation Mapping",
        shows: "Which image regions are most important for the prediction, based on gradients flowing back through the network.",
        howItWorks: "Backpropagates gradients from prediction to convolutional layers, then weights activation maps by these gradients.",
        pros: "Works with any CNN. Relatively fast. Highlights important regions without extra training.",
        cons: "Only for CNNs (not transformers). Noisy gradients. Doesn't explain multimodal fusion directly."
      },
      integrated: {
        name: "Integrated Gradients",
        shows: "Attribution paths showing how each pixel contributes to the prediction, integrated from a baseline to the actual input.",
        howItWorks: "Computes gradients along path from baseline (e.g., black image) to actual input. Integrates these gradients for final attribution.",
        pros: "Theoretically sound (satisfies axioms). Works for any differentiable model. Explains full path of influence.",
        cons: "Computationally expensive. Requires choosing baseline. Can be noisy. Doesn't show cross-modal reasoning."
      }
    };
    return info[method];
  };

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">4. Explanation Methods in Action</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          <p>
            Different explanation methods can reveal different aspects of how a model works. Interestingly, they sometimes disagree! Understanding the strengths and limitations of each method is crucial for building trust in AI systems.
          </p>
        </div>


        <div style={{display: "flex", justifyContent: "center", marginBottom: 30}}>
          <svg ref={svgRef}></svg>
        </div>

        <Alert variant="warning">
          <Alert.Heading>⚠️ When Methods Disagree</Alert.Heading>
          <p>
            Different explanation methods can highlight different regions for the same prediction. This isn't a bug—it's because they measure different things:
          </p>
          <ul style={{marginBottom: 0}}>
            <li><strong>Attention:</strong> Where the model looks (correlation)</li>
            <li><strong>SHAP:</strong> What features matter most (contribution)</li>
            <li><strong>Grad-CAM:</strong> What changes prediction (sensitivity)</li>
            <li><strong>Integrated Gradients:</strong> Path of attribution (causal chain)</li>
          </ul>
        </Alert>

        <div style={{textAlign: "justify", marginTop: 20}}>
          <h4 className="display-8">Validation: How Do We Know Explanations Are True?</h4>
          <div style={{backgroundColor: "#e8f4f8", padding: 20, borderRadius: 8}}>
            <strong>Key Metrics:</strong>
            <ul style={{marginBottom: 0}}>
              <li><strong>Faithfulness:</strong> Does removing "important" features actually change the output? (Test with perturbations)</li>
              <li><strong>Stability:</strong> Do similar inputs produce similar explanations? (Measure with Lipschitz continuity)</li>
              <li><strong>Completeness:</strong> Do explanations capture all important factors? (Check sufficiency scores)</li>
            </ul>
          </div>

          <h4 className="display-8" style={{marginTop: 20}}>The Clever Hans Problem</h4>
          <p>
            Remember Clever Hans, the horse that could supposedly do arithmetic? Modern AI has its own Clever Hans moments. The COVID-Net X-ray system was found to identify COVID-19 partly by recognizing hospital-specific text fonts in image corners—not lung pathology. <strong>Explanation methods revealed this flaw!</strong>
          </p>

          <div style={{backgroundColor: "#d4edda", padding: 20, borderRadius: 8, marginTop: 20}}>
            <strong>Best Practice:</strong> Use multiple explanation methods together. If they agree, you can be more confident. If they disagree, dig deeper—something interesting is happening!
          </div>

          <h4 className="display-8" style={{marginTop: 30}}>The Challenge: Complexity vs. Interpretability</h4>
          <p>
            Picture a 2D space where the x-axis represents model complexity and the y-axis represents interpretability. Classical models like linear regression sit in the "simple but clear" corner. Modern transformers lurk in the "powerful but opaque" region. The sweet spot—where we want multimodal AI to live—is the upper right: both capable AND interpretable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationComparison;