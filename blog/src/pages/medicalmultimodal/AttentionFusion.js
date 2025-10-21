import React, { useRef, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as d3 from "d3";
import BlackBoxGlassBoxVisual from "./BlackBoxGlassBoxVisual.js";


const AttentionFusion = ({ selectedImage, selectedText }) => {
  const svgRef = useRef();
  const [hoveredToken, setHoveredToken] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  useEffect(() => {
    renderAttention();
  }, [selectedImage, selectedText, hoveredToken, hoveredRegion]);

  const renderAttention = () => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 750;
    const height = 500;

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
      .text("3. Cross-Modal Attention: The Glass Box Window");

    // Simulate image regions
    const imageRegions = [
      { id: "head", x: 50, y: 80, width: 60, height: 50, label: "Head", color: "#ffcdd2" },
      { id: "body", x: 50, y: 135, width: 60, height: 70, label: "Body", color: "#f8bbd0" },
      { id: "legs", x: 50, y: 210, width: 60, height: 50, label: "Legs", color: "#e1bee7" },
      { id: "background", x: 50, y: 265, width: 60, height: 50, label: "Background", color: "#d1c4e9" }
    ];

    // Parse text into tokens
    const tokens = selectedText.split(" ").filter(t => t.length > 0);

    // Simulate attention weights (which tokens attend to which regions)
    const attentionWeights = {};
    tokens.forEach((token, ti) => {
      attentionWeights[token] = {};
      imageRegions.forEach((region, ri) => {
        // Simulate: first token attends to head, second to body, etc.
        let weight = 0.1 + Math.random() * 0.2;
        if (token.toLowerCase().includes("golden") || token.toLowerCase().includes("dog")) {
          if (region.id === "head" || region.id === "body") weight = 0.6 + Math.random() * 0.3;
        }
        if (token.toLowerCase().includes("retriever")) {
          if (region.id === "body") weight = 0.7 + Math.random() * 0.2;
        }
        attentionWeights[token][region.id] = weight;
      });
    });

    // Draw image regions
    const imageG = svg.append("g");
    
    svg.append("text")
      .attr("x", 80)
      .attr("y", 65)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Image Regions");

    imageRegions.forEach(region => {
      const isHovered = hoveredRegion === region.id;
      const opacity = hoveredToken ? 
        (attentionWeights[hoveredToken]?.[region.id] || 0.1) : 
        (isHovered ? 0.9 : 0.3);

      const rect = imageG.append("rect")
        .attr("x", region.x)
        .attr("y", region.y)
        .attr("width", region.width)
        .attr("height", region.height)
        .attr("fill", region.color)
        .attr("opacity", opacity)
        .attr("stroke", isHovered ? "#000" : "#666")
        .attr("stroke-width", isHovered ? 3 : 1)
        .attr("rx", 3)
        .style("cursor", "pointer")
        .on("mouseenter", () => setHoveredRegion(region.id))
        .on("mouseleave", () => setHoveredRegion(null));

      imageG.append("text")
        .attr("x", region.x + region.width / 2)
        .attr("y", region.y + region.height / 2 + 4)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("pointer-events", "none")
        .text(region.label);
    });

    // Draw text tokens
    const tokenX = 600;
    const tokenStartY = 80;
    const tokenSpacing = 40;

    svg.append("text")
      .attr("x", tokenX)
      .attr("y", 65)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Text Tokens");

    tokens.forEach((token, idx) => {
      const tokenY = tokenStartY + idx * tokenSpacing;
      const isHovered = hoveredToken === token;

      const g = svg.append("g");

      g.append("rect")
        .attr("x", tokenX - 50)
        .attr("y", tokenY - 15)
        .attr("width", 100)
        .attr("height", 30)
        .attr("fill", "#e3f2fd")
        .attr("opacity", isHovered || hoveredRegion ? 0.9 : 0.5)
        .attr("stroke", isHovered ? "#000" : "#2196f3")
        .attr("stroke-width", isHovered ? 3 : 2)
        .attr("rx", 5)
        .style("cursor", "pointer")
        .on("mouseenter", () => setHoveredToken(token))
        .on("mouseleave", () => setHoveredToken(null));

      g.append("text")
        .attr("x", tokenX)
        .attr("y", tokenY + 4)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", isHovered ? "bold" : "normal")
        .style("pointer-events", "none")
        .text(token);
    });

    // Draw attention connections
    const connectionG = svg.append("g");

    if (hoveredToken) {
      // Show all connections from this token
      imageRegions.forEach(region => {
        const weight = attentionWeights[hoveredToken][region.id];
        const tokenIdx = tokens.indexOf(hoveredToken);
        const tokenY = tokenStartY + tokenIdx * tokenSpacing;

        connectionG.append("line")
          .attr("x1", 115)
          .attr("y1", region.y + region.height / 2)
          .attr("x2", tokenX - 52)
          .attr("y2", tokenY)
          .attr("stroke", "#ff9800")
          .attr("stroke-width", weight * 8)
          .attr("opacity", 0.6)
          .attr("stroke-linecap", "round");

        // Show weight value
        const midX = (115 + tokenX - 52) / 2;
        const midY = (region.y + region.height / 2 + tokenY) / 2;

        connectionG.append("circle")
          .attr("cx", midX)
          .attr("cy", midY)
          .attr("r", 15)
          .attr("fill", "#fff")
          .attr("stroke", "#ff9800")
          .attr("stroke-width", 2);

        connectionG.append("text")
          .attr("x", midX)
          .attr("y", midY + 4)
          .attr("text-anchor", "middle")
          .style("font-size", "10px")
          .style("font-weight", "bold")
          .text(weight.toFixed(2));
      });
    } else if (hoveredRegion) {
      // Show all tokens attending to this region
      tokens.forEach((token, idx) => {
        const weight = attentionWeights[token]?.[hoveredRegion] || 0;
        const tokenY = tokenStartY + idx * tokenSpacing;
        const region = imageRegions.find(r => r.id === hoveredRegion);

        connectionG.append("line")
          .attr("x1", 115)
          .attr("y1", region.y + region.height / 2)
          .attr("x2", tokenX - 52)
          .attr("y2", tokenY)
          .attr("stroke", "#4caf50")
          .attr("stroke-width", weight * 8)
          .attr("opacity", 0.6)
          .attr("stroke-linecap", "round");
      });
    } else {
      // Show top attention for each token
      tokens.forEach((token, idx) => {
        const tokenY = tokenStartY + idx * tokenSpacing;
        let maxWeight = 0;
        let maxRegion = null;

        imageRegions.forEach(region => {
          const weight = attentionWeights[token][region.id];
          if (weight > maxWeight) {
            maxWeight = weight;
            maxRegion = region;
          }
        });

        if (maxRegion) {
          connectionG.append("line")
            .attr("x1", 115)
            .attr("y1", maxRegion.y + maxRegion.height / 2)
            .attr("x2", tokenX - 52)
            .attr("y2", tokenY)
            .attr("stroke", "#9e9e9e")
            .attr("stroke-width", maxWeight * 6)
            .attr("opacity", 0.3)
            .attr("stroke-linecap", "round");
        }
      });
    }

    // Add explanation text in center
    const explainY = 420;
    const explainBox = svg.append("g");

    explainBox.append("rect")
      .attr("x", 150)
      .attr("y", explainY - 15)
      .attr("width", 450)
      .attr("height", 70)
      .attr("fill", "#fff9c4")
      .attr("stroke", "#fbc02d")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    if (hoveredToken) {
      explainBox.append("text")
        .attr("x", 375)
        .attr("y", explainY + 5)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .text(`Token "${hoveredToken}" attends to image regions:`);

      let yOffset = 20;
      imageRegions.forEach(region => {
        const weight = attentionWeights[hoveredToken][region.id];
        explainBox.append("text")
          .attr("x", 375)
          .attr("y", explainY + yOffset)
          .attr("text-anchor", "middle")
          .style("font-size", "10px")
          .text(`${region.label}: ${(weight * 100).toFixed(0)}%`);
        yOffset += 12;
      });
    } else if (hoveredRegion) {
      const region = imageRegions.find(r => r.id === hoveredRegion);
      explainBox.append("text")
        .attr("x", 375)
        .attr("y", explainY + 5)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .text(`Image region "${region.label}" receives attention from:`);

      let yOffset = 20;
      tokens.forEach(token => {
        const weight = attentionWeights[token][hoveredRegion];
        explainBox.append("text")
          .attr("x", 375)
          .attr("y", explainY + yOffset)
          .attr("text-anchor", "middle")
          .style("font-size", "10px")
          .text(`"${token}": ${(weight * 100).toFixed(0)}%`);
        yOffset += 12;
      });
    } else {
      explainBox.append("text")
        .attr("x", 375)
        .attr("y", explainY + 10)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .text("👆 Hover over text tokens or image regions");

      explainBox.append("text")
        .attr("x", 375)
        .attr("y", explainY + 25)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .text("to see cross-modal attention weights!");

      explainBox.append("text")
        .attr("x", 375)
        .attr("y", explainY + 45)
        .attr("text-anchor", "middle")
        .style("font-size", "9px")
        .style("fill", "#666")
        .text("Thick lines = high attention | Thin lines = low attention");
    }
  };

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">3. Attention/Fusion: The Glass Box Window ⭐</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          <p>
            <strong>This is THE key insight for multimodal explainability:</strong> The fusion layer, where modalities interact through cross-attention, provides a natural window into the model's reasoning process.
          </p>
          <p>
            Cross-attention weights explicitly show which image regions correspond to which text tokens. When the model processes "golden retriever," we can see it attending to the dog's head and body regions. This is multimodal reasoning made visible!
          </p>
        </div>

        <div style={{display: "flex", justifyContent: "center", marginTop: 30, marginBottom: 30}}>
          <svg ref={svgRef}></svg>
        </div>

        <div style={{textAlign: "justify"}}>
          <h4 className="display-8">Why This Matters</h4>
          <div style={{backgroundColor: "#e8f4f8", padding: 20, borderRadius: 8, marginBottom: 15}}>
            <strong>The Power of Attention Visualization:</strong>
            <ul style={{marginBottom: 0, marginTop: 10}}>
              <li><strong>Interpretable by Design:</strong> Attention weights are probabilities—easy to understand</li>
              <li><strong>Multimodal Specific:</strong> Shows how modalities interact, not just individual processing</li>
              <li><strong>Debuggable:</strong> Can identify when model attends to wrong regions (like the COVID-Net case)</li>
              <li><strong>Trust Building:</strong> Users can verify model is "looking" at the right things</li>
            </ul>
          </div>

          <h4 className="display-8">Architectures That Expose Attention</h4>
          <ul>
            <li><strong>ALBEF (Salesforce):</strong> Explicitly separates encoders from fusion with visible attention</li>
            <li><strong>CLIP:</strong> While simpler, can still visualize which patches matter via gradients</li>
            <li><strong>Flamingo (DeepMind):</strong> Gated cross-attention makes interactions inspectable</li>
            <li><strong>BLIP:</strong> Attention maps show fine-grained image-text alignment</li>
          </ul>

          <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginTop: 20}}>
            <strong>The Limitation:</strong> While attention shows WHERE the model looks, it doesn't fully explain WHY. Attention is correlation, not necessarily causation. But it's still our best window into multimodal reasoning!
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttentionFusion;