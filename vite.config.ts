import path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// Vitest config sits on the same defineConfig so we don't fight two
// config files. Tests live next to their sources as `*.test.ts` /
// `*.test.tsx`.

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo at /Piosphere/, so asset URLs need the
  // base prefix. Locally Vite serves at / regardless.
  base: process.env.PAGES_BASE ? '/Piosphere/' : '/',
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./src/test-setup.ts'],
  },
  server: {
    port: 3000,
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
