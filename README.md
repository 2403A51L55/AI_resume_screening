# 🤖 AI Resume Screener

A modern, AI-powered resume screening platform built with **React + Vite + Tailwind CSS**.
## Deploy
**Github Link** - https://github.com/Ganeshmandala048/AI_RESUME_SCREENER

## ✨ Features

- 🔐 **Authentication** — Login/Signup with demo credentials
- 📊 **Dashboard** — Real-time stats, activity chart, top candidates
- 📤 **Resume Upload** — Drag & drop or paste resume text; AI extracts skills automatically
- 📋 **Job Description** — Define requirements with pre-built templates; live skill preview
- 🤖 **AI Screening** — NLP-powered skill matching & candidate ranking with match scores
- 👥 **Candidates Panel** — Search, filter, compare candidates side-by-side
- 📈 **Score Visualization** — Ring charts, bar charts, skill badge breakdown
- 💾 **Persistent Storage** — All data saved in browser localStorage

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18 or higher — https://nodejs.org
- **npm** (bundled with Node.js)

### Run the App

```bash
# 1. Open this folder in VS Code
# 2. Open the integrated terminal (Ctrl + ` )
# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open browser at http://localhost:5173
```

## 🧠 How the AI Works

The AI engine uses **NLP keyword extraction** to:

1. **Parse** resume text → extract recognized technologies & skills
2. **Match** candidate skills against job description requirements
3. **Score** each candidate: `(matched / required) × 100` + bonus for extra skills
4. **Rank** all candidates by score (highest first)

## 🗂️ Project Structure

```
ai-resume-screener/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout.jsx      # Sidebar + topbar shell
│   │   ├── ScoreRing.jsx   # Animated circular score gauge
│   │   └── SkillBadge.jsx  # Colorful skill tag
│   ├── context/
│   │   └── AppContext.jsx  # Global state (auth, resumes, JD, results)
│   ├── pages/
│   │   ├── Login.jsx       # Split-screen auth page
│   │   ├── Dashboard.jsx   # Stats + charts overview
│   │   ├── Upload.jsx      # Drag & drop resume upload
│   │   ├── JobDescription.jsx # JD editor with templates
│   │   ├── Results.jsx     # AI-ranked results + export CSV
│   │   └── Candidates.jsx  # Browse & compare candidates
│   ├── utils/
│   │   ├── aiEngine.js     # NLP skill extraction & ranking
│   │   └── storage.js      # localStorage persistence + demo seeder
│   ├── App.jsx             # Router setup
│   ├── index.css           # Tailwind + custom design system
│   └── main.jsx            # Entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🎯 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 6 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| Icons | Lucide React |
| Storage | Browser localStorage |

## 📦 Build for Production

```bash
npm run build
# Output in dist/ folder — deploy to any static host
```
