import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [tab, setTab]           = useState('login')
  const [email, setEmail]       = useState('hr@company.com')
  const [password, setPassword] = useState('password123')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    const result = login(email, password)
    setLoading(false)
    if (result.ok) navigate('/')
    else setError(result.msg)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f1d2e 0%, #1e2d40 50%, #0f1d2e 100%)' }}>
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'linear-gradient(rgba(68,85,245,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(68,85,245,0.15) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center shadow-glow">
              <Bot size={22} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white">AI Resume Screener</p>
              <p className="text-[10px] text-brand-400 font-semibold tracking-widest uppercase">Powered by AI</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Smart Hiring,<br />
            <span className="text-gradient">Powered by AI</span>
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-sm">
            Automatically screen resumes, extract skills, and rank candidates with intelligent NLP — saving hours of manual review.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          {[
            { icon: '⚡', title: 'Instant AI Screening', desc: 'Process 100s of resumes in seconds' },
            { icon: '🎯', title: 'Smart Skill Matching', desc: 'NLP-powered skill extraction & ranking' },
            { icon: '📊', title: 'Data-Driven Insights', desc: 'Visual dashboards & score analytics' },
          ].map(f => (
            <div key={f.title} className="flex items-center gap-4 glass rounded-xl px-4 py-3">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{f.title}</p>
                <p className="text-white/40 text-xs">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-dark-950">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-4">
              <Sparkles size={12} /> HR Intelligence Platform
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
            <p className="text-white/40 text-sm">Sign in to your HR dashboard</p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-dark-800/60 rounded-xl mb-6 border border-white/8">
            {['login','signup'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize
                  ${tab === t ? 'bg-brand-500 text-white shadow-glow-sm' : 'text-white/40 hover:text-white/70'}`}>
                {t === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div className="animate-slide-up">
                <label className="block text-sm text-white/60 mb-1.5 font-medium">Full Name</label>
                <input className="input" placeholder="e.g. Priya Sharma" />
              </div>
            )}
            <div>
              <label className="block text-sm text-white/60 mb-1.5 font-medium">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input className="input pl-10" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hr@company.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5 font-medium">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input className="input pl-10 pr-10" type={showPw ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2 h-11">
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>{tab === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-white/30 text-xs mt-6">
            Demo credentials are pre-filled. Just click Sign In.
          </p>
        </div>
      </div>
    </div>
  )
}
