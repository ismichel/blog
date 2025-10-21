import React, { useRef, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import * as d3 from "d3";
import interpretabilityVisual from '../../assets/images/interpretability_visual.png';
import spectrum from '../../assets/images/spectrum.png';
import BlackBoxGlassBoxVisual from "./BlackBoxGlassBoxVisual.js";

const BlackBoxProblem = () => {
  const svgRef = useRef();

  useEffect(() => {
    renderFailureCase();
  }, []);

  const renderSpectrum = () => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 700;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("The Interpretability-Complexity Spectrum");

    // Draw axes
    const margin = 60;
    svg.append("line")
      .attr("x1", margin)
      .attr("y1", height - margin)
      .attr("x2", width - margin)
      .attr("y2", height - margin)
      .attr("stroke", "#333")
      .attr("stroke-width", 2);

    svg.append("line")
      .attr("x1", margin)
      .attr("y1", height - margin)
      .attr("x2", margin)
      .attr("y2", margin)
      .attr("stroke", "#333")
      .attr("stroke-width", 2);

    // Axis labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 15)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-style", "italic")
      .text("Model Complexity →");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-style", "italic")
      .text("← Interpretability");

    // Define models with positions
    const models = [
      { name: "Linear\nRegression", x: 100, y: 300, color: "#2ecc71", size: 30 },
      { name: "Decision\nTree", x: 150, y: 280, color: "#27ae60", size: 35 },
      { name: "Random\nForest", x: 250, y: 230, color: "#f39c12", size: 40 },
      { name: "CLIP\n(Modular)", x: 400, y: 180, color: "#e67e22", size: 45 },
      { name: "GPT-4V\n(E2E)", x: 550, y: 120, color: "#e74c3c", size: 50 },
      { name: "Glass Box\n(Goal)", x: 500, y: 100, color: "#9b59b6", size: 45, stroke: "#8e44ad", strokeWidth: 3, dashed: true }
    ];

    // Draw "sweet spot" region
    svg.append("ellipse")
      .attr("cx", 500)
      .attr("cy", 100)
      .attr("rx", 80)
      .attr("ry", 50)
      .attr("fill", "#9b59b6")
      .attr("opacity", 0.1)
      .attr("stroke", "#8e44ad")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    svg.append("text")
      .attr("x", 500)
      .attr("y", 70)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#8e44ad")
      .style("font-weight", "bold")
      .text("Sweet Spot: Powerful & Interpretable");

    // Draw models
    models.forEach(model => {
      const g = svg.append("g");

      g.append("circle")
        .attr("cx", model.x)
        .attr("cy", model.y)
        .attr("r", model.size)
        .attr("fill", model.color)
        .attr("opacity", 0.7)
        .attr("stroke", model.stroke || model.color)
        .attr("stroke-width", model.strokeWidth || 2)
        .attr("stroke-dasharray", model.dashed ? "5,5" : "0")
        .style("cursor", "pointer");

      const lines = model.name.split("\n");
      lines.forEach((line, i) => {
        g.append("text")
          .attr("x", model.x)
          .attr("y", model.y + (i - lines.length / 2 + 0.5) * 12)
          .attr("text-anchor", "middle")
          .style("font-size", "11px")
          .style("font-weight", "bold")
          .style("fill", "#fff")
          .style("pointer-events", "none")
          .text(line);
      });
    });

    // Add legends
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 200}, ${height - 150})`);

    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 8)
      .attr("fill", "#2ecc71");

    legend.append("text")
      .attr("x", 15)
      .attr("y", 4)
      .text("Interpretable")
      .style("font-size", "12px");

    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", 25)
      .attr("r", 8)
      .attr("fill", "#e74c3c");

    legend.append("text")
      .attr("x", 15)
      .attr("y", 29)
      .text("Opaque")
      .style("font-size", "12px");
  };

  const renderFailureCase = () => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 700;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Real Failure Case: COVID-Net");

    // Left side: X-ray image representation
    const xrayG = svg.append("g")
      .attr("transform", "translate(100, 80)");

    // Simulate X-ray
    xrayG.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 180)
      .attr("height", 220)
      .attr("fill", "#1a1a1a")
      .attr("stroke", "#666")
      .attr("stroke-width", 2);

    // Lungs (simplified)
    xrayG.append("ellipse")
      .attr("cx", 60)
      .attr("cy", 110)
      .attr("rx", 35)
      .attr("ry", 50)
      .attr("fill", "#444")
      .attr("opacity", 0.6);

    xrayG.append("ellipse")
      .attr("cx", 120)
      .attr("cy", 110)
      .attr("rx", 35)
      .attr("ry", 50)
      .attr("fill", "#444")
      .attr("opacity", 0.6);

    // Hospital metadata in corner
    xrayG.append("text")
      .attr("x", 5)
      .attr("y", 15)
      .attr("fill", "#0f0")
      .style("font-size", "8px")
      .style("font-family", "monospace")
      .text("HOSPITAL_A_2020");

    xrayG.append("text")
      .attr("x", 5)
      .attr("y", 25)
      .attr("fill", "#0f0")
      .style("font-size", "8px")
      .style("font-family", "monospace")
      .text("Model: XR-3000");

    xrayG.append("text")
      .attr("x", 90)
      .attr("y", 250)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Input X-Ray");

    // Arrow
    svg.append("line")
      .attr("x1", 300)
      .attr("y1", 190)
      .attr("x2", 360)
      .attr("y2", 190)
      .attr("stroke", "#333")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // Define arrow
    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#333");

    // Black box
    const boxG = svg.append("g")
      .attr("transform", "translate(370, 140)");

    boxG.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 100)
      .attr("height", 100)
      .attr("fill", "#2c3e50")
      .attr("stroke", "#34495e")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    boxG.append("text")
      .attr("x", 50)
      .attr("y", 50)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#fff")
      .style("font-weight", "bold")
      .text("Black Box");

    boxG.append("text")
      .attr("x", 50)
      .attr("y", 68)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#bdc3c7")
      .text("COVID-Net");

    // Arrow to output
    svg.append("line")
      .attr("x1", 480)
      .attr("y1", 190)
      .attr("x2", 540)
      .attr("y2", 190)
      .attr("stroke", "#333")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // Output
    const outputG = svg.append("g")
      .attr("transform", "translate(550, 150)");

    outputG.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 120)
      .attr("height", 80)
      .attr("fill", "#e74c3c")
      .attr("stroke", "#c0392b")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    outputG.append("text")
      .attr("x", 60)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#fff")
      .style("font-weight", "bold")
      .text("COVID-19");

    outputG.append("text")
      .attr("x", 60)
      .attr("y", 50)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "#fff")
      .style("font-weight", "bold")
      .text("98%");

    outputG.append("text")
      .attr("x", 60)
      .attr("y", 65)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#ecf0f1")
      .text("confidence");

    // Problem explanation
    const problemBox = svg.append("g")
      .attr("transform", "translate(50, 340)");

    problemBox.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 600)
      .attr("height", 50)
      .attr("fill", "#fff3cd")
      .attr("stroke", "#ffc107")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    problemBox.append("text")
      .attr("x", 300)
      .attr("y", 18)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#856404")
      .text("⚠️ The Problem: Model learned to detect hospital-specific metadata,");

    problemBox.append("text")
      .attr("x", 300)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#856404")
      .text("not actual disease in lungs! Nurses couldn't trust or debug it.");
  };

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">1. The Problem: Why We Need Explainability</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          <p>
          Picture a 2D space where the x-axis represents model complexity and the y-axis represents interpretability. Classical models like linear regression sit in the "simple but clear" corner. Modern transformers lurk in the "powerful but opaque" region. The sweet spot—where we want multimodal AI to live—is the upper right: both capable AND interpretable. That's our glass box. <br /> <br />
          The reality is that multimodal AI—systems that juggle text, images, audio, and more—lives somewhere in the messy middle. Take CLIP from OpenAI, which matches images with text descriptions. While we can visualize attention maps showing which image regions correspond to which words, we still don't fully understand how it learned abstract concepts like "artistic style" or "mood" without explicit training.

          </p>
        </div>

        {/* Interpretability Visual */}
        <div style={{
          display: "flex", 
          justifyContent: "center", 
          marginTop: "40px", 
          marginBottom: "40px",
          backgroundColor: "#f8f9fa",
          border: "2px dashed #dee2e6",
          borderRadius: "8px",
          padding: "40px",
          minHeight: "200px",
          alignItems: "center"
        }}>
          <div style={{ textAlign: "center" }}>

            <img 
              src={interpretabilityVisual}
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
            
          </div>
        </div>

        <p>
Some architectures are built from the ground up to be interpretable. ALIGN from Google uses contrastive learning with explicit alignment scores—you can actually see numerical values for how well image and text features match. Others need detective work after the fact, using techniques like Integrated Gradients (which traces the model's decision back through derivatives) or concept activation vectors that find directions in neural network space corresponding to human concepts.


          </p>

        <div style={{display: "flex", justifyContent: "center", marginTop: 20, marginBottom: 20}}>
          <svg ref={svgRef}></svg>
        </div>

        <Alert variant="danger">
          <Alert.Heading>The COVID-Net Case Study</Alert.Heading>
          <p>
            When Google's diabetic retinopathy AI was deployed in Thailand, it failed spectacularly—not because it couldn't detect disease, but because its black-box nature meant nurses couldn't trust or debug its decisions when it conflicted with their expertise.
          </p>
          <hr />
          <p className="mb-0">
            <strong>The EU's AI Act</strong> now explicitly requires high-risk systems to be interpretable. Whether we like it or not, the black box era is ending.
          </p>
        </Alert>

        <div style={{textAlign: "justify", marginTop: 30}}>
          <h4 className="display-8">The Challenge: Complexity vs. Interpretability</h4>
          <p>
            Picture a 2D space where the x-axis represents model complexity and the y-axis represents interpretability. Classical models like linear regression sit in the "simple but clear" corner. Modern transformers lurk in the "powerful but opaque" region. The sweet spot—where we want multimodal AI to live—is the upper right: both capable AND interpretable.
          </p>
        </div>

          <div style={{textAlign: "justify", marginTop: 20}}>
          <h4 className="display-8">Why This Matters</h4>
          <ul>
            
            <li><strong>Trust:</strong> Users need to understand AI decisions to trust them, especially in high-stakes domains like healthcare</li>
            <li><strong>Debugging:</strong> When models fail, we need to understand why to fix them</li>
            <li><strong>Fairness:</strong> Explanations can reveal hidden biases and discrimination</li>
            <li><strong>Regulation:</strong> Laws increasingly require interpretable AI systems</li>
            <li><strong>Scientific Understanding:</strong> We learn about the world by understanding what models learn</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlackBoxProblem;
