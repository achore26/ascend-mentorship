import SEO from '../components/SEO'
import PublicLayout from '../layouts/PublicLayout'
import { Link } from 'react-router-dom'
import { useWindowWidth } from '../hooks/useWindowWidth'

const container = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }

const stories = [
  { name: 'Amara Osei', cohort: 'Cohort 3', field: 'Finance', country: 'Ghana', initial: 'A', color: '#1B6355', outcome: 'Investment Analyst at Stanbic Bank', quote: 'Ascend connected me with a mentor who completely changed how I approach my career. Within 6 months I landed my dream role in finance. The structured sessions gave me a roadmap I didn\'t know I needed.' },
  { name: 'Tafara Moyo', cohort: 'Cohort 4', field: 'Technology', country: 'Zimbabwe', initial: 'T', color: '#267060', outcome: 'Software Engineer at Andela', quote: 'The program gave me structure, accountability, and access to someone who had already walked the path I wanted to take. My mentor helped me see opportunities I was blind to.' },
  { name: 'Chidinma Eze', cohort: 'Cohort 2', field: 'Law', country: 'Nigeria', initial: 'C', color: '#0d2d5a', outcome: 'Associate at Aluko & Oyebode', quote: 'I was struggling to break into top-tier law firms. My Ascend mentor had done exactly that and showed me what it actually takes. I received three offers during the program.' },
  { name: 'Kwabena Mensah', cohort: 'Cohort 3', field: 'Entrepreneurship', country: 'Ghana', initial: 'K', color: '#1B6355', outcome: 'Founder, AgriLink Technologies', quote: 'I came in thinking I needed funding. My mentor helped me realize I needed clarity first. That pivot saved my startup. We\'re now operational in 4 countries.' },
  { name: 'Adaeze Obi', cohort: 'Cohort 1', field: 'Public Policy', country: 'Nigeria', initial: 'A', color: '#1e3a5f', outcome: 'Policy Analyst at African Development Bank', quote: 'Ascend helped me translate my academic background into a real career strategy. My mentor had 20 years in development finance and generously shared every insight.' },
  { name: 'Lebo Dlamini', cohort: 'Cohort 4', field: 'Marketing', country: 'South Africa', initial: 'L', color: '#0c2547', outcome: 'Brand Manager at Unilever Africa', quote: 'What sets Ascend apart is the quality of mentors. Mine had built brands across the continent. Six months with her accelerated my career by years.' },
]

export default function SuccessStories() {
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <PublicLayout>
      <SEO
        title="Success Stories"
        path="/success-stories"
        description="Real transformation stories from Ascend mentees and graduates. Young professionals across Kenya and Africa who unlocked their potential through structured mentorship, coaching, and leadership development."
      />
      {/* Hero */}
      <section style={{ background: '#1B6355', padding: isMobile ? '60px 24px' : '80px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '36px' : 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            Success Stories
          </h1>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Real outcomes from real people who chose to invest in their growth.
          </p>
        </div>
      </section>

      {/* Stories grid */}
      <section style={{ padding: isMobile ? '48px 24px' : '80px 24px', background: '#fff' }}>
        <div style={{ ...container, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
          {stories.map(s => (
            <div key={s.name} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E6E6E6', overflow: 'hidden', boxShadow: '0 4px 20px rgba(27,99,85,0.06)' }}>
              <div style={{ background: s.color, padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: '#F4B740', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '18px', color: '#1B6355', flexShrink: 0 }}>
                  {s.initial}
                </div>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '16px', color: '#fff' }}>{s.name}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{s.country} · {s.cohort}</div>
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'inline-block', background: '#FEF3C7', color: '#92400E', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px', marginBottom: '12px' }}>
                  {s.field}
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '14px', color: '#1B6355', marginBottom: '10px' }}>
                  → {s.outcome}
                </div>
                <p style={{ fontSize: '14px', color: '#5a5a5a', lineHeight: 1.75, fontStyle: 'italic' }}>"{s.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#F5F7FA', padding: isMobile ? '48px 24px' : '64px 24px', borderTop: '1px solid #E6E6E6' }}>
        <div style={{
          ...container,
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '32px' : '32px',
          textAlign: 'center',
        }}>
          {[
            { value: '92%', label: 'Career advancement within 12 months' },
            { value: '4', label: 'Cohorts completed' },
            { value: '1,500+', label: 'Mentees impacted' },
            { value: '12', label: 'Countries represented' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '32px' : '40px', fontWeight: 800, color: '#1B6355', marginBottom: '8px' }}>{s.value}</div>
              <div style={{ width: '28px', height: '3px', background: '#F4B740', margin: '0 auto 10px' }} />
              <div style={{ fontSize: '13px', color: '#5a5a5a' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? '60px 24px' : '80px 24px', textAlign: 'center', background: '#1B6355' }}>
        <div style={container}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Write Your Own Story</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', marginBottom: '32px' }}>Applications for Cohort 5 are open now.</p>
          <Link to="/apply" style={{ background: '#F4B740', color: '#1B6355', fontWeight: 700, fontSize: '15px', padding: '14px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
            Apply Today
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
