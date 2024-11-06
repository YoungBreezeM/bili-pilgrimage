import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Tabbar, TabbarItem } from 'vant';

const app = createApp();
app.use(Tabbar);
app.use(TabbarItem);
createApp(App).mount('#app')
