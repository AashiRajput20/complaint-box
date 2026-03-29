import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ComplaintForm from './pages/ComplaintForm'
import TrackComplaint from './pages/TrackComplaint'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComplaintForm />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App