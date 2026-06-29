import { Link } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'

const stats = [
  { value: '200+', label: 'Mentors' },
  { value: '1,500+', label: 'Mentees' },
  { value: '12', label: 'Countries' },
  { value: '92%', label: 'Career Growth Rate' },
]

const steps = [
  { num: '01', title: 'Apply', desc: 'Submit your application and tell us your goals and background in detail.' },
  { num: '02', title: 'Get Matched', desc: 'Our team pairs you with the ideal mentor based on your field and aspirations.' },
  { num: '03', title: 'Grow', desc: 'Meet regularly, get real guidance, and accelerate your career trajectory.' },
]

const testimonials = [
  {
    quote: "Ascend connected me with a mentor who completely changed how I approach my career. Within 6 months I landed my dream role in finance.",
    name: "Amara Osei",
    cohort: "Cohort 3 — Finance",
    initial: "A",
  },
  {
    quote: "The program gave me structure, accountability, and access to someone who had already walked the path I wanted to take.",
    name: "Tafara Moyo",
    cohort: "Cohort 4 — Technology",
    initial: "T",
  },
]

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 24px',
}

export default function Home() {
  return (
    <PublicLayout>

      {/* ── Hero ── */}
      <section style={{ background: '#0A1F44', padding: '96px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(245,166,35,0.15)',
            color: '#F5A623',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '6px 16px',
            borderRadius: '100px',
            marginBottom: '28px',
            border: '1px solid rgba(245,166,35,0.3)',
          }}>
            COHORT 5 APPLICATIONS OPEN
          </span>

          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(38px, 5vw, 64px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}>
            Unlock Your Potential.<br />
            <span style={{ color: '#F5A623' }}>Find Your Mentor.</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}>
            Ascend connects ambitious young professionals with experienced mentors who have walked the path. Start your journey today.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/apply" style={{
              background: '#F5A623',
              color: '#0A1F44',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px 32px',
              borderRadius: '10px',
              textDecoration: 'none',
              display: 'inline-block',
            }}>
              Apply as Mentee
            </Link>
            <Link to="/apply?type=mentor" style={{
              background: 'transparent',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px 32px',
              borderRadius: '10px',
              textDecoration: 'none',
              display: 'inline-block',
              border: '2px solid rgba(255,255,255,0.4)',
            }}>
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: '#F8FAFC', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB', padding: '48px 24px' }}>
        <div style={{ ...container, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '42px', fontWeight: 800, color: '#0A1F44', lineHeight: 1 }}>{s.value}</div>
              <div style={{ width: '32px', height: '3px', background: '#F5A623', margin: '10px auto 10px' }} />
              <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: '96px 24px', background: '#ffffff' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '38px', fontWeight: 800, color: '#0A1F44', marginBottom: '16px' }}>
              How Ascend Works
            </h2>
            <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
              A simple, guided process designed to set you up for real growth.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {steps.map(step => (
              <div key={step.num} style={{
                background: '#ffffff',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                padding: '36px 32px',
                boxShadow: '0 4px 20px rgba(10,31,68,0.06)',
                transition: 'box-shadow 0.2s',
              }}>
                <div style={{
                  width: '52px', height: '52px',
                  background: '#F5A623',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800, fontSize: '17px',
                  color: '#0A1F44',
                  marginBottom: '24px',
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '20px', fontWeight: 700, color: '#0A1F44', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: '#0A1F44', padding: '96px 24px' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '38px', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              What Our Mentees Say
            </h2>
            <p style={{ fontSize: '15px', color: '#F5A623', fontWeight: 600 }}>Real stories from the Ascend community</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                padding: '36px',
              }}>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '28px' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px', height: '44px',
                    background: '#F5A623',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '16px', color: '#0A1F44',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    flexShrink: 0,
                  }}>{t.initial}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '15px' }}>{t.name}</div>
                    <div style={{ fontSize: '13px', color: '#F5A623' }}>{t.cohort}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '96px 24px', background: '#ffffff', textAlign: 'center' }}>
        <div style={container}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '38px', fontWeight: 800, color: '#0A1F44', marginBottom: '16px' }}>
            Ready to Ascend?
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '440px', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Applications are open. Take the first step toward the career you've been working toward.
          </p>
          <Link to="/apply" style={{
            background: '#F5A623',
            color: '#0A1F44',
            fontWeight: 700,
            fontSize: '16px',
            padding: '16px 40px',
            borderRadius: '10px',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            Apply Now
          </Link>
        </div>
      </section>

    </PublicLayout>
  )
}
