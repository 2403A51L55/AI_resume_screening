import React, { useState } from 'react'
import { Search, Filter, Users, Mail, Briefcase, Calendar, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getScoreBadge } from '../utils/aiEngine'
import ScoreRing from '../components/ScoreRing'
import SkillBadge from '../components/SkillBadge'

export default function Candidates() {
  const { resumes, results, deleteResume } = useApp()
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [selected, setSelected] = useState(null)

  const resultMap = Object.fromEntries(results.map(r => [r.id, r]))

  const filtered = resumes
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase()))
    .filter(r => filter === 'all' || r.status === filter)

  const selectedFull = selected ? (resultMap[selected.id] || selected) : null

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Candidates</h1>
          <p className="text-white/40 text-sm mt-0.5">{resumes.length} total · {resumes.filter(r => r.status === 'processed').length} screened</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* List */}
        <div className="lg:col-span-1 card flex flex-col gap-4 overflow-hidden">
          {/* Search & filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input className="input pl-9 text-sm h-10" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              {['all','processed','processing'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all
                    ${filter === f ? 'bg-brand-500 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 pr-1">
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-white/30">
                <Users size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No candidates found</p>
              </div>
            ) : filtered.map(r => {
              const result = resultMap[r.id]
              const isActive = selected?.id === r.id
              return (
                <button key={r.id} onClick={() => setSelected(r)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all
                    ${isActive ? 'bg-brand-500/15 border border-brand-500/30' : 'hover:bg-white/5 border border-transparent'}`}>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500/30 to-blue-500/30 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {r.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{r.name}</p>
                    <p className="text-xs text-white/40 truncate">{r.position || 'No position'}</p>
                  </div>
                  {result ? (
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: result.score >= 60 ? '#22c55e' : result.score >= 40 ? '#f59e0b' : '#ef4444' }}>
                      {result.score}%
                    </span>
                  ) : (
                    <span className={`badge text-[10px] border ${r.status === 'processed' ? 'bg-green-500/15 text-green-400 border-green-500/20' : 'bg-amber-500/15 text-amber-400 border-amber-500/20'}`}>
                      {r.status}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2 card overflow-y-auto scrollbar-thin">
          {!selectedFull ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                <Users size={24} className="text-white/20" />
              </div>
              <p className="text-white/40 text-sm">Select a candidate to view details</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                    {selectedFull.name[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedFull.name}</h2>
                    <div className="flex items-center gap-3 mt-1 text-sm text-white/50">
                      <span className="flex items-center gap-1"><Mail size={12} />{selectedFull.email}</span>
                      <span className="flex items-center gap-1"><Briefcase size={12} />{selectedFull.position || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-white/30">
                      <Calendar size={11} />
                      Uploaded {new Date(selectedFull.uploadedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <button onClick={() => { deleteResume(selectedFull.id); setSelected(null) }}
                  className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* AI Score */}
              {resultMap[selectedFull.id] && (() => {
                const r = resultMap[selectedFull.id]
                const badge = getScoreBadge(r.score)
                return (
                  <div className="flex items-center gap-6 p-5 rounded-2xl bg-dark-800/60 border border-white/8">
                    <ScoreRing score={r.score} size={80} strokeWidth={8} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white font-bold">AI Match Score</span>
                        <span className={`badge border ${badge.color}`}>{badge.label}</span>
                        <span className="text-white/40 text-sm">Rank #{r.rank}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {[['Total Skills', selectedFull.skills?.length || 0, 'text-white'], ['Matched', r.matchedSkills.length, 'text-green-400'], ['Missing', r.missingSkills.length, 'text-red-400']].map(([l, v, c]) => (
                          <div key={l} className="p-3 rounded-xl bg-dark-900/60">
                            <p className={`text-lg font-bold ${c}`}>{v}</p>
                            <p className="text-xs text-white/40">{l}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Skills */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-white/50 font-semibold uppercase tracking-widest mb-3">All Skills ({selectedFull.skills?.length || 0})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFull.skills?.length ? selectedFull.skills.map(s => <SkillBadge key={s} skill={s} size="md" />) : <span className="text-xs text-white/30">Not yet processed</span>}
                  </div>
                </div>
                {resultMap[selectedFull.id] && (
                  <div>
                    <p className="text-xs text-green-400 font-semibold uppercase tracking-widest mb-3">Matched with JD</p>
                    <div className="flex flex-wrap gap-1.5">
                      {resultMap[selectedFull.id].matchedSkills.length ? resultMap[selectedFull.id].matchedSkills.map(s => <SkillBadge key={s} skill={s} matched size="md" />) : <span className="text-xs text-white/30">None matched</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
