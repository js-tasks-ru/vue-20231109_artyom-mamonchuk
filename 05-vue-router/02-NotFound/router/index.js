import { createRouter, createWebHistory } from 'vue-router';

const PageA = import('../views/PageA');
const PageB = import('../views/PageB');
const PageNotFound = import('../views/PageNotFound');

export const router = createRouter({
  history: createWebHistory('/05-vue-router/02-NotFound'),
  routes: [
    {
      path: '/page-a',
      name: 'PageA',
      alias: '/',
      component: () => PageA,
    },
    {
      path: '/page-b',
      name: 'PageB',
      component: () => PageB,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => PageNotFound },
  ],
});
