import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Resources', to: '/resources' },
  { label: 'Success Stories', to: '/success-stories' },
]

export default function PublicLayout({ children }) {
  const { pathname } = useLocation()
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold text-[#0A1F44] tracking-tight">
            ASCEND
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? 'text-[#0A1F44]'
                    : 'text-gray-500 hover:text-[#0A1F44]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-[#0A1F44] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#0d2a5c] transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-[#0A1F44] hover:underline">
                  Login
                </Link>
                <Link
                  to="/apply"
                  className="bg-[#F5A623] text-[#0A1F44] text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#e09520] transition-colors"
                >
                  Apply Now
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0A1F44] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="text-2xl font-extrabold mb-3 tracking-tight">ASCEND</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting ambitious young professionals with experienced mentors across Africa and beyond.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-4 text-[#F5A623]">Quick Links</div>
              <div className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-4 text-[#F5A623]">Get Involved</div>
              <div className="flex flex-col gap-2">
                <Link to="/apply" className="text-gray-400 hover:text-white text-sm transition-colors">Apply as Mentee</Link>
                <Link to="/apply?type=mentor" className="text-gray-400 hover:text-white text-sm transition-colors">Become a Mentor</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link>
                <Link to="/partners" className="text-gray-400 hover:text-white text-sm transition-colors">Partners</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Ascend Mentorship Program. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
