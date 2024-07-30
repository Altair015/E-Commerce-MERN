import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(
  {
    plugins: [react()],
    server: {
      proxy: {
        "/api": "http://10.0.0.1:4000"
        // "/api": `http://${window.location.hostname}:4000`
        // "/api": "http://192.168.0.105:4000"
      }
    }
  }
)
