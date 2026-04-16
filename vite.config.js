import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use '/' for custom domain (dandogdoesthings.com).
  // Change to '/repo-name/' if deploying to GitHub Pages without a custom domain.
  base: '/',
})
