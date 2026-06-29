import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const tabs = ['Applications', 'Users', 'Programs', 'Matches', 'Sessions', 'Resources']

function CreateUserModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ full_name: '', email: '', role: 'mentee', password: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(form),
    })
    const json = await res.json()
    if (!res.ok) { setError(json.error || 'Failed to create user'); setSaving(false); return }
    onCreated()
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '460px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', color: '#0A1F44' }}>Create New User</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#9CA3AF' }}>✕</button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { name: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com' },
            { name: 'password', label: 'Temporary Password', type: 'password', placeholder: 'Min 8 characters' },
          ].map(f => (
            <div key={f.name}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0A1F44', marginBottom: '6px' }}>{f.label}</label>
              <input name={f.name} type={f.type} required placeholder={f.placeholder} value={form[f.name]} onChange={handleChange}
                style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0A1F44', marginBottom: '6px' }}>Role</label>
            <select name="role" value={form.role} onChange={handleChange}
              style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '13px', padding: '10px 14px', borderRadius: '8px' }}>{error}</div>}
          <button type="submit" disabled={saving}
            style={{ background: '#0A1F44', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '12px', borderRadius: '8px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1, marginTop: '4px' }}>
            {saving ? 'Creating…' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function Admin() {
  const { profile, signOut } = useAuth()
  const [tab, setTab] = useState('Applications')
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  useEffect(() => { loadTab(tab) }, [tab])

  async function loadTab(t) {
    setLoading(true)
    let query
    if (t === 'Applications') query = supabase.from('applications').select('*').order('created_at', { ascending: false })
    if (t === 'Users') query = supabase.from('profiles').select('*').order('created_at', { ascending: false })
    if (t === 'Programs') query = supabase.from('programs').select('*').order('created_at', { ascending: false })
    if (t === 'Matches') query = supabase.from('matches').select('*, mentee:mentee_id(full_name), mentor:mentor_id(full_name)').order('created_at', { ascending: false })
    if (t === 'Sessions') query = supabase.from('sessions').select('*').order('scheduled_at')
    if (t === 'Resources') query = supabase.from('resources').select('*').order('created_at', { ascending: false })
    const { data } = await query
    setData(data || [])
    setLoading(false)
  }

  async function updateApplicationStatus(id, status) {
    setActionLoading(id)
    await supabase.from('applications').update({ status, reviewed_by: profile.id, reviewed_at: new Date().toISOString() }).eq('id', id)
    await loadTab('Applications')
    setActionLoading(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0A1F44] text-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold tracking-tight">ASCEND</Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Admin · {profile?.full_name}</span>
            <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">Dashboard</Link>
            <button onClick={signOut} className="text-sm text-gray-400 hover:text-white transition-colors">Sign Out</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#0A1F44]">Admin Panel</h1>
          <p className="text-gray-500 mt-1">Full system control</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === t ? 'bg-[#0A1F44] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#0A1F44]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#0A1F44] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* APPLICATIONS */}
            {tab === 'Applications' && (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Name', 'Email', 'Type', 'Field', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.length === 0 && (
                    <tr><td colSpan={7} className="text-center py-12 text-gray-400">No applications yet.</td></tr>
                  )}
                  {data.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium text-[#0A1F44]">{app.full_name}</td>
                      <td className="px-5 py-4 text-gray-500">{app.email}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                          app.type === 'mentor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>{app.type}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{app.field}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                          app.status === 'approved' ? 'bg-green-100 text-green-700' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-600' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{app.status}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-400">{new Date(app.created_at).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        {app.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              disabled={actionLoading === app.id}
                              onClick={() => updateApplicationStatus(app.id, 'approved')}
                              className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >Approve</button>
                            <button
                              disabled={actionLoading === app.id}
                              onClick={() => updateApplicationStatus(app.id, 'rejected')}
                              className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 disabled:opacity-50"
                            >Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* USERS */}
            {tab === 'Users' && (
              <>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowCreateUser(true)}
                  style={{ background: '#0A1F44', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '9px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                  + Create User
                </button>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Name', 'Email', 'Role', 'Field', 'Country', 'Joined'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.length === 0 && (
                    <tr><td colSpan={6} className="text-center py-12 text-gray-400">No users yet.</td></tr>
                  )}
                  {data.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium text-[#0A1F44]">{u.full_name || '—'}</td>
                      <td className="px-5 py-4 text-gray-500">{u.email}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                          u.role === 'admin' ? 'bg-red-100 text-red-700' :
                          u.role === 'mentor' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>{u.role}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{u.field || '—'}</td>
                      <td className="px-5 py-4 text-gray-500">{u.country || '—'}</td>
                      <td className="px-5 py-4 text-gray-400">{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </>
            )}

            {/* PROGRAMS */}
            {tab === 'Programs' && <ProgramsTab data={data} onRefresh={() => loadTab('Programs')} adminId={profile?.id} />}

            {/* MATCHES */}
            {tab === 'Matches' && <MatchesTab data={data} onRefresh={() => loadTab('Matches')} adminId={profile?.id} />}

            {/* SESSIONS */}
            {tab === 'Sessions' && <SessionsTab data={data} onRefresh={() => loadTab('Sessions')} adminId={profile?.id} />}

            {/* RESOURCES */}
            {tab === 'Resources' && <ResourcesTab data={data} onRefresh={() => loadTab('Resources')} adminId={profile?.id} />}
          </div>
        )}
      </div>

      {showCreateUser && (
        <CreateUserModal
          onClose={() => setShowCreateUser(false)}
          onCreated={() => { loadTab('Users'); setTab('Users') }}
        />
      )}
    </div>
  )
}

function ProgramsTab({ data, onRefresh, adminId }) {
  const [form, setForm] = useState({ title: '', description: '', field: '', start_date: '', end_date: '', status: 'upcoming' })
  const [saving, setSaving] = useState(false)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  async function handleCreate(e) {
    e.preventDefault(); setSaving(true)
    await supabase.from('programs').insert({ ...form, created_by: adminId })
    setForm({ title: '', description: '', field: '', start_date: '', end_date: '', status: 'upcoming' })
    onRefresh(); setSaving(false)
  }
  async function handleDelete(id) {
    await supabase.from('programs').delete().eq('id', id); onRefresh()
  }
  return (
    <div className="p-6">
      <h3 className="font-bold text-[#0A1F44] mb-4">Create Program</h3>
      <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <input name="title" required placeholder="Program title" value={form.title} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44]" />
        <input name="field" placeholder="Field (e.g. Finance)" value={form.field} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44]" />
        <input name="start_date" type="date" value={form.start_date} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44]" />
        <input name="end_date" type="date" value={form.end_date} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44]" />
        <select name="status" value={form.status} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] bg-white">
          <option value="upcoming">Upcoming</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <textarea name="description" rows={2} placeholder="Description" value={form.description} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] resize-none sm:col-span-2" />
        <button type="submit" disabled={saving} className="sm:col-span-2 bg-[#0A1F44] text-white font-bold py-2.5 rounded-lg hover:bg-[#0d2a5c] disabled:opacity-60">
          {saving ? 'Creating…' : 'Create Program'}
        </button>
      </form>
      <div className="flex flex-col gap-3">
        {data.map(p => (
          <div key={p.id} className="flex items-center justify-between border border-gray-100 rounded-xl p-4">
            <div>
              <div className="font-semibold text-[#0A1F44]">{p.title}</div>
              <div className="text-sm text-gray-500">{p.field} · <span className="capitalize">{p.status}</span></div>
            </div>
            <button onClick={() => handleDelete(p.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function MatchesTab({ data, onRefresh, adminId }) {
  const [users, setUsers] = useState([])
  const [programs, setPrograms] = useState([])
  const [form, setForm] = useState({ mentee_id: '', mentor_id: '', program_id: '', notes: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('profiles').select('id, full_name, role').then(({ data }) => setUsers(data || []))
    supabase.from('programs').select('id, title').then(({ data }) => setPrograms(data || []))
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function handleCreate(e) {
    e.preventDefault(); setSaving(true)
    await supabase.from('matches').insert({ ...form, created_by: adminId })
    setForm({ mentee_id: '', mentor_id: '', program_id: '', notes: '' })
    onRefresh(); setSaving(false)
  }

  const mentees = users.filter(u => u.role === 'mentee')
  const mentors = users.filter(u => u.role === 'mentor')

  return (
    <div className="p-6">
      <h3 className="font-bold text-[#0A1F44] mb-4">Assign Match</h3>
      <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <select name="mentee_id" required value={form.mentee_id} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] bg-white">
          <option value="">Select Mentee</option>
          {mentees.map(u => <option key={u.id} value={u.id}>{u.full_name}</option>)}
        </select>
        <select name="mentor_id" required value={form.mentor_id} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] bg-white">
          <option value="">Select Mentor</option>
          {mentors.map(u => <option key={u.id} value={u.id}>{u.full_name}</option>)}
        </select>
        <select name="program_id" value={form.program_id} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] bg-white">
          <option value="">Select Program (optional)</option>
          {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
        <input name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44]" />
        <button type="submit" disabled={saving} className="sm:col-span-2 bg-[#0A1F44] text-white font-bold py-2.5 rounded-lg hover:bg-[#0d2a5c] disabled:opacity-60">
          {saving ? 'Assigning…' : 'Assign Match'}
        </button>
      </form>
      <div className="flex flex-col gap-3">
        {data.map(m => (
          <div key={m.id} className="flex items-center justify-between border border-gray-100 rounded-xl p-4">
            <div>
              <div className="font-semibold text-[#0A1F44]">{m.mentee?.full_name} → {m.mentor?.full_name}</div>
              <div className="text-sm text-gray-500 capitalize">{m.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SessionsTab({ data, onRefresh, adminId }) {
  const [programs, setPrograms] = useState([])
  const [form, setForm] = useState({ title: '', description: '', program_id: '', scheduled_at: '', duration_minutes: 60, meeting_link: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('programs').select('id, title').then(({ data }) => setPrograms(data || []))
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function handleCreate(e) {
    e.preventDefault(); setSaving(true)
    await supabase.from('sessions').insert({ ...form, created_by: adminId })
    setForm({ title: '', description: '', program_id: '', scheduled_at: '', duration_minutes: 60, meeting_link: '' })
    onRefresh(); setSaving(false)
  }

  async function handleDelete(id) {
    await supabase.from('sessions').delete().eq('id', id); onRefresh()
  }

  return (
    <div className="p-6">
      <h3 className="font-bold text-[#0A1F44] mb-4">Schedule Session</h3>
      <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <input name="title" required placeholder="Session title" value={form.title} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44]" />
        <select name="program_id" value={form.program_id} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] bg-white">
          <option value="">Program (optional)</option>
          {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
        <input name="scheduled_at" type="datetime-local" required value={form.scheduled_at} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44]" />
        <input name="duration_minutes" type="number" placeholder="Duration (minutes)" value={form.duration_minutes} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44]" />
        <input name="meeting_link" type="url" placeholder="Meeting link (Zoom/Meet)" value={form.meeting_link} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] sm:col-span-2" />
        <textarea name="description" rows={2} placeholder="Description (optional)" value={form.description} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] resize-none sm:col-span-2" />
        <button type="submit" disabled={saving} className="sm:col-span-2 bg-[#0A1F44] text-white font-bold py-2.5 rounded-lg hover:bg-[#0d2a5c] disabled:opacity-60">
          {saving ? 'Scheduling…' : 'Schedule Session'}
        </button>
      </form>
      <div className="flex flex-col gap-3">
        {data.map(s => (
          <div key={s.id} className="flex items-center justify-between border border-gray-100 rounded-xl p-4">
            <div>
              <div className="font-semibold text-[#0A1F44]">{s.title}</div>
              <div className="text-sm text-gray-500">{new Date(s.scheduled_at).toLocaleString()} · {s.duration_minutes} min</div>
            </div>
            <button onClick={() => handleDelete(s.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ResourcesTab({ data, onRefresh, adminId }) {
  const [form, setForm] = useState({ title: '', description: '', type: 'link', url: '' })
  const [saving, setSaving] = useState(false)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function handleCreate(e) {
    e.preventDefault(); setSaving(true)
    await supabase.from('resources').insert({ ...form, created_by: adminId })
    setForm({ title: '', description: '', type: 'link', url: '' })
    onRefresh(); setSaving(false)
  }

  async function handleDelete(id) {
    await supabase.from('resources').delete().eq('id', id); onRefresh()
  }

  return (
    <div className="p-6">
      <h3 className="font-bold text-[#0A1F44] mb-4">Add Resource</h3>
      <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <input name="title" required placeholder="Resource title" value={form.title} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44]" />
        <select name="type" value={form.type} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] bg-white">
          <option value="link">Link</option>
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
          <option value="document">Document</option>
        </select>
        <input name="url" type="url" required placeholder="URL" value={form.url} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] sm:col-span-2" />
        <textarea name="description" rows={2} placeholder="Description (optional)" value={form.description} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A1F44] resize-none sm:col-span-2" />
        <button type="submit" disabled={saving} className="sm:col-span-2 bg-[#0A1F44] text-white font-bold py-2.5 rounded-lg hover:bg-[#0d2a5c] disabled:opacity-60">
          {saving ? 'Adding…' : 'Add Resource'}
        </button>
      </form>
      <div className="flex flex-col gap-3">
        {data.map(r => (
          <div key={r.id} className="flex items-center justify-between border border-gray-100 rounded-xl p-4">
            <div>
              <div className="font-semibold text-[#0A1F44]">{r.title}</div>
              <div className="text-sm text-gray-500 capitalize">{r.type}</div>
            </div>
            <button onClick={() => handleDelete(r.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
