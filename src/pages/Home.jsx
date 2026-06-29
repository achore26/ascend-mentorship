import { Link } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'

const stats = [
  { value: '200+', label: 'Mentors' },
  { value: '1,500+', label: 'Mentees' },
  { value: '12', label: 'Countries' },
  { value: '92%', label: 'Career Growth Rate' },
]

const steps = [
  { num: '01', title: 'Apply', desc: 'Submit your application and tell us your goals and background.' },
  { num: '02', title: 'Get Matched', desc: 'Our team pairs you with the ideal mentor based on your field and aspirations.' },
  { num: '03', title: 'Grow', desc: 'Meet regularly, get guidance, and accelerate your career.' },
]

const testimonials = [
  {
    quote: "Ascend connected me with a mentor who completely changed how I approach my career. Within 6 months I landed my dream role in finance.",
    name: "Amara Osei",
    cohort: "Cohort 3 — Finance",
  },
  {
    quote: "The program gave me structure, accountability, and access to someone who had already walked the path I wanted to take.",
    name: "Tafara Moyo",
    cohort: "Cohort 4 — Technology",
  },
]

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-[#0A1F44] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Unlock Your Potential.<br />
            <span className="text-[#F5A623]">Find Your Mentor.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Ascend connects ambitious young professionals with experienced mentors who have walked the path. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="bg-[#F5A623] text-[#0A1F44] font-bold px-8 py-4 rounded-lg text-base hover:bg-[#e09520] transition-colors"
            >
              Apply as Mentee
            </Link>
            <Link
              to="/apply?type=mentor"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-base hover:bg-white hover:text-[#0A1F44] transition-colors"
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-14 px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold text-[#0A1F44] mb-1">{s.value}</div>
              <div className="w-8 h-0.5 bg-[#F5A623] mx-auto mb-2" />
              <div className="text-gray-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1F44] text-center mb-4">How Ascend Works</h2>
          <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">A simple, guided process designed to set you up for real growth.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(step => (
              <div key={step.num} className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#F5A623] text-[#0A1F44] rounded-full flex items-center justify-center font-extrabold text-lg mb-5">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-[#0A1F44] mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0A1F44] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white text-center mb-3">What Our Mentees Say</h2>
          <p className="text-[#F5A623] text-center mb-12 font-medium">Real stories from the Ascend community</p>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white/10 border border-white/10 rounded-xl p-8">
                <p className="text-gray-200 text-base leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-[#F5A623] text-sm">{t.cohort}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-[#0A1F44] mb-4">Ready to Ascend?</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Applications are open. Take the first step toward the career you've been working toward.</p>
        <Link
          to="/apply"
          className="bg-[#F5A623] text-[#0A1F44] font-bold px-10 py-4 rounded-lg text-base hover:bg-[#e09520] transition-colors inline-block"
        >
          Apply Now
        </Link>
      </section>
    </PublicLayout>
  )
}
