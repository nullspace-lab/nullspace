// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
const vite_config_default = defineConfig({
  server: {
    port: 3e3,
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
  ],
});
export { vite_config_default as default };
