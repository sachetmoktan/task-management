import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3900
  },
  resolve:{
    alias: {
      '@': path.resolve(__dirname,'./src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    },
  }

})
