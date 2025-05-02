import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      // Explicitly exclude node_modules
      exclude: [
        /node_modules/,
        /\.js$/
      ]
    }
  }
});