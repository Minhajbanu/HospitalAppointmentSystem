import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// change API_BASE as needed
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // forward /api requests to backend during dev
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})