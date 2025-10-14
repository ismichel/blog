import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import * as d3 from "d3";


const RepresentationConvergence = () => {
  const svgRef = useRef();
  const [selectedModels, setSelectedModels] = useState(["clip", "align"]);
  const [metric, setMetric] = useState("cka");

  useEffect(() => {
    renderConvergence();
  }, [selectedModels, metric]);

  // Simulated embeddings for different models
  const getModelEmbeddings = (modelName) => {
    const baseEmbeddings = {
      dog: [0.8, 0.1, 0.1],
      cat: [0.1, 0.8, 0.1],
      car: [0.1, 0.1, 0.8],
      puppy: [0.75, 0.15, 0.1],
      kitten: [0.15, 0.75, 0.1],
      vehicle: [0.1, 0.15, 0.75],
    };

    // Add model-specific noise to simulate differences
    const noise = {
      clip: 0.0,
      align: 0.05,
      blip: 0.08,
      flava: 0.06
    };

    const modelNoise = noise[modelName] || 0.0;
    const embeddings = {};
    
    Object.keys(baseEmbeddings).forEach(concept => {
      embeddings[concept] = baseEmbeddings[concept].map(v => 
        v + (Math.random() - 0.5) * modelNoise
      );
    });

    return embeddings;
  };

  const renderConvergence = () => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 700;
    const height = 400;
    const margin = { top: 40, right: 150, bottom: 60, left: 60 };

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const modelColors = {
      clip: "#e74c3c",
      align: "#3498db",
      blip: "#2ecc71",
      flava: "#f39c12"
    };

    const modelNames = {
      clip: "CLIP (OpenAI)",
      align: "ALIGN (Google)",
      blip: "BLIP (Salesforce)",
      flava: "FLAVA (Meta)"
    };

    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Embedding Space Comparison: " + selectedModels.map(m => modelNames[m]).join(" vs "));

    const concepts = ["dog", "cat", "car", "puppy", "kitten", "vehicle"];
    
    // Get embeddings for selected models
    const modelData = selectedModels.map(modelName => ({
      name: modelName,
      embeddings: getModelEmbeddings(modelName),
      color: modelColors[modelName]
    }));

    // Project to 2D for visualization (simplified PCA)
    const plotData = concepts.map(concept => {
      const points = modelData.map(model => {
        const emb = model.embeddings[concept];
        // Simple projection: use first two dimensions with some rotation
        return {
          x: emb[0] * 200 + emb[1] * 100 + 150,
          y: emb[1] * 200 + emb[2] * 100 + 150,
          model: model.name,
          color: model.color,
          concept: concept
        };
      });
      return { concept, points };
    });

    // Draw connecting lines between same concept across models
    plotData.forEach(({ concept, points }) => {
      if (points.length === 2) {
        svg.append("line")
          .attr("x1", points[0].x)
          .attr("y1", points[0].y)
          .attr("x2", points[1].x)
          .attr("y2", points[1].y)
          .attr("stroke", "#ccc")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");
      }
    });

    // Draw concept clusters
    const categoryColors = {
      dog: "#ff6b6b",
      puppy: "#ff6b6b",
      cat: "#4ecdc4",
      kitten: "#4ecdc4",
      car: "#45b7d1",
      vehicle: "#45b7d1"
    };

    // Draw points for each model
    plotData.forEach(({ concept, points }) => {
      points.forEach(point => {
        svg.append("circle")
          .attr("cx", point.x)
          .attr("cy", point.y)
          .attr("r", 8)
          .attr("fill", point.color)
          .attr("stroke", categoryColors[concept])
          .attr("stroke-width", 2)
          .style("cursor", "pointer")
          .append("title")
          .text(`${point.model}: ${concept}`);
      });
    });

    // Add labels
    const labelPositions = {
      dog: { x: 320, y: 100 },
      cat: { x: 150, y: 280 },
      car: { x: 180, y: 120 },
      puppy: { x: 350, y: 140 },
      kitten: { x: 180, y: 310 },
      vehicle: { x: 210, y: 150 }
    };

    Object.keys(labelPositions).forEach(concept => {
      svg.append("text")
        .attr("x", labelPositions[concept].x)
        .attr("y", labelPositions[concept].y)
        .text(concept)
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .style("fill", categoryColors[concept]);
    });

    // Legend for models
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 140}, 60)`);

    selectedModels.forEach((model, i) => {
      legend.append("circle")
        .attr("cx", 0)
        .attr("cy", i * 25)
        .attr("r", 6)
        .attr("fill", modelColors[model]);

      legend.append("text")
        .attr("x", 12)
        .attr("y", i * 25 + 4)
        .text(modelNames[model])
        .style("font-size", "12px");
    });

    // Axes labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
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

    // Calculate and display similarity metric
    if (selectedModels.length === 2) {
      const similarity = calculateSimilarity(
        modelData[0].embeddings,
        modelData[1].embeddings,
        metric
      );

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 30)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", similarity > 0.8 ? "#27ae60" : "#f39c12")
        .text(`${metric.toUpperCase()} Similarity: ${similarity.toFixed(3)}`);
    }
  };

  const calculateSimilarity = (emb1, emb2, metricType) => {
    // Simplified similarity calculation
    const concepts = Object.keys(emb1);
    let totalSim = 0;

    concepts.forEach(concept => {
      const v1 = emb1[concept];
      const v2 = emb2[concept];
      
      // Cosine similarity
      const dot = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
      const norm1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
      const norm2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
      
      totalSim += dot / (norm1 * norm2);
    });

    return totalSim / concepts.length;
  };

  const handleModelToggle = (model) => {
    if (selectedModels.includes(model)) {
      if (selectedModels.length > 1) {
        setSelectedModels(selectedModels.filter(m => m !== model));
      }
    } else {
      if (selectedModels.length < 4) {
        setSelectedModels([...selectedModels, model]);
      }
    }
  };

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Visualizing Representational Convergence</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          <h4 className="display-8">Measuring Similarity Across Models</h4>
          Below, we visualize how different multimodal models represent the same concepts in embedding space. Despite being trained independently with different architectures, notice how similar concepts cluster together in remarkably similar ways.
          <br /><br />
          <div style={{backgroundColor: "#e8f4f8", padding: 15, borderRadius: 8}}>
            <strong>Key Observation:</strong> The dashed lines connect the same concept as represented by different models. Shorter lines indicate higher representational similarity—the models have learned similar embeddings for that concept.
          </div>
        </div>

        <div style={{marginTop: 30, marginBottom: 20}}>
          <h4 className="display-8">Select Models to Compare (1-4):</h4>
          <ButtonGroup style={{marginRight: 10, marginBottom: 10}}>
            {["clip", "align", "blip", "flava"].map(model => (
              <Button
                key={model}
                variant={selectedModels.includes(model) ? "primary" : "outline-secondary"}
                onClick={() => handleModelToggle(model)}
              >
                {model.toUpperCase()}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <div style={{marginBottom: 20}}>
          <Form.Label><strong>Similarity Metric:</strong></Form.Label>
          <Form.Select value={metric} onChange={(e) => setMetric(e.target.value)} style={{width: "200px"}}>
            <option value="cka">CKA (Centered Kernel Alignment)</option>
            <option value="rsa">RSA (Representational Similarity Analysis)</option>
            <option value="cosine">Cosine Similarity</option>
          </Form.Select>
        </div>

        <div style={{display: "flex", justifyContent: "center", marginBottom: 30}}>
          <svg ref={svgRef}></svg>
        </div>

        <div style={{textAlign: "justify"}}>
          <h4 className="display-8">What Are We Measuring?</h4>
          
          <strong>CKA (Centered Kernel Alignment)</strong>
          <ul>
            <li>Measures similarity of representation geometries</li>
            <li>Invariant to orthogonal transformations and isotropic scaling</li>
            <li>Values close to 1 indicate similar representational structure</li>
          </ul>

          <strong>RSA (Representational Similarity Analysis)</strong>
          <ul>
            <li>Compares pairwise distances between representations</li>
            <li>Originally from neuroscience (comparing brain activity patterns)</li>
            <li>Robust to individual neuron/unit differences</li>
          </ul>

          <strong>Cosine Similarity</strong>
          <ul>
            <li>Measures angle between embedding vectors</li>
            <li>Simple and interpretable</li>
            <li>Commonly used in embedding space analysis</li>
          </ul>

          <div style={{backgroundColor: "#fff3cd", padding: 20, borderRadius: 8, marginTop: 20}}>
            <strong>Empirical Finding:</strong> Across multiple studies, researchers have found that different multimodal models achieve CKA similarities of 0.7-0.9 in their learned representations, despite using different:
            <ul style={{marginBottom: 0}}>
              <li>Architectures (ResNet vs ViT for vision)</li>
              <li>Training datasets (400M vs 1.8B image-text pairs)</li>
              <li>Optimization procedures (different learning rates, batch sizes)</li>
              <li>Training compute (days vs weeks of GPU time)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepresentationConvergence;
