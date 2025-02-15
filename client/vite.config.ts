import { defineConfig } from 'vite';
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import React from '@vitejs/plugin-react';
import path from 'path'; // 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> pnpm i @types/node -D



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [React()],
  // 配置别名
  resolve: {
    alias: {
      '@': path.join(__dirname,'./src'), // 设置 `@` 指向 `src` 目录  
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后端服务地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
    },
  },
});
