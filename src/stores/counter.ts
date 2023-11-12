import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import example from '@/example.json'
import type { Comment } from '@/types/comment'

export const useCommentStore = defineStore('comments', () => {
  const comments = ref(example.data.comments)

  const addComment = (comment: Comment) => {
    comments.value.push(comment)
  }

  return { comments, addComment }
})
