import SEO from '../components/SEO'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import PublicLayout from '../layouts/PublicLayout'
import { useWindowWidth } from '../hooks/useWindowWidth'

const font = "'Montserrat', sans-serif"
const c = { maxWidth: '680px', margin: '0 auto', padding: '0 24px' }

const fieldOptions = [
  'Technology', 'Finance', 'Law', 'Healthcare', 'Education',
  'Marketing', 'Engineering', 'Entrepreneurship', 'Public Policy',
  'Media & Communications', 'Other',
]

function Field({ label, required, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1B6355', marginBottom: '7px' }}>
        {label}{required && <span style={{ color: '#F4B740', marginLeft: '3px' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

function Input({ style: extraStyle, ...props }) {
  const [focus, setFocus] = useState(false)
  return (
    <input
      {...props}
      onFocus={e => { setFocus(true); props.onFocus?.(e) }}
      onBlur={e => { setFocus(false); props.onBlur?.(e) }}
      style={{
        width: '100%', boxSizing: 'border-box',
        border: `1.5px solid ${focus ? '#1B6355' : '#E6E6E6'}`,
        borderRadius: '10px', padding: '12px 16px',
        fontSize: '14px', outline: 'none', background: '#fff',
        boxShadow: focus ? '0 0 0 3px rgba(27,99,85,0.07)' : 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        fontFamily: "'Open Sans', sans-serif", color: '#3B3B3B',
        ...extraStyle,
      }}
    />
  )
}

function Textarea({ style: extraStyle, ...props }) {
  const [focus, setFocus] = useState(false)
  return (
    <textarea
      {...props}
      onFocus={e => { setFocus(true); props.onFocus?.(e) }}
      onBlur={e => { setFocus(false); props.onBlur?.(e) }}
      style={{
        width: '100%', boxSizing: 'border-box',
        border: `1.5px solid ${focus ? '#1B6355' : '#E6E6E6'}`,
        borderRadius: '10px', padding: '12px 16px',
        fontSize: '14px', outline: 'none', background: '#fff',
        boxShadow: focus ? '0 0 0 3px rgba(27,99,85,0.07)' : 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        resize: 'vertical', fontFamily: "'Open Sans', sans-serif",
        color: '#3B3B3B', lineHeight: 1.6,
        ...extraStyle,
      }}
    />
  )
}

function Select({ style: extraStyle, ...props }) {
  const [focus, setFocus] = useState(false)
  return (
    <select
      {...props}
      onFocus={e => { setFocus(true); props.onFocus?.(e) }}
      onBlur={e => { setFocus(false); props.onBlur?.(e) }}
      style={{
        width: '100%', boxSizing: 'border-box',
        border: `1.5px solid ${focus ? '#1B6355' : '#E6E6E6'}`,
        borderRadius: '10px', padding: '12px 16px',
        fontSize: '14px', outline: 'none', background: '#fff',
        boxShadow: focus ? '0 0 0 3px rgba(27,99,85,0.07)' : 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        fontFamily: "'Open Sans', sans-serif", color: '#3B3B3B',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 16px center',
        paddingRight: '40px',
        ...extraStyle,
      }}
    />
  )
}

export default function Apply() {
  const [searchParams] = useSearchParams()
  const [type, setType] = useState(searchParams.get('type') === 'mentor' ? 'mentor' : 'mentee')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const w = useWindowWidth()
  const isMobile = w < 640

  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', country: '', field: '',
    job_title: '', organization: '', experience_years: '',
    goals: '', motivation: '', linkedin_url: '',
  })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      type,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      country: form.country,
      field: form.field,
      job_title: form.job_title,
      organization: form.organization,
      motivation: form.motivation,
      linkedin_url: form.linkedin_url,
      ...(type === 'mentor' && { experience_years: parseInt(form.experience_years) || null }),
      ...(type === 'mentee' && { goals: form.goals }),
    }

    const { error } = await supabase.from('applications').insert(payload)
    if (error) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <PublicLayout>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '440px' }}>
            <div style={{ width: '72px', height: '72px', background: '#F4B740', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 8px 24px rgba(244,183,64,0.35)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B6355" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: font, fontSize: '28px', fontWeight: 800, color: '#1B6355', marginBottom: '14px' }}>Application Received!</h2>
            <p style={{ fontSize: '16px', color: '#5a5a5a', lineHeight: 1.75 }}>
              Thank you for applying to Ascend. We've received your application and will be in touch via email once our team has reviewed it — usually within 2 weeks.
            </p>
          </div>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <SEO
        title="Apply to Ascend"
        path="/apply"
        description="Apply to join Ascend — Kenya's leading professional development and leadership academy. Apply as a mentee or volunteer as a mentor. Free, structured, transformative. Cohort 5 applications now open."
      />
      {/* Hero */}
      <section style={{ background: '#1B6355', padding: isMobile ? '56px 24px' : '72px 24px' }}>
        <div style={{ ...c, textAlign: 'center' }}>
          <h1 style={{ fontFamily: font, fontSize: isMobile ? '34px' : 'clamp(32px, 4vw, 50px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Apply to Ascend
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            Join our community of mentors and mentees driving careers forward across Africa.
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '48px 0 72px' : '64px 24px 96px' }}>
        <div style={c}>
          {/* Type toggle */}
          <div style={{ background: '#EEF2F7', borderRadius: '12px', padding: '5px', display: 'flex', gap: '4px', marginBottom: '32px' }}>
            {['mentee', 'mentor'].map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                style={{
                  flex: 1, padding: '11px 0',
                  background: type === t ? '#1B6355' : 'transparent',
                  color: type === t ? '#fff' : '#5a5a5a',
                  fontFamily: font, fontWeight: 700, fontSize: '14px',
                  border: 'none', borderRadius: '8px', cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  textTransform: 'capitalize',
                }}
              >
                Apply as {t === 'mentee' ? 'Mentee' : 'Mentor'}
              </button>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E6E6E6', boxShadow: '0 4px 24px rgba(27,99,85,0.07)', padding: isMobile ? '24px 20px' : '40px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                <Field label="Full Name" required>
                  <Input name="full_name" required value={form.full_name} onChange={handleChange} placeholder="Jane Doe" />
                </Field>
                <Field label="Email" required>
                  <Input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" />
                </Field>
              </div>

              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                <Field label="Phone">
                  <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+254 700 000 000" />
                </Field>
                <Field label="Country" required>
                  <Input name="country" required value={form.country} onChange={handleChange} placeholder="Kenya" />
                </Field>
              </div>

              {/* Field */}
              <Field label="Field / Industry" required>
                <Select name="field" required value={form.field} onChange={handleChange}>
                  <option value="">Select your field</option>
                  {fieldOptions.map(f => <option key={f} value={f}>{f}</option>)}
                </Select>
              </Field>

              {/* Row 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                <Field label="Job Title">
                  <Input name="job_title" value={form.job_title} onChange={handleChange} placeholder="Software Engineer" />
                </Field>
                <Field label="Organization">
                  <Input name="organization" value={form.organization} onChange={handleChange} placeholder="Acme Corp" />
                </Field>
              </div>

              {/* Mentor only */}
              {type === 'mentor' && (
                <Field label="Years of Experience" required>
                  <Input name="experience_years" type="number" min="1" required value={form.experience_years} onChange={handleChange} placeholder="e.g. 5" />
                </Field>
              )}

              {/* Mentee only */}
              {type === 'mentee' && (
                <Field label="Career Goals" required>
                  <Textarea name="goals" required rows={4} value={form.goals} onChange={handleChange}
                    placeholder="Describe what you want to achieve through the Ascend program…" />
                </Field>
              )}

              <Field label="Why do you want to join Ascend?" required>
                <Textarea name="motivation" required rows={4} value={form.motivation} onChange={handleChange}
                  placeholder="Tell us what draws you to this program…" />
              </Field>

              <Field label="LinkedIn Profile">
                <Input name="linkedin_url" type="url" value={form.linkedin_url} onChange={handleChange}
                  placeholder="https://linkedin.com/in/janedoe" />
              </Field>

              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '13px', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                  background: loading ? '#888888' : '#F4B740',
                  color: '#1B6355', fontFamily: font, fontWeight: 700, fontSize: '15px',
                  padding: '15px', borderRadius: '10px', border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(244,183,64,0.4)',
                  transition: 'background 0.2s, transform 0.15s, box-shadow 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  marginTop: '8px',
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.background = '#e09520' } }}
                onMouseLeave={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#F4B740' } }}
              >
                {loading && <div style={{ width: '16px', height: '16px', border: '2px solid rgba(27,99,85,0.3)', borderTopColor: '#1B6355', borderRadius: '50%' }} className="spin" />}
                {loading ? 'Submitting…' : 'Submit Application'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: '#888888', marginTop: '4px' }}>
                Takes about 10 minutes · Free to apply · No commitment required
              </p>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
