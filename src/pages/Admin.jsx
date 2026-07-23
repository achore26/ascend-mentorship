import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const font = "'Montserrat', sans-serif"
const c = { maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }

const tabs = ['Applications', 'Users', 'Programs', 'Matches', 'Sessions', 'Resources']

/* ── Shared field input ── */
function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#3B3B3B', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  border: '1.5px solid #E6E6E6', borderRadius: '8px',
  padding: '10px 14px', fontSize: '14px', outline: 'none',
  background: '#fff', color: '#1B6355',
  fontFamily: "'Montserrat', sans-serif",
}

/* ── Status badge ── */
function Badge({ label, variant = 'gray' }) {
  const styles = {
    green:  { background: '#D1FAE5', color: '#065F46' },
    red:    { background: '#FEE2E2', color: '#991B1B' },
    yellow: { background: '#FEF3C7', color: '#92400E' },
    blue:   { background: '#DBEAFE', color: '#1E40AF' },
    purple: { background: '#EDE9FE', color: '#5B21B6' },
    gray:   { background: '#F3F4F6', color: '#3B3B3B' },
  }
  const s = styles[variant] || styles.gray
  return (
    <span style={{ ...s, fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', textTransform: 'capitalize', display: 'inline-block' }}>
      {label}
    </span>
  )
}

/* ── Table shell ── */
function TableWrap({ headers, children, empty }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
            {headers.map(h => (
              <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888888', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap', background: '#FAFAFA' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {empty && (
        <div style={{ textAlign: 'center', padding: '56px', color: '#888888', fontSize: '14px' }}>{empty}</div>
      )}
    </div>
  )
}

function TR({ children }) {
  const [hov, setHov] = useState(false)
  return (
    <tr
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? '#FAFAFA' : '#fff', borderBottom: '1px solid #F9FAFB', transition: 'background 0.12s' }}
    >
      {children}
    </tr>
  )
}

function TD({ children, muted, bold }) {
  return (
    <td style={{ padding: '14px 20px', color: bold ? '#1B6355' : muted ? '#888888' : '#3B3B3B', fontWeight: bold ? 600 : 400, whiteSpace: 'nowrap' }}>
      {children}
    </td>
  )
}

/* ── Create User Modal ── */
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
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '460px', boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: '20px', color: '#1B6355' }}>Create New User</h3>
          <button onClick={onClose} style={{ background: '#F3F4F6', border: 'none', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a5a5a" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {[
            { name: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com' },
            { name: 'password', label: 'Temporary Password', type: 'password', placeholder: 'Min 8 characters' },
          ].map(f => (
            <Field key={f.name} label={f.label}>
              <input name={f.name} type={f.type} required placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} style={inputStyle} />
            </Field>
          ))}
          <Field label="Role">
            <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select>
          </Field>
          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '13px', padding: '12px 14px', borderRadius: '8px' }}>{error}</div>
          )}
          <button type="submit" disabled={saving} style={{ background: '#1B6355', color: '#fff', fontFamily: font, fontWeight: 700, fontSize: '14px', padding: '13px', borderRadius: '10px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginTop: '4px' }}>
            {saving ? 'Creating…' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ── Applications tab ── */
function ApplicationsTab({ data, actionLoading, onAction }) {
  const statusVariant = s => s === 'approved' ? 'green' : s === 'rejected' ? 'red' : 'yellow'
  return (
    <TableWrap
      headers={['Name', 'Email', 'Type', 'Field', 'Status', 'Date', 'Actions']}
      empty={data.length === 0 ? 'No applications yet.' : null}
    >
      {data.map(app => (
        <TR key={app.id}>
          <TD bold>{app.full_name}</TD>
          <TD muted>{app.email}</TD>
          <TD><Badge label={app.type} variant={app.type === 'mentor' ? 'purple' : 'blue'} /></TD>
          <TD muted>{app.field}</TD>
          <TD><Badge label={app.status} variant={statusVariant(app.status)} /></TD>
          <TD muted>{new Date(app.created_at).toLocaleDateString()}</TD>
          <td style={{ padding: '14px 20px' }}>
            {app.status === 'pending' && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  disabled={actionLoading === app.id}
                  onClick={() => onAction(app.id, 'approved')}
                  style={{ background: '#059669', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '7px', border: 'none', cursor: 'pointer', opacity: actionLoading === app.id ? 0.5 : 1 }}
                >Approve</button>
                <button
                  disabled={actionLoading === app.id}
                  onClick={() => onAction(app.id, 'rejected')}
                  style={{ background: '#DC2626', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '7px', border: 'none', cursor: 'pointer', opacity: actionLoading === app.id ? 0.5 : 1 }}
                >Reject</button>
              </div>
            )}
          </td>
        </TR>
      ))}
    </TableWrap>
  )
}

/* ── Users tab ── */
function UsersTab({ data, onShowCreate }) {
  const roleVariant = r => r === 'admin' ? 'red' : r === 'mentor' ? 'purple' : 'blue'
  return (
    <>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onShowCreate} style={{ background: '#1B6355', color: '#fff', fontFamily: font, fontWeight: 700, fontSize: '13px', padding: '9px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create User
        </button>
      </div>
      <TableWrap
        headers={['Name', 'Email', 'Role', 'Field', 'Country', 'Joined']}
        empty={data.length === 0 ? 'No users yet.' : null}
      >
        {data.map(u => (
          <TR key={u.id}>
            <TD bold>{u.full_name || '—'}</TD>
            <TD muted>{u.email}</TD>
            <TD><Badge label={u.role} variant={roleVariant(u.role)} /></TD>
            <TD muted>{u.field || '—'}</TD>
            <TD muted>{u.country || '—'}</TD>
            <TD muted>{new Date(u.created_at).toLocaleDateString()}</TD>
          </TR>
        ))}
      </TableWrap>
    </>
  )
}

/* ── Programs tab ── */
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
    <div style={{ padding: '28px' }}>
      <h3 style={{ fontFamily: font, fontWeight: 700, fontSize: '16px', color: '#1B6355', marginBottom: '20px' }}>Create Program</h3>
      <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }}>
        <Field label="Program Title">
          <input name="title" required placeholder="e.g. Career Building Blocks" value={form.title} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="Field">
          <input name="field" placeholder="e.g. Finance" value={form.field} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="Start Date">
          <input name="start_date" type="date" value={form.start_date} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="End Date">
          <input name="end_date" type="date" value={form.end_date} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="Status">
          <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </Field>
        <Field label="Description">
          <textarea name="description" rows={2} placeholder="Short description" value={form.description} onChange={handleChange} style={{ ...inputStyle, resize: 'none' }} />
        </Field>
        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit" disabled={saving} style={{ background: '#1B6355', color: '#fff', fontFamily: font, fontWeight: 700, fontSize: '14px', padding: '12px 28px', borderRadius: '9px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Creating…' : 'Create Program'}
          </button>
        </div>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFAFA', borderRadius: '12px', padding: '16px 20px', border: '1px solid #F3F4F6' }}>
            <div>
              <div style={{ fontFamily: font, fontWeight: 600, color: '#1B6355', fontSize: '14px' }}>{p.title}</div>
              <div style={{ fontSize: '12px', color: '#888888', marginTop: '3px' }}>{p.field} · <span style={{ textTransform: 'capitalize' }}>{p.status}</span></div>
            </div>
            <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', fontSize: '12px', fontWeight: 600 }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Matches tab ── */
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
    <div style={{ padding: '28px' }}>
      <h3 style={{ fontFamily: font, fontWeight: 700, fontSize: '16px', color: '#1B6355', marginBottom: '20px' }}>Assign Match</h3>
      <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }}>
        <Field label="Mentee">
          <select name="mentee_id" required value={form.mentee_id} onChange={handleChange} style={inputStyle}>
            <option value="">Select Mentee</option>
            {mentees.map(u => <option key={u.id} value={u.id}>{u.full_name}</option>)}
          </select>
        </Field>
        <Field label="Mentor">
          <select name="mentor_id" required value={form.mentor_id} onChange={handleChange} style={inputStyle}>
            <option value="">Select Mentor</option>
            {mentors.map(u => <option key={u.id} value={u.id}>{u.full_name}</option>)}
          </select>
        </Field>
        <Field label="Program (optional)">
          <select name="program_id" value={form.program_id} onChange={handleChange} style={inputStyle}>
            <option value="">No program</option>
            {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </Field>
        <Field label="Notes (optional)">
          <input name="notes" placeholder="Any pairing notes" value={form.notes} onChange={handleChange} style={inputStyle} />
        </Field>
        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit" disabled={saving} style={{ background: '#1B6355', color: '#fff', fontFamily: font, fontWeight: 700, fontSize: '14px', padding: '12px 28px', borderRadius: '9px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Assigning…' : 'Assign Match'}
          </button>
        </div>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.map(m => (
          <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#FAFAFA', borderRadius: '12px', padding: '16px 20px', border: '1px solid #F3F4F6' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <div style={{ fontFamily: font, fontWeight: 600, color: '#1B6355', fontSize: '14px' }}>
              {m.mentee?.full_name} <span style={{ color: '#F4B740', margin: '0 6px' }}>→</span> {m.mentor?.full_name}
            </div>
            <Badge label={m.status} variant={m.status === 'active' ? 'green' : 'gray'} />
          </div>
        ))}
        {data.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: '#888888', fontSize: '14px' }}>No matches yet.</div>}
      </div>
    </div>
  )
}

/* ── Sessions tab ── */
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
    <div style={{ padding: '28px' }}>
      <h3 style={{ fontFamily: font, fontWeight: 700, fontSize: '16px', color: '#1B6355', marginBottom: '20px' }}>Schedule Session</h3>
      <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }}>
        <Field label="Session Title">
          <input name="title" required placeholder="e.g. Cohort 5 Kickoff" value={form.title} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="Program (optional)">
          <select name="program_id" value={form.program_id} onChange={handleChange} style={inputStyle}>
            <option value="">No program</option>
            {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </Field>
        <Field label="Date & Time">
          <input name="scheduled_at" type="datetime-local" required value={form.scheduled_at} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="Duration (minutes)">
          <input name="duration_minutes" type="number" placeholder="60" value={form.duration_minutes} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="Meeting Link">
          <input name="meeting_link" type="url" placeholder="https://meet.google.com/..." value={form.meeting_link} onChange={handleChange} style={{ ...inputStyle, gridColumn: '1 / -1' }} />
        </Field>
        <Field label="Description (optional)">
          <textarea name="description" rows={2} placeholder="What will be covered?" value={form.description} onChange={handleChange} style={{ ...inputStyle, resize: 'none', gridColumn: '1 / -1' }} />
        </Field>
        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit" disabled={saving} style={{ background: '#1B6355', color: '#fff', fontFamily: font, fontWeight: 700, fontSize: '14px', padding: '12px 28px', borderRadius: '9px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Scheduling…' : 'Schedule Session'}
          </button>
        </div>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.map(s => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFAFA', borderRadius: '12px', padding: '16px 20px', border: '1px solid #F3F4F6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ background: '#1B6355', borderRadius: '8px', padding: '6px 10px', textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontFamily: font, fontWeight: 800, fontSize: '16px', color: '#F4B740', lineHeight: 1 }}>{new Date(s.scheduled_at).getDate()}</div>
                <div style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: '1px' }}>{new Date(s.scheduled_at).toLocaleDateString('en-GB', { month: 'short' })}</div>
              </div>
              <div>
                <div style={{ fontFamily: font, fontWeight: 600, color: '#1B6355', fontSize: '14px' }}>{s.title}</div>
                <div style={{ fontSize: '12px', color: '#888888', marginTop: '2px' }}>{new Date(s.scheduled_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} · {s.duration_minutes} min</div>
              </div>
            </div>
            <button onClick={() => handleDelete(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', fontSize: '12px', fontWeight: 600 }}>Delete</button>
          </div>
        ))}
        {data.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: '#888888', fontSize: '14px' }}>No sessions scheduled yet.</div>}
      </div>
    </div>
  )
}

/* ── Resources tab ── */
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
    <div style={{ padding: '28px' }}>
      <h3 style={{ fontFamily: font, fontWeight: 700, fontSize: '16px', color: '#1B6355', marginBottom: '20px' }}>Add Resource</h3>
      <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }}>
        <Field label="Title">
          <input name="title" required placeholder="Resource title" value={form.title} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="Type">
          <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
            <option value="link">Link</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="document">Document</option>
          </select>
        </Field>
        <Field label="URL">
          <input name="url" type="url" required placeholder="https://..." value={form.url} onChange={handleChange} style={{ ...inputStyle, gridColumn: '1 / -1' }} />
        </Field>
        <Field label="Description (optional)">
          <textarea name="description" rows={2} placeholder="Brief description" value={form.description} onChange={handleChange} style={{ ...inputStyle, resize: 'none', gridColumn: '1 / -1' }} />
        </Field>
        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit" disabled={saving} style={{ background: '#1B6355', color: '#fff', fontFamily: font, fontWeight: 700, fontSize: '14px', padding: '12px 28px', borderRadius: '9px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Adding…' : 'Add Resource'}
          </button>
        </div>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.map(r => (
          <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFAFA', borderRadius: '12px', padding: '16px 20px', border: '1px solid #F3F4F6' }}>
            <div>
              <div style={{ fontFamily: font, fontWeight: 600, color: '#1B6355', fontSize: '14px' }}>{r.title}</div>
              <div style={{ fontSize: '12px', color: '#888888', marginTop: '3px', textTransform: 'capitalize' }}>{r.type}</div>
            </div>
            <button onClick={() => handleDelete(r.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', fontSize: '12px', fontWeight: 600 }}>Delete</button>
          </div>
        ))}
        {data.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: '#888888', fontSize: '14px' }}>No resources yet.</div>}
      </div>
    </div>
  )
}

/* ── Main Admin component ── */
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
    <div style={{ minHeight: '100vh', background: '#F5F7FA', fontFamily: "'Montserrat', sans-serif" }}>

      {/* Header */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #E6E6E6', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 16px rgba(27,99,85,0.06)' }}>
        <div style={{ ...c, height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src="/logo.PNG" alt="Ascend Program" style={{ width: '200px', height: '48px', objectFit: 'cover', objectPosition: 'center 47%', display: 'block' }} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', background: '#1B6355', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, fontWeight: 800, fontSize: '12px', color: '#F4B740' }}>
                {profile?.full_name?.[0] ?? 'A'}
              </div>
              <span style={{ fontSize: '13px', color: '#5a5a5a', fontWeight: 500 }}>{profile?.full_name}</span>
            </div>
            <Link to="/dashboard" style={{ fontSize: '13px', color: '#5a5a5a', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#1B6355'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a5a5a'}
            >Dashboard</Link>
            <button onClick={signOut} style={{ background: '#F5F7FA', border: '1px solid #E6E6E6', color: '#3B3B3B', fontSize: '13px', fontWeight: 500, padding: '7px 14px', borderRadius: '7px', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#EEF2F7'}
              onMouseLeave={e => e.currentTarget.style.background = '#F5F7FA'}
            >Sign Out</button>
          </div>
        </div>
      </header>

      <div style={{ ...c, padding: '40px 28px 72px' }}>

        {/* Page title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: font, fontSize: '30px', fontWeight: 800, color: '#1B6355', marginBottom: '4px' }}>Admin Panel</h1>
          <p style={{ fontSize: '14px', color: '#888888' }}>Manage applications, users, programs, and sessions.</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {tabs.map(t => {
            const active = tab === t
            return (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '9px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 600,
                border: active ? 'none' : '1.5px solid #E6E6E6',
                background: active ? '#1B6355' : '#fff',
                color: active ? '#fff' : '#5a5a5a',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = '#1B6355'; e.currentTarget.style.color = '#1B6355' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = '#E6E6E6'; e.currentTarget.style.color = '#5a5a5a' } }}
              >
                {t}
              </button>
            )
          })}
        </div>

        {/* Content card */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E6E6E6', boxShadow: '0 2px 12px rgba(27,99,85,0.05)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px' }}>
              <div style={{ width: '32px', height: '32px', border: '3px solid #E6E6E6', borderTopColor: '#1B6355', borderRadius: '50%' }} className="spin" />
            </div>
          ) : (
            <>
              {tab === 'Applications' && <ApplicationsTab data={data} actionLoading={actionLoading} onAction={updateApplicationStatus} />}
              {tab === 'Users' && <UsersTab data={data} onShowCreate={() => setShowCreateUser(true)} />}
              {tab === 'Programs' && <ProgramsTab data={data} onRefresh={() => loadTab('Programs')} adminId={profile?.id} />}
              {tab === 'Matches' && <MatchesTab data={data} onRefresh={() => loadTab('Matches')} adminId={profile?.id} />}
              {tab === 'Sessions' && <SessionsTab data={data} onRefresh={() => loadTab('Sessions')} adminId={profile?.id} />}
              {tab === 'Resources' && <ResourcesTab data={data} onRefresh={() => loadTab('Resources')} adminId={profile?.id} />}
            </>
          )}
        </div>
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
