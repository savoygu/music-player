<script setup lang="ts">
import { GithubOne } from '@icon-park/vue-next'
</script>

<template>
  <div class="footer">
    <a
      href="https://github.com/savoygu/music-player"
      target="_blank"
      title="Create by @savoygu"
    >
      <GithubOne
        theme="outline"
        size="24"
        fill="3"
      />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  @apply absolute left-0 bottom-0 flex justify-center items-center h-10 leading-10 w-full;

  a {
    color: var(--theme-default);
  }

  & ::v-deep(.i-icon) {
    path {
      stroke: var(--theme-default);
    }
  }
}
</style>
