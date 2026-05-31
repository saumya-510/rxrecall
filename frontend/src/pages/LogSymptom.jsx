import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

const bodyParts = ['Head', 'Chest', 'Stomach', 'Back', 'Legs', 'Arms', 'Throat', 'Eyes', 'General']

const LogSymptom = () => {
  const [form, setForm] = useState({ description: '', severity: 5, bodyPart: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/symptoms', form)
      toast.success('Symptom logged!')
      navigate('/dashboard')
    } catch (err) {
      toast.error('Failed to log symptom')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Log a Symptom</h1>
        <p className="text-gray-500 mb-8">Describe what you're feeling. More detail = better AI summary.</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What are you feeling? *</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              placeholder="e.g. Sharp headache on the right side..." required rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity: <span className="text-green-600 font-bold">{form.severity}/10</span></label>
            <input type="range" min={1} max={10} value={form.severity}
              onChange={e => setForm({...form, severity: parseInt(e.target.value)})}
              className="w-full accent-green-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Mild (1)</span><span>Moderate (5)</span><span>Severe (10)</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Part</label>
            <div className="flex flex-wrap gap-2">
              {bodyParts.map(part => (
                <button key={part} type="button" onClick={() => setForm({...form, bodyPart: form.bodyPart === part ? '' : part})}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${form.bodyPart === part ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  {part}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <input type="text" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
              placeholder="Any other details..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50">
            {loading ? 'Saving...' : 'Log Symptom'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LogSymptom