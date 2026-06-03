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
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Page Header */}
        <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontSize: '13px', color: '#a0aec0', marginBottom: '4px', fontWeight: '500' }}>{today}</p>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1a2332', fontFamily: 'Georgia, serif' }}>
              {greeting}, {user?.name?.split(' ')[0]}
            </h1>
          </div>
          <Link to="/symptoms/log" style={{
            textDecoration: 'none', padding: '10px 20px',
            background: '#2d6a4f', color: '#fff', borderRadius: '8px',
            fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            + Log Symptom
          </Link>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Medicines Today', value: `${takenCount}/${reminders.length}`, sub: reminders.length === 0 ? 'No medicines yet' : takenCount === reminders.length ? 'All taken!' : `${reminders.length - takenCount} remaining`, color: '#2d6a4f', bg: '#f0faf5', border: '#c6f6d5' },
            { label: 'Symptoms Logged', value: symptoms.length, sub: 'Total recorded', color: '#c05621', bg: '#fff8f0', border: '#fbd38d' },
            { label: 'Last Symptom', value: symptoms.length > 0 ? new Date(symptoms[0]?.recordedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—', sub: symptoms.length > 0 ? symptoms[0]?.description?.slice(0, 20) + '...' : 'None logged yet', color: '#2b6cb0', bg: '#ebf8ff', border: '#bee3f8' },
            { label: 'AI Status', value: 'Ready', sub: 'Generate doctor brief', color: '#553c9a', bg: '#faf5ff', border: '#d6bcfa' },
          ].map(stat => (
            <div key={stat.label} style={{ background: stat.bg, border: `1px solid ${stat.border}`, borderRadius: '12px', padding: '18px 20px' }}>
              <p style={{ fontSize: '11px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{stat.label}</p>
              <p style={{ fontSize: '24px', fontWeight: '800', color: stat.color, marginBottom: '4px' }}>{stat.value}</p>
              <p style={{ fontSize: '11px', color: '#718096' }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>

          {/* Today's Medicines */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8edf2', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #f0f4f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1a2332' }}>Today's Medicines</h2>
                <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '2px' }}>Track your daily doses</p>
              </div>
              <Link to="/prescriptions" style={{ textDecoration: 'none', fontSize: '12px', color: '#2d6a4f', fontWeight: '600' }}>+ Add prescription</Link>
            </div>
            <div style={{ padding: '16px 20px' }}>
              {reminders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f7f9fc', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H8v-2h4v2zm4-4H8v-2h8v2zm0-4H8V7h8v2z" fill="#cbd5e0"/></svg>
                  </div>
                  <p style={{ fontSize: '13px', color: '#718096', marginBottom: '8px' }}>No medicines scheduled yet</p>
                  <Link to="/prescriptions" style={{ textDecoration: 'none', fontSize: '12px', color: '#2d6a4f', fontWeight: '600' }}>Upload a prescription to get started</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {reminders.map(r => (
                    <div key={r.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 14px', borderRadius: '10px',
                      background: r.taken ? '#f0faf5' : '#f7f9fc',
                      border: `1px solid ${r.taken ? '#c6f6d5' : '#e8edf2'}`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.taken ? '#2d6a4f' : '#cbd5e0', flexShrink: 0 }}></div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: r.taken ? '#276749' : '#2d3748', textDecoration: r.taken ? 'line-through' : 'none' }}>{r.label}</div>
                          <div style={{ fontSize: '11px', color: '#a0aec0' }}>{r.time}</div>
                        </div>
                      </div>
                      <button onClick={() => toggleReminder(r.id)} style={{
                        border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '600',
                        padding: '4px 10px', borderRadius: '20px',
                        background: r.taken ? '#c6f6d5' : '#edf2f7',
                        color: r.taken ? '#276749' : '#718096'
                      }}>
                        {r.taken ? 'Taken' : 'Mark Taken'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Symptoms */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8edf2', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #f0f4f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1a2332' }}>Recent Symptoms</h2>
                <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '2px' }}>Your symptom history</p>
              </div>
              <Link to="/symptoms/log" style={{ textDecoration: 'none', fontSize: '12px', color: '#2d6a4f', fontWeight: '600' }}>+ Log new</Link>
            </div>
            <div style={{ padding: '16px 20px' }}>
              {symptoms.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f7f9fc', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#cbd5e0"/></svg>
                  </div>
                  <p style={{ fontSize: '13px', color: '#718096', marginBottom: '8px' }}>No symptoms logged yet</p>
                  <Link to="/symptoms/log" style={{ textDecoration: 'none', fontSize: '12px', color: '#2d6a4f', fontWeight: '600' }}>Log your first symptom</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {symptoms.slice(0, 5).map(s => (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '10px', background: '#f7f9fc', border: '1px solid #e8edf2' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#2d3748' }}>{s.description}</div>
                        <div style={{ fontSize: '11px', color: '#a0aec0', marginTop: '2px' }}>
                          {new Date(s.recordedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · {s.bodyPart || 'General'}
                        </div>
                      </div>
                      <span style={{
                        fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '20px',
                        background: s.severity >= 7 ? '#fff5f5' : s.severity >= 4 ? '#fffff0' : '#f0faf5',
                        color: s.severity >= 7 ? '#c53030' : s.severity >= 4 ? '#c05621' : '#276749'
                      }}>
                        {s.severity}/10
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8edf2', padding: '20px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#1a2332', marginBottom: '16px' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { to: '/symptoms/log', label: 'Log Symptom', desc: 'Record how you feel', bg: '#f0faf5', color: '#2d6a4f', border: '#c6f6d5' },
              { to: '/prescriptions', label: 'Upload Prescription', desc: 'Scan & extract medicines', bg: '#ebf8ff', color: '#2b6cb0', border: '#bee3f8' },
              { to: '/summary', label: 'AI Doctor Brief', desc: 'Generate medical summary', bg: '#faf5ff', color: '#553c9a', border: '#d6bcfa' },
              { to: '/prescriptions', label: 'View Medicines', desc: 'See all prescriptions', bg: '#fff8f0', color: '#c05621', border: '#fbd38d' },
            ].map(a => (
              <Link key={a.label} to={a.to} style={{
                textDecoration: 'none', padding: '16px', borderRadius: '10px',
                background: a.bg, border: `1px solid ${a.border}`,
                display: 'block', transition: 'transform 0.15s ease'
              }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: a.color, marginBottom: '4px' }}>{a.label}</div>
                <div style={{ fontSize: '11px', color: '#718096' }}>{a.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard