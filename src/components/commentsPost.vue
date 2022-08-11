<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
    class="post-btn"
    @click="postComment"
    :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { postCommentAPI } from '@/api'
export default {
  name: 'CommentPost',
  props: {
    postComments: {
      type: [Number, String],
      required: true
    },
    articleId: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async postComment() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const { data } = await postCommentAPI({
          target: this.postComments,
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })
        this.$emit('postCommentList', data.data)
        this.message = ''
        this.$toast.success('发布评论成功')
      } catch (error) {
        this.$toast.fail('发布评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
