import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(
  {
    plugins: [react()],
    server: {
      proxy: {
        // Provide the Backend server address e.g., http://localhost:4000 as the value for the keys /api and target for /static.
        "/api": "http://localhost:4000",
        '/static': {
          target: 'http://localhost:4000',
          rewrite: (path) => path.replace(/^\/static/, '/uploads'),
        },
      }
    }
  }
)
