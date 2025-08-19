import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    global: "window",
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
       // /uploads/** 로 들어오는 요청은 백엔드(8080)로 포워딩
       '/uploads': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
          target: 'http://localhost:8080',
          ws: true,
      },
    },
  },
});
