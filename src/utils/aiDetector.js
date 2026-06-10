// Simple AI detection heuristic based on common AI patterns
export const detectAIPatterns = (text) => {
  if (!text || text.trim().length === 0) return { score: 0, highlights: [] }

  const aiPatterns = [
    // Overused AI phrases
    { pattern: /\bin today's digital era\b/gi, weight: 3 },
    { pattern: /\bdelve into\b/gi, weight: 3 },
    { pattern: /\bit is important to note\b/gi, weight: 2 },
    { pattern: /\bmoreover\b/gi, weight: 1 },
    { pattern: /\bfurthermore\b/gi, weight: 1 },
    { pattern: /\bin conclusion\b/gi, weight: 2 },
    { pattern: /\bthis comprehensive\b/gi, weight: 2 },
    { pattern: /\ba testament to\b/gi, weight: 2 },
    { pattern: /\bplays a vital role\b/gi, weight: 2 },
    { pattern: /\bin the realm of\b/gi, weight: 2 },
    
    // Sentence structure patterns
    { pattern: /.{150,}\./g, weight: 1 }, // Very long sentences
    { pattern: /^\s*[A-Z][^.!?]*[.!?]\s*$/gm, weight: 0.5 }, // Uniform sentence length
  ]

  let totalScore = 0
  const highlights = []

  aiPatterns.forEach(({ pattern, weight }) => {
    const matches = [...text.matchAll(pattern)]
    matches.forEach(match => {
      totalScore += weight
      highlights.push({
        text: match[0],
        index: match.index,
        length: match[0].length,
        weight
      })
    })
  })

  // Normalize score to 0-100
  const normalizedScore = Math.min(100, Math.round((totalScore / text.length) * 1000))
  
  return {
    score: normalizedScore,
    highlights,
    riskLevel: normalizedScore > 70 ? 'high' : normalizedScore > 40 ? 'medium' : 'low'
  }
}

// Calculate sentence variation (human writing has varied sentence lengths)
export const analyzeSentenceVariation = (text) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  if (sentences.length < 3) return { variation: 0, avgLength: 0 }

  const lengths = sentences.map(s => s.trim().length)
  const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length
  const stdDev = Math.sqrt(variance)
  const coefficientOfVariation = stdDev / avgLength

  return {
    variation: coefficientOfVariation,
    avgLength,
    sentenceCount: sentences.length
  }
}

// Human-like quirks detector
export const detectHumanQuirks = (text) => {
  const quirks = {
    hasContractions: /\b(can't|won't|don't|doesn't|I'm|you're|we're|they're)\b/i.test(text),
    hasRhetoricalQuestions: /\?\s*(?:Well|But|And|So)/i.test(text),
    hasIdioms: /\b(piece of cake|break the ice|hit the nail|once in a blue moon)\b/i.test(text),
    hasTransitionWords: /\b(however|therefore|consequently|nevertheless|nonetheless)\b/i.test(text),
    hasVariedOpeners: /^(\w+\s+){1,5}(?:however|therefore|but|and|so|well|now|then)/im.test(text),
  }

  const quirkCount = Object.values(quirks).filter(v => v).length
  return {
    quirks,
    quirkScore: (quirkCount / Object.keys(quirks).length) * 100
  }
}

// Combined analysis
export const analyzeText = (text) => {
  const aiDetection = detectAIPatterns(text)
  const sentenceVariation = analyzeSentenceVariation(text)
  const humanQuirks = detectHumanQuirks(text)

  // Final score: lower is better (more human-like)
  let finalScore = aiDetection.score
  
  // Reduce score for good sentence variation
  if (sentenceVariation.variation > 0.3) {
    finalScore -= 10
  }
  
  // Reduce score for human quirks
  finalScore -= (humanQuirks.quirkScore * 0.2)
  
  finalScore = Math.max(0, Math.min(100, Math.round(finalScore)))

  return {
    aiScore: finalScore,
    aiRisk: finalScore > 70 ? 'high' : finalScore > 40 ? 'medium' : 'low',
    aiHighlights: aiDetection.highlights,
    sentenceVariation,
    humanQuirks,
    recommendation: finalScore > 50 
      ? 'Teks ini memiliki kemungkinan terdeteksi sebagai AI. Pertimbangkan untuk menggunakan mode Anti-AI Detection.'
      : 'Teks ini terlihat natural dan kemungkinan besar tidak terdeteksi sebagai AI.'
  }
}
