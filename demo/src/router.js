import { createRouter, createWebHashHistory } from 'vue-router';

import Viewer from '@/views/Viewer.vue';
import Uploader from '@/views/Uploader.vue';

const routes = [
  {
    path: '/:id',
    name: 'viewer',
    component: Viewer
  },
  {
    path: '/',
    name: 'uploader',
    component: Uploader
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
