import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const backendUrl = process.env.BACKEND_URL || 'https://localhost:3000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
    server: {
    host: true,
    proxy: {
      "/socket.io": {
        target: backendUrl,
        ws: true,
      },
      "/api": {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
        timeout: 10000 // 10s
      }
    },
  },
  build: {
    sourcemap: false,
  },
})
