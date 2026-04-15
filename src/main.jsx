import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

function renderFatalError(message) {
  if (!rootElement) return

  rootElement.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#080f1a;color:#fff;font-family:Inter,system-ui,sans-serif;">
      <div style="max-width:720px;width:100%;border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:24px;background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#91adff;">Startup Error</p>
        <h1 style="margin:0 0 12px;font-size:28px;">The app hit an error while loading.</h1>
        <p style="margin:0 0 16px;color:rgba(255,255,255,0.72);line-height:1.6;">Try refreshing once. If this keeps happening, use the button below to clear saved browser data for this app and reload.</p>
        <pre style="margin:0 0 16px;padding:16px;border-radius:14px;overflow:auto;white-space:pre-wrap;background:#0f1d2e;color:#e8ecf0;font-size:13px;line-height:1.5;">${message}</pre>
        <button id="clear-app-data" style="border:0;border-radius:12px;padding:12px 16px;background:#4455f5;color:#fff;font-weight:600;cursor:pointer;">Clear App Data And Reload</button>
      </div>
    </div>
  `

  const clearButton = document.getElementById('clear-app-data')
  clearButton?.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
  })
}

window.addEventListener('error', (event) => {
  renderFatalError(event.error?.stack || event.message || 'Unknown error')
})

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason
  renderFatalError(reason?.stack || reason?.message || String(reason))
})

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
} catch (error) {
  renderFatalError(error?.stack || error?.message || 'Unknown error')
}
