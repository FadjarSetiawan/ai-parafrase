import { useAppStore } from '../store/useAppStore'
import { Clock, Trash2 } from 'lucide-react'

export const HistoryPanel = () => {
  const { history, addToHistory } = useAppStore()

  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Riwayat
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Belum ada riwayat parafrase
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Riwayat Terakhir
      </h3>
      
      <div className="space-y-3 max-h-96 overflow-auto">
        {history.slice(0, 10).map((item) => (
          <div
            key={item.id}
            className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded-full uppercase">
                    {item.mode}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(item.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {item.original}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryPanel
