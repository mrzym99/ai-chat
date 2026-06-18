import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [react(), UnoCSS()],
  base: '/ai-chat/', // GitHub Pages 仓库名
})
