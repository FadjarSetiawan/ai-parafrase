import { Github, Mail, Coffee } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">AI Parafrase</h3>
            <p className="text-sm text-gray-400 mb-4">
              Aplikasi parafrase cerdas dengan humanisasi untuk menghasilkan teks natural 
              yang tidak terdeteksi sebagai buatan AI.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/FadjarSetiawan/ai-parafrase"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@aiparafrase.com"
                className="hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Fitur Utama</h4>
            <ul className="space-y-2 text-sm">
              <li>• Mode Parafrase Cerdas</li>
              <li>• Humanizer Engine</li>
              <li>• AI Detector Bawaan</li>
              <li>• Support Multilingual</li>
              <li>• Ekspor ke Berbagai Format</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Tautan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} AI Parafrase. Dibuat dengan ❤️ untuk pendidikan Indonesia.
          </p>
          <p className="mt-2">
            Project by{' '}
            <a
              href="https://github.com/FadjarSetiawan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              Fadjar Setiawan
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
