import React, { useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import * as d3 from "d3";


const InformationFlow = ({ selectedImage, setSelectedImage, selectedText, setSelectedText }) => {
  const svgRef = useRef();

  useEffect(() => {
    renderFlow();
  }, [selectedImage, selectedText]);

  const renderFlow = () => {
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
      .text("Information Flow in Multimodal AI");

    // Stage 1: Input
    const inputY = 80;
    
    // Image input
    const imgG = svg.append("g").attr("transform", `translate(80, ${inputY})`);
    imgG.append("rect")
      .attr("width", 80)
      .attr("height", 80)
      .attr("fill", "#e3f2fd")
      .attr("stroke", "#2196f3")
      .attr("stroke-width", 2)
      .attr("rx", 5);
    
    imgG.append("text")
      .attr("x", 40)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "30px")
      .text("🖼️");
    
    imgG.append("text")
      .attr("x", 40)
      .attr("y", 60)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text("Image");

    // Text input
    const txtG = svg.append("g").attr("transform", `translate(80, ${inputY + 110})`);
    txtG.append("rect")
      .attr("width", 80)
      .attr("height", 80)
      .attr("fill", "#f3e5f5")
      .attr("stroke", "#9c27b0")
      .attr("stroke-width", 2)
      .attr("rx", 5);
    
    txtG.append("text")
      .attr("x", 40)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "30px")
      .text("📝");
    
    txtG.append("text")
      .attr("x", 40)
      .attr("y", 60)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text("Text");

    svg.append("text")
      .attr("x", 120)
      .attr("y", 60)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("RAW DATA");

    // Arrows to encoders
    drawArrow(svg, 170, 120, 230, 120);
    drawArrow(svg, 170, 230, 230, 230);

    // Stage 2: Encoders (with opacity indicator)
    const encoderX = 240;
    
    // Image encoder
    const imgEncG = svg.append("g").attr("transform", `translate(${encoderX}, ${inputY})`);
    imgEncG.append("rect")
      .attr("width", 100)
      .attr("height", 80)
      .attr("fill", "#2196f3")
      .attr("opacity", 0.3)
      .attr("stroke", "#1976d2")
      .attr("stroke-width", 2)
      .attr("rx", 5);
    
    imgEncG.append("text")
      .attr("x", 50)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text("Image");
    
    imgEncG.append("text")
      .attr("x", 50)
      .attr("y", 50)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text("Encoder");

    imgEncG.append("text")
      .attr("x", 50)
      .attr("y", 65)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .style("fill", "#666")
      .text("(ResNet/ViT)");

    // Opacity warning
    imgEncG.append("text")
      .attr("x", 50)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#ff6b6b")
      .style("font-weight", "bold")
      .text("⚠️ Opaque");

    // Text encoder
    const txtEncG = svg.append("g").attr("transform", `translate(${encoderX}, ${inputY + 110})`);
    txtEncG.append("rect")
      .attr("width", 100)
      .attr("height", 80)
      .attr("fill", "#9c27b0")
      .attr("opacity", 0.3)
      .attr("stroke", "#7b1fa2")
      .attr("stroke-width", 2)
      .attr("rx", 5);
    
    txtEncG.append("text")
      .attr("x", 50)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text("Text");
    
    txtEncG.append("text")
      .attr("x", 50)
      .attr("y", 50)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text("Encoder");

    txtEncG.append("text")
      .attr("x", 50)
      .attr("y", 65)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .style("fill", "#666")
      .text("(BERT/GPT)");

    txtEncG.append("text")
      .attr("x", 50)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#ff6b6b")
      .style("font-weight", "bold")
      .text("⚠️ Opaque");

    // Bottleneck representations
    drawArrow(svg, 350, 120, 410, 120);
    drawArrow(svg, 350, 230, 410, 230);

    const bottleneckX = 420;
    
    // Image embedding
    const imgEmbG = svg.append("g").attr("transform", `translate(${bottleneckX}, ${inputY})`);
    imgEmbG.append("rect")
      .attr("width", 80)
      .attr("height", 80)
      .attr("fill", "#bbdefb")
      .attr("stroke", "#2196f3")
      .attr("stroke-width", 2)
      .attr("rx", 5);
    
    // Draw simplified embedding vector
    for (let i = 0; i < 5; i++) {
      imgEmbG.append("rect")
        .attr("x", 10 + i * 13)
        .attr("y", 25)
        .attr("width", 10)
        .attr("height", 30)
        .attr("fill", "#2196f3")
        .attr("opacity", 0.3 + Math.random() * 0.4);
    }
    
    imgEmbG.append("text")
      .attr("x", 40)
      .attr("y", 72)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .text("Embedding");

    imgEmbG.append("text")
      .attr("x", 40)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#4caf50")
      .style("font-weight", "bold")
      .text("✓ Inspectable");

    // Text embedding
    const txtEmbG = svg.append("g").attr("transform", `translate(${bottleneckX}, ${inputY + 110})`);
    txtEmbG.append("rect")
      .attr("width", 80)
      .attr("height", 80)
      .attr("fill", "#e1bee7")
      .attr("stroke", "#9c27b0")
      .attr("stroke-width", 2)
      .attr("rx", 5);
    
    for (let i = 0; i < 5; i++) {
      txtEmbG.append("rect")
        .attr("x", 10 + i * 13)
        .attr("y", 25)
        .attr("width", 10)
        .attr("height", 30)
        .attr("fill", "#9c27b0")
        .attr("opacity", 0.3 + Math.random() * 0.4);
    }
    
    txtEmbG.append("text")
      .attr("x", 40)
      .attr("y", 72)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .text("Embedding");

    txtEmbG.append("text")
      .attr("x", 40)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#4caf50")
      .style("font-weight", "bold")
      .text("✓ Inspectable");

    svg.append("text")
      .attr("x", 460)
      .attr("y", 60)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#666")
      .text("BOTTLENECK");

    // Arrows to fusion
    drawArrow(svg, 510, 120, 555, 160);
    drawArrow(svg, 510, 230, 555, 200);

    // Stage 3: Fusion Layer (THE GLASS BOX WINDOW)
    const fusionG = svg.append("g").attr("transform", `translate(560, 140)`);
    
    fusionG.append("rect")
      .attr("width", 120)
      .attr("height", 80)
      .attr("fill", "#fff9c4")
      .attr("stroke", "#fbc02d")
      .attr("stroke-width", 3)
      .attr("rx", 5);

    fusionG.append("text")
      .attr("x", 60)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Fusion Layer");

    fusionG.append("text")
      .attr("x", 60)
      .attr("y", 45)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text("Cross-Attention");

    fusionG.append("text")
      .attr("x", 60)
      .attr("y", 58)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .style("fill", "#666")
      .text("(Multimodal");

    fusionG.append("text")
      .attr("x", 60)
      .attr("y", 69)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .style("fill", "#666")
      .text("Reasoning)");

    // Star for emphasis
    fusionG.append("text")
      .attr("x", 60)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("⭐");

    fusionG.append("text")
      .attr("x", 60)
      .attr("y", 95)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("fill", "#f57c00")
      .style("font-weight", "bold")
      .text("GLASS BOX WINDOW");

    // Arrow to output
    drawArrow(svg, 690, 180, 690, 240);

    // Output
    const outputG = svg.append("g").attr("transform", `translate(640, 250)`);
    outputG.append("rect")
      .attr("width", 100)
      .attr("height", 60)
      .attr("fill", "#c8e6c9")
      .attr("stroke", "#4caf50")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    outputG.append("text")
      .attr("x", 50)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Prediction");

    outputG.append("text")
      .attr("x", 50)
      .attr("y", 48)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#666")
      .text("Match: 0.92");

    // Add legend/explanation boxes
    const legendG = svg.append("g").attr("transform", "translate(50, 350)");

    // Opaque box
    legendG.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 200)
      .attr("height", 60)
      .attr("fill", "#ffebee")
      .attr("stroke", "#ef5350")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    legendG.append("text")
      .attr("x", 100)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text("⚠️ Opaque Components");

    legendG.append("text")
      .attr("x", 100)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .text("Complex transformations,");

    legendG.append("text")
      .attr("x", 100)
      .attr("y", 48)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .text("hard to interpret directly");

    // Inspectable box
    legendG.append("rect")
      .attr("x", 220)
      .attr("y", 0)
      .attr("width", 200)
      .attr("height", 60)
      .attr("fill", "#e8f5e9")
      .attr("stroke", "#4caf50")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    legendG.append("text")
      .attr("x", 320)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text("✓ Inspectable Points");

    legendG.append("text")
      .attr("x", 320)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .text("Natural explanation points:");

    legendG.append("text")
      .attr("x", 320)
      .attr("y", 48)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .text("embeddings, attention weights");

    // Glass box window
    legendG.append("rect")
      .attr("x", 440)
      .attr("y", 0)
      .attr("width", 200)
      .attr("height", 60)
      .attr("fill", "#fff9c4")
      .attr("stroke", "#fbc02d")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    legendG.append("text")
      .attr("x", 540)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text("⭐ Glass Box Window");

    legendG.append("text")
      .attr("x", 540)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .text("Fusion shows HOW");

    legendG.append("text")
      .attr("x", 540)
      .attr("y", 48)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .text("modalities interact!");
  };

  const drawArrow = (svg, x1, y1, x2, y2) => {
    svg.append("line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke", "#666")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)");

    // Define arrowhead if not already defined
    if (svg.select("#arrowhead").empty()) {
      svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", "#666");
    }
  };

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">2. How Information Flows Through the Model</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          <p>
            Let's trace how data transforms from raw inputs to final predictions. Understanding this flow reveals where opacity creeps in and where we have natural "inspection points" for explanations.
          </p>

          <h4 className="display-8">The Modular Approach</h4>
          <p>
            One framework for interpretability is keeping things modular—imagine Lego blocks where each piece handles one modality clearly before they connect. Salesforce's ALBEF model explicitly separates unimodal encoders from multimodal fusion, letting you probe each stage.
          </p>
        </div>

        <div style={{marginTop: 30, marginBottom: 20}}>
          <Row>
            <Col>
              <Form.Label><strong>Select Inputs to Trace:</strong></Form.Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Select 
                value={selectedImage} 
                onChange={(e) => setSelectedImage(e.target.value)}
                style={{marginBottom: 10}}
              >
                <option value="dog">Dog Image</option>
                <option value="cat">Cat Image</option>
                <option value="car">Car Image</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                value={selectedText}
                onChange={(e) => setSelectedText(e.target.value)}
                placeholder="Enter text..."
              />
            </Col>
          </Row>
        </div>

        <div style={{display: "flex", justifyContent: "center", marginBottom: 30}}>
          <svg ref={svgRef}></svg>
        </div>

        <div style={{textAlign: "justify"}}>
          <h4 className="display-8">Key Insights</h4>
          <ul>
            <li><strong>Encoders are Opaque:</strong> The transformation from raw data to embeddings involves millions of parameters. We can't easily trace exactly why a ResNet thinks a region contains "fur."</li>
            <li><strong>Embeddings are Inspectable:</strong> Once we have vector representations, we can measure distances, project to 2D, and understand relationships between concepts.</li>
            <li><strong>Fusion is the Glass Box Window:</strong> This is where the magic happens! Cross-attention weights explicitly show which image regions correspond to which text tokens. This is THE key insight point for multimodal explainability.</li>
            <li><strong>Information Bottlenecks:</strong> By forcing information through narrow channels (embeddings), we create natural explanation points. The bottleneck principle says these compressed representations must contain all task-relevant information.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformationFlow;