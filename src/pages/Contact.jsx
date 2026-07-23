import SEO from '../components/SEO'
import { useState } from 'react'
import PublicLayout from '../layouts/PublicLayout'
import { useWindowWidth } from '../hooks/useWindowWidth'

const font = "'Montserrat', sans-serif"
const c = { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }

function StyledInput({ label, required, type = 'text', ...props }) {
  const [focus, setFocus] = useState(false)
  return (
    <div>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1B6355', marginBottom: '7px' }}>
        {label}{required && <span style={{ color: '#F4B740', marginLeft: '3px' }}>*</span>}
      </label>
      <input
        type={type}
        required={required}
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%', boxSizing: 'border-box',
          border: `1.5px solid ${focus ? '#1B6355' : '#E6E6E6'}`,
          borderRadius: '10px', padding: '12px 16px', fontSize: '14px',
          outline: 'none', background: '#fff',
          boxShadow: focus ? '0 0 0 3px rgba(27,99,85,0.07)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          fontFamily: "'Open Sans', sans-serif", color: '#3B3B3B',
        }}
      />
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [textFocus, setTextFocus] = useState(false)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const w = useWindowWidth()
  const isMobile = w < 768

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <PublicLayout>
      <SEO
        title="Contact Us"
        path="/contact"
        description="Contact the Ascend Programme team in Nairobi, Kenya. Enquire about mentorship applications, corporate training, partnerships, or coaching programmes. Call +254 705 624 562 or email hello@ascendprogram.co.ke."
      />
      {/* Hero */}
      <section style={{ background: '#1B6355', padding: isMobile ? '56px 24px' : '72px 24px' }}>
        <div style={{ ...c, textAlign: 'center' }}>
          <h1 style={{ fontFamily: font, fontSize: isMobile ? '34px' : 'clamp(32px, 4vw, 50px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.65)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
            Questions about the program? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '48px 24px 72px' : '80px 24px 96px' }}>
        <div style={{
          ...c,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.8fr',
          gap: isMobile ? '48px' : '72px',
          alignItems: 'start',
        }}>

          {/* Info panel */}
          <div>
            <h2 style={{ fontFamily: font, fontSize: '22px', fontWeight: 800, color: '#1B6355', marginBottom: '28px' }}>Get in Touch</h2>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '5px' }}>Phone</div>
              <a href="tel:+254705624562" style={{ fontSize: '15px', color: '#3B3B3B', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#1B6355'}
                onMouseLeave={e => e.currentTarget.style.color = '#3B3B3B'}
              >
                +254 705 624 562 — Grace
              </a>
            </div>
            {[
              { label: 'General', value: 'hello@ascendprogram.co.ke' },
              { label: 'Programs', value: 'programs@ascendprogram.co.ke' },
              { label: 'Partnerships', value: 'partners@ascendprogram.co.ke' },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '5px' }}>{item.label}</div>
                <a href={`mailto:${item.value}`} style={{ fontSize: '15px', color: '#3B3B3B', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1B6355'}
                  onMouseLeave={e => e.currentTarget.style.color = '#3B3B3B'}
                >
                  {item.value}
                </a>
              </div>
            ))}

            <div style={{ background: '#F5F7FA', borderRadius: '14px', padding: '24px', border: '1px solid #E6E6E6', marginTop: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', background: 'rgba(244,183,64,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div style={{ fontFamily: font, fontWeight: 700, fontSize: '14px', color: '#1B6355' }}>Response Time</div>
              </div>
              <p style={{ fontSize: '14px', color: '#5a5a5a', lineHeight: 1.7 }}>We typically respond to all enquiries within 2–3 business days.</p>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div style={{ textAlign: 'center', padding: '72px 40px', background: '#F5F7FA', borderRadius: '20px', border: '1px solid #E6E6E6' }}>
              <div style={{ width: '68px', height: '68px', background: '#F4B740', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(244,183,64,0.35)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B6355" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: '22px', color: '#1B6355', marginBottom: '12px' }}>Message Received</h3>
              <p style={{ fontSize: '15px', color: '#5a5a5a', lineHeight: 1.7 }}>Thank you for reaching out. We'll get back to you within 2–3 business days.</p>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E6E6E6', boxShadow: '0 4px 24px rgba(27,99,85,0.07)', padding: isMobile ? '24px 20px' : '40px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                  <StyledInput label="Full Name" required name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
                  <StyledInput label="Email Address" required type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" />
                </div>
                <StyledInput label="Subject" required name="subject" value={form.subject} onChange={handleChange} placeholder="What is this about?" />
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1B6355', marginBottom: '7px' }}>
                    Message<span style={{ color: '#F4B740', marginLeft: '3px' }}>*</span>
                  </label>
                  <textarea
                    name="message" required rows={6} value={form.message} onChange={handleChange}
                    onFocus={() => setTextFocus(true)}
                    onBlur={() => setTextFocus(false)}
                    placeholder="Tell us more…"
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      border: `1.5px solid ${textFocus ? '#1B6355' : '#E6E6E6'}`,
                      borderRadius: '10px', padding: '12px 16px', fontSize: '14px',
                      outline: 'none', resize: 'vertical', background: '#fff',
                      boxShadow: textFocus ? '0 0 0 3px rgba(27,99,85,0.07)' : 'none',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                      fontFamily: "'Open Sans', sans-serif", color: '#3B3B3B', lineHeight: 1.6,
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: '#F4B740', color: '#1B6355', fontFamily: font, fontWeight: 700,
                    fontSize: '15px', padding: '14px', borderRadius: '10px', border: 'none',
                    cursor: 'pointer', boxShadow: '0 4px 16px rgba(244,183,64,0.4)',
                    transition: 'transform 0.15s, background 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.background = '#e09520' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#F4B740' }}
                >
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
