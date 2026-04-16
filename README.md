# 🤖 AI Resume Screener

A modern **AI-powered resume screening platform** built with **React**, **Vite**, and **Tailwind CSS**. This app helps recruiters automate candidate evaluation by matching resume skills against job descriptions and ranking applicants.

---

## 🔗 Links

- Live Demo: https://ai-resume-screening-61ib.onrender.com/
- Source Code: https://github.com/2403A51L55/AI_resume_screening

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

## ⚙️ Prerequisites

- Node.js v18 or newer
- npm
- Git
- MongoDB server or MongoDB Atlas cluster
