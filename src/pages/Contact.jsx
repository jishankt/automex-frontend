import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, MessageSquare } from 'lucide-react'
import { submitContact } from '../lib/api'
import { useInView } from '../lib/useInView'

const INIT = { name:'', email:'', phone:'', company:'', subject:'', message:'' }

export default function Contact() {
  const [form, setForm]             = useState(INIT)
  const [status, setStatus]         = useState(null)
  const [errorMsg, setErrorMsg]     = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const ref = useInView()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (fieldErrors[name]) setFieldErrors(p => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading'); setErrorMsg(''); setFieldErrors({})
    try {
      await submitContact(form)
      setStatus('success'); setForm(INIT)
    } catch (err) {
      setStatus('error')
      if (err.response?.data && typeof err.response.data === 'object') {
        setFieldErrors(err.response.data)
        setErrorMsg('Please fix the errors below.')
      } else {
        setErrorMsg('Something went wrong. Please try again.')
      }
    }
  }

  const inputCls = field =>
    `w-full border rounded-xl px-4 py-3 text-sm text-dark placeholder-mist outline-none transition-all duration-200 ${
      fieldErrors[field]
        ? 'border-red-300 bg-red-50'
        : 'border-light-3 bg-light focus:border-primary focus:bg-white focus:shadow-blue-sm'
    }`

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden" style={{background:'linear-gradient(135deg,#0A0F1E,#0D1B4A)'}}>
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize:'50px 50px'}} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-10">
          <span className="section-label" style={{background:'rgba(255,255,255,0.07)', borderColor:'rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.6)'}}>Contact Us</span>
          <h1 className="heading font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mt-2 mb-5 fade-up">
            Let's Automate Your<br /><span className="text-gradient">Business Together</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl fade-up">
            Tell us about your business and we'll show you exactly how automation can save you time and increase revenue.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding" style={{background:'#F0F5FF'}}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid lg:grid-cols-5 gap-10">

          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon:<Mail size={18}/>,    label:'Email',   value:'automextechnologies@gmail.com', href:'mailto:automextechnologies@gmail.com' },
              { icon:<Phone size={18}/>,   label:'Phone',   value:'+91 XXXXX XXXXX',               href:'tel:+91XXXXXXXXXX' },
              { icon:<MapPin size={18}/>,  label:'Address', value:'Calicut, Palayam, Kerala, India', href:null },
              { icon:<Clock size={18}/>,   label:'Hours',   value:'Mon–Fri: 9AM – 6PM  |  Sat: 10AM – 4PM', href:null },
            ].map(({ icon, label, value, href }, i) => (
              <div key={i} className="fade-up card p-5 flex items-start gap-4" style={{transitionDelay:`${i*70}ms`}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary" style={{background:'linear-gradient(135deg,rgba(26,107,255,0.1),rgba(0,194,255,0.06))'}}>
                  {icon}
                </div>
                <div>
                  <p className="text-mist text-xs font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                  {href
                    ? <a href={href} className="text-dark text-sm hover:text-primary transition-colors">{value}</a>
                    : <p className="text-dark text-sm">{value}</p>
                  }
                </div>
              </div>
            ))}

            {/* Why contact us */}
            <div className="fade-up card p-6" style={{background:'linear-gradient(135deg,#0D1B4A,#0A0F1E)', border:'1px solid rgba(26,107,255,0.2)'}}>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={16} className="text-blue-400" />
                <h4 className="text-white font-semibold text-sm">Why reach out?</h4>
              </div>
              <ul className="space-y-2">
                {['Free business automation audit','Custom pricing for your needs','Get a live product demo','24-hour response guarantee'].map(t => (
                  <li key={t} className="text-white/50 text-xs flex items-center gap-2">
                    <span className="text-green-400">✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 fade-up">
            <div className="card p-8 md:p-10 bg-white">
              <h2 className="heading font-bold text-dark text-2xl mb-1">Send Us a Message</h2>
              <p className="text-mist text-sm mb-7">We'll get back to you within 24 hours.</p>

              {status === 'success' && (
                <div className="mb-6 flex items-start gap-3 rounded-xl p-4" style={{background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.25)'}}>
                  <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-dark text-sm">Thank you! Your message has been sent. We've emailed a confirmation — we'll be in touch within 24 hours.</p>
                </div>
              )}

              {status === 'error' && errorMsg && (
                <div className="mb-6 flex items-start gap-3 rounded-xl p-4" style={{background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.25)'}}>
                  <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-dark text-sm">{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate text-xs font-semibold mb-1.5">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className={inputCls('name')} />
                    {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-slate text-xs font-semibold mb-1.5">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" className={inputCls('email')} />
                    {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate text-xs font-semibold mb-1.5">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inputCls('phone')} />
                  </div>
                  <div>
                    <label className="block text-slate text-xs font-semibold mb-1.5">Company</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Your Company" className={inputCls('company')} />
                  </div>
                </div>

                <div>
                  <label className="block text-slate text-xs font-semibold mb-1.5">Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required className={inputCls('subject')}>
                    <option value="">Select a topic...</option>
                    <option>WhatsApp Automation</option>
                    <option>AI Chatbot Setup</option>
                    <option>Web / Mobile Development</option>
                    <option>Pricing & Plans</option>
                    <option>General Inquiry</option>
                  </select>
                  {fieldErrors.subject && <p className="text-red-500 text-xs mt-1">{fieldErrors.subject}</p>}
                </div>

                <div>
                  <label className="block text-slate text-xs font-semibold mb-1.5">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your business and what you'd like to automate..." className={`${inputCls('message')} resize-none`} />
                  {fieldErrors.message && <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>}
                </div>

                <button type="submit" disabled={status === 'loading'}
                  className="w-full btn-primary justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  {status === 'loading'
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                    : <><Send size={16} /> Send Message</>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
