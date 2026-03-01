import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = process.env.VITE_BASE || ''
const base = repoName ? `/${repoName}/` : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
