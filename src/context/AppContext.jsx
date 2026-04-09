import React, { createContext, useContext, useState, useEffect } from 'react'
import { storage, seedDemoData } from '../utils/storage'
import { rankCandidates, extractSkills } from '../utils/aiEngine'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser]         = useState(null)
  const [resumes, setResumes]   = useState([])
  const [jobDesc, setJobDesc]   = useState(null)
  const [results, setResults]   = useState([])
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    seedDemoData()
    const u = storage.getUser()
    if (u) setUser(u)
    setResumes(storage.getResumes())
    setJobDesc(storage.getJobDesc())
    setResults(storage.getResults())
  }, [])

  const login = (email, password) => {
    if (!email || !password) return { ok: false, msg: 'All fields required' }
    const u = { id: 'u1', email, name: email.split('@')[0].replace(/\./g,' ').replace(/\b\w/g,l=>l.toUpperCase()), role: 'HR Admin', avatar: email[0].toUpperCase() }
    storage.setUser(u)
    setUser(u)
    return { ok: true }
  }

  const logout = () => {
    storage.clearUser()
    setUser(null)
  }

  const addResume = (data) => {
    const r = { ...data, id: `r${Date.now()}`, uploadedAt: new Date().toISOString(), status: 'processing' }
    storage.addResume(r)
    const updated = storage.getResumes()
    setResumes(updated)

    // Simulate AI processing
    setTimeout(() => {
      const processed = updated.map(x =>
        x.id === r.id ? { ...x, status: 'processed', skills: extractSkills(x.rawText || x.name + ' ' + (x.rawText || '')) } : x
      )
      storage.setResumes(processed)
      setResumes(processed)
    }, 1200)
  }

  const deleteResume = (id) => {
    storage.removeResume(id)
    setResumes(storage.getResumes())
  }

  const saveJobDesc = (data) => {
    const j = { ...data, id: `jd${Date.now()}`, createdAt: new Date().toISOString(), skills: extractSkills(data.description) }
    storage.setJobDesc(j)
    setJobDesc(j)
    return j
  }

  const runScreening = () => {
    setLoading(true)
    const jd = storage.getJobDesc()
    const rs = storage.getResumes().filter(r => r.status === 'processed')
    setTimeout(() => {
      const ranked = rankCandidates(rs, jd?.skills || [])
      storage.setResults(ranked)
      setResults(ranked)
      setLoading(false)
    }, 1800)
  }

  const stats = {
    total:    resumes.length,
    screened: results.length,
    pending:  resumes.filter(r => r.status === 'processing').length,
    avgScore: results.length ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length) : 0,
  }

  return (
    <AppContext.Provider value={{ user, login, logout, resumes, addResume, deleteResume, jobDesc, saveJobDesc, results, runScreening, loading, stats }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
