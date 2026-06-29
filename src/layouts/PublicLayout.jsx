import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Resources', to: '/resources' },
  { label: 'Success Stories', to: '/success-stories' },
]

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 24px',
}

export default function PublicLayout({ children }) {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#ffffff',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <div style={{ ...container, height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 800, color: '#0A1F44', textDecoration: 'none', letterSpacing: '-0.5px' }}>
            ASCEND
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} style={{
                fontSize: '14px',
                fontWeight: pathname === link.to ? 700 : 500,
                color: pathname === link.to ? '#0A1F44' : '#6B7280',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}>
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user ? (
              <Link to="/dashboard" style={{
                background: '#0A1F44', color: '#ffffff',
                fontWeight: 700, fontSize: '14px',
                padding: '10px 20px', borderRadius: '8px',
                textDecoration: 'none',
              }}>Dashboard</Link>
            ) : (
              <>
                <Link to="/login" style={{ fontSize: '14px', fontWeight: 600, color: '#0A1F44', textDecoration: 'none' }}>
                  Login
                </Link>
                <Link to="/apply" style={{
                  background: '#F5A623', color: '#0A1F44',
                  fontWeight: 700, fontSize: '14px',
                  padding: '10px 20px', borderRadius: '8px',
                  textDecoration: 'none',
                }}>
                  Apply Now
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Footer */}
      <footer style={{ background: '#0A1F44', color: '#ffffff' }}>
        <div style={{ ...container, padding: '64px 24px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.5px' }}>
                ASCEND
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '280px' }}>
                Connecting ambitious young professionals with experienced mentors across Africa and beyond.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#F5A623', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>
                Quick Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#F5A623', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>
                Get Involved
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Apply as Mentee', to: '/apply' },
                  { label: 'Become a Mentor', to: '/apply?type=mentor' },
                  { label: 'Contact Us', to: '/contact' },
                  { label: 'Partners', to: '/partners' },
                ].map(l => (
                  <Link key={l.label} to={l.to} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '28px', textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} Ascend Mentorship Program. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
