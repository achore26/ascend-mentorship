import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWindowWidth } from '../hooks/useWindowWidth'

const font = "'Montserrat', sans-serif"

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [passFocus, setPassFocus] = useState(false)
  const w = useWindowWidth()
  const isMobile = w < 768

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    }}>

      {/* Left panel — image (hidden on mobile) */}
      {!isMobile && (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <video
            src="/ASCEND-PROMO.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,24,48,0.80) 0%, rgba(13,59,47,0.45) 50%, rgba(27,99,85,0.25) 100%)', pointerEvents: 'none' }} />

          <Link to="/" style={{ textDecoration: 'none', position: 'absolute', top: '28px', left: '28px' }}>
            <div style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderRadius: '10px', padding: '6px 12px', display: 'inline-block' }}>
              <img src="/logo.PNG" alt="Ascend Program" style={{ width: '120px', height: '28px', objectFit: 'cover', objectPosition: 'center 47%', display: 'block' }} />
            </div>
          </Link>

          <div style={{ position: 'absolute', bottom: '40px', left: '32px', right: '32px' }}>
            <div style={{ width: '32px', height: '3px', background: '#F4B740', borderRadius: '2px', marginBottom: '16px' }} />
            <p style={{ fontSize: '18px', fontFamily: font, fontWeight: 700, color: '#fff', lineHeight: 1.5, marginBottom: '12px', textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
              "The right mentor at the right time can change everything."
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>Ascend Mentorship Program</p>
          </div>
        </div>
      )}

      {/* Right panel — form */}
      <div style={{
        background: isMobile ? '#ffffff' : '#F5F7FA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '48px 24px' : '48px 40px',
        minHeight: isMobile ? '100vh' : 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Mobile logo */}
          {isMobile && (
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
                <img src="/logo.PNG" alt="Ascend Program" style={{ width: '200px', height: '48px', objectFit: 'cover', objectPosition: 'center 47%' }} />
              </Link>
            </div>
          )}

          <div style={{ marginBottom: '36px' }}>
            <h1 style={{ fontFamily: font, fontSize: '28px', fontWeight: 800, color: '#1B6355', marginBottom: '8px' }}>
              Welcome back
            </h1>
            <p style={{ fontSize: '15px', color: '#5a5a5a' }}>Sign in to continue your Ascend journey.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1B6355', marginBottom: '7px' }}>Email address</label>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder="you@example.com"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  border: `1.5px solid ${emailFocus ? '#1B6355' : '#E6E6E6'}`,
                  borderRadius: '10px', padding: '13px 16px', fontSize: '14px',
                  outline: 'none', background: '#fff',
                  boxShadow: emailFocus ? '0 0 0 3px rgba(27,99,85,0.08)' : 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1B6355', marginBottom: '7px' }}>Password</label>
              <input
                type="password" required value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
                placeholder="••••••••"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  border: `1.5px solid ${passFocus ? '#1B6355' : '#E6E6E6'}`,
                  borderRadius: '10px', padding: '13px 16px', fontSize: '14px',
                  outline: 'none', background: '#fff',
                  boxShadow: passFocus ? '0 0 0 3px rgba(27,99,85,0.08)' : 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
              />
            </div>

            {error && (
              <div style={{
                background: '#FEF2F2', border: '1px solid #FECACA',
                color: '#DC2626', fontSize: '13px', borderRadius: '10px',
                padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#5a5a5a' : '#1B6355',
                color: '#ffffff', fontFamily: font, fontWeight: 700, fontSize: '15px',
                padding: '14px', borderRadius: '10px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s, transform 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#0d2a5c' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#1B6355' }}
            >
              {loading && (
                <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} className="spin" />
              )}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '14px', color: '#5a5a5a', marginTop: '28px' }}>
            Not a member yet?{' '}
            <Link to="/apply" style={{ color: '#1B6355', fontWeight: 700, textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F4B740'}
              onMouseLeave={e => e.currentTarget.style.color = '#1B6355'}
            >
              Apply to join Ascend
            </Link>
          </p>

          <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid #E6E6E6', textAlign: 'center' }}>
            <Link to="/" style={{ fontSize: '13px', color: '#888888', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onMouseEnter={e => e.currentTarget.style.color = '#5a5a5a'}
              onMouseLeave={e => e.currentTarget.style.color = '#888888'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
