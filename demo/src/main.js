import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import installElementPlus from './plugins/element.js';

const app = createApp(App).use(router);

installElementPlus(app);
app.mount('#app');
