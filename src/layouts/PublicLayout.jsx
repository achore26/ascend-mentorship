import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWindowWidth } from '../hooks/useWindowWidth'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Success Stories', to: '/success-stories' },
  { label: 'Partners', to: '/partners' },
]

const c = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }
const font = "'Montserrat', sans-serif"

export default function PublicLayout({ children }) {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const w = useWindowWidth()
  const isMobile = w < 768

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.96)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(229,231,235,0.6)' : '1px solid #E6E6E6',
        boxShadow: scrolled ? '0 4px 24px rgba(27,99,85,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ ...c, height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="/logo.PNG" alt="Ascend Program" style={{ width: isMobile ? '180px' : '264px', height: isMobile ? '42px' : '62px', objectFit: 'cover', objectPosition: 'center 47%' }} />
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {navLinks.map(link => {
                const active = pathname === link.to
                return (
                  <Link key={link.to} to={link.to} style={{
                    fontSize: '14px', fontWeight: active ? 700 : 500,
                    color: active ? '#1B6355' : '#5a5a5a',
                    textDecoration: 'none',
                    padding: '6px 10px', borderRadius: '8px',
                    background: active ? '#EEF2F7' : 'transparent',
                    transition: 'color 0.15s, background 0.15s',
                  }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#1B6355'; e.currentTarget.style.background = '#F5F7FA' } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#5a5a5a'; e.currentTarget.style.background = 'transparent' } }}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {user ? (
                <Link to="/dashboard" style={{
                  background: '#1B6355', color: '#ffffff',
                  fontFamily: font, fontWeight: 700, fontSize: '14px',
                  padding: '10px 20px', borderRadius: '9px',
                  textDecoration: 'none', transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" style={{
                    fontSize: '14px', fontWeight: 600, color: '#3B3B3B', textDecoration: 'none',
                    padding: '8px 14px', borderRadius: '8px', transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1B6355'}
                    onMouseLeave={e => e.currentTarget.style.color = '#3B3B3B'}
                  >
                    Login
                  </Link>
                  <Link to="/apply" style={{
                    background: '#F4B740', color: '#1B6355',
                    fontFamily: font, fontWeight: 700, fontSize: '14px',
                    padding: '10px 20px', borderRadius: '9px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(244,183,64,0.35)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(244,183,64,0.45)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(244,183,64,0.35)' }}
                  >
                    Apply Now
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px', borderRadius: '8px', color: '#1B6355',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && menuOpen && (
          <div style={{
            background: '#fff', borderTop: '1px solid #E6E6E6',
            padding: '16px 24px 24px',
            boxShadow: '0 8px 24px rgba(27,99,85,0.1)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
              {navLinks.map(link => {
                const active = pathname === link.to
                return (
                  <Link key={link.to} to={link.to} style={{
                    fontSize: '15px', fontWeight: active ? 700 : 500,
                    color: active ? '#1B6355' : '#3B3B3B',
                    textDecoration: 'none',
                    padding: '12px 14px', borderRadius: '10px',
                    background: active ? '#EEF2F7' : 'transparent',
                  }}>
                    {link.label}
                  </Link>
                )
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #EEF2F7', paddingTop: '16px' }}>
              {user ? (
                <Link to="/dashboard" style={{
                  background: '#1B6355', color: '#fff',
                  fontWeight: 700, fontSize: '15px',
                  padding: '13px 20px', borderRadius: '10px',
                  textDecoration: 'none', textAlign: 'center',
                }}>
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/apply" style={{
                    background: '#F4B740', color: '#1B6355',
                    fontWeight: 700, fontSize: '15px',
                    padding: '13px 20px', borderRadius: '10px',
                    textDecoration: 'none', textAlign: 'center',
                  }}>
                    Apply Now
                  </Link>
                  <Link to="/login" style={{
                    background: '#F5F7FA', color: '#1B6355',
                    fontWeight: 600, fontSize: '15px',
                    padding: '13px 20px', borderRadius: '10px',
                    textDecoration: 'none', textAlign: 'center',
                    border: '1px solid #E6E6E6',
                  }}>
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Footer */}
      <footer style={{ background: '#1B6355', color: '#ffffff' }}>
        <div style={{ ...c, padding: isMobile ? '48px 24px 0' : '64px 24px 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr 1fr',
            gap: isMobile ? '40px' : '56px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div>
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
                <div style={{ background: '#ffffff', borderRadius: '12px', padding: '8px 14px', display: 'inline-block' }}>
                  <img src="/logo.PNG" alt="Ascend Program" style={{ width: '160px', height: '38px', objectFit: 'cover', objectPosition: 'center 47%', display: 'block' }} />
                </div>
              </Link>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: '260px', marginBottom: '16px' }}>
                Empowering individuals through learning, leadership, mentorship, and coaching.
              </p>
              <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href="tel:+254705624562" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '7px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F4B740'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +254 705 624 562 — Grace
                </a>
                <a href="https://ascendprogram.co.ke" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '7px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F4B740'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  ascendprogram.co.ke
                </a>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  {
                    label: 'Twitter / X',
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.734-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'LinkedIn',
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Instagram',
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    ),
                  },
                ].map(s => (
                  <div key={s.label} style={{ width: '34px', height: '34px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                  >
                    {s.icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
                Quick Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
                Get Involved
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Apply as Mentee', to: '/apply' },
                  { label: 'Become a Mentor', to: '/apply?type=mentor' },
                  { label: 'Contact Us', to: '/contact' },
                  { label: 'Our Partners', to: '/partners' },
                ].map(l => (
                  <Link key={l.label} to={l.to} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)' }}>
                © {new Date().getFullYear()} Ascend Program Kenya. All rights reserved.
              </span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.18)', margin: '0 8px' }}>·</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.22)' }}>
                Website built by{' '}
                <span style={{ color: '#F4B740', fontWeight: 600 }}>Azimuth Technologies</span>
              </span>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Privacy Policy', 'Terms of Use'].map(t => (
                <span key={t} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', cursor: 'pointer', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
