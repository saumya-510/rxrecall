import { useState } from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

const Summary = () => {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const generateSummary = async () => {
    setLoading(true)
    setSummary('')
    try {
      const res = await api.get('/ai/summary')
      setSummary(res.data.summary)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to generate summary')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Doctor Brief</h1>
        <p className="text-gray-500 mb-6">Generate a professional summary of your symptoms to share with your doctor.</p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
          ⚠️ <strong>Disclaimer:</strong> RxRecall is not a medical diagnosis tool. Always consult a licensed healthcare professional.
        </div>
        <button onClick={generateSummary} disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
          {loading ? '⚙️ Generating...' : '🤖 Generate Doctor Summary'}
        </button>
        {summary && (
          <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Your Doctor Brief</h2>
              <button onClick={() => navigator.clipboard.writeText(summary).then(() => toast.success('Copied!'))}
                className="text-xs bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200">📋 Copy</button>
            </div>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{summary}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Summary