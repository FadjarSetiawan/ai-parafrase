import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import ParaphrasePanel from './components/ParaphrasePanel'
import HistoryPanel from './components/HistoryPanel'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <main className="py-12">
        <ParaphrasePanel />
        <HistoryPanel />
      </main>
      <Footer />
    </div>
  )
}

export default App
