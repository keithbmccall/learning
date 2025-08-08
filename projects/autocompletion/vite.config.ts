import { default as react } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ babel: { plugins: ['relay'] } })],
  server: {
    open: true,
    port: 1212,
  },
});
