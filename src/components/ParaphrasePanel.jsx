import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { paraphraseText, PARAPHRASE_MODES } from '../utils/paraphraser'
import { analyzeText } from '../utils/aiDetector'
import { Sparkles, Copy, RotateCcw, Download, Check } from 'lucide-react'

export const ParaphrasePanel = () => {
  const { 
    inputText, setInputText, 
    outputText, setOutputText,
    mode, setMode,
    language, setLanguage,
    humanizeLevel, setHumanizeLevel,
    aiScore, setAiScore,
    isProcessing, setIsProcessing,
    addToHistory
  } = useAppStore()

  const [copied, setCopied] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const handleParaphrase = async () => {
    if (!inputText.trim()) return

    setIsProcessing(true)
    try {
      const result = await paraphraseText(inputText, mode, language, humanizeLevel)
      setOutputText(result)
      
      // Analyze the result
      const analysisResult = analyzeText(result)
      setAnalysis(analysisResult)
      setAiScore(analysisResult.aiScore)
      
      // Add to history
      addToHistory({
        id: Date.now(),
        original: inputText.substring(0, 100) + '...',
        paraphrased: result.substring(0, 100) + '...',
        mode,
        date: new Date().toISOString()
      })
    } catch (error) {
      console.error('Paraphrase error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleExport = () => {
    if (!outputText) return
    
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `parafrase-${Date.now()}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getScoreColor = (score) => {
    if (score < 30) return 'text-green-500'
    if (score < 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreLabel = (score) => {
    if (score < 30) return 'Sangat Natural'
    if (score < 60) return 'Cukup Natural'
    return 'Perlu Perbaikan'
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mode Parafrase
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            >
              {PARAPHRASE_MODES.map((m) => (
                <option key={m.id} value={m.id}>
                  {language === 'id' ? m.nameId : m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bahasa
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Humanization Level */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tingkat Humanisasi: {humanizeLevel}/5
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={humanizeLevel}
              onChange={(e) => setHumanizeLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Ringan</span>
              <span>Sedang</span>
              <span>Maksimal</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleParaphrase}
          disabled={!inputText.trim() || isProcessing}
          className="mt-6 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto md:mx-0"
        >
          <Sparkles className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
          {isProcessing ? 'Memproses...' : (language === 'id' ? 'Humanize Teks' : 'Humanize Text')}
        </button>
      </div>

      {/* Editor Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {language === 'id' ? 'Teks Original' : 'Original Text'}
          </h3>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={language === 'id' 
              ? 'Tempel atau ketik teks Anda di sini...' 
              : 'Paste or type your text here...'}
            className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {inputText.length} karakter
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === 'id' ? 'Hasil Parafrase' : 'Paraphrased Result'}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Copy"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
              <button
                onClick={handleExport}
                disabled={!outputText}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => { setOutputText(''); setAnalysis(null); }}
                disabled={!outputText}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Clear"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 overflow-auto">
            {outputText ? (
              <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{outputText}</p>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 italic">
                {language === 'id' 
                  ? 'Hasil parafrase akan muncul di sini...' 
                  : 'Paraphrased result will appear here...'}
              </p>
            )}
          </div>

          {/* AI Score */}
          {analysis && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Skor Deteksi AI
                </span>
                <span className={`text-lg font-bold ${getScoreColor(analysis.aiScore)}`}>
                  {analysis.aiScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    analysis.aiScore < 30 ? 'bg-green-500' : 
                    analysis.aiScore < 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysis.aiScore}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getScoreLabel(analysis.aiScore)} - {analysis.recommendation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ParaphrasePanel
