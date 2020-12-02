import { createRouter, createMemoryHistory, createWebHashHistory } from 'vue-router';
import Viewer from '@/views/Viewer.vue';

const routes = [
  {
    path: '/:id',
    name: 'viewer',
    component: Viewer
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
