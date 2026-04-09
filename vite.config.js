import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ai-resume-screener/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
