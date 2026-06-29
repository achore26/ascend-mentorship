import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const { profile, signOut, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [programs, setPrograms] = useState([])
  const [sessions, setSessions] = useState([])
  const [resources, setResources] = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0A1F44] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-[#0A1F44] text-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold tracking-tight">ASCEND</Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300 capitalize">{profile?.role} · {profile?.full_name}</span>
            {isAdmin && (
              <Link to="/admin" className="bg-[#F5A623] text-[#0A1F44] text-sm font-bold px-4 py-1.5 rounded-lg hover:bg-[#e09520] transition-colors">
                Admin Panel
              </Link>
            )}
            <button onClick={handleSignOut} className="text-sm text-gray-400 hover:text-white transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#0A1F44]">
            Welcome back, {profile?.full_name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening in your Ascend journey.</p>
        </div>

        {/* My Match */}
        {matches.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-[#0A1F44] mb-4">
              {profile?.role === 'mentee' ? 'My Mentor' : 'My Mentees'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matches.map(match => {
                const person = profile?.role === 'mentee' ? match.mentor : match.mentee
                return (
                  <div key={match.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="w-10 h-10 bg-[#0A1F44] rounded-full flex items-center justify-center text-white font-bold text-sm mb-3">
                      {person?.full_name?.[0] ?? '?'}
                    </div>
                    <div className="font-semibold text-[#0A1F44]">{person?.full_name}</div>
                    <div className="text-sm text-gray-500">{person?.field}</div>
                    <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                      match.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>{match.status}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Programs */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-[#0A1F44] mb-4">Programs</h2>
          {programs.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">No programs yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.map(prog => (
                <div key={prog.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block ${
                    prog.status === 'active' ? 'bg-green-100 text-green-700' :
                    prog.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>{prog.status}</span>
                  <h3 className="font-bold text-[#0A1F44] mb-1">{prog.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{prog.description}</p>
                  {prog.field && <div className="mt-3 text-xs text-[#0A1F44] bg-blue-50 inline-block px-2 py-0.5 rounded-full">{prog.field}</div>}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Sessions */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-[#0A1F44] mb-4">Upcoming Sessions</h2>
          {sessions.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">No upcoming sessions.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {sessions.map(s => (
                <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-[#0A1F44]">{s.title}</div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {new Date(s.scheduled_at).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}{s.duration_minutes} min
                    </div>
                  </div>
                  {s.meeting_link && (
                    <a href={s.meeting_link} target="_blank" rel="noreferrer"
                      className="bg-[#F5A623] text-[#0A1F44] text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#e09520] transition-colors whitespace-nowrap">
                      Join
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-lg font-bold text-[#0A1F44] mb-4">Resources</h2>
          {resources.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">No resources yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map(r => (
                <a key={r.id} href={r.url} target="_blank" rel="noreferrer"
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow block">
                  <div className="text-xs font-semibold text-[#F5A623] uppercase mb-2">{r.type}</div>
                  <div className="font-semibold text-[#0A1F44] mb-1">{r.title}</div>
                  <p className="text-sm text-gray-500 line-clamp-2">{r.description}</p>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
