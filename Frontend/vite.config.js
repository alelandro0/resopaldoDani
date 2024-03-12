import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(
  
  {
  plugins: [react()],
  server: {
    open: true,
    host: true
  },
  // vite.config.js

  // Otras opciones de configuración...
  build: {
    chunkSizeWarningLimit: 20000, // Tamaño en kB para la advertencia
  },


})
