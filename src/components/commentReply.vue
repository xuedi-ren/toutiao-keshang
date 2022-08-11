<template>
  <div>
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无评论'
      "
    >
      <template #left>
        <van-icon name="cross" @click="$emit('close')" />
      </template>
    </van-nav-bar>
    <commentsItem :obj="comment" ></commentsItem>
    <div class="post-wrop">
      <van-button class="btn" size="small" round @click="isShowPost=true">写评论</van-button>
    </div>
        <van-popup
    v-model="isShowPost"
    position="bottom"
    >
    <commentsPost
    :postComments="comment.com_id"
    :articleId="articleId"
    @postCommentList="onPost"
    ></commentsPost>
    </van-popup>
  </div>
</template>

<script>
import commentsItem from './commentsItem.vue'
import commentsPost from './commentsPost.vue'
export default {
  components: {
    commentsItem,
    commentsPost,
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      isShowPost: false,
      commentslit: []
    }
  },
  methods: {
    onPost(data) {
      this.comment.reply_count++
      this.isShowPost = false
      this.commentslit.unshift(data.new_obj)
      this.$emit('postlist', this.commentslit)
    }
  },
}
</script>

<style scoped lang="less">
.post-wrop {
  height: 88px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #d8d8d8;
  .btn {
    width: 80%;

  }
}
</style>
