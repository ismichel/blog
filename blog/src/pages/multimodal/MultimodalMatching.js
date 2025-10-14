import React, { useState, useEffect } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { loadMobileNet, computeImageTextSimilarity } from "../../functions/multimodalFunctions";


const MultimodalMatching = ({ setModel }) => {
  const [imageModel, setImageModel] = useState(undefined);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [textInputs, setTextInputs] = useState(["a dog", "a cat", "a car"]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageModel) {
      setModel(imageModel);
    }
  }, [imageModel, setModel]);

  const [modelLoading, setModelLoading] = useState(false);

  async function handleLoadModel() {
    setModelLoading(true);
    try {
      const model = await loadMobileNet();
      setImageModel(model);
    } catch (error) {
      console.error("Error loading model:", error);
      alert("Failed to load model. Please try again.");
    } finally {
      setModelLoading(false);
    }
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.getElementById("uploaded-canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 224;
          canvas.height = 224;
          ctx.drawImage(img, 0, 0, 224, 224);
          setUploadedImage(canvas);
          document.getElementById("uploaded-canvas").style.display = "block";
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
      setResults(null);
    }
  }

  function handleTextChange(index, value) {
    const newInputs = [...textInputs];
    newInputs[index] = value;
    setTextInputs(newInputs);
  }

  function addTextInput() {
    if (textInputs.length < 6) {
      setTextInputs([...textInputs, ""]);
    }
  }

  function removeTextInput(index) {
    if (textInputs.length > 2) {
      const newInputs = textInputs.filter((_, i) => i !== index);
      setTextInputs(newInputs);
    }
  }

  async function handleMatch() {
    if (!uploadedImage || !imageModel) {
      alert("Please load the model and upload an image first!");
      return;
    }

    const validTexts = textInputs.filter(t => t.trim() !== "");
    if (validTexts.length === 0) {
      alert("Please enter at least one text description!");
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const similarities = await computeImageTextSimilarity(imageModel, uploadedImage, validTexts);
      setResults(similarities);
    } catch (error) {
      console.error("Error computing similarities:", error);
      alert("Failed to compute similarities. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Interactive Image-Text Matching</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          Now let's try it ourselves! In this simplified demo, we'll use a pre-trained image model to extract image features. While a full CLIP model would have separate encoders for both images and text trained together, this demo will help you understand the core concept of matching images with text descriptions.
          <br /><br />
          <Alert variant="info">
            <strong>Note:</strong> This is a simplified demonstration. A true multimodal model like CLIP would encode both images and text into the same embedding space. Here, we're using a pre-trained image classifier to demonstrate the concept of similarity matching between modalities.
          </Alert>
        </div>

        <div style={{marginTop: 30}}>
          <h4 className="display-8">Step 1: Load the Model</h4>
          <Button id="load-model-btn" onClick={handleLoadModel} style={{marginRight: 10}} disabled={modelLoading || !!imageModel}>
            Load Image Model
          </Button>
          {modelLoading && <Spinner id="load-spinner" animation="border" size="sm" />}
        </div>

        <div style={{marginTop: 30}}>
          <h4 className="display-8">Step 2: Upload an Image</h4>
          <input 
            id="upload-image-btn"
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            disabled={!imageModel}
            style={{marginBottom: 20}}
          />
          <div style={{display: "flex", justifyContent: "center"}}>
            <canvas 
              id="uploaded-canvas" 
              style={{display: "none", border: "2px solid #ddd", borderRadius: "8px"}}
            />
          </div>
        </div>

        <div style={{marginTop: 30}}>
          <h4 className="display-8">Step 3: Enter Text Descriptions</h4>
          <div style={{textAlign: "justify", marginBottom: 15}}>
            Enter different text descriptions that might match your image. The model will compute how well each description matches the image!
          </div>
          {textInputs.map((text, index) => (
            <div key={index} style={{display: "flex", marginBottom: 10, alignItems: "center"}}>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder={`Text description ${index + 1}`}
                style={{marginRight: 10}}
              />
              {textInputs.length > 2 && (
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => removeTextInput(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          {textInputs.length < 6 && (
            <Button 
              variant="secondary" 
              size="sm"
              onClick={addTextInput}
              style={{marginTop: 10}}
            >
              Add Another Description
            </Button>
          )}
        </div>

        <div style={{marginTop: 30}}>
          <h4 className="display-8">Step 4: Compute Matches</h4>
          <Button 
            id="match-btn"
            variant="primary" 
            onClick={handleMatch}
            disabled={!imageModel || !uploadedImage || loading}
            style={{marginRight: 10}}
          >
            Find Best Match!
          </Button>
          {loading && <Spinner animation="border" size="sm" />}
        </div>

        {results && (
          <div style={{marginTop: 30}}>
            <h4 className="display-8">Results: Similarity Scores</h4>
            <div style={{textAlign: "justify", marginBottom: 15}}>
              Higher scores indicate better matches between the image and text description. The scores are computed based on how similar the image features are to the concepts in the text.
            </div>
            <div style={{backgroundColor: "#f8f9fa", padding: 20, borderRadius: 8}}>
              {results.map((result, index) => (
                <div 
                  key={index} 
                  style={{
                    marginBottom: 15,
                    padding: 15,
                    backgroundColor: index === 0 ? "#d4edda" : "white",
                    borderRadius: 5,
                    border: index === 0 ? "2px solid #28a745" : "1px solid #dee2e6"
                  }}
                >
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div>
                      <strong>{result.text}</strong>
                      {index === 0 && <span style={{marginLeft: 10, color: "#28a745"}}>✓ Best Match!</span>}
                    </div>
                    <div style={{fontSize: "18px", fontWeight: "bold", color: index === 0 ? "#28a745" : "#333"}}>
                      {(result.score * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div style={{marginTop: 10}}>
                    <div style={{
                      width: "100%",
                      height: "20px",
                      backgroundColor: "#e9ecef",
                      borderRadius: "10px",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        width: `${result.score * 100}%`,
                        height: "100%",
                        backgroundColor: index === 0 ? "#28a745" : "#007bff",
                        transition: "width 0.5s ease"
                      }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{textAlign: "justify", marginTop: 30}}>
          <h4 className="display-8">Try These Experiments:</h4>
          <ul>
            <li>Upload an image of a common object and try different ways of describing it</li>
            <li>Test with very different descriptions to see how the scores change</li>
            <li>Try abstract concepts vs. concrete descriptions</li>
            <li>See how specific vs. general descriptions affect the matching</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultimodalMatching;