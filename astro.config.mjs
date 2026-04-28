// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://piisalab.github.io',
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [react()],
  build: {
    format: 'file'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
