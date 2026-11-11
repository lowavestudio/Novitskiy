import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// При деплое на GitHub Pages сайт доступен по адресу:
// https://lowavestudio.github.io/Novitskiy/
// Если подключите кастомный домен — замените base на '/'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/Novitskiy/',
})
