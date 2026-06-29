import PublicLayout from '../layouts/PublicLayout'
import { Link } from 'react-router-dom'

const container = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }

const steps = [
  {
    num: '01', title: 'Submit Your Application',
    desc: 'Fill out our detailed application form. Tell us about your background, your field, your goals, and why you want to join Ascend. Applications are reviewed on a rolling basis.',
    detail: ['Takes about 10 minutes', 'No fees required', 'Open to all fields and industries'],
  },
  {
    num: '02', title: 'Application Review',
    desc: 'Our team reviews every application carefully. We look for clarity of purpose, commitment, and alignment with our program values. You\'ll receive an email update within 2 weeks.',
    detail: ['Email confirmation on submission', 'Review takes up to 2 weeks', 'Approved applicants are notified directly'],
  },
  {
    num: '03', title: 'Mentor Matching',
    desc: 'Once approved, our team manually matches you with a mentor based on your field, goals, and personality. We take this seriously — it\'s not an algorithm, it\'s a deliberate pairing.',
    detail: ['Admin-driven matching process', 'Based on field, goals & background', 'You\'ll receive their contact details'],
  },
  {
    num: '04', title: 'Program Kickoff',
    desc: 'You\'ll be onboarded into your cohort, get access to your dashboard, resources, and upcoming group sessions. Your mentorship journey officially begins.',
    detail: ['Access to resources library', 'Group sessions open to all', 'Dashboard to track your programs'],
  },
]

const faqs = [
  { q: 'How long does the program last?', a: 'Each cohort runs for 6 months, with structured milestones and group sessions throughout.' },
  { q: 'Is there a cost to join?', a: 'No. Ascend is completely free for mentees. Mentors volunteer their time as a contribution to the community.' },
  { q: 'How often do mentors and mentees meet?', a: 'We recommend at least twice a month. The cadence is agreed between the mentor and mentee directly, off-platform.' },
  { q: 'Can I apply as both a mentor and mentee?', a: 'Not simultaneously. If you\'ve been a mentee in a previous cohort and now have 5+ years of experience, you may apply as a mentor.' },
  { q: 'What happens after the program ends?', a: 'You remain part of the Ascend alumni community with continued access to resources and events.' },
]

export default function HowItWorks() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ background: '#0A1F44', padding: '80px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            How Ascend Works
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            A structured, deliberate process — from application to growth.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: '96px 24px', background: '#fff' }}>
        <div style={{ ...container, maxWidth: '800px' }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', gap: '32px', marginBottom: i < steps.length - 1 ? '64px' : 0 }}>
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', background: '#F5A623', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '16px', color: '#0A1F44' }}>
                  {step.num}
                </div>
                {i < steps.length - 1 && <div style={{ width: '2px', flex: 1, background: '#E5E7EB', marginTop: '12px' }} />}
              </div>
              <div style={{ paddingBottom: i < steps.length - 1 ? '32px' : 0 }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 800, color: '#0A1F44', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.75, marginBottom: '20px' }}>{step.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {step.detail.map(d => (
                    <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151' }}>
                      <div style={{ width: '6px', height: '6px', background: '#F5A623', borderRadius: '50%', flexShrink: 0 }} />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 24px', background: '#F8FAFC' }}>
        <div style={{ ...container, maxWidth: '760px' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', fontWeight: 800, color: '#0A1F44', textAlign: 'center', marginBottom: '48px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map(f => (
              <div key={f.q} style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#0A1F44', marginBottom: '10px' }}>{f.q}</div>
                <div style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.7 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: '#fff' }}>
        <div style={container}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', fontWeight: 800, color: '#0A1F44', marginBottom: '16px' }}>Ready to apply?</h2>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '32px' }}>The process takes 10 minutes. The impact lasts a career.</p>
          <Link to="/apply" style={{ background: '#F5A623', color: '#0A1F44', fontWeight: 700, fontSize: '15px', padding: '14px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
            Start Your Application
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
