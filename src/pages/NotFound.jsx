import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{background:'#F0F5FF'}}>
      <p className="heading font-black text-8xl font-display" style={{background:'linear-gradient(135deg,#1A6BFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>404</p>
      <h1 className="heading font-bold text-dark text-3xl mt-2 mb-3">Page Not Found</h1>
      <p className="text-slate mb-8 max-w-sm">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary"><ArrowLeft size={16} /> Back to Home</Link>
    </div>
  )
}
