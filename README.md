# 🤖 AI Resume Screener

A modern **AI-powered resume screening platform** built with **React**, **Vite**, and **Tailwind CSS**. This app helps recruiters automate candidate evaluation by matching resume skills against job descriptions and ranking applicants.

---

## 🌟 Features

- Upload resumes or paste resume text
- Enter job descriptions and required skills
- Extract candidate skills using AI matching logic
- Compare resumes to job requirements
- Generate candidate match scores
- Rank candidates by best fit
- Show analytics and visual score indicators
- Persist data in browser localStorage
- Responsive UI with Tailwind CSS

---

## 🚀 Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- Lucide React
- Express
- MongoDB / Mongoose
- localStorage for client state

---

## 🧩 Backend & MongoDB

A new backend is available under `server/` using Express and Mongoose.

- MongoDB connection string is configured with `MONGO_URI`
- Run backend: `npm run server`
- Health check: `GET /api/health`
- Candidate data can be stored and retrieved via `/api/candidates`

---

## 📁 Project Structure

```
ai-resume-screener/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── ScoreRing.jsx
│   │   └── SkillBadge.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── hooks/
│   ├── pages/
│   │   ├── Candidates.jsx
│   │   ├── Dashboard.jsx
│   │   ├── JobDescription.jsx
│   │   ├── Login.jsx
│   │   ├── Results.jsx
│   │   └── Upload.jsx
│   ├── utils/
│   │   ├── aiEngine.js
│   │   └── storage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── Dockerfile
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ⚙️ Prerequisites

- Node.js v18 or newer
- npm
- Git
- MongoDB server or MongoDB Atlas cluster

---

## 🧪 Run Locally

```bash
npm install
cp server/.env.example .env
npm run dev
npm run server
```

Then open the local URL shown in the terminal for the frontend, and use `http://localhost:5000/api/health` to verify the backend.

---

## 🔗 Links

- Live Demo: https://ai-resume-screening-61ib.onrender.com/
- Source Code: https://github.com/2403A51L55/AI_resume_screening
