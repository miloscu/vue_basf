import { createRouter, createWebHistory } from 'vue-router'
import CommentListView from '../views/CommentListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'comment-list-view',
      component: CommentListView
    }
  ]
})

export default router
