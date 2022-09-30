import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [react],
  esbuild: {
    jsxFactory: '_jsx',
    jsxFragment: '_jsxFragment',
    jsxInject: 'import { createElement as _jsx, Fragment as _jsxFragment } from "react"',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/styles/_variables.scss";
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
