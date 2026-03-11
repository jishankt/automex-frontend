import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react'

const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact',  label: 'Contact'  },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-primary/10 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img src="/logo.png" alt="AutoMex" className="h-8 w-auto object-contain transition-all duration-300" style={{ filter: scrolled ? 'brightness(1)' : 'brightness(0) invert(1)' }} />
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium relative group transition-colors duration-200 ${
                  isActive ? 'text-primary' : scrolled ? 'text-dark hover:text-primary' : 'text-white/90 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" className="btn-primary text-sm py-2.5 px-5">
            Get Free Demo <ArrowUpRight size={14} />
          </Link>
        </div>

        <button className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-dark' : 'text-white'}`} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-white/98 backdrop-blur-xl border-t border-primary/10 px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `py-3 px-4 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-primary/8 text-primary' : 'text-slate hover:bg-light-2'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="mt-3 btn-primary justify-center">
            Get Free Demo <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{background:'#0A0F1E'}}>
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link to="/"><img src="/logo.png" alt="AutoMex" className="h-8 mb-5 object-contain" /></Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              We automate your business workflows so you can focus on what matters — growth. WhatsApp, RCS, SMS, AI Chatbots and more.
            </p>
            <div className="flex gap-3">
              {['W','L','T','G'].map((s,i) => (
                <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors cursor-pointer" style={{background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.5)'}}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Pages</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}><Link to={to} className="text-white/40 text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li>automextechnologies@gmail.com</li>
              <li>Calicut, Palayam, Kerala</li>
              <li className="text-white/60">Mon–Fri: 9AM – 6PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{borderColor:'rgba(255,255,255,0.07)'}}>
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} AutoMex Technologies. All rights reserved.</p>
          <p className="text-white/20 text-xs">Built with React + Django</p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  )
}
