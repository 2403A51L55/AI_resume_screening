import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/AI_resume_screening/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
