import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const GA_ID = 'G-XXXXXXXXXX' // ← Replace with your GA4 Measurement ID

function loadGA() {
  if (window.__gaLoaded) return
  window.__gaLoaded = true

  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script1)

  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_ID, { anonymize_ip: true })
}

const font = "'Montserrat', sans-serif"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('ascend_cookie_consent')
    if (!consent) {
      // Slight delay so it doesn't flash immediately on page load
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
    if (consent === 'accepted') loadGA()
  }, [])

  function dismiss(accepted) {
    setLeaving(true)
    setTimeout(() => {
      setVisible(false)
      setLeaving(false)
    }, 300)
    localStorage.setItem('ascend_cookie_consent', accepted ? 'accepted' : 'declined')
    if (accepted) loadGA()
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      width: 'calc(100% - 48px)',
      maxWidth: '760px',
      opacity: leaving ? 0 : 1,
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      transform: leaving ? 'translateX(-50%) translateY(12px)' : 'translateX(-50%) translateY(0)',
    }}>
      <div style={{
        background: '#1B6355',
        borderRadius: '16px',
        padding: '20px 24px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}>
        {/* Cookie icon */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: '40px', height: '40px',
            background: 'rgba(244,183,64,0.15)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
              <path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/>
            </svg>
          </div>
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <p style={{ fontFamily: font, fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>
            We use cookies to understand how visitors use our site and improve your experience.{' '}
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px' }}>
              No personal data is sold. You can withdraw consent at any time.
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={() => dismiss(false)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: font, fontWeight: 600, fontSize: '13px',
              padding: '9px 18px', borderRadius: '8px',
              cursor: 'pointer', transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          >
            Decline
          </button>
          <button
            onClick={() => dismiss(true)}
            style={{
              background: '#F4B740',
              border: 'none',
              color: '#1B6355',
              fontFamily: font, fontWeight: 700, fontSize: '13px',
              padding: '9px 20px', borderRadius: '8px',
              cursor: 'pointer', transition: 'all 0.15s',
              boxShadow: '0 2px 12px rgba(244,183,64,0.4)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e09520' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F4B740' }}
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  )
}
