import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import installElementPlus from './plugins/element.js';

const app = createApp(App).use(router);

installElementPlus(app);
app.mount('#app');
