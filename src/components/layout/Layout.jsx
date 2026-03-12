import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact',  label: 'Contact'  },
]

function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location              = useLocation()

  useEffect(() => { setOpen(false) }, [location])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-blue-50 py-3' : 'bg-transparent py-4'
    }`}>
      <div className="container-custom flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/logo.png"
            alt="AutoMex"
            className="h-7 sm:h-8 w-auto object-contain transition-all duration-300"
            style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
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

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link to="/contact" className="btn-primary text-sm py-2.5 px-5">
            Get Free Demo <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-dark' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div className={`lg:hidden fixed inset-0 top-0 z-40 transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{background:'rgba(10,15,30,0.5)'}} onClick={() => setOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div className={`lg:hidden fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[85vw] transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{background:'#fff', boxShadow:'-4px 0 30px rgba(10,15,30,0.15)'}}
      >
        <div className="flex items-center justify-between p-5 border-b border-light-3">
          <img src="/logo.png" alt="AutoMex" className="h-7 object-contain" />
          <button onClick={() => setOpen(false)} className="p-2 text-slate hover:text-dark rounded-lg">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                  isActive ? 'bg-primary/8 text-primary' : 'text-slate hover:bg-light-2 hover:text-dark'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-light-3">
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center text-sm">
            Get Free Demo <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="p-4 space-y-3">
          <a href="mailto:automextechnologies@gmail.com" className="flex items-center gap-3 text-xs text-mist hover:text-primary transition-colors">
            <Mail size={14} /> automextechnologies@gmail.com
          </a>
          <span className="flex items-center gap-3 text-xs text-mist">
            <MapPin size={14} /> Calicut, Palayam, Kerala
          </span>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{background:'#0A0F1E'}}>
      <div className="container-custom pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/"><img src="/logo.png" alt="AutoMex" className="h-7 sm:h-8 mb-4 object-contain" style={{filter:'brightness(0) invert(1)'}} /></Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              We automate your business workflows so you can focus on growth. WhatsApp, RCS, SMS, AI Chatbots and more.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-white/40">
              <a href="mailto:automextechnologies@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={12} /> automextechnologies@gmail.com
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin size={12} /> Calicut, Kerala
              </span>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-4 sm:mb-5">Pages</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}><Link to={to} className="text-white/40 text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-4 sm:mb-5">Services</h4>
            <ul className="space-y-2.5">
              {['WhatsApp Automation','AI Chatbot','Analytics','Web Development','Mobile Apps','Cloud & DevOps'].map(s => (
                <li key={s}><Link to="/services" className="text-white/40 text-sm hover:text-white transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{borderColor:'rgba(255,255,255,0.07)'}}>
          <p className="text-white/25 text-xs text-center sm:text-left">© {new Date().getFullYear()} AutoMex Technologies. All rights reserved.</p>
          <p className="text-white/20 text-xs">Calicut, Palayam, Kerala, India</p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{background:'#F8FAFF'}}>
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
