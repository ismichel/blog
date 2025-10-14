// Mock utilities for UniReps comparisons to avoid heavy deps

export async function loadMultipleModels() {
  // Simulate async load of three distinct models
  await new Promise(r => setTimeout(r, 500));
  return {
    clip: { id: 'clip' },
    align: { id: 'align' },
    blip: { id: 'blip' },
  };
}

export async function compareEmbeddings(models, canvas, text) {
  // Simulate per-model similarity with deterministic pseudo-randomness
  const base = Math.min(0.95, 0.6 + (hash(text) % 35) / 100);
  const scores = Object.keys(models).map((key, i) => ({
    model: key,
    score: clamp01(base - i * 0.03 + ((hash(key + text) % 7) - 3) / 100)
  })).sort((a, b) => b.score - a.score);

  // Mock similarity matrix (CKA-like)
  const keys = Object.keys(models);
  const matrix = keys.map((a, i) => keys.map((b, j) => {
    if (i === j) return 1.0;
    const v = 0.65 + ((hash(a + b + text) % 20) / 100);
    return clamp01(v);
  }));

  const avgSimilarity = matrix.flat().reduce((s, v) => s + v, 0) / (keys.length * keys.length);
  const mean = scores.reduce((s, r) => s + r.score, 0) / scores.length;
  const variance = scores.reduce((s, r) => s + Math.pow(r.score - mean, 2), 0) / scores.length;

  return {
    matchScores: scores,
    similarityMatrix: matrix,
    avgSimilarity,
    scoreVariance: variance,
  };
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}


