import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, BarChart3, Users, TrendingUp, Clock, CheckCircle, AlertCircle, ArrowRight, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getScoreBadge } from '../utils/aiEngine'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import ScoreRing from '../components/ScoreRing'

const chartData = [
  { day: 'Mon', resumes: 3 }, { day: 'Tue', resumes: 7 },
  { day: 'Wed', resumes: 5 }, { day: 'Thu', resumes: 12 },
  { day: 'Fri', resumes: 9 }, { day: 'Sat', resumes: 4 },
  { day: 'Sun', resumes: 8 },
]

export default function Dashboard() {
  const { stats, resumes, results, runScreening, loading, jobDesc } = useApp()
  const navigate = useNavigate()

  const topCandidates = results.slice(0, 3)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-0.5">AI-powered resume screening overview</p>
        </div>
        <button onClick={runScreening} disabled={loading || !jobDesc || !resumes.length}
          className="btn-primary flex items-center gap-2">
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : <Zap size={16} />}
          {loading ? 'Screening...' : 'Run AI Screening'}
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users,        label: 'Total Resumes',    value: stats.total,    sub: '+2 this week',  color: 'text-brand-400', bg: 'bg-brand-500/10' },
          { icon: CheckCircle,  label: 'Screened',         value: stats.screened, sub: 'AI processed',  color: 'text-green-400', bg: 'bg-green-500/10' },
          { icon: Clock,        label: 'Pending',          value: stats.pending,  sub: 'Awaiting process', color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: TrendingUp,   label: 'Avg Match Score',  value: `${stats.avgScore}%`, sub: 'Across candidates', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        ].map((s, i) => (
          <div key={s.label} className={`stat-card animate-slide-up stagger-${i+1}`}>
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
              <s.icon size={18} className={s.color} />
            </div>
            <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
            <p className="text-white/60 text-sm font-medium">{s.label}</p>
            <p className="text-white/30 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity chart */}
        <div className="card lg:col-span-2 animate-slide-up stagger-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white">Resume Activity</h3>
              <p className="text-xs text-white/40">Uploads over the past week</p>
            </div>
            <span className="badge bg-green-500/15 text-green-400 border border-green-500/20">↑ 28% vs last week</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4455f5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4455f5" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1e2d40', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 12 }} cursor={{ stroke: 'rgba(68,85,245,0.3)' }} />
              <Area type="monotone" dataKey="resumes" stroke="#4455f5" strokeWidth={2.5} fill="url(#grad)" dot={{ fill: '#4455f5', r: 4, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick actions */}
        <div className="card animate-slide-up stagger-3">
          <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { icon: Upload,    label: 'Upload Resumes',      sub: 'Add new candidates',  to: '/upload',   color: 'bg-brand-500/15 text-brand-400' },
              { icon: FileText,  label: 'Set Job Description', sub: 'Define requirements',  to: '/job',      color: 'bg-blue-500/15 text-blue-400' },
              { icon: BarChart3, label: 'View AI Results',     sub: 'See ranked candidates', to: '/results',  color: 'bg-green-500/15 text-green-400' },
              { icon: Users,     label: 'Browse Candidates',   sub: 'Filter & compare',      to: '/candidates', color: 'bg-purple-500/15 text-purple-400' },
            ].map(a => (
              <button key={a.label} onClick={() => navigate(a.to)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group text-left">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${a.color} flex-shrink-0`}>
                  <a.icon size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{a.label}</p>
                  <p className="text-xs text-white/40">{a.sub}</p>
                </div>
                <ArrowRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent resumes + top candidates */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card animate-slide-up stagger-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Uploads</h3>
            <button onClick={() => navigate('/candidates')} className="text-xs text-brand-400 hover:text-brand-300 transition-colors">View all →</button>
          </div>
          <div className="space-y-2">
            {resumes.slice(-4).reverse().map(r => (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/30 to-blue-500/30 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{r.name}</p>
                  <p className="text-xs text-white/40">{r.position}</p>
                </div>
                <span className={`badge border text-[10px] ${r.status === 'processed' ? 'bg-green-500/15 text-green-400 border-green-500/20' : 'bg-amber-500/15 text-amber-400 border-amber-500/20'}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {topCandidates.length > 0 ? (
          <div className="card animate-slide-up stagger-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Top Candidates</h3>
              <button onClick={() => navigate('/results')} className="text-xs text-brand-400 hover:text-brand-300 transition-colors">See results →</button>
            </div>
            <div className="space-y-3">
              {topCandidates.map(c => {
                const badge = getScoreBadge(c.score)
                return (
                  <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                    <span className="text-white/30 text-sm font-bold w-5">#{c.rank}</span>
                    <ScoreRing score={c.score} size={44} strokeWidth={5} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                      <p className="text-xs text-white/40">{c.position}</p>
                    </div>
                    <span className={`badge border text-[10px] ${badge.color}`}>{badge.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="card animate-slide-up stagger-5 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center">
              <Zap size={22} className="text-brand-400" />
            </div>
            <div>
              <p className="font-semibold text-white">No Results Yet</p>
              <p className="text-xs text-white/40 mt-1">Set a job description and run AI screening to rank candidates</p>
            </div>
            <button onClick={() => navigate('/job')} className="btn-primary text-sm">Set Job Description</button>
          </div>
        )}
      </div>
    </div>
  )
}
