import * as tf from '@tensorflow/tfjs';


/**
 * Load MobileNet model for feature extraction
 */
// Simple mock model that mimics the methods used downstream
class MockImageModel {
  async classify(image, topK = 5) {
    // Return deterministic pseudo-scores to keep UI predictable without extra deps
    return [
      { className: 'dog', probability: 0.8 },
      { className: 'cat', probability: 0.6 },
      { className: 'car', probability: 0.4 },
      { className: 'bird', probability: 0.2 },
      { className: 'fish', probability: 0.1 },
    ].slice(0, topK);
  }

  infer(tensor, returnEmbedding) {
    if (returnEmbedding) {
      // 1000-dim pseudo embedding similar to ImageNet head shape used by projection
      const data = Array.from({ length: 1000 }, (_, i) => (Math.sin(i) + 1) * 0.05);
      return tf.tensor1d(data);
    }
    return tf.tensor2d([[0.8, 0.6, 0.4, 0.2, 0.1]]);
  }
}

export async function loadMobileNet() {
  // Simulate small load delay
  await new Promise(r => setTimeout(r, 300));
  return new MockImageModel();
}


/**
 * Simple text encoding using word embeddings
 * This is a simplified version - real CLIP uses a transformer
 */
function encodeText(text) {
  // Normalize text
  const normalized = text.toLowerCase().trim();
  
  // Simple keyword-based encoding
  const keywords = {
    'dog': [1, 0, 0, 0, 0],
    'puppy': [0.9, 0.1, 0, 0, 0],
    'cat': [0, 1, 0, 0, 0],
    'kitten': [0, 0.9, 0.1, 0, 0],
    'car': [0, 0, 1, 0, 0],
    'vehicle': [0, 0, 0.9, 0.1, 0],
    'automobile': [0, 0, 0.8, 0.2, 0],
    'bird': [0, 0, 0, 1, 0],
    'fish': [0, 0, 0, 0, 1],
    'animal': [0.3, 0.3, 0, 0.2, 0.2],
  };
  
  // Create base embedding
  let embedding = [0, 0, 0, 0, 0];
  
  // Check for keywords in text
  const words = normalized.split(/\s+/);
  let matchCount = 0;
  
  words.forEach(word => {
    if (keywords[word]) {
      matchCount++;
      for (let i = 0; i < 5; i++) {
        embedding[i] += keywords[word][i];
      }
    }
  });
  
  // Normalize if we found matches
  if (matchCount > 0) {
    const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    if (norm > 0) {
      embedding = embedding.map(val => val / norm);
    }
  } else {
    // If no matches, create a random embedding
    embedding = Array(5).fill(0).map(() => Math.random() * 0.3);
    const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    embedding = embedding.map(val => val / norm);
  }
  
  return embedding;
}


/**
 * Compute cosine similarity between two vectors
 */
function cosineSimilarity(vec1, vec2) {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must have same length');
  }
  
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    norm1 += vec1[i] * vec1[i];
    norm2 += vec2[i] * vec2[i];
  }
  
  norm1 = Math.sqrt(norm1);
  norm2 = Math.sqrt(norm2);
  
  if (norm1 === 0 || norm2 === 0) {
    return 0;
  }
  
  return dotProduct / (norm1 * norm2);
}


/**
 * Extract image features using the loaded model (mocked)
 */
async function extractImageFeatures(model, canvas) {
  return tf.tidy(() => {
    // Get image data from canvas
    const img = tf.browser.fromPixels(canvas);
    
    // Preprocess: normalize to [-1, 1]
    const normalized = img.toFloat().div(127.5).sub(1);
    
    // Add batch dimension
    const batched = normalized.expandDims(0);
    
    // Get intermediate layer activation (embedding)
    const activation = model.infer(batched, true);
    
    // Convert to array
    return activation.squeeze().arraySync();
  });
}


/**
 * Map MobileNet features to simplified embedding space
 * This simulates the projection layer in CLIP
 */
function projectImageFeatures(features) {
  // MobileNet outputs 1000-dim features, we'll map to our 5-dim space
  // This is a simplified projection
  
  // Define indices for our 5 categories based on ImageNet classes
  const dogIndices = [151, 152, 153, 154, 155, 156, 157, 158, 159, 160]; // dogs
  const catIndices = [281, 282, 283, 284, 285]; // cats
  const carIndices = [436, 511, 609, 627, 656, 661, 751, 817]; // vehicles
  const birdIndices = Array.from({length: 59}, (_, i) => i + 7); // birds
  const fishIndices = [0, 1, 389, 390, 391, 392, 393, 394, 395, 396]; // fish
  
  const embedding = [0, 0, 0, 0, 0];
  
  // Sum activations for each category
  dogIndices.forEach(idx => embedding[0] += features[idx]);
  catIndices.forEach(idx => embedding[1] += features[idx]);
  carIndices.forEach(idx => embedding[2] += features[idx]);
  birdIndices.forEach(idx => embedding[3] += features[idx]);
  fishIndices.forEach(idx => embedding[4] += features[idx]);
  
  // Normalize
  const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  if (norm > 0) {
    return embedding.map(val => val / norm);
  }
  
  return embedding;
}


/**
 * Compute similarity between image and multiple text descriptions
 */
export async function computeImageTextSimilarity(model, canvas, textDescriptions) {
  // Extract image features
  const imageFeatures = await extractImageFeatures(model, canvas);
  const imageEmbedding = projectImageFeatures(imageFeatures);
  
  // Encode all text descriptions
  const results = textDescriptions.map(text => {
    const textEmbedding = encodeText(text);
    const similarity = cosineSimilarity(imageEmbedding, textEmbedding);
    
    return {
      text: text,
      score: similarity
    };
  });
  
  // Sort by similarity (highest first)
  results.sort((a, b) => b.score - a.score);
  
  // Normalize scores to sum to 1 (softmax-like)
  const maxScore = Math.max(...results.map(r => r.score));
  const expScores = results.map(r => Math.exp((r.score - maxScore) * 5)); // temperature = 5
  const sumExp = expScores.reduce((sum, val) => sum + val, 0);
  
  results.forEach((result, i) => {
    result.score = expScores[i] / sumExp;
  });
  
  return results;
}


/**
 * Get top predictions from the model for display
 */
export async function getTopPredictions(model, canvas, topK = 5) {
  return tf.tidy(() => {
    const img = tf.browser.fromPixels(canvas);
    const predictions = model.classify(img, topK);
    return predictions;
  });
}
