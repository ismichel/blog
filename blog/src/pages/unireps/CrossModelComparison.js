import React, { useState, useEffect } from "react";
import { Button, Form, Table, Alert } from "react-bootstrap";
import { loadMultipleModels, compareEmbeddings } from "../../functions/unirepsFunctions";


const CrossModelComparison = ({ setModels }) => {
  const [loadedModels, setLoadedModels] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [textInput, setTextInput] = useState("a dog");
  const [comparisonResults, setComparisonResults] = useState(null);

  useEffect(() => {
    if (Object.keys(loadedModels).length > 0) {
      setModels(loadedModels);
    }
  }, [loadedModels, setModels]);

  async function handleLoadModels() {
    setLoading(true);
    try {
      const models = await loadMultipleModels();
      setLoadedModels(models);
    } catch (error) {
      console.error("Error loading models:", error);
      alert("Failed to load models. Please try again.");
    }
    setLoading(false);
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.getElementById("comparison-canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 224;
          canvas.height = 224;
          ctx.drawImage(img, 0, 0, 224, 224);
          setUploadedImage(canvas);
          document.getElementById("comparison-canvas").style.display = "block";
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
      setComparisonResults(null);
    }
  }

  async function handleCompare() {
    if (!uploadedImage || Object.keys(loadedModels).length === 0) {
      alert("Please load models and upload an image first!");
      return;
    }

    if (!textInput.trim()) {
      alert("Please enter a text description!");
      return;
    }

    setLoading(true);
    try {
      const results = await compareEmbeddings(loadedModels, uploadedImage, textInput);
      setComparisonResults(results);
    } catch (error) {
      console.error("Error comparing embeddings:", error);
      alert("Failed to compare embeddings. Please try again.");
    }
    setLoading(false);
  }

  const modelInfo = {
    clip: {
      name: "CLIP",
      org: "OpenAI",
      architecture: "ResNet-50 / ViT",
      dataset: "400M image-text pairs",
      released: "2021"
    },
    align: {
      name: "ALIGN",
      org: "Google",
      architecture: "EfficientNet / BERT",
      dataset: "1.8B image-text pairs",
      released: "2021"
    },
    blip: {
      name: "BLIP",
      org: "Salesforce",
      architecture: "ViT / BERT",
      dataset: "129M images",
      released: "2022"
    }
  };

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Cross-Model Representation Analysis</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          Now let's conduct our own experiment: upload an image and text, then see how different models represent them. We'll compare the embeddings across models to quantify their similarity.
          <br /><br />
          <Alert variant="info">
            <strong>What We're Testing:</strong> Do different models produce similar embeddings for the same input? If convergence theory is correct, we should see high similarity across models even though they were trained independently.
          </Alert>
        </div>

        <div style={{marginTop: 30}}>
          <h4 className="display-8">Step 1: Load Multiple Models</h4>
          <p style={{textAlign: "justify"}}>
            We'll load simulated versions of CLIP, ALIGN, and BLIP. In practice, these would be the actual pre-trained models with different architectures.
          </p>
          <Button 
            onClick={handleLoadModels} 
            disabled={loading || Object.keys(loadedModels).length > 0}
            style={{marginBottom: 20}}
          >
            {loading ? "Loading..." : "Load All Models"}
          </Button>
          
          {Object.keys(loadedModels).length > 0 && (
            <div style={{marginTop: 20}}>
              <strong>Loaded Models:</strong>
              <Table striped bordered hover size="sm" style={{marginTop: 10}}>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Organization</th>
                    <th>Architecture</th>
                    <th>Dataset Size</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(loadedModels).map(modelKey => (
                    <tr key={modelKey}>
                      <td><strong>{modelInfo[modelKey].name}</strong></td>
                      <td>{modelInfo[modelKey].org}</td>
                      <td>{modelInfo[modelKey].architecture}</td>
                      <td>{modelInfo[modelKey].dataset}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>

        <div style={{marginTop: 30}}>
          <h4 className="display-8">Step 2: Upload Test Image</h4>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            disabled={Object.keys(loadedModels).length === 0}
            style={{marginBottom: 20}}
          />
          <div style={{display: "flex", justifyContent: "center"}}>
            <canvas 
              id="comparison-canvas" 
              style={{display: "none", border: "2px solid #ddd", borderRadius: "8px"}}
            />
          </div>
        </div>

        <div style={{marginTop: 30}}>
          <h4 className="display-8">Step 3: Enter Text Description</h4>
          <Form.Control
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter a description..."
            style={{marginBottom: 20}}
          />
        </div>

        <div style={{marginTop: 30}}>
          <h4 className="display-8">Step 4: Compare Representations</h4>
          <Button 
            variant="primary"
            onClick={handleCompare}
            disabled={!uploadedImage || Object.keys(loadedModels).length === 0 || loading}
          >
            {loading ? "Computing..." : "Compare Across Models"}
          </Button>
        </div>

        {comparisonResults && (
          <div style={{marginTop: 40}}>
            <h4 className="display-8">Results: Cross-Model Similarity</h4>
            
            <div style={{backgroundColor: "#f8f9fa", padding: 20, borderRadius: 8, marginBottom: 20}}>
              <h5>Image-Text Matching Scores</h5>
              <p style={{fontSize: "14px"}}>How well does each model match this image with the text?</p>
              <Table bordered style={{marginTop: 15}}>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Similarity Score</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonResults.matchScores.map((result, idx) => (
                    <tr key={result.model}>
                      <td><strong>{result.model.toUpperCase()}</strong></td>
                      <td>{result.score.toFixed(4)}</td>
                      <td>#{idx + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div style={{backgroundColor: "#e8f4f8", padding: 20, borderRadius: 8, marginBottom: 20}}>
              <h5>Representation Similarity Matrix</h5>
              <p style={{fontSize: "14px"}}>Pairwise similarity between model representations (CKA)</p>
              <Table bordered style={{marginTop: 15}}>
                <thead>
                  <tr>
                    <th></th>
                    {Object.keys(loadedModels).map(model => (
                      <th key={model}>{model.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(loadedModels).map((model1, i) => (
                    <tr key={model1}>
                      <td><strong>{model1.toUpperCase()}</strong></td>
                      {Object.keys(loadedModels).map((model2, j) => (
                        <td 
                          key={model2}
                          style={{
                            backgroundColor: comparisonResults.similarityMatrix[i][j] > 0.8 ? "#d4edda" :
                                           comparisonResults.similarityMatrix[i][j] > 0.6 ? "#fff3cd" : "#f8d7da",
                            fontWeight: i === j ? "bold" : "normal"
                          }}
                        >
                          {comparisonResults.similarityMatrix[i][j].toFixed(3)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div style={{fontSize: "12px", marginTop: 10, color: "#666"}}>
                <span style={{backgroundColor: "#d4edda", padding: "2px 8px", marginRight: 10}}>High (>0.8)</span>
                <span style={{backgroundColor: "#fff3cd", padding: "2px 8px", marginRight: 10}}>Medium (0.6-0.8)</span>
                <span style={{backgroundColor: "#f8d7da", padding: "2px 8px"}}>Low (&lt;0.6)</span>
              </div>
            </div>

            <div style={{backgroundColor: "#d4edda", padding: 20, borderRadius: 8}}>
              <h5>Key Findings</h5>
              <ul style={{marginBottom: 0}}>
                <li><strong>Average Cross-Model Similarity:</strong> {comparisonResults.avgSimilarity.toFixed(3)}</li>
                <li><strong>Interpretation:</strong> {
                  comparisonResults.avgSimilarity > 0.8 ? 
                    "Very high convergence! Different models have learned remarkably similar representations." :
                  comparisonResults.avgSimilarity > 0.6 ?
                    "Moderate convergence. Models show significant representational alignment." :
                    "Lower convergence. Models may have learned different features for this input."
                }</li>
                <li><strong>Variance in Matching:</strong> {comparisonResults.scoreVariance.toFixed(4)} 
                  {comparisonResults.scoreVariance < 0.01 ? " (very consistent across models)" : " (some variation across models)"}
                </li>
              </ul>
            </div>

            <div style={{textAlign: "justify", marginTop: 20}}>
              <h5>What This Tells Us</h5>
              <p>
                High similarity values (>0.7) in the matrix indicate that different models have learned similar geometric relationships in their embedding spaces. This suggests that the representational structure is driven more by the data and task than by specific architectural choices.
              </p>
              <p>
                When all models produce similar matching scores for the image-text pair, it demonstrates that they've converged on similar semantic understanding—they all "recognize" the relationship between the image and text in comparable ways.
              </p>
            </div>
          </div>
        )}

        <div style={{textAlign: "justify", marginTop: 30}}>
          <h4 className="display-8">Experiment Ideas</h4>
          <ul>
            <li><strong>Edge Cases:</strong> Try ambiguous images or abstract text. Do models still converge?</li>
            <li><strong>Compositional Understanding:</strong> Test "cat on a mat" vs "mat under a cat"</li>
            <li><strong>Counting:</strong> Upload images with multiple objects and describe counts</li>
            <li><strong>Cultural Concepts:</strong> Test with images/text from different cultures</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrossModelComparison;