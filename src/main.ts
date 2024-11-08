import { createApp } from "vue";
import { store } from "./store";
// normalize.css
import "normalize.css/normalize.css";

// tailwindcss
import "./styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";
// 全局样式
import "./styles/index.less";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(store);
app.use(router);

app.mount("#app");
