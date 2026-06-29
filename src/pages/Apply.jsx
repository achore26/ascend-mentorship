import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import PublicLayout from '../layouts/PublicLayout'

const fields = ['Technology', 'Finance', 'Law', 'Healthcare', 'Education', 'Marketing', 'Engineering', 'Entrepreneurship', 'Public Policy', 'Media & Communications', 'Other']

export default function Apply() {
  const [searchParams] = useSearchParams()
  const [type, setType] = useState(searchParams.get('type') === 'mentor' ? 'mentor' : 'mentee')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', country: '', field: '',
    job_title: '', organization: '', experience_years: '',
    goals: '', motivation: '', linkedin_url: '',
  })

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      type,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      country: form.country,
      field: form.field,
      job_title: form.job_title,
      organization: form.organization,
      motivation: form.motivation,
      linkedin_url: form.linkedin_url,
      ...(type === 'mentor' && { experience_years: parseInt(form.experience_years) || null }),
      ...(type === 'mentee' && { goals: form.goals }),
    }

    const { error } = await supabase.from('applications').insert(payload)

    if (error) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-[#F5A623] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#0A1F44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0A1F44] mb-3">Application Received!</h2>
            <p className="text-gray-500 leading-relaxed">
              Thank you for applying to Ascend. We've received your application and will be in touch via email once our team has reviewed it.
            </p>
          </div>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#0A1F44] mb-3">Apply to Ascend</h1>
          <p className="text-gray-500">Join our community of mentors and mentees driving careers forward.</p>
        </div>

        {/* Type toggle */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-8">
          {['mentee', 'mentor'].map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 py-3 text-sm font-bold capitalize transition-colors ${
                type === t ? 'bg-[#0A1F44] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Apply as {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Common fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">Full Name *</label>
              <input name="full_name" required value={form.full_name} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44]"
                placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">Email *</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44]"
                placeholder="jane@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44]"
                placeholder="+254 700 000 000" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">Country *</label>
              <input name="country" required value={form.country} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44]"
                placeholder="Kenya" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">Field / Industry *</label>
            <select name="field" required value={form.field} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44] bg-white">
              <option value="">Select your field</option>
              {fields.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">Job Title</label>
              <input name="job_title" value={form.job_title} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44]"
                placeholder="Software Engineer" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">Organization</label>
              <input name="organization" value={form.organization} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44]"
                placeholder="Acme Corp" />
            </div>
          </div>

          {/* Mentor-only */}
          {type === 'mentor' && (
            <div>
              <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">Years of Experience *</label>
              <input name="experience_years" type="number" min="1" required={type === 'mentor'}
                value={form.experience_years} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44]"
                placeholder="5" />
            </div>
          )}

          {/* Mentee-only */}
          {type === 'mentee' && (
            <div>
              <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">Career Goals *</label>
              <textarea name="goals" required={type === 'mentee'} rows={3}
                value={form.goals} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44] resize-none"
                placeholder="Describe what you want to achieve through the Ascend program…" />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">Why do you want to join Ascend? *</label>
            <textarea name="motivation" required rows={3}
              value={form.motivation} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44] resize-none"
              placeholder="Tell us what draws you to this program…" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A1F44] mb-1.5">LinkedIn Profile</label>
            <input name="linkedin_url" type="url" value={form.linkedin_url} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A1F44]"
              placeholder="https://linkedin.com/in/janedoe" />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#F5A623] text-[#0A1F44] font-bold py-4 rounded-lg hover:bg-[#e09520] transition-colors disabled:opacity-60 text-base mt-2"
          >
            {loading ? 'Submitting…' : 'Submit Application'}
          </button>
        </form>
      </div>
    </PublicLayout>
  )
}
