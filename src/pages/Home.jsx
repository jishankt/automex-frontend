import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Zap, MessageSquare, Bot, BarChart3, Globe, Smartphone, Cloud, Star, ChevronRight } from 'lucide-react'
import { getHome } from '../lib/api'
import { Spinner, SectionHeading, StatCard, Badge, MediaImage, ErrorState, CheckItem } from '../components/ui'
import { useInView } from '../lib/useInView'

/* ── Hero ───────────────────────────────────────────────── */
function Hero({ company }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{background:'linear-gradient(135deg, #0A0F1E 0%, #0D1B4A 60%, #0A0F1E 100%)'}}>
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize:'50px 50px'}} />
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{background:'radial-gradient(ellipse, #1A6BFF, transparent)'}} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{background:'#00C2FF'}} />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 text-xs font-semibold" style={{background:'rgba(26,107,255,0.15)', border:'1px solid rgba(26,107,255,0.3)', color:'#4F8DFF'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              #1 Business Automation Platform
            </div>

            <h1 className="heading font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6">
              Automate Your<br />
              <span className="text-gradient">Business &</span><br />
              Scale Faster
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              {company?.description || 'AutoMex helps businesses automate workflows via WhatsApp, RCS, SMS & AI chatbots — saving time, reducing costs, and generating more revenue.'}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/contact" className="btn-primary text-sm">
                Get Free Demo <ArrowUpRight size={16} />
              </Link>
              <Link to="/services" className="btn-outline text-sm" style={{color:'rgba(255,255,255,0.7)', borderColor:'rgba(255,255,255,0.2)'}}>
                View Services <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-white/40">
              {['No credit card required','Free 14-day trial','Cancel anytime'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check size={13} className="text-green-400" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right – floating card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="rounded-2xl p-6" style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(20px)'}}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-white/50 text-xs mb-1">Revenue Growth</p>
                    <p className="text-white font-bold text-2xl heading">+147%</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background:'rgba(26,107,255,0.2)'}}>
                    <BarChart3 size={22} className="text-blue-400" />
                  </div>
                </div>
                {/* Mini bar chart */}
                <div className="flex items-end gap-1.5 h-16">
                  {[40,55,48,70,65,80,75,90,85,100].map((h,i) => (
                    <div key={i} className="flex-1 rounded-sm transition-all" style={{height:`${h}%`, background: i===9 ? 'linear-gradient(to top,#1A6BFF,#00C2FF)' : 'rgba(255,255,255,0.12)'}} />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-0.5 rounded-full">↑ 23% this month</span>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-3 py-2 rounded-xl shadow-lg text-xs font-semibold" style={{background:'#fff', color:'#1A6BFF', boxShadow:'0 8px 30px rgba(26,107,255,0.2)'}}>
                <span className="flex items-center gap-1.5"><MessageSquare size={12} /> WhatsApp API</span>
              </div>
              <div className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl shadow-lg text-xs font-semibold" style={{background:'#fff', color:'#22C55E', boxShadow:'0 8px 30px rgba(34,197,94,0.2)'}}>
                <span className="flex items-center gap-1.5"><Bot size={12} /> AI Chatbot Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0" style={{background:'rgba(255,255,255,0.03)', borderTop:'1px solid rgba(255,255,255,0.07)'}}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: `${company?.projects_count||15}+`,  label: 'Projects Delivered' },
            { value: `${company?.clients_count||12}+`,   label: 'Businesses Automated' },
            { value: `${company?.years_experience||2}+`, label: 'Years Experience' },
            { value: '24/7', label: 'Support Available' },
          ].map((s,i) => (
            <div key={i} className="text-center">
              <p className="heading text-white font-black text-xl md:text-2xl text-gradient">{s.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── How it works ───────────────────────────────────────── */
function HowItWorks() {
  const ref = useInView()
  const steps = [
    { num:'01', title:'Connect Your Channels', desc:'Integrate WhatsApp, RCS, SMS and your existing tools in minutes with our plug-and-play connectors.' },
    { num:'02', title:'Set Up Automation',     desc:'Use our no-code workflow builder to automate messages, leads, follow-ups and customer support.' },
    { num:'03', title:'Watch Business Grow',   desc:'Track performance in real-time. More leads, faster responses, happier customers — automatically.' },
  ]
  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14 fade-up">
          <SectionHeading label="How It Works" title={<>Simple 3-Step<br /><span className="text-gradient">Setup Process</span></>} subtitle="Get your business automations running in under a day." center />
        </div>
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px" style={{background:'linear-gradient(90deg, #1A6BFF, #00C2FF)'}} />
          {steps.map((s,i) => (
            <div key={i} className="fade-up card p-8 text-center" style={{transitionDelay:`${i*120}ms`}}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-xl font-black heading" style={{background:'linear-gradient(135deg,#1A6BFF,#00C2FF)', color:'#fff'}}>
                {s.num}
              </div>
              <h3 className="heading font-bold text-dark text-lg mb-3">{s.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Services ───────────────────────────────────────────── */
function ServicesSection({ services = [] }) {
  const ref = useInView()
  const defaults = [
    { id:1, icon: <MessageSquare size={22} />, title:'WhatsApp Automation', short_desc:'Broadcast messages, auto-reply, chatbots and CRM integrations via WhatsApp Business API.' },
    { id:2, icon: <Bot size={22} />,           title:'AI Chatbot',          short_desc:'No-code chatbot builder with smart routing, lead capture, and 24/7 automated support.' },
    { id:3, icon: <BarChart3 size={22} />,     title:'Analytics & Reports', short_desc:'Real-time dashboards tracking campaign performance, revenue impact, and customer behavior.' },
    { id:4, icon: <Globe size={22} />,         title:'Web Development',     short_desc:'Custom websites and web apps built for performance, conversion, and business growth.' },
    { id:5, icon: <Smartphone size={22} />,    title:'Mobile Solutions',    short_desc:'iOS and Android apps with seamless automation and backend integration.' },
    { id:6, icon: <Cloud size={22} />,         title:'Cloud & DevOps',      short_desc:'Scalable cloud infrastructure, CI/CD pipelines, and 99.9% uptime SLA.' },
  ]
  const items = services.length ? services.map((s,i) => ({...s, icon: defaults[i%defaults.length].icon})) : defaults

  return (
    <section ref={ref} className="section-padding" style={{background:'#F0F5FF'}}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="fade-up">
          <SectionHeading label="Our Services" title={<>Everything You Need to<br /><span className="text-gradient">Automate & Grow</span></>} subtitle="One platform — all your business automation needs covered." />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((s,i) => (
            <div key={s.id} className="fade-up card p-7 group" style={{transitionDelay:`${i*70}ms`}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{background:'linear-gradient(135deg, rgba(26,107,255,0.12), rgba(0,194,255,0.08))', color:'#1A6BFF'}}>
                {s.icon}
              </div>
              <h3 className="heading font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{s.short_desc || s.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 fade-up">
          <Link to="/services" className="btn-outline">View All Services <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

/* ── Pricing ─────────────────────────────────────────────── */
function PricingSection() {
  const ref = useInView()
  const [period, setPeriod] = useState('monthly')

  const plans = [
    {
      name: 'Starter Plan',
      price: { monthly: 999, halfyearly: 899, yearly: 849 },
      suffix: '+GST',
      billing: { monthly:'Billed Monthly', halfyearly:'Billed Half Yearly', yearly:'Billed Yearly' },
      channels: ['WhatsApp API', 'RCS', 'SMS'],
      features: [
        'Multi-Channel Platform (WhatsApp | RCS | SMS)',
        'Unlimited Broadcasting',
        'Shared Team Inbox',
        'Detailed Campaign Analytics',
        'Includes up to 2 agents',
        'Messaging charges on prepaid basis',
        'Inbox Features (Tags, Labels, Notes etc.)',
        'Android and iOS App',
        'Quick Reply',
        'Unlimited Live Chats',
      ],
      highlight: false,
      cta: 'Get Started',
    },
    {
      name: 'Basic Plan',
      price: { monthly: 2499, halfyearly: 2249, yearly: 2124 },
      suffix: '+GST',
      billing: { monthly:'Billed Monthly', halfyearly:'Billed Half Yearly', yearly:'Billed Yearly' },
      channels: ['WhatsApp API', 'RCS', 'SMS'],
      features: [
        'All Features in Starter Plan +',
        'Team Inbox with Multi Agent login (up to 5 agents)',
        'Message speed – 3000 msg/minute',
        'Rule based auto-assign chats',
        'No-code chatbot builder',
        'Developer API and plugin (WooCommerce, Shopify, Zoho)',
        'Analytics and live reporting',
        'Multiple chatbots in one account',
        'Developer API access',
        'Dedicated support (Call, Chat, Email)',
        'API Integration',
      ],
      highlight: true,
      cta: 'Start Free Trial',
    },
  ]

  const periods = [
    { key:'monthly',    label:'Monthly' },
    { key:'halfyearly', label:'Half Yearly', badge:'10% off' },
    { key:'yearly',     label:'Yearly',      badge:'15% off' },
  ]

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-5xl mx-auto px-5 md:px-10">
        <div className="text-center fade-up">
          <SectionHeading label="Pricing" title={<>Simple, Transparent<br /><span className="text-gradient">Platform Pricing</span></>} subtitle="Choose the plan that fits your business. No hidden charges." center />
        </div>

        {/* Period switcher */}
        <div className="flex justify-center mb-10 fade-up">
          <div className="inline-flex rounded-2xl p-1.5 gap-1" style={{background:'#F0F5FF'}}>
            {periods.map(p => (
              <button key={p.key} onClick={() => setPeriod(p.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${period===p.key ? 'bg-white text-primary shadow-blue-sm' : 'text-slate hover:text-dark'}`}
              >
                {p.label}
                {p.badge && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{background:'linear-gradient(135deg,#1A6BFF,#00C2FF)', color:'#fff'}}>{p.badge}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan,i) => (
            <div key={i} className={`fade-up rounded-2xl p-8 relative overflow-hidden ${plan.highlight ? '' : 'card'}`}
              style={plan.highlight ? {background:'linear-gradient(135deg,#0D1B4A,#0A0F1E)', border:'1px solid rgba(26,107,255,0.3)', boxShadow:'0 20px 60px rgba(26,107,255,0.25)'} : {}}
              data-delay={i*100}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:'linear-gradient(90deg,#1A6BFF,#00C2FF)'}} />
              )}
              {plan.highlight && (
                <span className="absolute top-5 right-6 text-xs font-bold px-3 py-1 rounded-full" style={{background:'linear-gradient(135deg,#1A6BFF,#00C2FF)', color:'#fff'}}>
                  Most Popular
                </span>
              )}

              <div className="mb-2">
                <h3 className={`heading font-bold text-xl mb-1 ${plan.highlight ? 'text-white' : 'text-dark'}`}>{plan.name}</h3>
                <p className="text-xs" style={{color: plan.highlight ? 'rgba(255,255,255,0.4)' : '#8494B2'}}>{plan.billing[period]}</p>
              </div>

              <div className="flex items-end gap-1 my-5">
                <span className={`text-sm font-semibold ${plan.highlight ? 'text-white/60' : 'text-slate'}`}>₹</span>
                <span className={`heading font-black text-5xl ${plan.highlight ? 'text-white' : 'text-dark'}`}>{plan.price[period].toLocaleString()}</span>
                <span className={`text-sm mb-1 ${plan.highlight ? 'text-white/50' : 'text-mist'}`}>{plan.suffix}</span>
              </div>

              {/* Channel badges */}
              <div className="flex flex-wrap gap-2 mb-6 pb-6" style={{borderBottom: plan.highlight ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(26,107,255,0.1)'}}>
                {plan.channels.map(ch => (
                  <span key={ch} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{background: plan.highlight ? 'rgba(255,255,255,0.1)' : 'rgba(26,107,255,0.08)', color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#1A6BFF', border:`1px solid ${plan.highlight ? 'rgba(255,255,255,0.15)' : 'rgba(26,107,255,0.2)'}`}}>
                    {ch}
                  </span>
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f,fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 w-4.5 h-4.5 flex-shrink-0 text-xs flex items-center justify-center rounded-full" style={{color:'#22C55E', background:'rgba(34,197,94,0.12)', width:'18px', height:'18px'}}>✓</span>
                    <span style={{color: plan.highlight ? 'rgba(255,255,255,0.65)' : '#4B5B7C'}}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contact" className={plan.highlight ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'} style={!plan.highlight ? {} : {}}>
                {plan.cta} <ArrowUpRight size={15} />
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-mist text-xs mt-6 fade-up">* Messaging charges are billed on prepaid basis. Meta API charges apply separately.</p>
      </div>
    </section>
  )
}

/* ── Projects ───────────────────────────────────────────── */
function ProjectsSection({ projects = [] }) {
  const ref = useInView()
  const IMGS = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  ]
  const items = projects.length ? projects : [
    { id:1, title:'E-commerce Automation', category_display:'WhatsApp + Web', short_desc:'Automated order notifications, abandoned cart recovery and customer support via WhatsApp.', tech_list:['WhatsApp API','Django','React'] },
    { id:2, title:'Lead Gen Chatbot',      category_display:'AI Chatbot',     short_desc:'AI-powered chatbot capturing 300+ leads/month with zero human intervention.',                tech_list:['AI / NLP','FastAPI','Zapier'] },
    { id:3, title:'Analytics Dashboard',   category_display:'Data Analytics', short_desc:'Real-time business intelligence dashboard tracking campaigns and revenue.',                  tech_list:['Python','Chart.js','PostgreSQL'] },
  ]
  return (
    <section ref={ref} className="section-padding" style={{background:'#F0F5FF'}}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="fade-up">
          <SectionHeading label="Our Work" title={<>Real Results for<br /><span className="text-gradient">Real Businesses</span></>} subtitle="See how we've helped businesses automate and scale." />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p,i) => (
            <div key={p.id} className="fade-up card group overflow-hidden" style={{transitionDelay:`${i*100}ms`}}>
              <div className="aspect-video overflow-hidden">
                {p.image
                  ? <MediaImage src={p.image} alt={p.title} className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  : <img src={IMGS[i%3]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                }
              </div>
              <div className="p-6">
                <Badge>{p.category_display}</Badge>
                <h3 className="heading font-bold text-dark text-lg mt-3 mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-slate text-sm leading-relaxed mb-4">{p.short_desc}</p>
                {p.tech_list?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech_list.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded" style={{background:'rgba(26,107,255,0.07)', color:'#1A6BFF'}}>{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 fade-up">
          <Link to="/projects" className="btn-outline">View All Projects <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ───────────────────────────────────────── */
function TestimonialsSection({ testimonials = [] }) {
  const ref = useInView()
  const items = testimonials.length ? testimonials : [
    { author_name:'Rahul Sharma',   author_role:'Founder, RetailX',          content:'AutoMex\'s WhatsApp automation tripled our customer response rate in just 2 weeks. The ROI is insane.', rating:5 },
    { author_name:'Priya Nair',     author_role:'Marketing Head, EduTech Co', content:'The AI chatbot handles 80% of our student queries automatically. Our team now focuses only on high-value tasks.', rating:5 },
    { author_name:'Arjun Menon',    author_role:'CEO, LogiPro',              content:'From lead capture to follow-up — everything is automated. AutoMex saved us 40 hours per week easily.', rating:5 },
  ]
  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center fade-up">
          <SectionHeading label="Testimonials" title={<>Trusted by Businesses<br /><span className="text-gradient">Across India</span></>} center />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t,i) => (
            <div key={i} className="fade-up card p-7" style={{transitionDelay:`${i*100}ms`}}>
              <div className="flex gap-0.5 mb-4">
                {Array(t.rating||5).fill(0).map((_,j) => <Star key={j} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate text-sm leading-relaxed mb-6">"{t.content}"</p>
              <div className="flex items-center gap-3">
                {t.author_photo
                  ? <img src={`http://127.0.0.1:8000${t.author_photo}`} alt={t.author_name} className="w-10 h-10 rounded-full object-cover" />
                  : <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{background:'linear-gradient(135deg,#1A6BFF,#00C2FF)'}}>{t.author_name?.[0]}</div>
                }
                <div>
                  <p className="text-dark font-semibold text-sm">{t.author_name}</p>
                  <p className="text-mist text-xs">{t.author_role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Clients ─────────────────────────────────────────────── */
function ClientsSection({ clients = [] }) {
  if (!clients.length) return null
  return (
    <section className="py-14 bg-white border-t border-b" style={{borderColor:'rgba(26,107,255,0.08)'}}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <p className="text-center text-mist text-xs tracking-widest uppercase mb-8 font-semibold">Trusted by innovative businesses</p>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {clients.map(c => (
            <div key={c.id} className="grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300">
              {c.logo ? <img src={`http://127.0.0.1:8000${c.logo}`} alt={c.name} className="h-10 object-contain" /> : <span className="text-slate font-semibold text-sm">{c.name}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA ─────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="section-padding" style={{background:'linear-gradient(135deg,#0A0F1E 0%,#0D1B4A 60%,#0A0F1E 100%)'}}>
      <div className="max-w-4xl mx-auto px-5 text-center">
        <span className="section-label" style={{background:'rgba(255,255,255,0.07)', borderColor:'rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.6)'}}>
          Get Started Today
        </span>
        <h2 className="heading font-display font-black text-white text-3xl md:text-5xl mb-5 mt-2">
          Ready to Automate<br /><span className="text-gradient">Your Business?</span>
        </h2>
        <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
          Join 50+ businesses already using AutoMex to save time, cut costs and grow faster.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            Get Free Consultation <ArrowUpRight size={18} />
          </Link>
          <Link to="/services" className="btn-white text-base px-8 py-4">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Page ─────────────────────────────────────────────────── */
export default function Home() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    getHome()
      .then(r => setData(r.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  
  // Always render with fallback data — API loads in background

  return (
    <>
      <Hero               company     ={data?.company}        />
      <ClientsSection     clients     ={data?.clients || []}  />
      <HowItWorks />
      <ServicesSection    services    ={data?.services || []} />
      <PricingSection />
      <ProjectsSection    projects    ={data?.projects || []} />
      <TestimonialsSection testimonials={data?.testimonials || []} />
      <CTASection />
    </>
  )
}
