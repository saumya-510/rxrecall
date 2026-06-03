import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/auth/signup', form)
      login(res.data.user, res.data.token)
      toast.success('Account created! Welcome to RxRecall.')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc', display: 'flex', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Left Panel */}
      <div style={{ width: '45%', background: 'linear-gradient(160deg, #1a3c2e 0%, #2d6a4f 50%, #40916c 100%)', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '22px', fontWeight: '700', color: '#fff', fontFamily: 'Georgia, serif' }}>Rx<span style={{ color: '#95d5b2' }}>Recall</span></span>
        </Link>
        <div>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', lineHeight: '1.3', marginBottom: '20px' }}>
            Take control of your health journey today
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', marginBottom: '40px' }}>
            Join thousands of patients who use RxRecall to manage their health more effectively.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['Free forever — no credit card needed', 'AI reads your prescriptions automatically', 'Doctor-ready summaries in seconds'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
                </div>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Not a medical diagnosis tool. Always consult a healthcare professional.</p>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1a2332', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Create your account</h1>
          <p style={{ fontSize: '14px', color: '#718096', marginBottom: '32px' }}>Start managing your health with AI — it's free</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#2d3748', marginBottom: '6px' }}>Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name" required
                style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '14px', color: '#1a2332', outline: 'none', boxSizing: 'border-box', background: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#2d3748', marginBottom: '6px' }}>Email address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com" required
                style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '14px', color: '#1a2332', outline: 'none', boxSizing: 'border-box', background: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#2d3748', marginBottom: '6px' }}>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Min 6 characters" required minLength={6}
                style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '14px', color: '#1a2332', outline: 'none', boxSizing: 'border-box', background: '#fff' }} />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '12px', background: loading ? '#a0aec0' : '#2d6a4f',
              color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px',
              fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px'
            }}>
              {loading ? 'Creating account...' : 'Create Free Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#718096', marginTop: '24px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2d6a4f', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup