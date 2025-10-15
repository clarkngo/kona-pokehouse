import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile'; 

export default defineConfig({
  plugins: [
    // Include the necessary framework plugin
    react(), 
    // Add the vite-plugin-singlefile plugin to inline all CSS and JS into index.html
    viteSingleFile(),
  ],
  
  build: {
    // Ensure this is set to your build folder
    outDir: 'dist', 
  },
});
