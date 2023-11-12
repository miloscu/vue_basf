<script setup lang="ts">
import { useCommentStore } from '@/stores/counter';
import { type Comment } from '@/types/comment';
import { stringToColorHex } from '@/utils/hash';
import { urlsToAnchors } from '@/utils/strings';
import { ref, type PropType, onMounted } from 'vue';

const commentStore = useCommentStore()

defineEmits<{
  (e: 'reply', commentid: string): void
}>()

const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true
  },
  children: {
    type: Array as PropType<Comment[]>,
    required: true
  },
  level: {
    type: Number as PropType<number>,
    required: true
  }
})

const getChildren = (parentId: string) => {
  return commentStore.comments.filter(comment => comment.parent_id === parentId);
}

const countReplies = (parentId: string) => {
  const idArray = [parentId]
  let count = 0
  while (idArray.length > 0) {
    const id = idArray.pop()
    const children = getChildren(id as string)
    count += children.length
    idArray.push(...children.map(child => child.id))
  }
  return count > 0 ? `(${count})` : ''
}

const author = ref<HTMLElement>(null as unknown as HTMLElement)
onMounted(() => {
  const color = stringToColorHex(props.comment.author.name)
  author.value.style.backgroundColor = color
})

</script>

<template>
  <div class="flex content-start m-2 relative"
       :style="{ marginLeft: level * 1.2 + 1.7 + 'rem' }">
    <template v-if="level > 1">
      <div v-for="index in level - 1"
           :key="comment.author.name + index"
           class="w-6">
      </div>
    </template>
    <div v-if="level > 0"
         class="w-6">
      <div class="w-2 h-8 md:h-10 absolute -top-1 md:-top-4 border-l-2 border-b-2 border-gray-500"></div>
      <!-- <div class="w-1 h-10 bg-[#ECEEF1]"></div> -->
    </div>
    <div ref="author"
         class="rounded-full md:w-10 md:h-10 mr-2 w-0 h-0 transition-all duration-1000">
      <img :src="comment.author.picture"
           class="rounded-full w-10 h-10"
           onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='">
    </div>
    <div class="w-9/12">
      <div class="bg-white rounded p-4">
        <div class="font-semibold mb-2">{{ comment.author.name }}</div>
        <div class="break-words" v-html="urlsToAnchors(comment.text)">
        </div>
      </div>
      <div class="mt-2">
        <span class="mr-3">
          {{ new Date(comment.timestamp).toTimeString().slice(0, 5) }}
        </span>
        <a>
          <button class="text-[#023168] font-semibold"
                  @click="$emit('reply', comment.id)">Reply {{ countReplies(comment.id) }}</button>
        </a>
      </div>
    </div>
  </div>
  <div>
    <CommentComponent v-for="childComment in children"
                      :key="childComment.id"
                      :comment="childComment"
                      :children="getChildren(childComment.id)"
                      :level="level + 1"
                      @reply="$emit('reply', $event)">
    </CommentComponent>
</div></template>@/types/comment