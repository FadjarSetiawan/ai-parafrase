// Mock paraphrase function - in production, this would call an AI API
export const paraphraseText = async (text, mode, language, humanizeLevel) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

  if (!text || text.trim().length === 0) return ''

  // Mode-specific transformations
  let result = text

  // Common replacements for Indonesian
  const idReplacements = {
    'adalah': ['merupakan', 'ialah', 'yaitu'],
    'dengan': ['bersama', 'melalui', 'via'],
    'untuk': ['guna', 'bagi', 'demi'],
    'yang': ['mana', 'bahwa'],
    'dalam': ['di dalam', 'pada', 'di'],
    'ini': ['tersebut', 'ini'],
    'itu': ['tersebut', 'dia'],
    'sangat': ['amat', 'begitu', 'terlalu'],
    'juga': ['pun', 'turut'],
    'tidak': ['tak', 'bukan'],
    'akan': ['hendak', 'bakal'],
    'telah': ['sudah', 'pernah'],
    'karena': ['sebab', 'oleh karena'],
    'sehingga': ['maka', 'akibatnya'],
    'namun': ['tetapi', 'akan tetapi'],
    'oleh karena itu': ['maka dari itu', 'dengan demikian'],
  }

  // Common replacements for English
  const enReplacements = {
    'is': ['remains', 'stands as'],
    'are': ['exist as', 'stand as'],
    'was': ['became', 'turned out to be'],
    'were': ['proved to be'],
    'important': ['crucial', 'vital', 'significant', 'essential'],
    'significant': ['notable', 'remarkable', 'substantial'],
    'show': ['demonstrate', 'illustrate', 'reveal', 'display'],
    'use': ['utilize', 'employ', 'leverage', 'apply'],
    'make': ['create', 'produce', 'generate', 'craft'],
    'get': ['obtain', 'acquire', 'receive', 'gain'],
    'good': ['excellent', 'outstanding', 'remarkable', 'superb'],
    'bad': ['poor', 'suboptimal', 'unsatisfactory', 'inadequate'],
    'very': ['extremely', 'highly', 'exceptionally', 'tremendously'],
    'really': ['truly', 'genuinely', 'actually', 'indeed'],
    'also': ['additionally', 'furthermore', 'moreover', 'likewise'],
    'however': ['nevertheless', 'nonetheless', 'yet', 'still'],
    'therefore': ['consequently', 'thus', 'hence', 'accordingly'],
    'because': ['due to', 'owing to', 'as a result of'],
    'although': ['even though', 'while', 'whereas'],
  }

  const replacements = language === 'id' ? idReplacements : enReplacements

  // Apply replacements based on humanize level
  const sentences = result.split(/([.!?]+\s*)/).filter(s => s.trim())
  
  const processedSentences = sentences.map((sentence, idx) => {
    if (/[.!?]+/.test(sentence)) return sentence
    
    let processed = sentence
    
    // Vary replacement intensity based on humanize level and sentence position
    const intensity = humanizeLevel / 5
    const shouldReplace = Math.random() < (0.3 + intensity * 0.4)
    
    if (shouldReplace) {
      Object.entries(replacements).forEach(([word, synonyms]) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi')
        if (processed.match(regex)) {
          const synonym = synonyms[Math.floor(Math.random() * synonyms.length)]
          processed = processed.replace(regex, synonym)
        }
      })
    }
    
    return processed
  })

  result = processedSentences.join('')

  // Mode-specific enhancements
  if (mode === 'academic') {
    // Add academic transitions
    const academicTransitions = language === 'id' 
      ? ['Dengan demikian', 'Oleh sebab itu', 'Berdasarkan hal tersebut', 'Sejalan dengan']
      : ['Consequently', 'Thus', 'In light of this', 'Accordingly']
    
    if (Math.random() > 0.7 && result.includes('.')) {
      const transition = academicTransitions[Math.floor(Math.random() * academicTransitions.length)]
      result = result.replace(/^([^.]+\.)/, `${transition}, $1`)
    }
  }

  if (mode === 'creative') {
    // Add more casual elements
    const casualElements = language === 'id'
      ? ['Nah', 'Well', 'Jadi begini', 'Sebenarnya']
      : ['Well', 'You see', 'Here\'s the thing', 'Actually']
    
    if (Math.random() > 0.6) {
      const element = casualElements[Math.floor(Math.random() * casualElements.length)]
      result = `${element}, ${result.charAt(0).toLowerCase()}${result.slice(1)}`
    }
  }

  if (mode === 'anti-ai') {
    // Break up long sentences
    result = result.replace(/,?\s+(dan|atau|serta)\s+/g, '. $1 ')
    
    // Add rhetorical questions occasionally
    if (Math.random() > 0.7 && language === 'id') {
      result += ' Bukan begitu?'
    } else if (Math.random() > 0.7) {
      result += " Right?"
    }
    
    // Vary sentence structure more aggressively
    const parts = result.split(/[.!?:;]/).filter(p => p.trim())
    if (parts.length > 2) {
      // Shuffle some parts for variety
      const shuffled = [...parts]
      if (shuffled.length >= 3) {
        const temp = shuffled[1]
        shuffled[1] = shuffled[2]
        shuffled[2] = temp
      }
      result = shuffled.join('. ') + '.'
    }
  }

  // Ensure proper capitalization
  result = result.replace(/([.!?]\s*)(\w)/g, (match, punct, letter) => 
    punct + letter.toUpperCase()
  )

  return result.trim()
}

// Export modes
export const PARAPHRASE_MODES = [
  { id: 'standard', name: 'Standard', nameId: 'Standar', description: 'Ubah kata/frasa tanpa mengubah makna' },
  { id: 'academic', name: 'Academic', nameId: 'Akademik', description: 'Gaya formal untuk esai dan jurnal' },
  { id: 'creative', name: 'Creative', nameId: 'Kreatif', description: 'Gaya santai dan naratif' },
  { id: 'anti-ai', name: 'Anti-AI', nameId: 'Anti-Deteksi AI', description: 'Humanisasi maksimal untuk menghindari deteksi AI' },
]
