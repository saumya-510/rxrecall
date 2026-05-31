import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import LogSymptom from './pages/LogSymptom'
import Prescriptions from './pages/Prescriptions'
import Summary from './pages/Summary'
import Recovery from './pages/Recovery'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/symptoms/log" element={<LogSymptom />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/recovery/:id" element={<Recovery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App