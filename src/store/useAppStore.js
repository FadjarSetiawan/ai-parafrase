import { create } from 'zustand'

export const useAppStore = create((set, get) => ({
  // Input text
  inputText: '',
  setInputText: (text) => set({ inputText: text }),

  // Output text
  outputText: '',
  setOutputText: (text) => set({ outputText: text }),

  // Mode selection
  mode: 'standard', // standard, academic, creative, anti-ai
  setMode: (mode) => set({ mode }),

  // Language
  language: 'id', // id, en
  setLanguage: (language) => set({ language }),

  // Humanization level (1-5)
  humanizeLevel: 3,
  setHumanizeLevel: (level) => set({ humanizeLevel: level }),

  // AI Detection score
  aiScore: null,
  setAiScore: (score) => set({ aiScore: score }),

  // Processing state
  isProcessing: false,
  setIsProcessing: (status) => set({ isProcessing: status }),

  // History
  history: [],
  addToHistory: (item) => set((state) => ({
    history: [item, ...state.history].slice(0, 50)
  })),

  // Clear all
  clearAll: () => set({
    inputText: '',
    outputText: '',
    aiScore: null,
  }),
}))
