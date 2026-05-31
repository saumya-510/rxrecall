import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <Link to="/dashboard" className="flex items-center gap-2">
        <span className="text-2xl">💊</span>
        <span className="text-xl font-bold text-green-700">RxRecall</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-sm text-gray-600 hover:text-green-700">Dashboard</Link>
        <Link to="/symptoms/log" className="text-sm text-gray-600 hover:text-green-700">Log Symptom</Link>
        <Link to="/prescriptions" className="text-sm text-gray-600 hover:text-green-700">Prescriptions</Link>
        <Link to="/summary" className="text-sm text-gray-600 hover:text-green-700">AI Summary</Link>
        <span className="text-sm text-gray-500">Hi, {user?.name?.split(' ')[0]}</span>
        <button onClick={handleLogout} className="bg-red-50 text-red-600 text-sm px-3 py-1.5 rounded-lg hover:bg-red-100">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar