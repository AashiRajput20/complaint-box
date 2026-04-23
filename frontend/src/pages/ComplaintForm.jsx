import { useState } from 'react'
import { submitComplaint } from '../services/api'

function ComplaintForm() {
  const [formData, setFormData] = useState({
    category: '',
    message: '',
    priority: 'medium'
  })
  const [trackingId, setTrackingId] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.category || !formData.message) {
      alert('Please fill all fields!')
      return
    }
    try {
      setLoading(true)
      const res = await submitComplaint(formData)
      setTrackingId(res.data.trackingId)
    } catch (err) {
      alert('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  if (trackingId) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>✅ Complaint Submitted!</h2>
        <p>Your Tracking ID:</p>
        <h2 style={{ color: 'green' }}>{trackingId}</h2>
        <p>Save this ID to track your complaint!</p>
        <button onClick={() => setTrackingId(null)}>Submit Another</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h1> Submit a Complaint</h1>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '15px' }}>
          <label>Category</label><br />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="wifi">WiFi</option>
            <option value="hostel">Hostel</option>
            <option value="cleanliness">Cleanliness</option>
            <option value="faculty">Faculty</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Priority</label><br />
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Message</label><br />
          <textarea
            rows="5"
            placeholder="Describe your complaint..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>

      </form>
    </div>
  )
}

export default ComplaintForm