import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { useWindowWidth } from '../hooks/useWindowWidth'

const font = "'Montserrat', sans-serif"

/* ── Circular Progress SVG ── */
function CircleProgress({ pct = 75, size = 64, stroke = 5, color = '#F4B740' }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const dash = circ * (pct / 100)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E6E6E6" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round" />
    </svg>
  )
}

/* ── Stat card ── */
function StatCard({ icon, value, label, color = '#FEF3C7', iconColor = '#92400E' }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#ffffff', borderRadius: '16px', padding: '22px 24px',
        boxShadow: hov ? '0 12px 32px rgba(27,99,85,0.13)' : '0 4px 16px rgba(27,99,85,0.07)',
        border: '1px solid #E6E6E6', display: 'flex', alignItems: 'center', gap: '16px',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.22s ease',
      }}
    >
      <div style={{ width: '48px', height: '48px', background: color, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0, color: iconColor }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '28px', fontWeight: 700, color: '#1B6355', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#5a5a5a', marginTop: '5px', fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  )
}

/* ── Person card (mentor / mentee) ── */
function PersonCard({ name, field, status, role }) {
  const initial = name?.[0] ?? '?'
  const active = status === 'active'
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff', borderRadius: '16px', padding: '24px',
        border: '1px solid #E6E6E6',
        boxShadow: hov ? '0 10px 28px rgba(27,99,85,0.1)' : '0 2px 8px rgba(27,99,85,0.05)',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.22s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <div style={{
          width: '48px', height: '48px', background: '#1B6355', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: font, fontWeight: 800, fontSize: '18px', color: '#F4B740', flexShrink: 0,
        }}>{initial}</div>
        <div>
          <div style={{ fontFamily: font, fontWeight: 700, fontSize: '15px', color: '#1B6355' }}>{name}</div>
          <div style={{ fontSize: '12px', color: '#5a5a5a', marginTop: '2px' }}>{field}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', color: '#5a5a5a' }}>{role}</span>
        <span style={{
          fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px',
          background: active ? '#D1FAE5' : '#F3F4F6',
          color: active ? '#065F46' : '#5a5a5a',
        }}>{active ? 'Active' : status}</span>
      </div>
    </div>
  )
}

/* ── Program card ── */
function ProgramCard({ title, description, status, field }) {
  const [hov, setHov] = useState(false)
  const statusStyle = status === 'active'
    ? { bg: '#D1FAE5', color: '#065F46' }
    : status === 'upcoming'
    ? { bg: '#DBEAFE', color: '#1E40AF' }
    : { bg: '#F3F4F6', color: '#5a5a5a' }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff', borderRadius: '16px', border: '1px solid #E6E6E6',
        overflow: 'hidden',
        boxShadow: hov ? '0 10px 28px rgba(27,99,85,0.1)' : '0 2px 8px rgba(27,99,85,0.05)',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.22s ease',
      }}
    >
      <div style={{ height: '5px', background: status === 'active' ? '#10B981' : status === 'upcoming' ? '#3B82F6' : '#E6E6E6' }} />
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', background: statusStyle.bg, color: statusStyle.color }}>
            {status}
          </span>
          {field && (
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#1B6355', background: '#EFF6FF', padding: '3px 10px', borderRadius: '100px' }}>
              {field}
            </span>
          )}
        </div>
        <div style={{ fontFamily: font, fontWeight: 700, fontSize: '15px', color: '#1B6355', marginBottom: '8px' }}>{title}</div>
        <p style={{ fontSize: '13px', color: '#5a5a5a', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {description}
        </p>
      </div>
    </div>
  )
}

/* ── Resource card ── */
function ResourceCard({ title, description, type, url }) {
  const typeColors = {
    article: { bg: '#EFF6FF', color: '#1D4ED8' },
    video: { bg: '#FEF3C7', color: '#92400E' },
    guide: { bg: '#F0FDF4', color: '#166534' },
    template: { bg: '#FAF5FF', color: '#6B21A8' },
  }
  const tc = typeColors[type?.toLowerCase()] || { bg: '#F3F4F6', color: '#3B3B3B' }
  const [hov, setHov] = useState(false)

  return (
    <a href={url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: '#fff', borderRadius: '16px', padding: '20px',
          border: '1px solid #E6E6E6',
          boxShadow: hov ? '0 10px 28px rgba(27,99,85,0.1)' : '0 2px 8px rgba(27,99,85,0.05)',
          transform: hov ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'all 0.22s ease',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '3px 10px', borderRadius: '100px', background: tc.bg, color: tc.color, marginBottom: '12px', display: 'inline-block' }}>
          {type}
        </span>
        <div style={{ fontFamily: font, fontWeight: 700, fontSize: '14px', color: '#1B6355', marginBottom: '6px' }}>{title}</div>
        <p style={{ fontSize: '13px', color: '#5a5a5a', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px', fontSize: '12px', color: '#F4B740', fontWeight: 600 }}>
          Open resource
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </div>
      </div>
    </a>
  )
}

/* ── Section heading ── */
function SectionHeading({ title, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
      <h2 style={{ fontFamily: font, fontSize: '17px', fontWeight: 700, color: '#1B6355', margin: 0 }}>{title}</h2>
      {count != null && (
        <span style={{ background: '#F3F4F6', color: '#5a5a5a', fontSize: '12px', fontWeight: 600, padding: '2px 8px', borderRadius: '100px' }}>{count}</span>
      )}
    </div>
  )
}

/* ── Empty state ── */
function Empty({ label }) {
  return (
    <div style={{ background: '#F5F7FA', borderRadius: '16px', padding: '48px', textAlign: 'center', border: '1px dashed #E6E6E6' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-6l-2 3H10l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
        </svg>
      </div>
      <p style={{ fontSize: '14px', color: '#888888' }}>{label}</p>
    </div>
  )
}

export default function Dashboard() {
  const { profile, signOut, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [programs, setPrograms] = useState([])
  const [sessions, setSessions] = useState([])
  const [resources, setResources] = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [navScrolled, setNavScrolled] = useState(false)
  const w = useWindowWidth()
  const isMobile = w < 768

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    async function load() {
      const [p, s, r, m] = await Promise.all([
        supabase.from('programs').select('*').order('created_at', { ascending: false }),
        supabase.from('sessions').select('*').gte('scheduled_at', new Date().toISOString()).order('scheduled_at').limit(5),
        supabase.from('resources').select('*').order('created_at', { ascending: false }).limit(6),
        supabase.from('matches').select('*, mentee:mentee_id(full_name, field), mentor:mentor_id(full_name, field)')
          .or(`mentee_id.eq.${profile?.id},mentor_id.eq.${profile?.id}`),
      ])
      setPrograms(p.data || [])
      setSessions(s.data || [])
      setResources(r.data || [])
      setMatches(m.data || [])
      setLoading(false)
    }
    if (profile) load()
  }, [profile])

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F7FA' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #E6E6E6', borderTopColor: '#1B6355', borderRadius: '50%', margin: '0 auto 16px' }} className="spin" />
          <p style={{ fontSize: '14px', color: '#5a5a5a' }}>Loading your dashboard…</p>
        </div>
      </div>
    )
  }

  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'
  const activeProgramCount = programs.filter(p => p.status === 'active').length

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FA' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#ffffff',
        borderBottom: '1px solid #E6E6E6',
        boxShadow: navScrolled ? '0 2px 16px rgba(27,99,85,0.08)' : 'none',
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <img src="/logo.PNG" alt="Ascend Program" style={{ width: isMobile ? '140px' : '200px', height: isMobile ? '34px' : '48px', objectFit: 'cover', objectPosition: 'center 47%', display: 'block' }} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <div style={{ width: '32px', height: '32px', background: '#1B6355', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, fontWeight: 800, fontSize: '13px', color: '#F4B740', flexShrink: 0 }}>
                {profile?.full_name?.[0] ?? '?'}
              </div>
              {!isMobile && (
                <span style={{ fontSize: '13px', color: '#5a5a5a', textTransform: 'capitalize', fontWeight: 500 }}>
                  {profile?.role}
                </span>
              )}
            </div>
            {isAdmin && (
              <Link to="/admin" style={{ background: '#1B6355', color: '#fff', fontSize: '12px', fontWeight: 700, padding: isMobile ? '7px 12px' : '8px 16px', borderRadius: '8px', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Admin Panel
              </Link>
            )}
            <button onClick={handleSignOut} style={{
              background: '#F5F7FA', border: '1px solid #E6E6E6',
              color: '#3B3B3B', cursor: 'pointer', fontSize: '12px', fontWeight: 500,
              padding: isMobile ? '7px 10px' : '7px 14px', borderRadius: '8px', transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#EEF2F7'}
              onMouseLeave={e => e.currentTarget.style.background = '#F5F7FA'}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ── Welcome Banner ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0D3B2F 0%, #1B6355 60%, #132d60 100%)',
        padding: isMobile ? '36px 24px 64px' : '48px 24px 72px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Radial glow */}
        <div style={{ position: 'absolute', top: '-60px', right: '8%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(244,183,64,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '3%', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(30,80,180,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>

          <h1 style={{ fontFamily: font, fontSize: isMobile ? '26px' : 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Welcome back, {firstName}
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', maxWidth: '420px', lineHeight: 1.6 }}>
            Here's a snapshot of your Ascend journey. Keep pushing forward.
          </p>
        </div>
      </section>

      {/* ── Stats row (overlaps banner) ── */}
      <div style={{ maxWidth: '1280px', margin: '-36px auto 0', padding: '0 16px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px' }}>
          <StatCard icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>} value={activeProgramCount} label="Active Programs" color="#EFF6FF" iconColor="#1D4ED8" />
          <StatCard icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} value={sessions.length} label="Upcoming Sessions" color="#FEF3C7" iconColor="#92400E" />
          <StatCard icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>} value={resources.length} label="Resources" color="#F0FDF4" iconColor="#166534" />
          <StatCard icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} value={matches.length} label={profile?.role === 'mentee' ? 'Mentor Match' : 'Mentees'} color="#FAF5FF" iconColor="#6B21A8" />
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '28px 16px 48px' : '40px 24px 64px' }}>

        {/* My Mentor / Mentees */}
        {matches.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <SectionHeading
              title={profile?.role === 'mentee' ? 'My Mentor' : 'My Mentees'}
              count={matches.length}
            />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
              {matches.map(match => {
                const person = profile?.role === 'mentee' ? match.mentor : match.mentee
                return (
                  <PersonCard
                    key={match.id}
                    name={person?.full_name}
                    field={person?.field}
                    status={match.status}
                    role={profile?.role === 'mentee' ? 'Your Mentor' : 'Mentee'}
                  />
                )
              })}
            </div>
          </section>
        )}

        {/* Programs */}
        <section style={{ marginBottom: '48px' }}>
          <SectionHeading title="Programs" count={programs.length} />
          {programs.length === 0 ? (
            <Empty label="No programs have been added yet." />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
              {programs.map(prog => (
                <ProgramCard key={prog.id} {...prog} />
              ))}
            </div>
          )}
        </section>

        {/* Two-col: sessions + resources */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '32px' }}>

          {/* Upcoming Sessions */}
          <section>
            <SectionHeading title="Upcoming Sessions" count={sessions.length} />
            {sessions.length === 0 ? (
              <Empty label="No sessions scheduled yet." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sessions.map(s => {
                  const date = new Date(s.scheduled_at)
                  return (
                    <div key={s.id} style={{
                      background: '#fff', borderRadius: '14px', border: '1px solid #E6E6E6',
                      padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px',
                      boxShadow: '0 2px 8px rgba(27,99,85,0.05)',
                    }}>
                      <div style={{ textAlign: 'center', background: '#1B6355', borderRadius: '10px', padding: '8px 12px', flexShrink: 0, minWidth: '52px' }}>
                        <div style={{ fontFamily: font, fontWeight: 800, fontSize: '20px', color: '#F4B740', lineHeight: 1 }}>
                          {date.getDate()}
                        </div>
                        <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
                          {date.toLocaleDateString('en-GB', { month: 'short' })}
                        </div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: font, fontWeight: 600, fontSize: '14px', color: '#1B6355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {s.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#5a5a5a', marginTop: '3px' }}>
                          {date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} · {s.duration_minutes} min
                        </div>
                      </div>
                      {s.meeting_link && (
                        <a href={s.meeting_link} target="_blank" rel="noreferrer" style={{
                          background: '#F4B740', color: '#1B6355', fontSize: '12px', fontWeight: 700,
                          padding: '7px 14px', borderRadius: '8px', textDecoration: 'none', flexShrink: 0,
                          transition: 'opacity 0.2s',
                        }}
                          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                          Join
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* Resources */}
          <section>
            <SectionHeading title="Resources" count={resources.length} />
            {resources.length === 0 ? (
              <Empty label="No resources added yet." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {resources.map(r => (
                  <ResourceCard key={r.id} {...r} />
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  )
}
