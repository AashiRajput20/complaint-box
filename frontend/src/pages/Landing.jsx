import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  const cardStyle = {
    background: '#111827',
    border: '1px solid #1e3a5f',
    borderRadius: '16px',
    padding: '2.5rem 2rem',
    width: '260px',
    minHeight: '300px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const btnStyle = {
    width: '100%',
    padding: '10px',
    background: '#446592',
    color: '#E3FCF9',
    borderRadius: '8px',
    fontWeight: '600',
    marginTop: '1.5rem',
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#E3FCF9', letterSpacing: '-1px', marginBottom: '1rem' }}>
          raise<span style={{ color: '#4A89AC' }}>IT</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#ACE5F6', marginTop: '-2rem'  }}>
          Because silence changes nothing.
        </p>
      </div>

      {/* Role Selection */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch' }}>

        {/* Student Card */}
        <div
          style={cardStyle}
          onMouseEnter={e => {
            e.currentTarget.style.border = '1px solid #4A89AC'
            e.currentTarget.style.transform = 'translateY(-4px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.border = '1px solid #1e3a5f'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
            <h2 style={{ color: '#E3FCF9', marginBottom: '0.8rem' }}>Student</h2>
            <p style={{ color: '#4A89AC', fontSize: '0.9rem', fontStyle: 'italic' }}>
              "Why struggle in silence when you can RaiseIT?"
            </p>
          </div>
          <button
            style={btnStyle}
            onClick={() => navigate('/complaint')}
          >
            Continue as Student →
          </button>
        </div>

        {/* Admin Card */}
        <div
          style={cardStyle}
          onMouseEnter={e => {
            e.currentTarget.style.border = '1px solid #4A89AC'
            e.currentTarget.style.transform = 'translateY(-4px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.border = '1px solid #1e3a5f'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
            <h2 style={{ color: '#E3FCF9', marginBottom: '0.8rem' }}>Admin</h2>
            <p style={{ color: '#4A89AC', fontSize: '0.9rem', fontStyle: 'italic' }}>
              "Problems don't fix themselves. But you can."
            </p>
          </div>
          <button
            style={btnStyle}
            onClick={() => navigate('/admin')}
          >
            Continue as Admin →
          </button>
        </div>

      </div>
    </div>
  )
}

export default Landing