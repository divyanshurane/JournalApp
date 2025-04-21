import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base: '/journal',
  plugins: [react()]
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:8081/journal', // your Spring Boot backend
  //   },
  // }
})
