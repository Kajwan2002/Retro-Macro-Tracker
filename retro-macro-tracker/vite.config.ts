import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built app works when served from
// https://<username>.github.io/<repo-name>/ (any subpath) without edits.
export default defineConfig({
  base: './',
  plugins: [react()],
});
