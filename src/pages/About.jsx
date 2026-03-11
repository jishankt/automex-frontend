import { useEffect, useState } from 'react'
import { Github, Linkedin, Twitter, Zap, Target, Users, Award } from 'lucide-react'
import { getAbout } from '../lib/api'
import { Spinner, SectionHeading, StatCard, MediaImage, ErrorState } from '../components/ui'
import { useInView } from '../lib/useInView'

export default function About() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const ref = useInView()

  useEffect(() => {
    getAbout().then(r => setData(r.data)).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />
  if (error)   return <ErrorState message={error} />
  const { company, team = [] } = data || {}

  const values = [
    { icon: <Zap size={20} />,    title:'Speed',      desc:'We move fast so your business grows faster. Automation delivered in days, not months.' },
    { icon: <Target size={20} />, title:'Precision',   desc:'Every automation is built with clear goals, measurable outcomes, and business impact in mind.' },
    { icon: <Users size={20} />,  title:'Partnership', desc:'We treat every client as a long-term partner — your success is literally our success.' },
    { icon: <Award size={20} />,  title:'Excellence',  desc:'From code quality to customer support, we never compromise on quality.' },
  ]

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden" style={{background:'linear-gradient(135deg,#0A0F1E,#0D1B4A)'}}>
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize:'50px 50px'}} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-10">
          <span className="section-label" style={{background:'rgba(255,255,255,0.07)', borderColor:'rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.6)'}}>About Us</span>
          <h1 className="heading font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mt-2 mb-5 fade-up">
            We Automate Businesses<br /><span className="text-gradient">So They Can Scale</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl fade-up">
            {company?.description || 'AutoMex is a business automation company based in Calicut, Kerala. We help businesses across India automate their workflows, communication, and growth using cutting-edge technology.'}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-b" style={{borderColor:'rgba(26,107,255,0.08)'}}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value:`${company?.projects_count||15}+`,   label:'Projects Delivered'    },
            { value:`${company?.clients_count||12}+`,    label:'Businesses Automated'  },
            { value:`${company?.years_experience||2}+`,  label:'Years of Experience'   },
            { value:'24/7',                               label:'Support Available'     },
          ].map((s,i) => (
            <div key={i} className="fade-up text-center" style={{transitionDelay:`${i*80}ms`}}>
              <StatCard value={s.value} label={s.label} />
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-padding" style={{background:'#F0F5FF'}}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-6">
          {[
            { title:'Our Mission', icon:'🚀', text: company?.tagline || 'To empower every business — regardless of size — with automation tools that were once only available to enterprises.' },
            { title:'Our Vision',  icon:'🌍', text:'A future where every Indian business runs on smart automation, freeing entrepreneurs to focus on strategy, creativity, and growth.' },
          ].map((item,i) => (
            <div key={i} className="fade-up card p-10" style={{transitionDelay:`${i*150}ms`}}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="heading font-bold text-dark text-2xl mb-3">{item.title}</h3>
              <p className="text-slate leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="fade-up text-center mb-12">
            <SectionHeading label="Our Values" title={<>What Drives <span className="text-gradient">Everything We Do</span></>} center />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v,i) => (
              <div key={i} className="fade-up card p-7 text-center" style={{transitionDelay:`${i*80}ms`}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary" style={{background:'linear-gradient(135deg,rgba(26,107,255,0.1),rgba(0,194,255,0.06))'}}>
                  {v.icon}
                </div>
                <h4 className="heading font-bold text-dark text-lg mb-2">{v.title}</h4>
                <p className="text-slate text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="section-padding" style={{background:'#F0F5FF'}}>
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <div className="fade-up text-center mb-12">
              <SectionHeading label="Our Team" title={<>Meet the People <span className="text-gradient">Behind AutoMex</span></>} center />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {team.map((m,i) => (
                <div key={m.id} className="fade-up card overflow-hidden group" style={{transitionDelay:`${i*70}ms`}}>
                  <div className="aspect-square overflow-hidden">
                    {m.photo
                      ? <MediaImage src={m.photo} alt={m.name} className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
                      : <div className="w-full h-full flex items-center justify-center" style={{background:'linear-gradient(135deg,#EEF3FF,#DBEAFE)'}}>
                          <span className="heading text-5xl font-black text-gradient">{m.name[0]}</span>
                        </div>
                    }
                  </div>
                  <div className="p-5">
                    <h4 className="heading font-bold text-dark group-hover:text-primary transition-colors">{m.name}</h4>
                    <p className="text-mist text-sm mb-3">{m.role}</p>
                    <div className="flex gap-3">
                      {m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer" className="text-mist hover:text-primary transition-colors"><Linkedin size={15} /></a>}
                      {m.twitter  && <a href={m.twitter}  target="_blank" rel="noreferrer" className="text-mist hover:text-primary transition-colors"><Twitter  size={15} /></a>}
                      {m.github   && <a href={m.github}   target="_blank" rel="noreferrer" className="text-mist hover:text-primary transition-colors"><Github   size={15} /></a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
