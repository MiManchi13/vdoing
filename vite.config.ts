import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import commonjs from '@rollup/plugin-commonjs';
import { resolve } from "path";
export default defineConfig({
  plugins: [uni(), commonjs({
    ignoreDynamicRequires: true
  })],
  build:{
    assetsInlineLimit: 5120,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
    },
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:`@import "@/scss/index.scss";@import "@/scss/common.scss";`
      }
    }
  }
});
