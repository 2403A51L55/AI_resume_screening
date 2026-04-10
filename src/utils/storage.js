// Simple localStorage-based persistence layer

const KEYS = {
  USER:        'ars_user',
  RESUMES:     'ars_resumes',
  JOB_DESC:    'ars_job_desc',
  RESULTS:     'ars_results',
}

export const storage = {
  // Auth
  getUser:    ()      => JSON.parse(localStorage.getItem(KEYS.USER) || 'null'),
  setUser:    (u)     => localStorage.setItem(KEYS.USER, JSON.stringify(u)),
  clearUser:  ()      => localStorage.removeItem(KEYS.USER),

  // Resumes
  getResumes: ()      => JSON.parse(localStorage.getItem(KEYS.RESUMES) || '[]'),
  setResumes: (rs)    => localStorage.setItem(KEYS.RESUMES, JSON.stringify(rs)),
  addResume:  (r)     => {
    const list = storage.getResumes()
    list.push(r)
    storage.setResumes(list)
  },
  removeResume: (id) => {
    const list = storage.getResumes().filter(r => r.id !== id)
    storage.setResumes(list)
  },
  clearResumes: () => {
    storage.setResumes([])
  },

  // Job Description
  getJobDesc: ()      => JSON.parse(localStorage.getItem(KEYS.JOB_DESC) || 'null'),
  setJobDesc: (j)     => localStorage.setItem(KEYS.JOB_DESC, JSON.stringify(j)),

  // Results
  getResults: ()      => JSON.parse(localStorage.getItem(KEYS.RESULTS) || '[]'),
  setResults: (rs)    => localStorage.setItem(KEYS.RESULTS, JSON.stringify(rs)),

  clearAll:   ()      => Object.values(KEYS).forEach(k => localStorage.removeItem(k)),
}

// ── Demo data seeder ──────────────────────────────────────────────────────────
export function seedDemoData() {
  if (storage.getResumes().length) return

  const resumes = [
    {
      id: 'r1', name: 'Arjun Sharma', email: 'arjun@example.com',
      position: 'Full Stack Developer', uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      rawText: 'Experienced developer with React, Node.js, TypeScript, MongoDB, Docker, AWS, Python, PostgreSQL, Redis, Git.',
      skills: ['react','node','typescript','mongodb','docker','aws','python','postgresql','redis','git'],
      fileName: 'arjun_sharma_resume.pdf', status: 'processed',
    },
    {
      id: 'r2', name: 'Priya Nair', email: 'priya@example.com',
      position: 'Backend Engineer', uploadedAt: new Date(Date.now() - 86400000).toISOString(),
      rawText: 'Backend engineer skilled in Python, Django, FastAPI, PostgreSQL, Redis, Kubernetes, Jenkins, Linux, Bash.',
      skills: ['python','django','fastapi','postgresql','redis','kubernetes','jenkins','linux','bash'],
      fileName: 'priya_nair_resume.pdf', status: 'processed',
    },
    {
      id: 'r3', name: 'Rahul Verma', email: 'rahul@example.com',
      position: 'ML Engineer', uploadedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      rawText: 'Machine learning engineer with Python, TensorFlow, PyTorch, Scikit-learn, SQL, Pandas, NLP, Docker.',
      skills: ['python','tensorflow','pytorch','scikit-learn','sql','pandas','nlp','docker','machine learning'],
      fileName: 'rahul_verma_resume.pdf', status: 'processed',
    },
    {
      id: 'r4', name: 'Sneha Kulkarni', email: 'sneha@example.com',
      position: 'Frontend Developer', uploadedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      rawText: 'Frontend specialist with React, TypeScript, Vue, Tailwind CSS, Redux, Webpack, Figma, HTML, CSS.',
      skills: ['react','typescript','vue','tailwind','redux','webpack','figma','html','css'],
      fileName: 'sneha_kulkarni_resume.pdf', status: 'processed',
    },
    {
      id: 'r5', name: 'Karan Mehta', email: 'karan@example.com',
      position: 'DevOps Engineer', uploadedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      rawText: 'DevOps engineer proficient in Docker, Kubernetes, AWS, Terraform, Jenkins, GitHub Actions, Linux, Ansible.',
      skills: ['docker','kubernetes','aws','terraform','jenkins','github actions','linux','ansible','ci/cd'],
      fileName: 'karan_mehta_resume.pdf', status: 'processed',
    },
  ]

  const jobDesc = {
    id: 'jd1', title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Pvt. Ltd.',
    createdAt: new Date().toISOString(),
    description: 'We are looking for a Senior Full Stack Developer with strong experience in React, Node.js, TypeScript, MongoDB, Docker, AWS, and CI/CD pipelines.',
    skills: ['react','node','typescript','mongodb','docker','aws','ci/cd','git','postgresql'],
    experience: '3-5 years', location: 'Hyderabad, India',
  }

  storage.setResumes(resumes)
  storage.setJobDesc(jobDesc)
}
