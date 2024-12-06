import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
      host: true,
    },
    build: {
      outDir: './server/public',
      sourcemap: true,
      minify: 'terser',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
    },
    define: {
      'import.meta.env.BASE_API_URL': JSON.stringify(env.BASE_API_URL),
      'import.meta.env.BASE_URL': JSON.stringify(env.BASE_URL),
    }
  };
});
