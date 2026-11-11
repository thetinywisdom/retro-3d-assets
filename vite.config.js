import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2020',
    lib: { entry: 'src/index.js', formats: ['es'], fileName: () => 'sony-pvm.js' },
    emptyOutDir: false,
  },
});
