import { useEffect, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { getProjects, getProjectCategories } from '../lib/api'
import { Spinner, SectionHeading, Badge, MediaImage, ErrorState } from '../components/ui'
import { useInView } from '../lib/useInView'

const IMGS = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&q=80',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
]

const FALLBACK_PROJECTS = [
  { id:1, title:'E-commerce WhatsApp Automation', category:'web',    category_display:'WhatsApp + Web',  short_desc:'Automated order updates, abandoned cart recovery and 24/7 support.', tech_list:['WhatsApp API','Django','React'] },
  { id:2, title:'AI Lead Generation Bot',         category:'ai',     category_display:'AI Chatbot',       short_desc:'Captures 300+ qualified leads per month with zero human effort.',        tech_list:['AI/NLP','FastAPI','Zapier']  },
  { id:3, title:'Business Analytics Dashboard',   category:'data',   category_display:'Data Analytics',   short_desc:'Real-time BI platform tracking campaigns, revenue, and customer data.',   tech_list:['Python','Chart.js','PostgreSQL'] },
  { id:4, title:'Cloud Migration – SaaS Company', category:'cloud',  category_display:'Cloud Solutions',  short_desc:'Full infrastructure migration to AWS with zero downtime.',                  tech_list:['AWS','Docker','Terraform']  },
  { id:5, title:'Mobile Banking App',             category:'mobile', category_display:'Mobile Dev',       short_desc:'Secure banking app with biometric auth and real-time notifications.',     tech_list:['React Native','Node.js','MongoDB'] },
  { id:6, title:'RCS Campaign Platform',          category:'web',    category_display:'RCS + Automation', short_desc:'Rich Card campaigns driving 3x higher engagement than SMS.',              tech_list:['RCS API','Django','Redis']   },
]
const FALLBACK_CATS = [
  {value:'web',label:'Web / WhatsApp'},{value:'ai',label:'AI / Chatbot'},{value:'data',label:'Analytics'},{value:'cloud',label:'Cloud'},{value:'mobile',label:'Mobile'},
]

export default function Projects() {
  const [projects,   setProjects]   = useState([])
  const [categories, setCategories] = useState([])
  const [selected,   setSelected]   = useState('all')
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const ref = useInView()

  useEffect(() => {
    Promise.all([getProjects(), getProjectCategories()])
      .then(([p,c]) => { setProjects(p.data); setCategories(c.data) })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const allProjects  = projects.length  ? projects  : FALLBACK_PROJECTS
  const allCats      = categories.length ? categories : FALLBACK_CATS
  const filtered     = selected === 'all' ? allProjects : allProjects.filter(p => p.category === selected)

  if (loading) return <Spinner />
  if (error)   return <ErrorState message={error} />

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden" style={{background:'linear-gradient(135deg,#0A0F1E,#0D1B4A)'}}>
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize:'50px 50px'}} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-10">
          <span className="section-label" style={{background:'rgba(255,255,255,0.07)', borderColor:'rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.6)'}}>Portfolio</span>
          <h1 className="heading font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mt-2 mb-5 fade-up">
            Real Results for<br /><span className="text-gradient">Real Businesses</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl fade-up">
            A showcase of automation and digital transformation projects we're proud of.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-16 z-30 bg-white border-b shadow-sm" style={{borderColor:'rgba(26,107,255,0.08)'}}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-3 flex flex-wrap gap-2">
          <button onClick={() => setSelected('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${selected==='all' ? 'text-white shadow-blue-sm' : 'text-slate hover:text-dark bg-light-2'}`}
            style={selected==='all' ? {background:'linear-gradient(135deg,#1A6BFF,#00C2FF)'} : {}}
          >All</button>
          {allCats.map(c => (
            <button key={c.value} onClick={() => setSelected(c.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${selected===c.value ? 'text-white shadow-blue-sm' : 'text-slate hover:text-dark bg-light-2'}`}
              style={selected===c.value ? {background:'linear-gradient(135deg,#1A6BFF,#00C2FF)'} : {}}
            >{c.label}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding" style={{background:'#F0F5FF'}}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {filtered.length === 0 ? (
            <p className="text-slate text-center py-20">No projects in this category yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p,i) => (
                <div key={p.id} className="fade-up card group overflow-hidden flex flex-col" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="aspect-video overflow-hidden relative">
                    {p.image
                      ? <MediaImage src={p.image} alt={p.title} className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
                      : <img src={IMGS[i%IMGS.length]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    }
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3" style={{background:'rgba(10,15,30,0.6)'}}>
                      {p.live_url   && <a href={p.live_url}   target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"><ExternalLink size={16} /></a>}
                      {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"><Github      size={16} /></a>}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <Badge>{p.category_display}</Badge>
                    <h3 className="heading font-bold text-dark text-lg mt-3 mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-slate text-sm leading-relaxed flex-1">{p.short_desc}</p>
                    {p.tech_list?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tech_list.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded font-medium" style={{background:'rgba(26,107,255,0.07)',color:'#1A6BFF'}}>{t}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
