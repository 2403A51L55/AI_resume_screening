# 🤖 AI Resume Screener

A modern and intelligent **AI-powered Resume Screening Platform** developed using **React + Vite + Tailwind CSS**.  
This project helps recruiters automate resume shortlisting by analyzing resumes, matching candidate skills with job descriptions, and ranking applicants using AI-generated scores.

---

## 🌐 Live Server

🔗 **Render Deployment:**  
https://ai-resume-screening-61ib.onrender.com/

---

## 📂 GitHub Repository

🔗 **Source Code:**  
https://github.com/2403A51L55/AI_resume_screening

---

## 📝 Description

The **AI Resume Screener** reduces manual recruitment effort by automatically screening resumes.

The platform allows users to:

- Upload resumes or paste resume text  
- Enter job descriptions and required skills  
- Automatically extract candidate skills  
- Compare resumes with job requirements  
- Generate match percentages  
- Rank candidates from best to lowest match  
- Visualize hiring analytics using charts  

This project demonstrates the practical use of **Artificial Intelligence in Recruitment Automation**.

---

## ✨ Features

- 🔐 Authentication System (Login / Signup)  
- 📊 Dashboard with statistics and charts  
- 📤 Resume Upload / Paste Resume Text  
- 📋 Job Description Input  
- 🤖 AI Skill Extraction & Matching  
- 📈 Candidate Match Score Visualization  
- 👥 Candidate Search / Filter / Compare  
- 💾 Persistent Data using localStorage  
- 🎨 Responsive UI with Tailwind CSS  
- ☁️ Live Deployment on Render  

---

## ⚙️ Prerequisites

Before running the project, install:

- **Node.js** (v18 or above)  
- **npm**  
- **Git**  
- **Docker Desktop** (optional)  
- **VS Code** or any editor  

Downloads:

- Node.js → https://nodejs.org  
- Docker → https://www.docker.com/products/docker-desktop/  
- Git → https://git-scm.com/

---

## 🧠 How the AI Works

The AI engine uses **Natural Language Processing (NLP)** for resume screening.

### Process:

1. Resume text is uploaded or pasted  
2. Skills are extracted from resume  
3. Job description required skills are collected  
4. Candidate skills are matched with requirements  
5. Match score calculated using:

```text
(Matched Skills / Required Skills) × 100

---
###Project Structure:

AI_resume_screening/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── ScoreRing.jsx
│   │   └── SkillBadge.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Upload.jsx
│   │   ├── JobDescription.jsx
│   │   ├── Results.jsx
│   │   └── Candidates.jsx
│   ├── utils/
│   │   ├── aiEngine.js
│   │   └── storage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── Dockerfile
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md

| Category         | Technology              |
| ---------------- | ----------------------- |
| Frontend         | React 18                |
| Routing          | React Router DOM        |
| Build Tool       | Vite                    |
| Styling          | Tailwind CSS            |
| Charts           | Recharts                |
| Icons            | Lucide React            |
| Storage          | Browser localStorage    |
| AI Logic         | JavaScript NLP Matching |
| Deployment       | Render                  |
| Containerization | Docker                  |
| Version Control  | Git + GitHub            |
