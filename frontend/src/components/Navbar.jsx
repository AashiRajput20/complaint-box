import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const navBtn = (path, label) => ({
    padding: '8px 16px',
    background: location.pathname === path ? '#446592' : 'transparent',
    color: '#ACE5F6',
    border: '1px solid #1e3a5f',
    borderRadius: '8px',
    fontSize: '0.85rem',
    cursor: 'pointer',
  })

  return (
    <nav style={{
      background: '#0d1b2e',
      borderBottom: '1px solid #1e3a5f',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo Option 2 */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '4px',
          height: '40px',
          background: '#4A89AC',
          borderRadius: '2px',
        }}/>
        <div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#E3FCF9', letterSpacing: '2px', lineHeight: 1.2 }}>
            raise<span style={{ color: '#ACE5F6' }}>IT</span>
          </div>
          <div style={{ fontSize: '0.6rem', color: '#446592', letterSpacing: '2px' }}>
            ANONYMOUS · ACCOUNTABLE
          </div>
        </div>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <Link to="/"><button style={navBtn('/')}>Home</button></Link>
        <Link to="/complaint"><button style={navBtn('/complaint')}>Complaint</button></Link>
        <Link to="/track"><button style={navBtn('/track')}>Track</button></Link>
        <Link to="/admin"><button style={navBtn('/admin')}>Admin</button></Link>
      </div>

    </nav>
  )
}

export default Navbar