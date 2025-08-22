import TodoPage from '@/views/TodoPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/todo' },
    { path: '/todo', component: TodoPage },
  ],
})
