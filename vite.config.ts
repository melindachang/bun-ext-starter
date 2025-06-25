import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    webExtension({
      additionalInputs: ['src/styles/injection.sass'],
      browser: process.env.TARGET || 'firefox',
      manifest: () => {
        const manifest = readJsonFile('src/manifest.json')
        const pkg = readJsonFile('package.json')
        return {
          name: pkg.name,
          description: pkg.description,
          version: pkg.version,
          ...manifest,
        }
      },
      watchFilePaths: ['package.json', 'manifest.json'],
    }),
  ],
  css: { preprocessorOptions: { sass: { api: 'modern' } } },
})
