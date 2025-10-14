import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import * as d3 from "d3";


const MultimodalEmbeddings = () => {
  const svgRef = useRef();
  const [activeView, setActiveView] = useState("separate");

  useEffect(() => {
    renderEmbeddingSpace(activeView);
  }, [activeView]);

  const renderEmbeddingSpace = (view) => {
    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 700;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Define example data points
    const imagePoints = [
      { x: 100, y: 100, label: "🐕 Dog Image", type: "image", category: "dog" },
      { x: 120, y: 110, label: "🐕 Another Dog", type: "image", category: "dog" },
      { x: 400, y: 300, label: "🐱 Cat Image", type: "image", category: "cat" },
      { x: 420, y: 310, label: "🐱 Another Cat", type: "image", category: "cat" },
      { x: 250, y: 200, label: "🚗 Car Image", type: "image", category: "car" },
      { x: 270, y: 210, label: "🚗 Another Car", type: "image", category: "car" },
    ];

    const textPoints = [
      { x: 500, y: 100, label: "\"a dog\"", type: "text", category: "dog" },
      { x: 510, y: 90, label: "\"puppy\"", type: "text", category: "dog" },
      { x: 200, y: 300, label: "\"a cat\"", type: "text", category: "cat" },
      { x: 190, y: 310, label: "\"kitten\"", type: "text", category: "cat" },
      { x: 350, y: 80, label: "\"a car\"", type: "text", category: "car" },
      { x: 360, y: 90, label: "\"vehicle\"", type: "text", category: "car" },
    ];

    const alignedImagePoints = [
      { x: 140, y: 145, label: "🐕 Dog Image", type: "image", category: "dog" },
      { x: 165, y: 165, label: "🐕 Another Dog", type: "image", category: "dog" },
      { x: 440, y: 245, label: "🐱 Cat Image", type: "image", category: "cat" },
      { x: 465, y: 270, label: "🐱 Another Cat", type: "image", category: "cat" },
      { x: 285, y: 95, label: "🚗 Car Image", type: "image", category: "car" },
      { x: 310, y: 120, label: "🚗 Another Car", type: "image", category: "car" },
    ];

    const alignedTextPoints = [
      { x: 185, y: 100, label: "\"a dog\"", type: "text", category: "dog" },
      { x: 200, y: 170, label: "\"puppy\"", type: "text", category: "dog" },
      { x: 485, y: 205, label: "\"a cat\"", type: "text", category: "cat" },
      { x: 495, y: 280, label: "\"kitten\"", type: "text", category: "cat" },
      { x: 335, y: 55, label: "\"a car\"", type: "text", category: "car" },
      { x: 345, y: 125, label: "\"vehicle\"", type: "text", category: "car" },
    ];

    let dataToShow;
    if (view === "separate") {
      dataToShow = [...imagePoints, ...textPoints];
    } else {
      dataToShow = [...alignedImagePoints, ...alignedTextPoints];
    }

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(view === "separate" ? "Before Training: Separate Spaces" : "After Training: Shared Embedding Space");

    // Create groups for each category to show clustering
    const categories = ["dog", "cat", "car"];
    const colors = { dog: "#ff6b6b", cat: "#4ecdc4", car: "#45b7d1" };

    if (view === "aligned") {
      // Draw circles around clusters
      const clusters = [
        { x: 180, y: 152, r: 50, category: "dog" },
        { x: 475, y: 255, r: 50, category: "cat" },
        { x: 325, y: 105, r: 50, category: "car" },
      ];

      svg.selectAll(".cluster")
        .data(clusters)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .attr("fill", d => colors[d.category])
        .attr("opacity", 0.1)
        .attr("stroke", d => colors[d.category])
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5");
    }

    // Add data points
    const points = svg.selectAll(".point")
      .data(dataToShow)
      .enter()
      .append("g")
      .attr("class", "point")
      .attr("transform", d => {
        // In aligned view, nudge text (pink) dots further downward
        const yOffset = view === "aligned" && d.type === "text" ? 12 : 0;
        return `translate(${d.x}, ${d.y + yOffset})`;
      });

    points.append("circle")
      .attr("r", 8)
      .attr("fill", d => d.type === "image" ? "#6c5ce7" : "#fd79a8")
      .attr("stroke", d => colors[d.category])
      .attr("stroke-width", 2)
      .style("cursor", "pointer");

    points.append("text")
      .attr("dx", d => (view === "aligned" ? 14 : 12))
      .attr("dy", d => {
        // In the aligned (after training) view, separate labels by modality
        // Move image (blue) labels slightly up; text (pink) labels slightly up and right.
        if (view === "aligned") {
          return d.type === "image" ? 4 : 10;
        }
        return 4;
      })
      .text(d => d.label)
      .style("font-size", "12px")
      .style("fill", "#333");

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(20, ${height - 60})`);

    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 6)
      .attr("fill", "#6c5ce7");

    legend.append("text")
      .attr("x", 12)
      .attr("y", 4)
      .text("Image Embedding")
      .style("font-size", "12px");

    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", 20)
      .attr("r", 6)
      .attr("fill", "#fd79a8");

    legend.append("text")
      .attr("x", 12)
      .attr("y", 24)
      .text("Text Embedding")
      .style("font-size", "12px");

    // Add axes labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-style", "italic")
      .text("Embedding Dimension 1");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-style", "italic")
      .text("Embedding Dimension 2");
  };

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Understanding Embeddings</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          <h4 className="display-8">What are Embeddings?</h4>
          An <span className="emph">embedding</span> is a way of representing data (like images or text) as points in a high-dimensional space. Think of it like plotting words or images on a graph where similar items are close together and different items are far apart. In practice, these embeddings typically have hundreds or thousands of dimensions, but we can visualize them in 2D or 3D for understanding.
          <br /><br />
          <h4 className="display-8">From Separate to Shared Spaces</h4>
          Before training, images and text exist in completely separate spaces - there's no way to compare them directly. Multimodal models learn to map both modalities into a <span className="emph">shared embedding space</span> where:
          <ul>
            <li>Images of dogs and the text "dog" end up close together</li>
            <li>Images of cats and the text "cat" cluster in their own region</li>
            <li>Similar concepts (whether expressed as images or text) are nearby</li>
          </ul>
          This alignment is what enables the model to understand relationships between vision and language!
          <br /><br />
        </div>
        
        <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
          <ButtonGroup>
            <Button 
              variant={activeView === "separate" ? "primary" : "secondary"}
              onClick={() => setActiveView("separate")}
            >
              Before Training
            </Button>
            <Button 
              variant={activeView === "aligned" ? "primary" : "secondary"}
              onClick={() => setActiveView("aligned")}
            >
              After Training
            </Button>
          </ButtonGroup>
        </div>

        <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
          <svg ref={svgRef}></svg>
        </div>

        <div style={{textAlign: "justify"}}>
          <h4 className="display-8">How Alignment Happens</h4>
          During training, the model learns through <span className="emph">contrastive loss</span>:
          <ul>
            <li><span className="emph">Positive pairs</span> (matching image-text pairs) are pulled closer together</li>
            <li><span className="emph">Negative pairs</span> (non-matching pairs) are pushed further apart</li>
            <li>Over millions of examples, the model learns a shared representation where semantically similar concepts cluster together regardless of modality</li>
          </ul>
          This is why a trained multimodal model can match "a photo of a golden retriever" with an actual photo of a golden retriever - they've learned to occupy nearby positions in the embedding space!
        </div>
      </div>
    </div>
  );
};

export default MultimodalEmbeddings;
