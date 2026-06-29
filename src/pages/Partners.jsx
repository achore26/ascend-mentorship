import PublicLayout from '../layouts/PublicLayout'
import { Link } from 'react-router-dom'

const container = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }

const partners = [
  { name: 'African Development Bank', type: 'Institutional', initial: 'ADB' },
  { name: 'Andela', type: 'Corporate', initial: 'AN' },
  { name: 'Tony Elumelu Foundation', type: 'Foundation', initial: 'TEF' },
  { name: 'Stanbic Bank', type: 'Corporate', initial: 'SB' },
  { name: 'MasterCard Foundation', type: 'Foundation', initial: 'MCF' },
  { name: 'Aluko & Oyebode', type: 'Professional Services', initial: 'AO' },
]

const benefits = [
  { title: 'Talent Pipeline', desc: 'Get first access to a curated pool of high-potential young professionals across Africa.' },
  { title: 'Brand Visibility', desc: 'Feature your organization across our platform, cohort materials, and community channels.' },
  { title: 'CSR Impact', desc: 'Contribute meaningfully to Africa\'s professional development landscape with measurable outcomes.' },
  { title: 'Mentor Network', desc: 'Your team members become mentors — building leadership skills while giving back.' },
]

export default function Partners() {
  return (
    <PublicLayout>
      <section style={{ background: '#0A1F44', padding: '80px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            Our Partners
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Organizations that believe in the power of mentorship to transform careers and communities.
          </p>
        </div>
      </section>

      {/* Partners grid */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={container}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '28px', fontWeight: 800, color: '#0A1F44', textAlign: 'center', marginBottom: '48px' }}>
            Organizations We Work With
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {partners.map(p => (
              <div key={p.name} style={{ background: '#F8FAFC', borderRadius: '16px', padding: '32px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', background: '#0A1F44', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '13px', color: '#F5A623', flexShrink: 0, letterSpacing: '-0.5px' }}>
                  {p.initial}
                </div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: '#0A1F44', marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>{p.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership benefits */}
      <section style={{ padding: '80px 24px', background: '#F8FAFC' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '34px', fontWeight: 800, color: '#0A1F44', marginBottom: '12px' }}>Why Partner with Ascend?</h2>
            <p style={{ fontSize: '16px', color: '#6B7280' }}>Join organizations making a measurable impact on Africa's talent landscape.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {benefits.map(b => (
              <div key={b.title} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #E5E7EB', boxShadow: '0 2px 12px rgba(10,31,68,0.05)' }}>
                <div style={{ width: '40px', height: '4px', background: '#F5A623', borderRadius: '2px', marginBottom: '20px' }} />
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#0A1F44', marginBottom: '10px' }}>{b.title}</h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: '#0A1F44' }}>
        <div style={container}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Become a Partner
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
            Let's work together to accelerate careers across Africa. Reach out to discuss partnership opportunities.
          </p>
          <Link to="/contact" style={{ background: '#F5A623', color: '#0A1F44', fontWeight: 700, fontSize: '15px', padding: '14px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
            Get in Touch
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
