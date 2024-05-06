import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn.js";
dayjs.locale("zh-cn");

// css
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";

import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setUpDirective } from "./directive";

const app = createApp(App);

setupStore(app);
setupRouter(app);
setUpDirective(app);

app.mount("#app");
