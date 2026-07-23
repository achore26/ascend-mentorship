import SEO from '../components/SEO'
import PublicLayout from '../layouts/PublicLayout'
import { Link } from 'react-router-dom'
import { useWindowWidth } from '../hooks/useWindowWidth'

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
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <PublicLayout>
      <SEO
        title="Our Partners"
        path="/partners"
        description="Organisations and institutions partnering with Ascend Programme Kenya to deliver world-class mentorship, leadership development, and professional growth across Africa."
      />
      <section style={{ background: '#1B6355', padding: isMobile ? '60px 24px' : '80px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '36px' : 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            Our Partners
          </h1>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Organizations that believe in the power of mentorship to transform careers and communities.
          </p>
        </div>
      </section>

      {/* Partners grid */}
      <section style={{ padding: isMobile ? '56px 24px' : '80px 24px', background: '#fff' }}>
        <div style={container}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '24px' : '28px', fontWeight: 800, color: '#1B6355', textAlign: 'center', marginBottom: '40px' }}>
            Organizations We Work With
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
            {partners.map(p => (
              <div key={p.name} style={{ background: '#F5F7FA', borderRadius: '16px', padding: '24px', border: '1px solid #E6E6E6', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '52px', height: '52px', background: '#1B6355', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '12px', color: '#F4B740', flexShrink: 0, letterSpacing: '-0.5px' }}>
                  {p.initial}
                </div>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '15px', color: '#1B6355', marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: '#5a5a5a' }}>{p.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership benefits */}
      <section style={{ padding: isMobile ? '56px 24px' : '80px 24px', background: '#F5F7FA' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '26px' : '34px', fontWeight: 800, color: '#1B6355', marginBottom: '12px' }}>Why Partner with Ascend?</h2>
            <p style={{ fontSize: '16px', color: '#5a5a5a' }}>Join organizations making a measurable impact on Africa's talent landscape.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '16px' }}>
            {benefits.map(b => (
              <div key={b.title} style={{ background: '#fff', borderRadius: '16px', padding: isMobile ? '20px' : '28px', border: '1px solid #E6E6E6', boxShadow: '0 2px 12px rgba(27,99,85,0.05)' }}>
                <div style={{ width: '40px', height: '4px', background: '#F4B740', borderRadius: '2px', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '15px', color: '#1B6355', marginBottom: '8px' }}>{b.title}</h3>
                <p style={{ fontSize: '13px', color: '#5a5a5a', lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section style={{ padding: isMobile ? '60px 24px' : '80px 24px', textAlign: 'center', background: '#1B6355' }}>
        <div style={container}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Become a Partner
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
            Let's work together to accelerate careers across Africa. Reach out to discuss partnership opportunities.
          </p>
          <Link to="/contact" style={{ background: '#F4B740', color: '#1B6355', fontWeight: 700, fontSize: '15px', padding: '14px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
            Get in Touch
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
