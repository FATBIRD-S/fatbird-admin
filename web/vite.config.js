import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "path";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      include: ["src/**/*.{vue,html,jsx,tsx}", "src/router/routes/*.js"], // 指定需要扫描的文件类型和路径
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  host: true,
  server: {
    open: true,
    proxy: {
      [env.VITE_APP_BASE_API]: {
        target: "https://api.academy-kmpark.com/test/platform/api/api/v1",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
      },
    },
  },
});
