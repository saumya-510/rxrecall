import { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

const Recovery = () => {
  const { id } = useParams()
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)

  const generatePlan = async () => {
    setLoading(true)
    setPlan('')
    try {
      const res = await api.get(`/ai/recovery/${id}`)
      setPlan(res.data.plan)
    } catch (err) {
      toast.error('Failed to generate recovery plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recovery Plan</h1>
        <p className="text-gray-500 mb-8">AI will create a personalized recovery plan from your prescription.</p>
        <button onClick={generatePlan} disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50">
          {loading ? '⚙️ Generating...' : '🌿 Generate Recovery Plan'}
        </button>
        {plan && (
          <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Recovery Plan</h2>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{plan}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recovery