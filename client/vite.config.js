import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(
  {
    plugins: [react()],
    server: {
      proxy: {
        "/api": "http://10.0.0.1:4000",
        '/static': {
          target: 'http://10.0.0.1:4000',
          rewrite: (path) => path.replace(/^\/static/, '/uploads'),
        },
      }
    }
  }
)
