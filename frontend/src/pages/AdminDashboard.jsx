import { useState, useEffect } from 'react'
import { getAllComplaints, updateStatus, loginAdmin } from '../services/api'

function AdminDashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('adminToken'))
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      setError('')
      const res = await loginAdmin({ username, password })
      localStorage.setItem('adminToken', res.data.token)
      setLoggedIn(true)
    } catch (err) {
      setError('❌ Invalid username or password!')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setLoggedIn(false)
  }

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      const res = await getAllComplaints()
      setComplaints(res.data)
    } catch (err) {
      alert('Failed to fetch complaints!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loggedIn) fetchComplaints()
  }, [loggedIn])

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(id, status)
      fetchComplaints()
    } catch (err) {
      alert('Failed to update status!')
    }
  }

  const statusColor = {
    'pending': 'orange',
    'in-progress': 'blue',
    'resolved': 'green'
  }

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Login
        </button>
      </div>
    )
  }

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h2>

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Dashboard</h1>
        <div>
          <span style={{ marginRight: '15px', color: 'gray' }}>Welcome, admin!</span>
          <button
            onClick={handleLogout}
            style={{ padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            Logout
          </button>
        </div>
      </div>

      <p style={{ color: 'gray' }}>{complaints.length} total complaints</p>

      {complaints.length === 0 ? (
        <p>No complaints yet!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={th}>Tracking ID</th>
              <th style={th}>Category</th>
              <th style={th}>Priority</th>
              <th style={th}>Message</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={td}><code>{c.trackingId}</code></td>
                <td style={td}>{c.category}</td>
                <td style={td}>{c.priority}</td>
                <td style={td}>{c.message}</td>
                <td style={td}>
                  <span style={{ color: statusColor[c.status], fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {c.status}
                  </span>
                </td>
                <td style={td}>
                  {c.status !== 'pending' && (
                    <button onClick={() => handleStatusChange(c._id, 'pending')} style={btn}>Pending</button>
                  )}
                  {c.status !== 'in-progress' && (
                    <button onClick={() => handleStatusChange(c._id, 'in-progress')} style={btn}>In Progress</button>
                  )}
                  {c.status !== 'resolved' && (
                    <button onClick={() => handleStatusChange(c._id, 'resolved')} style={{ ...btn, backgroundColor: 'green' }}>Resolve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const th = { padding: '10px', textAlign: 'left', borderBottom: '2px solid #ccc' }
const td = { padding: '10px', verticalAlign: 'top' }
const btn = { marginRight: '5px', padding: '4px 8px', cursor: 'pointer', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }

export default AdminDashboard