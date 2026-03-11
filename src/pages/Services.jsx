import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MessageSquare, Bot, BarChart3, Globe, Smartphone, Cloud, Zap, Shield, HeadphonesIcon } from 'lucide-react'
import { getServices } from '../lib/api'
import { Spinner, SectionHeading, MediaImage, ErrorState } from '../components/ui'
import { useInView } from '../lib/useInView'

const ICONS = [<MessageSquare size={24} />, <Bot size={24} />, <BarChart3 size={24} />, <Globe size={24} />, <Smartphone size={24} />, <Cloud size={24} />, <Zap size={24} />, <Shield size={24} />, <HeadphonesIcon size={24} />]

const FALLBACKS = [
  { id:1, title:'WhatsApp Automation',  icon:0, short_desc:'Broadcast messages, auto-reply, chatbots and CRM integration via WhatsApp Business API.', description:'Send bulk messages, automate replies, build no-code chatbots, and integrate with your CRM — all via the official WhatsApp Business API.' },
  { id:2, title:'AI Chatbot Builder',   icon:1, short_desc:'No-code chatbot that captures leads, answers FAQs and routes chats to your team.',           description:'Build powerful AI chatbots with zero coding. Handle customer queries, capture leads, and escalate to human agents — 24/7.' },
  { id:3, title:'Campaign Analytics',   icon:2, short_desc:'Real-time dashboards for WhatsApp, SMS and RCS campaign performance.',                         description:'Track open rates, click-through rates, conversions, and revenue impact across all your messaging campaigns in one unified dashboard.' },
  { id:4, title:'Web Development',      icon:3, short_desc:'High-converting websites and web applications built for business growth.',                       description:'From landing pages to full-stack web applications — we build fast, SEO-optimised, and conversion-focused digital products.' },
  { id:5, title:'Mobile Solutions',     icon:4, short_desc:'iOS and Android apps with built-in automation and API integrations.',                            description:'We build cross-platform and native mobile applications with seamless integration to your backend systems and automation workflows.' },
  { id:6, title:'Cloud & DevOps',       icon:5, short_desc:'Cloud infrastructure, CI/CD pipelines and 99.9% uptime SLA for your business.',                 description:'We architect, deploy and manage cloud infrastructure on AWS, GCP, and Azure — ensuring your platforms scale reliably and securely.' },
]

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const ref = useInView()

  useEffect(() => {
    getServices().then(r => setServices(r.data)).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />
  if (error)   return <ErrorState message={error} />

  const items = services.length ? services : FALLBACKS

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden" style={{background:'linear-gradient(135deg,#0A0F1E,#0D1B4A)'}}>
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize:'50px 50px'}} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-10 text-center">
          <span className="section-label" style={{background:'rgba(255,255,255,0.07)', borderColor:'rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.6)'}}>Our Services</span>
          <h1 className="heading font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mt-2 mb-5 fade-up">
            Everything to Automate<br /><span className="text-gradient">& Grow Your Business</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto fade-up">
            From WhatsApp automation to full-stack development — we cover every layer of your digital business.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding" style={{background:'#F0F5FF'}}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((s,i) => (
              <div key={s.id} className="fade-up card group flex flex-col overflow-hidden" style={{transitionDelay:`${i*60}ms`}}>
                {s.image && (
                  <div className="aspect-video overflow-hidden">
                    <MediaImage src={s.image} alt={s.title} className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-primary transition-transform duration-300 group-hover:scale-110" style={{background:'linear-gradient(135deg,rgba(26,107,255,0.1),rgba(0,194,255,0.06))'}}>
                    {ICONS[(s.icon ?? i) % ICONS.length]}
                  </div>
                  <h3 className="heading font-bold text-dark text-xl mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-slate text-sm leading-relaxed flex-1">{s.description || s.short_desc}</p>
                  <Link to="/contact" className="mt-6 inline-flex items-center gap-1 text-primary text-sm font-semibold hover:underline">
                    Get Started <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="heading font-display font-black text-dark text-3xl md:text-4xl mb-4 fade-up">
            Need a <span className="text-gradient">Custom Automation</span>?
          </h2>
          <p className="text-slate mb-8 fade-up">Every business is unique. Let's build something exactly right for you.</p>
          <Link to="/contact" className="btn-primary fade-up">
            Talk to Our Team <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
