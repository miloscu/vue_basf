<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { type Comment } from '@/types/comment'
import CommentComponent from '@/components/CommentComponent.vue'
import { useCommentStore } from '@/stores/counter';

const commentStore = useCommentStore()

const textInput: Ref<HTMLInputElement> = ref<Ref<HTMLInputElement>>(null as unknown as Ref<HTMLInputElement>);

const parentComment: Ref<string> = ref("");
const commentBody: Ref<string> = ref("");
const comments = computed(() => commentStore.comments)

const getChildren = (parentId: string) => {
  return comments.value.filter(comment => comment.parent_id === parentId);
}

const addComment = () => {
  if (!commentBody.value) {
    return
  }
  const comment: Comment = {} as Comment;
  comment.id = (comments.value.length + 1).toString();
  comment.text = commentBody.value;
  comment.author = { name: "Me", picture: "./user.jpg" }
  if (parentComment.value) {
    comment.parent_id = parentComment.value
  }
  comment.timestamp = new Date().getTime()

  commentStore.addComment(comment)
  parentComment.value = ""
  commentBody.value = ""
}

const reply = (commentId: string) => {
  parentComment.value = commentId
  textInput.value?.focus()
}

const loseFocus = () => {
  if (!commentBody.value) {
    parentComment.value = ""
  }
}

const headerDate = computed(() => {
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date().toLocaleDateString('en-UK', dateOptions).replace(/\//g, '.')
})

</script>

<template>
  <div
       class="h-full w-full md:h-1/2 md:w-1/2 md:rounded-lg flex flex-col justify-between bg-[#ECEEF1] transition-all duration-1000">
    <div class="w-full py-4 flex justify-center">
      <div>
        {{ headerDate }}
      </div>
    </div>
    <div class="overflow-scroll overflow-x-auto mx-2">
      <CommentComponent v-for="comment in comments.filter(comment => !comment.parent_id)"
                        :key="comment.id"
                        :comment="comment"
                        :children="getChildren(comment.id)"
                        :level="0"
                        @reply="reply" />
    </div>
    <div class="bg-white m-4 mx-8 rounded-lg flex justify-between p-2 px-4">
      <input type="text"
             class="flex-grow text-sm rounded-lg focus:ring-transparent focus:outline-none focus:border-none"
             placeholder="...type something"
             v-model="commentBody"
             ref="textInput"
             @focusout="loseFocus" />
      <button class="w-20 p-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
              @click="addComment">
        Send
      </button>
    </div>
  </div>
</template>
@/types/comment