// ── AI Engine: Skill extraction + scoring + ranking ────────────────────────

const SKILL_DICT = {
  languages:   ['javascript','typescript','python','java','c++','c#','ruby','go','rust','php','swift','kotlin','r','scala','dart'],
  frontend:    ['react','vue','angular','svelte','nextjs','html','css','tailwind','bootstrap','sass','redux','webpack','vite','jquery'],
  backend:     ['node','express','django','flask','fastapi','spring','laravel','rails','graphql','rest','grpc','microservices'],
  cloud:       ['aws','azure','gcp','docker','kubernetes','terraform','jenkins','circleci','github actions','ansible','helm'],
  data:        ['sql','mysql','postgresql','mongodb','redis','elasticsearch','kafka','spark','pandas','numpy','tensorflow','pytorch','scikit-learn','nlp','machine learning','deep learning','llm'],
  tools:       ['git','linux','bash','jira','confluence','figma','postman','swagger','ci/cd','agile','scrum'],
  soft:        ['leadership','communication','teamwork','problem solving','analytical','critical thinking','project management'],
}

const ALL_SKILLS = Object.values(SKILL_DICT).flat()

export function extractSkills(text) {
  const lower = text.toLowerCase()
  const found = new Set()
  for (const skill of ALL_SKILLS) {
    const regex = new RegExp(`\\b${skill.replace('+', '\\+')}\\b`, 'i')
    if (regex.test(lower)) found.add(skill)
  }
  return [...found]
}

export function categoriseSkills(skills) {
  const cats = {}
  for (const [cat, list] of Object.entries(SKILL_DICT)) {
    const matched = skills.filter(s => list.includes(s.toLowerCase()))
    if (matched.length) cats[cat] = matched
  }
  return cats
}

export function scoreResume(resumeSkills, jdSkills) {
  if (!jdSkills.length) return 0
  const rs = new Set(resumeSkills.map(s => s.toLowerCase()))
  const matched = jdSkills.filter(s => rs.has(s.toLowerCase()))
  const base = (matched.length / jdSkills.length) * 100

  // Bonus for extra relevant skills
  const bonus = Math.min(10, (resumeSkills.length - matched.length) * 0.5)
  return Math.min(100, Math.round(base + bonus))
}

export function rankCandidates(candidates, jdSkills) {
  return candidates
    .map(c => ({
      ...c,
      score: scoreResume(c.skills, jdSkills),
      matchedSkills: c.skills.filter(s => jdSkills.map(j => j.toLowerCase()).includes(s.toLowerCase())),
      missingSkills: jdSkills.filter(j => !c.skills.map(s => s.toLowerCase()).includes(j.toLowerCase())),
    }))
    .sort((a, b) => b.score - a.score)
    .map((c, i) => ({ ...c, rank: i + 1 }))
}

export function getScoreColor(score) {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#f59e0b'
  if (score >= 40) return '#f97316'
  return '#ef4444'
}

export function getScoreBadge(score) {
  if (score >= 80) return { label: 'Excellent', color: 'bg-green-500/20 text-green-400 border-green-500/30' }
  if (score >= 60) return { label: 'Good',      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' }
  if (score >= 40) return { label: 'Fair',      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' }
  return                   { label: 'Weak',     color: 'bg-red-500/20 text-red-400 border-red-500/30' }
}
