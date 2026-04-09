import React, { useState } from 'react'
import { FileText, Save, Zap, MapPin, Clock, Building2, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { extractSkills } from '../utils/aiEngine'
import SkillBadge from '../components/SkillBadge'
import { useNavigate } from 'react-router-dom'

const TEMPLATES = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Pvt. Ltd.',
    experience: '3-5 years', location: 'Hyderabad, India',
    description: 'We are looking for a Senior Full Stack Developer with strong experience in React, Node.js, TypeScript, MongoDB, Docker, AWS, and CI/CD pipelines. Must have solid understanding of REST APIs, microservices, and agile development practices.',
  },
  {
    title: 'Machine Learning Engineer',
    company: 'DataSoft Analytics',
    experience: '2-4 years', location: 'Bangalore, India',
    description: 'Seeking an ML Engineer experienced in Python, TensorFlow, PyTorch, Scikit-learn, NLP, deep learning, Pandas, SQL, and cloud deployment on AWS or GCP. Experience with MLOps and Docker is a plus.',
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudFirst Solutions',
    experience: '3-6 years', location: 'Pune, India',
    description: 'Looking for a DevOps Engineer skilled in Docker, Kubernetes, Terraform, AWS, Jenkins, GitHub Actions, Linux, Ansible, and CI/CD automation. Strong scripting in Bash and Python required.',
  },
]

export default function JobDescription() {
  const { jobDesc, saveJobDesc } = useApp()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    title: jobDesc?.title || '',
    company: jobDesc?.company || '',
    experience: jobDesc?.experience || '',
    location: jobDesc?.location || '',
    description: jobDesc?.description || '',
  })

  const preview = form.description ? extractSkills(form.description) : []

  const applyTemplate = (t) => setForm(t)

  const handleSave = (e) => {
    e.preventDefault()
    saveJobDesc(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Job Description</h1>
          <p className="text-white/40 text-sm mt-0.5">Define requirements for AI skill matching</p>
        </div>
        {jobDesc && (
          <button onClick={() => navigate('/results')} className="btn-ghost flex items-center gap-2">
            <Zap size={15} /> Run Screening →
          </button>
        )}
      </div>

      {saved && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 animate-slide-up">
          <CheckCircle size={18} className="text-green-400" />
          <p className="text-green-300 text-sm font-medium">Job description saved! AI extracted {preview.length} required skills.</p>
        </div>
      )}

      {/* Templates */}
      <div>
        <p className="text-xs text-white/50 font-semibold uppercase tracking-widest mb-3">Quick Templates</p>
        <div className="grid grid-cols-3 gap-3">
          {TEMPLATES.map(t => (
            <button key={t.title} onClick={() => applyTemplate(t)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5
                ${form.title === t.title ? 'border-brand-500/50 bg-brand-500/10' : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'}`}>
              <p className="text-sm font-semibold text-white mb-1">{t.title}</p>
              <p className="text-xs text-white/40">{t.company}</p>
              <p className="text-xs text-white/30 mt-1">{t.experience}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <form onSubmit={handleSave} className="card lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs text-white/50 mb-1.5 font-medium">
                <FileText size={12} /> Job Title *
              </label>
              <input className="input text-sm" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Senior Developer" required />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs text-white/50 mb-1.5 font-medium">
                <Building2 size={12} /> Company
              </label>
              <input className="input text-sm" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs text-white/50 mb-1.5 font-medium">
                <Clock size={12} /> Experience Required
              </label>
              <input className="input text-sm" value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} placeholder="e.g. 3-5 years" />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs text-white/50 mb-1.5 font-medium">
                <MapPin size={12} /> Location
              </label>
              <input className="input text-sm" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Hyderabad" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5 font-medium">Job Description & Requirements *</label>
            <textarea className="input text-sm resize-none h-40" value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe the role, required skills, responsibilities, and qualifications..." required />
            <p className="text-xs text-white/30 mt-1">Mention technologies and skills for accurate AI matching.</p>
          </div>
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Save size={15} /> Save Job Description
          </button>
        </form>

        {/* Preview */}
        <div className="space-y-4">
          {/* Current JD card */}
          {jobDesc && (
            <div className="card border border-brand-500/20 bg-brand-500/5 animate-slide-up">
              <p className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-3">Active JD</p>
              <p className="font-bold text-white">{jobDesc.title}</p>
              <p className="text-sm text-white/50 mt-1">{jobDesc.company}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {jobDesc.experience && <span className="badge bg-dark-800 text-white/50 text-[10px]"><Clock size={9} /> {jobDesc.experience}</span>}
                {jobDesc.location && <span className="badge bg-dark-800 text-white/50 text-[10px]"><MapPin size={9} /> {jobDesc.location}</span>}
              </div>
              <div className="mt-3 pt-3 border-t border-white/8">
                <p className="text-xs text-white/40 mb-2">{jobDesc.skills?.length} required skills</p>
                <div className="flex flex-wrap gap-1">
                  {jobDesc.skills?.map(s => <SkillBadge key={s} skill={s} />)}
                </div>
              </div>
            </div>
          )}

          {/* Live preview */}
          {preview.length > 0 && (
            <div className="card animate-slide-up">
              <p className="text-xs text-white/50 font-semibold uppercase tracking-widest mb-3">
                Live Preview · {preview.length} skills detected
              </p>
              <div className="flex flex-wrap gap-1.5">
                {preview.map(s => <SkillBadge key={s} skill={s} size="md" />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
