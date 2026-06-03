import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #e8edf2', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        
        {/* Logo */}
        <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #2d6a4f, #40916c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="white" opacity="0.3"/>
              <path d="M11 6H13V10H17V12H13V18H11V12H7V10H11V6Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#1a2332', fontFamily: 'Georgia, serif', letterSpacing: '-0.3px' }}>
            Rx<span style={{ color: '#2d6a4f' }}>Recall</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[
            { to: '/dashboard', label: 'Dashboard', icon: '▪' },
            { to: '/symptoms/log', label: 'Log Symptom', icon: '▪' },
            { to: '/prescriptions', label: 'Prescriptions', icon: '▪' },
            { to: '/summary', label: 'AI Summary', icon: '▪' },
          ].map(link => (
            <Link key={link.to} to={link.to} style={{
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: isActive(link.to) ? '600' : '500',
              color: isActive(link.to) ? '#2d6a4f' : '#4a5568',
              background: isActive(link.to) ? '#f0faf5' : 'transparent',
              transition: 'all 0.15s ease',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '6px 12px', borderRadius: '8px', background: '#f7f9fc'
          }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #2d6a4f, #40916c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: '700', color: 'white'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#2d3748' }}>
              {user?.name?.split(' ')[0]}
            </span>
          </div>
          <button onClick={handleLogout} style={{
            background: 'transparent', border: '1px solid #e2e8f0',
            padding: '7px 14px', borderRadius: '8px',
            fontSize: '13px', fontWeight: '500', color: '#718096',
            cursor: 'pointer', transition: 'all 0.15s ease'
          }}
            onMouseEnter={e => { e.target.style.borderColor = '#fc8181'; e.target.style.color = '#e53e3e'; }}
            onMouseLeave={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.color = '#718096'; }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar