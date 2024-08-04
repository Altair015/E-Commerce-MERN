import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(
  {
    plugins: [react()],
    server: {
      proxy: {
        "/api": "http://10.0.0.1:4000",
        "/api": "http://192.168.0.105:4000",
      }
    }
  }
)
