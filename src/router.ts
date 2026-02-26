import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import TranslationTableView from './views/TranslationTableView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/translation-table', name: 'translation-table', component: TranslationTableView },
  ],
})

export default router
