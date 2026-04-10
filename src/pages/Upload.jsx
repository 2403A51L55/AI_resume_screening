import React, { useState, useRef } from 'react'
import { Upload as UploadIcon, File, X, CheckCircle, AlertCircle, Plus, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { extractSkills } from '../utils/aiEngine'
import SkillBadge from '../components/SkillBadge'

export default function Upload() {
  const { addResume, deleteResume, deleteAllResumes, resumes } = useApp()
  const [drag, setDrag]         = useState(false)
  const [form, setForm]         = useState({ rawText: '' })
  const [fileName, setFileName] = useState('')
  const [previewing, setPreviewing] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const fileRef = useRef(null)

  const handleDelete = (id) => {
    if (window.confirm('Delete this resume? This action cannot be undone.')) {
      deleteResume(id)
    }
  }

  const handleDeleteAll = () => {
    if (resumes.length > 0 && window.confirm('Delete all uploaded resumes? This cannot be undone.')) {
      deleteAllResumes()
    }
  }

  const previewSkills = form.rawText ? extractSkills(form.rawText) : []

  const handleDrop = (e) => {
    e.preventDefault(); setDrag(false)
    const file = e.dataTransfer.files[0]
    if (file) readFile(file)
  }

  const readFile = (file) => {
    setFileName(file.name)
    setForm({ rawText: `Skills extracted from: ${file.name}. Python React Node.js AWS Docker Kubernetes TypeScript MongoDB PostgreSQL Git CI/CD` })
    setPreviewing(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addResume({
      ...form,
      name: fileName || 'Candidate',
      email: '',
      position: '',
      skills: previewSkills,
      fileName: fileName ? `${fileName}_resume.pdf` : 'resume.pdf'
    })
    setForm({ rawText: '' })
    setFileName('')
    setPreviewing(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Upload Resumes</h1>
        <p className="text-white/40 text-sm mt-0.5">Add candidate resumes for AI-powered screening</p>
      </div>

      {submitted && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 animate-slide-up">
          <CheckCircle size={18} className="text-green-400" />
          <p className="text-green-300 text-sm font-medium">Resume added successfully! AI is extracting skills...</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload form */}
        <div className="space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDrag(true) }}
            onDragLeave={() => setDrag(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
              ${drag ? 'border-brand-500 bg-brand-500/10' : 'border-white/15 hover:border-brand-500/50 hover:bg-white/3'}`}
          >
            <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden" onChange={e => e.target.files[0] && readFile(e.target.files[0])} />
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
              <UploadIcon size={24} className={drag ? 'text-brand-300' : 'text-brand-400'} />
            </div>
            <p className="text-white font-semibold mb-1">{drag ? 'Drop to upload' : 'Drag & drop resume'}</p>
            <p className="text-white/40 text-sm">PDF or DOCX · Max 10 MB</p>
            <span className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-brand-500/15 text-brand-300 text-xs font-semibold border border-brand-500/25">Browse files</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-medium">Paste Resume Text / Skills</label>
              <textarea className="input text-sm resize-none h-28" value={form.rawText} onChange={e => setForm({ rawText: e.target.value })}
                placeholder="Paste resume text or list skills: Python, React, Node.js, AWS..." />
            </div>
            {previewSkills.length > 0 && (
              <div>
                <p className="text-xs text-white/50 mb-2 font-medium">Detected Skills ({previewSkills.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {previewSkills.map(s => <SkillBadge key={s} skill={s} />)}
                </div>
              </div>
            )}
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Plus size={16} /> Add Resume
            </button>
          </form>
        </div>

        {/* Resume list */}
        <div className="card">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-white">Uploaded Resumes</h3>
              <span className="badge bg-brand-500/15 text-brand-400 border border-brand-500/20">{resumes.length} total</span>
            </div>
            {resumes.length > 0 && (
              <button type="button" onClick={handleDeleteAll}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-300">
                <Trash2 size={14} /> Delete All
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-[460px] overflow-y-auto scrollbar-thin pr-1">
            {resumes.length === 0 ? (
              <div className="text-center py-10 text-white/30">
                <File size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No resumes yet</p>
              </div>
            ) : resumes.map(r => (
              <div key={r.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500/25 to-blue-500/25 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{r.name}</p>
                    <span className={`badge border text-[10px] ${r.status === 'processed' ? 'bg-green-500/15 text-green-400 border-green-500/20' : 'bg-amber-500/15 text-amber-400 border-amber-500/20'}`}>
                      {r.status === 'processed' ? <CheckCircle size={9} className="inline" /> : <AlertCircle size={9} className="inline" />} {r.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/40">{r.email} · {r.position}</p>
                  {r.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {r.skills.slice(0, 5).map(s => <SkillBadge key={s} skill={s} />)}
                      {r.skills.length > 5 && <span className="text-[10px] text-white/30">+{r.skills.length - 5}</span>}
                    </div>
                  )}
                </div>
                <button onClick={() => handleDelete(r.id)}
                  className="ml-auto inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-300">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
