<template>
  <!-- ? 文章列表  -->

  <!-- !没有图片 -->
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
  />
  <!-- !一张图片 -->
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    :label="label"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>
  <!-- !三张图片 -->
  <van-cell v-else :title="articleInfo.title" :label="label">
    <template #label>
      <van-image
        width="100"
        height="100"
        :src="item"
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
      />
        <br>
      {{label}}
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style></style>
