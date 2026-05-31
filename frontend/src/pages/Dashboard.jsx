import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import useAuthStore from '../store/authStore'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const { user } = useAuthStore()

  const { data: reminders = [], refetch } = useQuery({
    queryKey: ['reminders'],
    queryFn: () => api.get('/reminders').then(r => r.data)
  })

  const { data: symptoms = [] } = useQuery({
    queryKey: ['symptoms'],
    queryFn: () => api.get('/symptoms').then(r => r.data)
  })

  const toggleReminder = async (id) => {
    await api.patch(`/reminders/${id}/toggle`)
    refetch()
  }

  const takenCount = reminders.filter(r => r.taken).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Good morning, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-gray-500 mt-1">Here's your health overview for today.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="text-3xl mb-2">💊</div>
            <div className="text-2xl font-bold text-gray-900">{takenCount}/{reminders.length}</div>
            <div className="text-sm text-gray-500">Medicines taken today</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-2xl font-bold text-gray-900">{symptoms.length}</div>
            <div className="text-sm text-gray-500">Total symptoms logged</div>
          </div>
          <div className="bg-green-600 rounded-2xl p-5 text-white">
            <div className="text-3xl mb-2">🤖</div>
            <div className="text-lg font-bold mb-1">AI Ready</div>
            <Link to="/summary" className="text-xs bg-white/20 px-2 py-1 rounded-lg hover:bg-white/30">
              Generate Doctor Brief →
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Medicines</h2>
            {reminders.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💊</div>
                <p className="text-gray-500 text-sm">No medicines scheduled.</p>
                <Link to="/prescriptions" className="text-green-600 text-sm hover:underline mt-1 block">Upload a prescription →</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {reminders.map(r => (
                  <div key={r.id} className={`flex items-center justify-between p-3 rounded-xl border ${r.taken ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
                    <div>
                      <div className={`text-sm font-medium ${r.taken ? 'line-through text-gray-400' : 'text-gray-800'}`}>{r.label}</div>
                      <div className="text-xs text-gray-400">{r.time}</div>
                    </div>
                    <button onClick={() => toggleReminder(r.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium ${r.taken ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                      {r.taken ? '✓ Taken' : 'Mark Taken'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Symptoms</h2>
              <Link to="/symptoms/log" className="text-green-600 text-sm hover:underline">+ Log new</Link>
            </div>
            {symptoms.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📝</div>
                <p className="text-gray-500 text-sm">No symptoms logged yet.</p>
                <Link to="/symptoms/log" className="text-green-600 text-sm hover:underline mt-1 block">Log your first symptom →</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {symptoms.slice(0, 5).map(s => (
                  <div key={s.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{s.description}</div>
                      <div className="text-xs text-gray-400">{new Date(s.recordedAt).toLocaleDateString()} • {s.bodyPart || 'General'}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.severity >= 7 ? 'bg-red-100 text-red-600' : s.severity >= 4 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                      {s.severity}/10
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-6">
          {[
            { to: '/symptoms/log', icon: '📝', label: 'Log Symptom' },
            { to: '/prescriptions', icon: '📷', label: 'Upload Rx' },
            { to: '/summary', icon: '🤖', label: 'AI Summary' },
            { to: '/prescriptions', icon: '💊', label: 'View Meds' },
          ].map(a => (
            <Link key={a.label} to={a.to} className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:border-green-200 hover:bg-green-50">
              <div className="text-2xl mb-1">{a.icon}</div>
              <div className="text-xs font-medium text-gray-700">{a.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard