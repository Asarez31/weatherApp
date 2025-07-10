// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // or any port you want
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to backend
    },
  },
  resolve: {
    alias: {
      // if you want to add any path aliases, add here
    },
  },
});