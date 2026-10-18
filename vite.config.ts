import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const name = 'my-ui-course-lib'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    vanillaExtractPlugin(),
  ],
  build: {
    cssCodeSplit: false,

    outDir: 'dist/lib',
    lib: {
        entry: 'src/index.ts',
        formats: ['es'],
        fileName: name,
        cssFileName: name,
      }
    }
  }
)
