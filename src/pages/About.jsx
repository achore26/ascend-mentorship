import PublicLayout from '../layouts/PublicLayout'
import { Link } from 'react-router-dom'

const container = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }

const values = [
  { icon: '🎯', title: 'Purpose-Driven', desc: 'Every match is intentional. We connect people based on aligned goals, not just proximity.' },
  { icon: '🌍', title: 'Pan-African', desc: 'Built for Africa and the diaspora — embracing the diversity of our professional landscape.' },
  { icon: '🤝', title: 'Accountability', desc: 'We believe growth happens through consistent, structured engagement between mentor and mentee.' },
  { icon: '🚀', title: 'Excellence', desc: 'We set high standards for who joins our community — quality over quantity, always.' },
]

const team = [
  { name: 'Dr. Amina Kamara', title: 'Executive Director', initial: 'A' },
  { name: 'Kwame Asante', title: 'Head of Programs', initial: 'K' },
  { name: 'Zara Okonkwo', title: 'Mentor Relations', initial: 'Z' },
  { name: 'Tendai Mpofu', title: 'Community Manager', initial: 'T' },
]

export default function About() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ background: '#0A1F44', padding: '80px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            About Ascend
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
            We exist to close the gap between ambition and opportunity for young professionals across Africa and beyond.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ ...container, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F5A623', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Our Mission</div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', fontWeight: 800, color: '#0A1F44', lineHeight: 1.2, marginBottom: '24px' }}>
              Structured mentorship that actually moves careers forward
            </h2>
            <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.8, marginBottom: '16px' }}>
              Ascend was founded on a simple truth: the right mentor at the right time can change everything. Too many talented young professionals are navigating their careers without guidance, without access, and without a community that understands their unique journey.
            </p>
            <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.8 }}>
              We built Ascend to change that — by creating a structured, vetted, and intentional mentorship program that pairs ambition with experience.
            </p>
          </div>
          <div style={{ background: '#F8FAFC', borderRadius: '20px', padding: '48px', border: '1px solid #E5E7EB' }}>
            {[
              { label: 'Founded', value: '2021' },
              { label: 'Cohorts Completed', value: '4' },
              { label: 'Active Mentors', value: '200+' },
              { label: 'Mentees Impacted', value: '1,500+' },
              { label: 'Countries Represented', value: '12' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '15px', color: '#6B7280' }}>{s.label}</span>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#0A1F44', fontSize: '18px' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 24px', background: '#F8FAFC' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', fontWeight: 800, color: '#0A1F44', marginBottom: '12px' }}>What We Stand For</h2>
            <p style={{ fontSize: '16px', color: '#6B7280' }}>The principles that guide everything we do.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {values.map(v => (
              <div key={v.title} style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 2px 12px rgba(10,31,68,0.05)' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', color: '#0A1F44', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', fontWeight: 800, color: '#0A1F44', marginBottom: '12px' }}>The Team</h2>
            <p style={{ fontSize: '16px', color: '#6B7280' }}>Driven by a shared belief in the power of mentorship.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {team.map(m => (
              <div key={m.name} style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: '#0A1F44', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '28px', color: '#F5A623' }}>
                  {m.initial}
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#0A1F44', marginBottom: '4px' }}>{m.name}</div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>{m.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0A1F44', padding: '80px 24px', textAlign: 'center' }}>
        <div style={container}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Be Part of the Story</h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.65)', marginBottom: '36px' }}>Applications for Cohort 5 are now open.</p>
          <Link to="/apply" style={{ background: '#F5A623', color: '#0A1F44', fontWeight: 700, fontSize: '15px', padding: '14px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
            Apply Now
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
