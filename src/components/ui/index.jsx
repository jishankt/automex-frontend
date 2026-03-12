export function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  )
}

export function SectionHeading({ label, title, subtitle, center = false, dark = false }) {
  return (
    <div className={`mb-10 sm:mb-12 ${center ? 'text-center items-center flex flex-col' : ''}`}>
      {label && <span className="section-label">{label}</span>}
      <h2 className={`heading font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${dark ? 'text-white' : 'text-dark'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl ${dark ? 'text-white/60' : 'text-slate'}`}>{subtitle}</p>
      )}
    </div>
  )
}

export function Badge({ children }) {
  return (
    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full" style={{
      color:'#1A6BFF', background:'rgba(26,107,255,0.08)', border:'1px solid rgba(26,107,255,0.2)'
    }}>
      {children}
    </span>
  )
}

export function MediaImage({ src, alt, className = '', fallbackText = '' }) {
  const API = import.meta.env.VITE_API_URL?.replace('/api','') || 'http://127.0.0.1:8000'
  const handleError = (e) => {
    e.target.style.display = 'none'
    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <>
          <img
            src={src.startsWith('http') ? src : `${API}${src}`}
            alt={alt}
            className="w-full h-full object-cover"
            onError={handleError}
            loading="lazy"
          />
          <div className="hidden w-full h-full items-center justify-center bg-light-2 text-slate text-sm" aria-hidden="true">
            {fallbackText || alt}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-light-2 text-slate text-sm">
          {fallbackText || alt}
        </div>
      )}
    </div>
  )
}

export function ErrorState({ message = 'Something went wrong.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <p className="text-5xl mb-4">⚠️</p>
      <p className="text-slate text-base sm:text-lg">{message}</p>
      <p className="text-mist text-sm mt-2">Make sure your Django server is running</p>
    </div>
  )
}

export function StatCard({ value, label, dark = false }) {
  return (
    <div className="text-center">
      <p className="heading font-display text-3xl sm:text-4xl md:text-5xl font-black text-gradient">{value}</p>
      <p className={`text-xs sm:text-sm mt-1 font-medium ${dark ? 'text-white/60' : 'text-slate'}`}>{label}</p>
    </div>
  )
}

export function CheckItem({ text, dark = false }) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
        style={{background:'rgba(34,197,94,0.15)', color:'#22C55E', minWidth:'20px'}}>✓</span>
      <span className={dark ? 'text-white/70' : 'text-slate'}>{text}</span>
    </li>
  )
}
