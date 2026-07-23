import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import PublicLayout from '../layouts/PublicLayout'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useWindowWidth } from '../hooks/useWindowWidth'

const container = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }

const valueIcons = {
  // Growth — ascending steps (staircase = ascend)
  'Growth': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2 20 2 14 8 14 8 9 14 9 14 4 20 4 20 20"/>
      <line x1="2" y1="20" x2="20" y2="20"/>
    </svg>
  ),
  // Authenticity — open hand (genuine, giving, human)
  'Authenticity': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/>
      <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/>
      <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/>
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
  ),
  // Courage — mountain peak (face the climb, conquer the height)
  'Courage': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20 L9.5 9 L13 14 L16.5 8 L21 20 Z"/>
      <line x1="3" y1="20" x2="21" y2="20"/>
      <circle cx="16.5" cy="5.5" r="1.5"/>
    </svg>
  ),
  // Community — three nodes in a triangle, connected (network, togetherness)
  'Community': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2"/>
      <circle cx="4" cy="18" r="2"/>
      <circle cx="20" cy="18" r="2"/>
      <line x1="12" y1="6" x2="4.8" y2="16.3"/>
      <line x1="12" y1="6" x2="19.2" y2="16.3"/>
      <line x1="6" y1="18" x2="18" y2="18"/>
    </svg>
  ),
  // Purpose — compass (direction, intentionality, north star)
  'Purpose': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4B740" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
}

const values = [
  { title: 'Growth', desc: 'We embrace continuous learning, self-improvement, and the pursuit of excellence. Every stage of life presents an opportunity to learn, relearn, and grow.' },
  { title: 'Authenticity', desc: 'We value genuine relationships, honest conversations, and leadership grounded in integrity. Real transformation begins with being true to ourselves and others.' },
  { title: 'Courage', desc: 'Growth requires courage. We encourage individuals to step beyond fear, embrace change, and pursue opportunities with confidence and resilience.' },
  { title: 'Community', desc: 'Meaningful growth happens together. Through collaboration, mentorship, and shared experiences, we create an environment where everyone can rise.' },
  { title: 'Purpose', desc: 'Everything we do begins with purpose. We help individuals and organisations align their goals, leadership, and actions with meaningful impact.' },
]

const team = [
  {
    name: 'Carolyne Mutambo',
    title: 'Founder & Mentor Lead',
    photo: '/Carolyne Mutambo.png',
    bio: 'The heart behind Ascend. Carolyne has spent over a decade building leaders and unlocking potential in professionals across Kenya. She believes every person carries untapped greatness — mentorship is simply the key.',
    likes: 'Hiking, leadership literature, and a good cup of chai.',
  },
  {
    name: 'Grace Macharia',
    title: 'Program Coordinator',
    photo: '/Grace Macharia.png',
    bio: 'Grace is the engine that keeps Ascend running smoothly. Detail-oriented and deeply people-first, she ensures every participant feels seen, supported, and on track throughout their journey.',
    likes: 'Travelling, discovering new cultures, and organising things beautifully.',
  },
  {
    name: "Loyce Mang'eni",
    title: 'Team Member',
    photo: "/Loyce Mang'eni .png",
    bio: 'Loyce brings warmth and dedication to everything she does at Ascend. She is committed to creating meaningful experiences for participants and ensuring the community stays connected and thriving.',
    likes: 'Creative writing, community volunteering, and sunset walks.',
  },
  {
    name: 'Ruth Lelei',
    title: 'Team Member',
    photo: '/Ruth Lelei.png',
    bio: 'Ruth is a natural connector who believes strong relationships are the foundation of all growth. She supports programme delivery and participant engagement with energy and genuine care.',
    likes: 'Women in leadership conversations, gospel music, and mentoring young girls.',
  },
  {
    name: 'Anita Nelima',
    title: 'Communications & Social Media',
    photo: '/Anita Nelima.png',
    bio: "Anita is the voice of Ascend online. She crafts stories that inspire, engage, and bring the Ascend mission to life across every platform — making sure the world knows what we're building.",
    likes: 'Photography, storytelling, and finding the perfect caption.',
  },
]

function PromoSection({ isMobile }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <section style={{ background: '#060f0c', position: 'relative', overflow: 'hidden', padding: isMobile ? '72px 24px' : '100px 24px' }}>
      <style>{`
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>

      {/* Ambient radial glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '1000px', height: '700px', background: 'radial-gradient(ellipse, rgba(27,99,85,0.4) 0%, transparent 65%)', pointerEvents: 'none' }} />
      {/* Subtle gold top strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #F4B740, transparent)' }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '36px' : '52px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px' }}>Our Story</p>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '28px' : 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px' }}>
            See What Ascend<br />
            <span style={{ color: '#F4B740' }}>Is Building</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
            A programme built on purpose, powered by people — watch how we turn potential into performance.
          </p>
        </div>

        {/* Video frame — vertical (9:16) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', borderRadius: isMobile ? '16px' : '24px', overflow: 'hidden', aspectRatio: '9/16', width: isMobile ? '100%' : '420px', boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.7)' }}>
          <video
            ref={videoRef}
            src="/ASCEND SHORT VIDEO.mp4"
            controls={playing}
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />

          {/* Clickable play overlay */}
          {!playing && (
            <div
              onClick={handlePlay}
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,15,12,0.45)', cursor: 'pointer', backdropFilter: 'blur(1px)' }}
            >
              {/* Pulse rings + play btn */}
              <div style={{ position: 'relative', width: '96px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(244,183,64,0.22)', animation: 'pulseRing 2s ease-out infinite', animationDelay: '0s' }} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(244,183,64,0.15)', animation: 'pulseRing 2s ease-out infinite', animationDelay: '0.65s' }} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(244,183,64,0.08)', animation: 'pulseRing 2s ease-out infinite', animationDelay: '1.3s' }} />
                <div
                  style={{ position: 'relative', zIndex: 1, width: '76px', height: '76px', background: '#F4B740', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 40px rgba(244,183,64,0.55)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 52px rgba(244,183,64,0.75)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(244,183,64,0.55)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1B6355" style={{ marginLeft: '4px' }}>
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>
              <span style={{ marginTop: '20px', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Watch Our Story</span>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  )
}

function TeamPopup({ m, rect }) {
  const W = Math.max(rect.width * 1.15, 345)
  const margin = 8
  const vw = window.innerWidth
  const vh = window.innerHeight

  // Center horizontally over the card
  let left = rect.left + (rect.width - W) / 2
  if (left + W > vw - margin) left = vw - W - margin
  if (left < margin) left = margin

  // Anchor top to card top, clamp to viewport
  let top = rect.top
  const estimatedH = rect.height + 220
  if (top + estimatedH > vh - margin) top = Math.max(margin, vh - estimatedH - margin)

  return createPortal(
    <div style={{
      position: 'fixed', top, left, width: W, zIndex: 9999,
      borderRadius: '16px', overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 24px 64px rgba(27,99,85,0.22), 0 4px 20px rgba(0,0,0,0.12)',
      border: '1px solid rgba(27,99,85,0.12)',
      pointerEvents: 'none',
      animation: 'teamPopupIn 0.38s cubic-bezier(0.34, 1.04, 0.64, 1) both',
    }}>
      <style>{`@keyframes teamPopupIn{from{opacity:0;transform:translateY(12px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
        <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
      </div>
      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '16px', color: '#1B6355', marginBottom: '3px' }}>{m.name}</div>
        <div style={{ fontSize: '11px', color: '#F4B740', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>{m.title}</div>
        <p style={{ fontSize: '13px', color: '#5a5a5a', lineHeight: 1.75, marginBottom: '14px', margin: '0 0 14px' }}>{m.bio}</p>
        <div style={{ borderTop: '1px solid #E6E6E6', paddingTop: '12px' }}>
          <span style={{ fontSize: '11px', color: '#1B6355', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Loves: </span>
          <span style={{ fontSize: '12px', color: '#777', fontStyle: 'italic' }}>{m.likes}</span>
        </div>
      </div>
    </div>,
    document.body
  )
}

function TeamCard({ m, isMobile }) {
  const [hovered, setHovered] = useState(false)
  const [rect, setRect] = useState(null)
  const cardRef = useRef(null)

  const handleMouseEnter = () => {
    if (cardRef.current) setRect(cardRef.current.getBoundingClientRect())
    setHovered(true)
  }

  return (
    <>
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
        style={{ borderRadius: '16px', overflow: 'hidden', background: '#fff', border: '1px solid #E6E6E6', boxShadow: hovered ? '0 8px 32px rgba(27,99,85,0.16)' : '0 4px 16px rgba(27,99,85,0.08)', cursor: 'default', transition: 'box-shadow 0.2s ease, transform 0.2s ease', transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
      >
        <div style={{ width: '100%', height: isMobile ? '180px' : '220px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={m.photo}
            alt={m.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(27,99,85,0.5) 0%, transparent 100%)' }} />
        </div>
        <div style={{ padding: '14px 16px 18px' }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: isMobile ? '12px' : '14px', color: '#1B6355', marginBottom: '4px' }}>{m.name}</div>
          <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#F4B740', fontWeight: 600, lineHeight: 1.4 }}>{m.title}</div>
        </div>
      </div>
      {hovered && rect && <TeamPopup m={m} rect={rect} />}
    </>
  )
}

export default function About() {
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <PublicLayout>
      <SEO
        title="About Us"
        path="/about"
        description="Meet the Ascend team — founded by Carolyne Mutambo. Our mission: to inspire, equip and empower through lifelong learning, leadership development, mentorship and coaching. 100+ mentees, 47 counties, 4 cohorts completed."
      />
      {/* Hero */}
      <section style={{ background: '#1B6355', padding: isMobile ? '60px 24px' : '80px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '36px' : 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            About Ascend
          </h1>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7 }}>
            A professional development and leadership academy that empowers individuals and organisations to rise through lifelong learning, structured development, mentorship, coaching, and meaningful connections.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: isMobile ? '56px 24px' : '80px 24px', background: '#fff' }}>
        <div style={{ ...container, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '64px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Our Mission</div>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#1B6355', lineHeight: 1.2, marginBottom: '24px' }}>
              Empowering individuals and organisations to rise
            </h2>
            <p style={{ fontSize: '16px', color: '#5a5a5a', lineHeight: 1.8, marginBottom: '16px' }}>
              To inspire, equip, and empower individuals and organisations through lifelong learning, leadership development, mentorship, coaching, and practical learning experiences that unlock potential, strengthen capability, and create lasting impact.
            </p>
            <div style={{ borderLeft: '3px solid #F4B740', paddingLeft: '20px', marginTop: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Our Vision</div>
              <p style={{ fontSize: '15px', color: '#5a5a5a', lineHeight: 1.75, fontStyle: 'italic' }}>
                To become Africa's leading professional development and mentorship academy, building a lifelong community of purpose-driven professionals, leaders, and organisations committed to continuous learning, meaningful leadership, and creating lasting impact.
              </p>
            </div>
          </div>
          <div style={{ background: '#F5F7FA', borderRadius: '20px', padding: isMobile ? '28px 24px' : '48px', border: '1px solid #E6E6E6' }}>
            {[
              { label: 'Founded', value: '2021' },
              { label: 'Cohorts Completed', value: '4' },
              { label: 'Active Mentors', value: '20+' },
              { label: 'Mentees Impacted', value: '100+' },
              { label: 'Counties Represented', value: '47' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #E6E6E6' }}>
                <span style={{ fontSize: '15px', color: '#5a5a5a' }}>{s.label}</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, color: '#1B6355', fontSize: '18px' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: isMobile ? '56px 24px' : '80px 24px', background: '#F5F7FA' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#1B6355', marginBottom: '12px' }}>Core Brand Values</h2>
            <p style={{ fontSize: '16px', color: '#5a5a5a' }}>The values that shape every programme, partnership, and experience we create.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: '16px' }}>
            {values.map(v => (
              <div key={v.title} style={{ background: '#fff', borderRadius: '16px', padding: isMobile ? '24px 20px' : '32px', border: '1px solid #E6E6E6', boxShadow: '0 2px 12px rgba(27,99,85,0.05)' }}>
                <div style={{ width: '48px', height: '48px', background: '#FEF3C7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  {valueIcons[v.title]}
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '15px', color: '#1B6355', marginBottom: '8px' }}>{v.title}</h3>
                <p style={{ fontSize: '13px', color: '#5a5a5a', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We Believe In */}
      <section style={{ padding: isMobile ? '56px 24px' : '80px 24px', background: '#fff' }}>
        <div style={{ ...container, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '64px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F4B740', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Our Beliefs</div>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#1B6355', lineHeight: 1.2, marginBottom: '32px' }}>
              We Believe In:
            </h2>
            {[
              { label: 'Growing Intentionally', desc: 'Growth doesn\'t happen by accident. We design every experience with purpose and direction.' },
              { label: 'Empowering Leaders', desc: 'Leadership is not a title — it\'s a journey. We equip individuals to lead themselves and others.' },
              { label: 'Creating Impact', desc: 'Every mentorship connection creates a ripple. We measure success by the change our community makes in the world.' },
            ].map((b, i) => (
              <div key={b.label} style={{ display: 'flex', gap: '16px', marginBottom: i < 2 ? '28px' : '0' }}>
                <div style={{ width: '10px', height: '10px', background: '#F4B740', borderRadius: '50%', flexShrink: 0, marginTop: '6px' }} />
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '16px', color: '#1B6355', marginBottom: '6px' }}>{b.label}</div>
                  <p style={{ fontSize: '14px', color: '#5a5a5a', lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1B6355', borderRadius: '20px', padding: isMobile ? '36px 24px' : '48px', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: '#F4B740', lineHeight: 1.4, marginBottom: '20px' }}>
              "Rise Beyond.<br />Become More."
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
              Empowering individuals through learning, leadership, mentorship, and coaching.
            </p>
          </div>
        </div>
      </section>

      <PromoSection isMobile={isMobile} />

      {/* Team */}
      <section style={{ padding: isMobile ? '56px 24px' : '80px 24px', background: '#F5F7FA' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#1B6355', marginBottom: '12px' }}>Meet the Team</h2>
            <p style={{ fontSize: '16px', color: '#5a5a5a' }}>The people behind the Ascend mission.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: '20px' }}>
            {team.map(m => (
              <TeamCard key={m.name} m={m} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1B6355', padding: isMobile ? '60px 24px' : '80px 24px', textAlign: 'center' }}>
        <div style={container}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Begin Your Ascend Journey</h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.65)', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>Whether you're building your career, developing as a leader, or ready to give back — there's a place for you at Ascend.</p>
          <Link to="/apply" style={{ background: '#F4B740', color: '#1B6355', fontWeight: 700, fontSize: '15px', padding: '14px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
            Apply Now
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
