import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// สำหรับ GitHub Pages ใช้ base ตามชื่อ repo (หรือตั้ง VITE_BASE ใน env)
const repoName = process.env.VITE_BASE || ''
const base = repoName ? /${repoName}/ : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
