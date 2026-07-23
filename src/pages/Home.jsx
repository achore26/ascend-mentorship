import { Link } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import { Animate } from '../hooks/useInView'
import SEO from '../components/SEO'
import { useWindowWidth } from '../hooks/useWindowWidth'

const stats = [
  { value: '20+', label: 'Expert Mentors' },
  { value: '100+', label: 'Mentees Impacted' },
  { value: '47', label: 'Counties' },
  { value: '92%', label: 'Career Growth Rate' },
]

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'A Professional Growth Ecosystem',
    desc: 'Not just mentorship — structured learning, leadership conversations, coaching, career services, and corporate training, all within one connected academy.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Three Progressive Levels',
    desc: 'From Career Building Blocks to thought leadership to giving back — a continuous journey designed for every stage of your professional life.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'A Lifelong Learning Community',
    desc: 'Graduates become mentors. Mentors become coaches. Every level of the Ascend community is built to grow together and lift one another.',
  },
]

const levels = [
  {
    num: 'Level 1',
    label: '6 Months',
    title: 'Career Building Blocks',
    desc: 'Personal growth, career clarity, and professionalism. Monthly virtual sessions, orientation & graduation.',
    color: '#F4B740',
  },
  {
    num: 'Level 2',
    label: '1 Year (Quarterly)',
    title: 'Lead the Talk Series',
    desc: 'Leadership skills, networking, and real-world exposure. Webinars, panels, and peer-led projects.',
    color: '#1B6355',
  },
  {
    num: 'Level 3',
    label: 'Flexible & Continuous',
    title: 'Coaching Circle',
    desc: 'Mentorship-in-action and giving back. Coaching circles, alumni leadership, and mentoring others.',
    color: '#3B3B3B',
  },
]

const testimonials = [
  {
    stars: 5,
    quote: "Ascend connected me with a mentor who completely changed how I approach my career. Within 6 months I landed my dream role in finance.",
    name: "Amara Osei",
    cohort: "Cohort 3 — Investment Analyst, Stanbic Bank",
    initial: "A",
  },
  {
    stars: 5,
    quote: "The program gave me structure, accountability, and access to someone who had already walked the path I wanted to take. My mentor helped me see opportunities I was blind to.",
    name: "Tafara Moyo",
    cohort: "Cohort 4 — Software Engineer, Andela",
    initial: "T",
  },
]

const c = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }
const font = "'Montserrat', sans-serif"

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F4B740">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Home() {
  const w = useWindowWidth()
  const isMobile = w < 768
  const isTablet = w < 1024

  return (
    <PublicLayout>
      <SEO
        path="/"
        description="Ascend is Kenya's leading professional development and leadership academy — structured mentorship, coaching, career building, and leadership programmes for young professionals across Africa. Cohort 5 now open. Free to apply."
      />

      {/* ── Hero ── */}
      <section style={{
        minHeight: isMobile ? '560px' : '700px',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '60px 24px 80px' : '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Blurred background photo */}
        <img
          src="/HERO.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            filter: 'blur(1px)',
            transform: 'scale(1.02)',
            pointerEvents: 'none',
          }}
        />
        {/* Teal gradient overlay for readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(145deg, rgba(13,59,47,0.60) 0%, rgba(27,99,85,0.52) 60%, rgba(38,112,96,0.45) 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{ ...c, position: 'relative', width: '100%' }}>
          <div style={{ maxWidth: isMobile ? '100%' : '640px' }}>
            <div className="hero-animate" style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '28px',
            }}>
              <div style={{ width: '32px', height: '2px', background: '#F4B740', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#F4B740', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Cohort 5 Applications Open
              </span>
            </div>

            <h1 className="hero-animate hero-animate-delay-1" style={{
              fontFamily: font, fontSize: isMobile ? '36px' : 'clamp(36px, 4.5vw, 62px)',
              fontWeight: 800, color: '#ffffff', lineHeight: 1.1,
              letterSpacing: '-0.025em', marginBottom: '16px',
            }}>
              Unlock Your Potential.<br />
              <span style={{ color: '#F4B740' }}>Build Your Future.</span>
            </h1>

            <p className="hero-animate hero-animate-delay-2" style={{
              fontSize: isMobile ? '15px' : '16px', fontWeight: 700, color: '#ffffff',
              marginBottom: '16px', letterSpacing: '0.01em',
            }}>
              Rise Beyond.{' '}
              <span style={{ color: '#F4B740' }}>Become More.</span>
            </p>

            <p className="hero-animate hero-animate-delay-2" style={{
              fontSize: isMobile ? '15px' : '16px', color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.75, maxWidth: '480px', marginBottom: '36px',
            }}>
              Empowering individuals through learning, leadership, mentorship, and coaching.
            </p>

            <div className="hero-animate hero-animate-delay-3" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/apply" style={{
                background: '#F4B740', color: '#1B6355', fontWeight: 700, fontSize: '15px',
                padding: isMobile ? '14px 28px' : '15px 34px', borderRadius: '10px', textDecoration: 'none',
                display: 'inline-block', boxShadow: '0 4px 20px rgba(244,183,64,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(244,183,64,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(244,183,64,0.4)' }}
              >
                Apply as Mentee
              </Link>
              <Link to="/apply?type=mentor" style={{
                background: 'rgba(255,255,255,0.12)', color: '#ffffff', fontWeight: 600, fontSize: '15px',
                padding: isMobile ? '14px 28px' : '15px 34px', borderRadius: '10px', textDecoration: 'none',
                display: 'inline-block', border: '1.5px solid rgba(255,255,255,0.35)',
                backdropFilter: 'blur(8px)', transition: 'background 0.2s, border-color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
              >
                Become a Mentor
              </Link>
            </div>

            <p className="hero-animate hero-animate-delay-4" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '28px' }}>
              Trusted by 1,500+ professionals across 12 countries
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: '#ffffff', padding: isMobile ? '72px 24px 48px' : '48px 24px', borderBottom: '1px solid #E6E6E6' }}>
        <div style={{
          ...c,
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '0' : '0',
        }}>
          {stats.map((s, i) => (
            <Animate key={s.label} delay={i * 90} style={{
              textAlign: 'center',
              padding: isMobile ? '20px 12px' : '0 24px',
              borderRight: isMobile
                ? (i % 2 === 0 ? '1px solid #E6E6E6' : 'none')
                : (i < stats.length - 1 ? '1px solid #E6E6E6' : 'none'),
              borderBottom: isMobile && i < 2 ? '1px solid #E6E6E6' : 'none',
            }}>
              <div style={{ fontFamily: font, fontSize: isMobile ? '36px' : '44px', fontWeight: 800, color: '#1B6355', lineHeight: 1 }}>{s.value}</div>
              <div style={{ width: '32px', height: '3px', background: '#F4B740', margin: '10px auto' }} />
              <div style={{ fontSize: '13px', color: '#5a5a5a', fontWeight: 500 }}>{s.label}</div>
            </Animate>
          ))}
        </div>
      </section>

      {/* ── Why Ascend ── */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px 24px', background: '#F5F7FA' }}>
        <div style={c}>
          <Animate style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Why Ascend</p>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#1B6355', marginBottom: '16px', letterSpacing: '-0.02em' }}>
              More Than Mentorship —<br />A Complete Growth Ecosystem
            </h2>
            <p style={{ fontSize: '16px', color: '#5a5a5a', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Ascend brings together structured learning, leadership development, coaching, and mentorship in one connected academy — for every stage of your career.
            </p>
          </Animate>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
            {features.map((f, i) => (
              <Animate key={f.title} delay={i * 100}>
                <div style={{ background: '#ffffff', borderRadius: '20px', padding: isMobile ? '28px 24px' : '36px 32px', border: '1px solid #E6E6E6', boxShadow: '0 4px 12px rgba(27,99,85,0.05)' }} className="card-lift">
                  <div style={{ width: '52px', height: '52px', background: 'rgba(244,183,64,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontFamily: font, fontSize: '18px', fontWeight: 700, color: '#1B6355', marginBottom: '12px' }}>{f.title}</h3>
                  <p style={{ fontSize: '15px', color: '#5a5a5a', lineHeight: 1.75 }}>{f.desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programme Levels ── */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px 24px', background: '#ffffff' }}>
        <div style={c}>
          <Animate style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Your Journey</p>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#1B6355', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Programme Levels
            </h2>
            <p style={{ fontSize: '16px', color: '#5a5a5a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              A guided mentorship journey designed to turn potential into performance.
            </p>
          </Animate>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px', position: 'relative' }}>
            {!isMobile && (
              <div style={{ position: 'absolute', top: '52px', left: 'calc(16.66% + 20px)', right: 'calc(16.66% + 20px)', height: '2px', background: 'linear-gradient(90deg, #F4B740, #1B6355, #3B3B3B)', zIndex: 0 }} />
            )}
            {levels.map((lv, i) => (
              <Animate key={lv.num} delay={i * 120} style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #E6E6E6', boxShadow: '0 4px 16px rgba(27,99,85,0.07)' }} className="card-lift">
                  <div style={{ background: lv.color, padding: '28px 28px 24px', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '3px solid rgba(255,255,255,0.35)' }}>
                      <span style={{ fontFamily: font, fontWeight: 800, fontSize: '18px', color: '#ffffff' }}>{i + 1}</span>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{lv.num}</div>
                    <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: '17px', color: '#ffffff', lineHeight: 1.3 }}>{lv.title}</h3>
                  </div>
                  <div style={{ background: '#ffffff', padding: '24px 28px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(244,183,64,0.1)', borderRadius: '8px', padding: '5px 12px', marginBottom: '14px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740' }}>{lv.label}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#5a5a5a', lineHeight: 1.7 }}>{lv.desc}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>

          <Animate style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/how-it-works" style={{ color: '#1B6355', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', border: '2px solid #1B6355', padding: '12px 28px', borderRadius: '10px', transition: 'background 0.2s, color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1B6355'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1B6355' }}
            >
              Explore All Programme Details
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </Animate>
        </div>
      </section>

      {/* ── From the Founder ── */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px 24px', background: '#F5F7FA' }}>
        <div style={{ ...c, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '48px' : '80px', alignItems: 'center' }}>
          {/* Text */}
          <Animate>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>From the Founder</p>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#1B6355', letterSpacing: '-0.02em', marginBottom: '20px', lineHeight: 1.2 }}>
              A Message From<br />Carolyne Mutambo
            </h2>
            <p style={{ fontSize: '16px', color: '#5a5a5a', lineHeight: 1.8, marginBottom: '28px' }}>
              Ascend was born from a simple belief: that every young professional in Africa deserves access to the guidance, structure, and community that unlocks their full potential.
            </p>
            <div style={{ borderLeft: '3px solid #F4B740', paddingLeft: '20px', marginBottom: '36px' }}>
              <p style={{ fontSize: '15px', color: '#3B3B3B', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '12px' }}>
                "We are not just building careers — we are building confident, purpose-driven leaders who will shape the future of Africa."
              </p>
              <div style={{ fontFamily: font, fontWeight: 700, fontSize: '14px', color: '#1B6355' }}>Carolyne Mutambo</div>
              <div style={{ fontSize: '13px', color: '#F4B740', fontWeight: 600, marginTop: '2px' }}>Founder & Mentor Lead, Ascend</div>
            </div>
            <Link to="/about" style={{ color: '#1B6355', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', border: '2px solid #1B6355', padding: '12px 28px', borderRadius: '10px', transition: 'background 0.2s, color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1B6355'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1B6355' }}
            >
              Meet the Full Team
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </Animate>

          {/* Vertical video */}
          <Animate delay={150} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: isMobile ? '240px' : '320px',
              flexShrink: 0,
            }}>
              {/* Decorative teal card behind */}
              <div style={{ position: 'absolute', top: '16px', left: '-16px', width: '100%', height: '100%', background: '#1B6355', borderRadius: '24px', zIndex: 0 }} />
              {/* Gold dot accent */}
              <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '36px', height: '36px', background: '#F4B740', borderRadius: '50%', zIndex: 2 }} />
              <div style={{
                position: 'relative', zIndex: 1,
                borderRadius: '20px', overflow: 'hidden',
                boxShadow: '0 24px 56px rgba(27,99,85,0.25)',
              }}>
                <video
                  src="/CAROLINE MUTAMBO SHORTER VERSION.mp4"
                  poster="/Carolyne Mutambo.png"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  style={{ width: '100%', display: 'block', aspectRatio: '9/16', objectFit: 'cover', background: '#0d3b2f' }}
                />
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── 3 Key Pillars ── */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px 24px', background: '#F5F7FA' }}>
        <div style={c}>
          <Animate style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>What We Offer</p>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#1B6355', letterSpacing: '-0.02em' }}>
              Ascend's 3 Key Pillars
            </h2>
          </Animate>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              {
                num: '1',
                title: 'Career Building Blocks Series',
                desc: 'Structured career and professional development learning.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                ),
              },
              {
                num: '2',
                title: 'Lead the Talk Series',
                desc: 'Strategic leadership webinars, conversations, and thought-leadership engagements.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                ),
              },
              {
                num: '3',
                title: 'Coaching Circle',
                desc: 'Intimate peer coaching groups for accountability, growth, and shared breakthroughs.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
              },
            ].map((p, i) => (
              <Animate key={p.title} delay={i * 100}>
                <div style={{
                  background: '#ffffff', borderRadius: '20px', padding: isMobile ? '28px 24px' : '36px 32px',
                  border: '1px solid #E6E6E6', boxShadow: '0 4px 12px rgba(27,99,85,0.06)',
                  borderTop: '4px solid #F4B740',
                }} className="card-lift">
                  <div style={{ width: '52px', height: '52px', background: 'rgba(244,183,64,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    {p.icon}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', marginBottom: '8px' }}>{p.num}.</div>
                  <h3 style={{ fontFamily: font, fontSize: '17px', fontWeight: 700, color: '#1B6355', marginBottom: '10px' }}>{p.title}</h3>
                  <p style={{ fontSize: '14px', color: '#5a5a5a', lineHeight: 1.75 }}>{p.desc}</p>
                </div>
              </Animate>
            ))}
          </div>

          {/* Our Services strip */}
          <Animate>
            <div style={{
              marginTop: '40px', background: '#1B6355', borderRadius: '16px',
              padding: isMobile ? '28px 24px' : '32px 40px',
              display: 'flex', flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center', gap: '20px',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Our Services</div>
                <p style={{ fontFamily: font, fontWeight: 700, fontSize: isMobile ? '15px' : '17px', color: '#ffffff', lineHeight: 1.6 }}>
                  Workshops · Coaching · Customised Group Programmes · Corporate Training
                </p>
              </div>
              <a href="/contact" style={{
                background: '#F4B740', color: '#1B6355', fontFamily: font, fontWeight: 700,
                fontSize: '14px', padding: '12px 28px', borderRadius: '10px',
                textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
              }}>Enquire Now</a>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: '#1B6355', padding: isMobile ? '64px 24px' : '96px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(244,183,64,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ ...c, position: 'relative' }}>
          <Animate style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Success Stories</p>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              What Our Community Says
            </h2>
          </Animate>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '20px' }}>
            {testimonials.map((t, i) => (
              <Animate key={t.name} delay={i * 120}>
                <div style={{
                  background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '20px', padding: isMobile ? '28px 24px' : '40px',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.11)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                >
                  <StarRating count={t.stars} />
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '28px' }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '46px', height: '46px', background: '#F4B740', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: font, fontWeight: 800, fontSize: '17px', color: '#1B6355', flexShrink: 0,
                    }}>{t.initial}</div>
                    <div>
                      <div style={{ fontFamily: font, fontWeight: 700, color: '#ffffff', fontSize: '15px' }}>{t.name}</div>
                      <div style={{ fontSize: '13px', color: '#F4B740', marginTop: '2px' }}>{t.cohort}</div>
                    </div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>

          <Animate style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/success-stories" style={{ color: '#F4B740', fontWeight: 600, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Read more stories
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </Animate>
        </div>
      </section>

      {/* ── Community photo ── */}
      <section style={{ padding: isMobile ? '64px 24px' : '96px 24px', background: '#ffffff' }}>
        <div style={c}>
          <Animate style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Our Community</p>
            <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#1B6355', letterSpacing: '-0.02em' }}>
              A Network of Rising Leaders
            </h2>
          </Animate>
          <Animate>
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(27,99,85,0.18)' }}>
              <img
                src="/ASCENDgr.jpg"
                alt="Ascend Program community — mentors and mentees"
                style={{ width: '100%', maxHeight: isMobile ? '280px' : '480px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
              {/* Subtle gradient overlay at bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(27,99,85,0.72) 0%, transparent 100%)',
              }} />
              <div style={{ position: 'absolute', bottom: isMobile ? '20px' : '36px', left: isMobile ? '20px' : '40px', right: isMobile ? '20px' : '40px' }}>
                <p style={{ fontFamily: font, fontWeight: 700, color: '#ffffff', fontSize: isMobile ? '16px' : '22px', marginBottom: '6px' }}>
                  Cohort 4 — Together We Rise
                </p>
                <p style={{ fontSize: isMobile ? '13px' : '15px', color: 'rgba(255,255,255,0.75)' }}>
                  Mentors and mentees who completed the program across 47 counties in Kenya.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── Partners strip ── */}
      <section style={{ padding: '48px 24px', background: '#F5F7FA', borderBottom: '1px solid #E6E6E6' }}>
        <div style={c}>
          <Animate>
            <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#888888', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Supported By
            </p>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              {['African Development Bank', 'Andela', 'Tony Elumelu Foundation', 'MasterCard Foundation', 'Stanbic Bank'].map(name => (
                <span key={name} style={{ fontSize: '13px', fontWeight: 600, color: '#888888', whiteSpace: 'nowrap' }}>{name}</span>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: isMobile ? '64px 24px' : '100px 24px', background: '#ffffff', textAlign: 'center' }}>
        <div style={c}>
          <Animate>
            <div style={{
              background: 'linear-gradient(135deg, #1B6355 0%, #267060 100%)',
              borderRadius: '24px', padding: isMobile ? '48px 24px' : '72px 40px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(244,183,64,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <h2 style={{ fontFamily: font, fontSize: isMobile ? '28px' : 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                  Ready to Ascend?
                </h2>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '440px', margin: '0 auto 36px', lineHeight: 1.7 }}>
                  Applications are open for Cohort 5. Take 10 minutes today — invest in years of career growth.
                </p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/apply" style={{
                    background: '#F4B740', color: '#1B6355', fontWeight: 700, fontSize: '16px',
                    padding: '16px 40px', borderRadius: '10px', textDecoration: 'none',
                    display: 'inline-block', boxShadow: '0 4px 20px rgba(244,183,64,0.4)',
                    transition: 'transform 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    Apply Now
                  </Link>
                  <Link to="/how-it-works" style={{
                    background: 'transparent', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '15px',
                    padding: '16px 32px', borderRadius: '10px', textDecoration: 'none',
                    display: 'inline-block', border: '1.5px solid rgba(255,255,255,0.25)',
                  }}>
                    Learn how it works
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
