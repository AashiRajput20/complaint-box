import { useState } from 'react'
import { trackComplaint } from '../services/api'

function TrackComplaint() {
  const [trackingId, setTrackingId] = useState('')
  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTrack = async () => {
    if (!trackingId) {
      alert('Please enter a tracking ID!')
      return
    }
    try {
      setLoading(true)
      setError(null)
      const res = await trackComplaint(trackingId.toUpperCase())
      setComplaint(res.data)
    } catch (err) {
      setError('❌ No complaint found with this ID!')
      setComplaint(null)
    } finally {
      setLoading(false)
    }
  }

  const statusColor = {
    'pending': 'orange',
    'in-progress': 'blue',
    'resolved': 'green'
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h1>Track Your Complaint</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter your Tracking ID e.g. CB-XXXXXXXX"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button
          onClick={handleTrack}
          disabled={loading}
          style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'Searching...' : 'Track Complaint'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {complaint && (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h3>Complaint Details</h3>
          <p><strong>Tracking ID:</strong> {complaint.trackingId}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Priority:</strong> {complaint.priority}</p>
          <p><strong>Message:</strong> {complaint.message}</p>
          <p>
            <strong>Status: </strong>
            <span style={{ color: statusColor[complaint.status], fontWeight: 'bold', textTransform: 'uppercase' }}>
              {complaint.status}
            </span>
          </p>
          <p><strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleDateString()}</p>
        </div>
      )}

      <br />
      <a href="/">← Submit a complaint</a>
    </div>
  )
}

export default TrackComplaint