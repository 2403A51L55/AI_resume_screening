import React, { useState } from 'react'
import { Zap, Trophy, Download, Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getScoreBadge, getScoreColor } from '../utils/aiEngine'
import ScoreRing from '../components/ScoreRing'
import SkillBadge from '../components/SkillBadge'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function Results() {
  const { results, runScreening, loading, jobDesc, resumes } = useApp()
  const [expanded, setExpanded] = useState(null)
  const [search, setSearch] = useState('')
  const [minScore, setMinScore] = useState(0)

  const filtered = results
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
    .filter(r => r.score >= minScore)

  const chartData = results.slice(0, 8).map(r => ({ name: r.name.split(' ')[0], score: r.score }))

  const exportCSV = () => {
    const rows = [['Rank','Name','Email','Position','Score','Matched Skills','Missing Skills']]
    results.forEach(r => rows.push([r.rank, r.name, r.email, r.position, r.score, r.matchedSkills.join(';'), r.missingSkills.join(';')]))
    const csv = rows.map(r => r.join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = 'screening_results.csv'
    a.click()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Screening Results</h1>
          <p className="text-white/40 text-sm mt-0.5">
            {results.length > 0 ? `${results.length} candidates ranked for "${jobDesc?.title}"` : 'Run screening to rank candidates'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {results.length > 0 && (
            <button onClick={exportCSV} className="btn-ghost flex items-center gap-2 text-sm">
              <Download size={15} /> Export CSV
            </button>
          )}
          <button onClick={runScreening} disabled={loading || !jobDesc || !resumes.length}
            className="btn-primary flex items-center gap-2">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap size={16} />}
            {loading ? 'Screening...' : 'Run Screening'}
          </button>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center">
            <Zap size={28} className="text-brand-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-lg">No Results Yet</p>
            <p className="text-white/40 text-sm mt-1 max-w-sm">
              {!jobDesc ? 'First set a job description, then click "Run Screening".' : 'Click "Run Screening" to start AI evaluation.'}
            </p>
          </div>
          {jobDesc && resumes.length > 0 && (
            <button onClick={runScreening} disabled={loading} className="btn-primary flex items-center gap-2">
              <Zap size={16} /> Run AI Screening Now
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Score chart */}
          <div className="card animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-white">Score Distribution</h3>
                <p className="text-xs text-white/40">AI match scores per candidate</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block" /> 80%+</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" /> 60-79%</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> &lt;60%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={chartData} barSize={28}>
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ background: '#1e2d40', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 12 }}
                  formatter={v => [`${v}%`, 'Match Score']}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={getScoreColor(entry.score)} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input className="input pl-9 text-sm h-10" placeholder="Search candidates..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-white/40" />
              <span className="text-xs text-white/40">Min score:</span>
              {[0, 40, 60, 80].map(s => (
                <button key={s} onClick={() => setMinScore(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                    ${minScore === s ? 'bg-brand-500 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                  {s > 0 ? `${s}%+` : 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* Results list */}
          <div className="space-y-3">
            {filtered.map((c, i) => {
              const badge = getScoreBadge(c.score)
              const isExpanded = expanded === c.id
              return (
                <div key={c.id} className={`card transition-all duration-300 animate-slide-up stagger-${Math.min(i+1,5)}`}>
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => setExpanded(isExpanded ? null : c.id)}>
                    {/* Rank */}
                    <div className="w-10 flex-shrink-0 text-center">
                      {c.rank <= 3 ? (
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center mx-auto font-bold text-sm
                          ${c.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' : c.rank === 2 ? 'bg-slate-400/20 text-slate-300' : 'bg-amber-700/20 text-amber-600'}`}>
                          {c.rank === 1 ? '🥇' : c.rank === 2 ? '🥈' : '🥉'}
                        </div>
                      ) : (
                        <span className="text-white/30 font-bold text-lg">#{c.rank}</span>
                      )}
                    </div>

                    {/* Score ring */}
                    <ScoreRing score={c.score} size={60} strokeWidth={6} />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-white">{c.name}</p>
                        <span className={`badge border text-[10px] ${badge.color}`}>{badge.label}</span>
                      </div>
                      <p className="text-sm text-white/50">{c.position} · {c.email}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-green-400 font-medium">✓ {c.matchedSkills.length} matched</span>
                        <span className="text-xs text-red-400 font-medium">✗ {c.missingSkills.length} missing</span>
                        <div className="flex-1 max-w-[140px] progress-bar">
                          <div className="progress-fill" style={{ width: `${c.score}%`, background: getScoreColor(c.score) }} />
                        </div>
                      </div>
                    </div>

                    {/* Expand */}
                    <button className="text-white/30 hover:text-white/70 transition-colors p-1 flex-shrink-0">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-white/8 grid grid-cols-2 gap-4 animate-fade-in">
                      <div>
                        <p className="text-xs text-green-400 font-semibold uppercase tracking-wide mb-2">Matched Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {c.matchedSkills.length ? c.matchedSkills.map(s => <SkillBadge key={s} skill={s} matched size="md" />) : <span className="text-xs text-white/30">None</span>}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-red-400 font-semibold uppercase tracking-wide mb-2">Missing Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {c.missingSkills.length ? c.missingSkills.map(s => (
                            <span key={s} className="inline-flex items-center border rounded-md font-mono font-medium capitalize text-xs px-2.5 py-1 bg-red-500/10 text-red-300 border-red-500/20">{s}</span>
                          )) : <span className="text-xs text-white/30">None missing 🎉</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
