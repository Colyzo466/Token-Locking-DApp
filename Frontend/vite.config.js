import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const buffer = require('buffer').Buffer;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      'buffer': 'buffer/', // Add buffer alias
    },
  },
  define: {
    'global': {}, // Define global for compatibility
    'process.env': {}, // Define process.env for compatibility
  },
  optimizeDeps: {
    include: ['ethers'],
  },
});