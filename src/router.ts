import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import TranslationTableView from './views/TranslationTableView.vue'
import AboutView from './views/AboutView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/translation-table', name: 'translation-table', component: TranslationTableView },
    { path: '/about', name: 'about', component: AboutView },
  ],
})

export default router
