import { BookOpen, Sparkles, Shield, Zap } from 'lucide-react'

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI Parafrase dengan Humanisasi Cerdas</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Buat Teks Terlihat
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Lebih Manusiawi
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto mb-10">
            Parafrase konten Anda dengan AI yang dirancang untuk menghasilkan teks natural, 
            lolos deteksi AI, dan cocok untuk esai akademik maupun konten profesional.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Mode Akademik"
              description="Gaya formal untuk esai dan jurnal ilmiah"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Humanisasi"
              description="Variasi kalimat dan diksi alami seperti manusia"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Anti-Deteksi AI"
              description="Optimasi untuk lolos dari GPTZero & Turnitin"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Multilingual"
              description="Support Bahasa Indonesia & English"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
    <div className="text-purple-300 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-purple-200">{description}</p>
  </div>
)

export default Hero
