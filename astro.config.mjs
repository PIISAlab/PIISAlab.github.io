// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Vietnamese at the root, English under /en — routed by src/pages/[...lang]/ (see src/i18n.ts).
export default defineConfig({
  site: 'https://piisalab.github.io',
  vite: {
    plugins: [tailwindcss()]
  }
});
