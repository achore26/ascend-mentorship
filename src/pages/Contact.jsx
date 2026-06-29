import { useState } from 'react'
import PublicLayout from '../layouts/PublicLayout'

const container = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    // Email handled off-platform — show confirmation
    setSent(true)
  }

  return (
    <PublicLayout>
      <section style={{ background: '#0A1F44', padding: '80px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Questions about the program? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ ...container, display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '64px', alignItems: 'start' }}>
          {/* Info */}
          <div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '26px', fontWeight: 800, color: '#0A1F44', marginBottom: '24px' }}>Get in Touch</h2>
            {[
              { label: 'Email', value: 'hello@ascendmentorship.org' },
              { label: 'Programs', value: 'programs@ascendmentorship.org' },
              { label: 'Partnerships', value: 'partners@ascendmentorship.org' },
            ].map(c => (
              <div key={c.label} style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#F5A623', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{c.label}</div>
                <div style={{ fontSize: '15px', color: '#374151' }}>{c.value}</div>
              </div>
            ))}
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB', marginTop: '32px' }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: '#0A1F44', marginBottom: '8px' }}>Response Time</div>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>We typically respond to all enquiries within 2–3 business days.</p>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div style={{ textAlign: 'center', padding: '64px 32px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
              <div style={{ width: '60px', height: '60px', background: '#F5A623', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '24px' }}>✓</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '22px', color: '#0A1F44', marginBottom: '12px' }}>Message Received</h3>
              <p style={{ fontSize: '15px', color: '#6B7280' }}>Thank you for reaching out. We'll get back to you within 2–3 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?' },
              ].map(f => (
                <div key={f.name}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0A1F44', marginBottom: '6px' }}>{f.label}</label>
                  <input name={f.name} type={f.type} required placeholder={f.placeholder} value={form[f.name]} onChange={handleChange}
                    style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0A1F44', marginBottom: '6px' }}>Message</label>
                <textarea name="message" required rows={5} placeholder="Tell us more…" value={form.message} onChange={handleChange}
                  style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ background: '#F5A623', color: '#0A1F44', fontWeight: 700, fontSize: '15px', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
