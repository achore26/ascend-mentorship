import SEO from '../components/SEO'
import PublicLayout from '../layouts/PublicLayout'
import { Link } from 'react-router-dom'
import { Animate } from '../hooks/useInView'
import { useWindowWidth } from '../hooks/useWindowWidth'

const container = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }
const font = "'Montserrat', sans-serif"

const levels = [
  {
    num: 'Level 1',
    title: 'Career Building Blocks Series',
    subtitle: '6 Months',
    tag: 'Foundation',
    tagColor: '#F4B740',
    desc: 'Ascend\'s flagship structured learning pathway. Designed to help individuals intentionally build successful, fulfilling careers through practical knowledge, professional skills, and a growth mindset.',
    points: ['Personal growth & self-awareness', 'Career clarity and planning', 'Professionalism & workplace excellence', 'Communication & personal branding'],
    format: 'Monthly virtual sessions, orientation & graduation',
    audience: 'Graduates, early-career professionals, career changers',
    outcome: 'Certificate of Completion, practical career toolkit, expanded network',
  },
  {
    num: 'Level 2',
    title: 'Lead the Talk Series',
    subtitle: '1 Year (Quarterly)',
    tag: 'Leadership',
    tagColor: '#1B6355',
    desc: 'Ascend\'s thought leadership platform, bringing together accomplished leaders, industry experts, and change-makers to share insights that prepare professionals for the future.',
    points: ['Strategic leadership skills', 'Networking with senior leaders', 'Real-world exposure to industry trends', 'Executive presence & influence'],
    format: 'Webinars, fireside chats, panels, peer-led projects',
    audience: 'Mid-level professionals, senior leaders, executives, entrepreneurs',
    outcome: 'Enhanced leadership capability, executive network, strategic perspectives',
  },
  {
    num: 'Level 3',
    title: 'Coaching Circle',
    subtitle: 'Flexible & Continuous',
    tag: 'Legacy',
    tagColor: '#3B3B3B',
    desc: 'The heart of the Ascend ecosystem. A lifelong community where learning is shared, leadership is multiplied, and success is measured by the positive impact we create in the lives of others.',
    points: ['Mentorship-in-action', 'One-on-one & group coaching', 'Giving back to the community', 'Alumni leadership & networking'],
    format: 'Coaching circles, alumni leadership, mentoring others',
    audience: 'Programme alumni, coaches, experienced professionals, executives',
    outcome: 'Meaningful mentoring relationships, lasting legacy, lifelong community',
  },
]

const principles = [
  { title: 'Learning Never Stops', desc: 'Growth is a lifelong journey — not a destination.' },
  { title: 'Purpose Before Position', desc: 'Leadership begins with purpose, not title.' },
  { title: 'Growth Through Community', desc: 'We rise faster when we grow together.' },
  { title: 'Learning Must Lead to Action', desc: 'Knowledge only creates value when it is applied.' },
  { title: 'Lift As You Rise', desc: 'Success becomes meaningful when it creates opportunities for others.' },
]

const applicationSteps = [
  {
    num: '01', title: 'Submit Your Application',
    desc: 'Fill out our application form. Tell us your background, field, and which programme level you\'re applying for. Applications are reviewed on a rolling basis.',
    detail: ['Takes about 10 minutes', 'No fees required', 'Open to all fields and industries'],
  },
  {
    num: '02', title: 'Application Review',
    desc: 'Our team reviews every application carefully, looking for clarity of purpose, commitment, and alignment with programme values. You\'ll receive a response within 2 weeks.',
    detail: ['Email confirmation on submission', 'Review takes up to 2 weeks', 'Approved applicants notified directly'],
  },
  {
    num: '03', title: 'Programme Onboarding',
    desc: 'Once accepted, you\'ll be onboarded into your programme level, matched with a mentor or cohort group, and given access to your dashboard and resources.',
    detail: ['Access to learning resources', 'Cohort or mentor introduction', 'Dashboard to track your progress'],
  },
  {
    num: '04', title: 'Learn, Lead & Lift Others',
    desc: 'You begin your Ascend journey — building skills at Level 1, developing leadership at Level 2, and eventually giving back through the Coaching Circle at Level 3.',
    detail: ['Structured sessions & assignments', 'Community of peers & mentors', 'Certificate upon completion'],
  },
]

const faqs = [
  { q: 'Do I have to complete all three levels?', a: 'No. Each level is independent. You can join at whichever level aligns with your career stage. Many participants start at Level 1 and progress over time.' },
  { q: 'How long does Level 1 last?', a: 'Level 1 (Career Building Blocks) runs for 6 months with two facilitated sessions per month, plus orientation and a graduation ceremony.' },
  { q: 'Is there a cost to join?', a: 'Ascend is committed to accessibility. Contact us for current programme fees and available scholarships.' },
  { q: 'How often do mentors and mentees meet in the Coaching Circle?', a: 'We recommend at least twice a month. The cadence is agreed between the mentor and mentee directly.' },
  { q: 'Can organisations enrol their teams?', a: 'Yes. Ascend offers customised corporate training, workshops, and group programmes for organisations. Contact us for a tailored proposal.' },
  { q: 'What happens after completing a programme?', a: 'You join the Ascend alumni community with continued access to events, the Coaching Circle, and opportunities to give back as a mentor.' },
]

export default function HowItWorks() {
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <PublicLayout>
      <SEO
        title="How It Works"
        path="/how-it-works"
        description="Discover Ascend's three progressive levels: Career Building Blocks (6 months), Lead the Talk Series (1 year), and the Coaching Circle. A structured professional development and leadership journey for young professionals across Kenya and Africa."
      />

      {/* Hero */}
      <section style={{ background: '#1B6355', padding: isMobile ? '60px 24px' : '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', right: '-80px', transform: 'translateY(-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(244,183,64,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ ...container, textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(244,183,64,0.15)', border: '1px solid rgba(244,183,64,0.3)', borderRadius: '100px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.1em', textTransform: 'uppercase' }}>A Guided Development Journey</span>
          </div>
          <h1 style={{ fontFamily: font, fontSize: isMobile ? '36px' : 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            How the Ascend Programme Works
          </h1>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: 'rgba(255,255,255,0.75)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.75 }}>
            A professional development and leadership academy built around three interconnected programme levels — from building career foundations to developing leaders who lift others.
          </p>
        </div>
      </section>

      {/* Programme Levels */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px 24px', background: '#fff' }}>
        <div style={container}>
          <Animate style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>The Three Pillars</p>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#1B6355', marginBottom: '16px' }}>Programme Levels</h2>
            <p style={{ fontSize: '16px', color: '#5a5a5a', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Each level addresses a unique dimension of growth. Together they create a continuous journey from emerging professional to mentor and leader.
            </p>
          </Animate>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {levels.map((level, i) => (
              <Animate key={level.num} delay={i * 80}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #E6E6E6',
                  boxShadow: '0 4px 24px rgba(27,99,85,0.07)',
                }}>
                  {/* Left: level identity */}
                  <div style={{ background: '#1B6355', padding: isMobile ? '32px 24px' : '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
                    <div>
                      <div style={{ display: 'inline-block', background: level.tagColor, borderRadius: '6px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: level.tagColor === '#F4B740' ? '#1B6355' : '#ffffff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {level.tag}
                      </div>
                      <div style={{ fontFamily: font, fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{level.num}</div>
                      <h3 style={{ fontFamily: font, fontSize: isMobile ? '20px' : '22px', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, marginBottom: '12px' }}>{level.title}</h3>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(244,183,64,0.15)', borderRadius: '8px', padding: '6px 12px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#F4B740' }}>{level.subtitle}</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>For</div>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{level.audience}</p>
                    </div>
                  </div>

                  {/* Right: details */}
                  <div style={{ background: '#ffffff', padding: isMobile ? '28px 24px' : '40px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <p style={{ fontSize: '15px', color: '#5a5a5a', lineHeight: 1.75 }}>{level.desc}</p>

                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#1B6355', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>What You'll Cover</div>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px' }}>
                        {level.points.map(pt => (
                          <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#3B3B3B' }}>
                            <div style={{ width: '8px', height: '8px', background: '#F4B740', borderRadius: '50%', flexShrink: 0, marginTop: '5px' }} />
                            {pt}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                      <div style={{ background: '#F5F7FA', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Format</div>
                        <p style={{ fontSize: '13px', color: '#5a5a5a', lineHeight: 1.6 }}>{level.format}</p>
                      </div>
                      <div style={{ background: '#F5F7FA', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Outcome</div>
                        <p style={{ fontSize: '13px', color: '#5a5a5a', lineHeight: 1.6 }}>{level.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Learn → Lead → Lift */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px 24px', background: '#1B6355', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(244,183,64,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ ...container, position: 'relative' }}>
          <Animate style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>The Ascend Philosophy</p>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : '40px', fontWeight: 800, color: '#ffffff' }}>The Giving Back Journey</h2>
          </Animate>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2px', maxWidth: '860px', margin: '0 auto' }}>
            {[
              { step: 'Learn', icon: '📖', desc: 'Build knowledge. Develop capability. Discover your purpose.', level: 'Level 1' },
              { step: 'Lead', icon: '🎯', desc: 'Apply what you\'ve learned. Grow in confidence. Create meaningful impact.', level: 'Level 2' },
              { step: 'Lift Others', icon: '🤝', desc: 'Mentor. Coach. Teach. Open doors. Become the person someone else once needed.', level: 'Level 3' },
            ].map((item, i) => (
              <Animate key={item.step} delay={i * 100}>
                <div style={{
                  background: i === 1 ? '#F4B740' : 'rgba(255,255,255,0.07)',
                  borderRadius: i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : '0',
                  padding: isMobile ? '32px 24px' : '40px 32px',
                  textAlign: 'center',
                  ...(isMobile ? { borderRadius: '16px', marginBottom: i < 2 ? '2px' : 0 } : {}),
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
                  <div style={{ fontFamily: font, fontSize: '22px', fontWeight: 800, color: i === 1 ? '#1B6355' : '#ffffff', marginBottom: '12px' }}>{item.step}</div>
                  <p style={{ fontSize: '14px', color: i === 1 ? 'rgba(27,99,85,0.8)' : 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '16px' }}>{item.desc}</p>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: i === 1 ? '#1B6355' : '#F4B740', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.level}</div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px 24px', background: '#F5F7FA' }}>
        <div style={container}>
          <Animate style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>What Guides Us</p>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#1B6355' }}>The Ascend Principles</h2>
          </Animate>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: '16px' }}>
            {principles.map((p, i) => (
              <Animate key={p.title} delay={i * 70}>
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '28px 20px', border: '1px solid #E6E6E6', textAlign: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(244,183,64,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: font, fontWeight: 800, fontSize: '14px', color: '#F4B740' }}>{i + 1}</div>
                  <h3 style={{ fontFamily: font, fontSize: '13px', fontWeight: 700, color: '#1B6355', marginBottom: '8px', lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontSize: '12px', color: '#5a5a5a', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px 24px', background: '#fff' }}>
        <div style={{ ...container, maxWidth: '820px' }}>
          <Animate style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Getting Started</p>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#1B6355' }}>How to Join Ascend</h2>
          </Animate>
          {applicationSteps.map((step, i) => (
            <Animate key={step.num} delay={i * 80}>
              <div style={{ display: 'flex', gap: isMobile ? '20px' : '32px', marginBottom: i < applicationSteps.length - 1 ? '48px' : 0 }}>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: isMobile ? '44px' : '56px', height: isMobile ? '44px' : '56px', background: '#F4B740', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, fontWeight: 800, fontSize: isMobile ? '13px' : '16px', color: '#1B6355', flexShrink: 0 }}>
                    {step.num}
                  </div>
                  {i < applicationSteps.length - 1 && <div style={{ width: '2px', flex: 1, background: '#E6E6E6', marginTop: '12px' }} />}
                </div>
                <div style={{ paddingBottom: i < applicationSteps.length - 1 ? '24px' : 0 }}>
                  <h3 style={{ fontFamily: font, fontSize: isMobile ? '18px' : '20px', fontWeight: 800, color: '#1B6355', marginBottom: '10px' }}>{step.title}</h3>
                  <p style={{ fontSize: '15px', color: '#5a5a5a', lineHeight: 1.75, marginBottom: '14px' }}>{step.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {step.detail.map(d => (
                      <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#3B3B3B' }}>
                        <div style={{ width: '6px', height: '6px', background: '#F4B740', borderRadius: '50%', flexShrink: 0 }} />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isMobile ? '56px 24px' : '80px 24px', background: '#F5F7FA' }}>
        <div style={{ ...container, maxWidth: '760px' }}>
          <Animate style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '26px' : '36px', fontWeight: 800, color: '#1B6355' }}>Frequently Asked Questions</h2>
          </Animate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((f, i) => (
              <Animate key={f.q} delay={i * 50}>
                <div style={{ background: '#fff', borderRadius: '12px', padding: '20px 24px', border: '1px solid #E6E6E6' }}>
                  <div style={{ fontFamily: font, fontWeight: 700, fontSize: '15px', color: '#1B6355', marginBottom: '8px' }}>{f.q}</div>
                  <div style={{ fontSize: '14px', color: '#5a5a5a', lineHeight: 1.7 }}>{f.a}</div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px 24px', background: '#ffffff', textAlign: 'center' }}>
        <div style={container}>
          <Animate>
            <div style={{ background: 'linear-gradient(135deg, #1B6355 0%, #267060 100%)', borderRadius: '24px', padding: isMobile ? '48px 24px' : '72px 40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(244,183,64,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : '40px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
                  Ready to Begin Your Ascend Journey?
                </h2>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
                  Whether you're launching your career, stepping into leadership, or ready to give back — there's a place for you at Ascend.
                </p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/apply" style={{ background: '#F4B740', color: '#1B6355', fontFamily: font, fontWeight: 700, fontSize: '15px', padding: '15px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
                    Apply Now
                  </Link>
                  <Link to="/contact" style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', fontFamily: font, fontWeight: 600, fontSize: '15px', padding: '15px 32px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block', border: '1.5px solid rgba(255,255,255,0.25)' }}>
                    Ask a Question
                  </Link>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>
    </PublicLayout>
  )
}
