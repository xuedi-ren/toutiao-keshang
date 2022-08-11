<template>
  <div>
    <!-- !navbar -->
    <van-nav-bar
      class="navbar"
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- !用户信息 -->
    <div class="article-content">
      <h1 class="articles-title">{{ articleDetails.title }}</h1>
      <div class="user-info">
        <div class="user-name">
          <div class="user-img">
            <img :src="articleDetails.aut_photo" />
          </div>
          <div class="user-text">
            <p>{{ articleDetails.aut_name }}</p>
            <div>{{ articleDetails.pubdate }}</div>
          </div>
        </div>
        <!-- 未关注 -->
        <van-button
          @click="addAttention"
          v-if="!articleDetails.is_followed"
          round
          size="small"
          icon="plus"
          type="info"
          class="btn"
          >关注</van-button
        >
        <!-- 关注了 -->
        <van-button
          v-else
          @click="delAttention"
          round
          size="small"
          type="info"
          class="btn"
          >已关注</van-button
        >
      </div>
      <!-- !中间文本 -->
      <div
        class="article-content markdown-body"
        v-html="articleDetails.content"
        ref="article-content"
      ></div>
    </div>
    <!-- !结束 -->
    <div class="end">
      ------------------------------正文结束------------------------------
    </div>
    <!-- !评论 -->
    <commentsList
      :source="$route.query.id"
      @updata-totalCount="totalCount = $event.total_count"
      :list="comments"
      @reply_cilck="onReply"
    ></commentsList>
    <!-- !评论 -->
    <!-- !底部 -->
    <div class="foot">
      <div class="box">
        <van-button type="default" class="btn" round @click="isShowPost = true"
          >写评论</van-button
        >
        <van-icon :badge="totalCount" name="comment-o" class="comment" />
        <van-icon
          name="star"
          class="star2"
          v-if="articleDetails.is_collected"
          @click="delCollected"
        />
        <van-icon name="star-o" class="star1" v-else @click="addCollected" />
        <van-icon name="good-job-o" class="good" />
        <van-icon name="share" class="share" />
      </div>
    </div>
    <!-- ! 评论弹层 -->
    <van-popup v-model="isShowPost" position="bottom">
      <commentsPost
        :postComments="$route.query.id"
        @postCommentList="post"
      ></commentsPost>
    </van-popup>
    <!-- ! 评论回复弹层 -->
    <van-popup v-model="isShowReply" position="bottom" style="height: 100%">
      <commentReply
        @postlist="onReplyPost"
        :articleId="$route.query.id"
        v-if="isShowReply"
        @close="isShowReply = false"
        :comment="replyComment"
      ></commentReply>
      <van-cell title="查看回复" />
      <commentsList
        :list="commentslit"
        :source="replyComment.com_id"
        :type="'c'"
      ></commentsList>
    </van-popup>
  </div>
</template>

<script>
import {
  getArticleDetailsAPI,
  addCollectedAPI,
  delCollectedAPI,
  addAttentionAPI,
  delAttentionAPI
} from '@/api'
import '@/views/home/github-markdown.css'
import commentsList from './commentsList.vue'
import commentsPost from './commentsPost.vue'
import commentReply from './commentReply.vue'
import { ImagePreview } from 'vant'
export default {
  components: {
    commentsList,
    commentsPost,
    commentReply
  },
  data() {
    return {
      articleDetails: {},
      totalCount: 0,
      isShowPost: false,
      comments: [],
      isShowReply: false,
      replyComment: {},
      commentslit: []
    }
  },
  created() {
    this.getArticleDetails()
  },
  methods: {
    // 获取文章详情
    async getArticleDetails() {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        const { data } = await getArticleDetailsAPI(this.$route.query.id)
        console.log(data)
        this.articleDetails = data.data
        setTimeout(() => {
          this.ImagePreview()
        }, 0)
      } catch (error) {
        this.$toast.fail('获取文章详情失败')
      }
    },
    // 收藏文章
    async addCollected() {
      try {
        this.$toast.loading({
          message: '收藏中...',
          forbidClick: true
        })
        const { data } = await addCollectedAPI(this.$route.query.id)
        this.articleDetails.is_collected = true
        this.$toast.success('收藏成功')
        console.log(data)
      } catch (error) {
        this.$toast.fail('收藏失败')
      }
    },
    // 取消收藏
    async delCollected() {
      try {
        this.$toast.loading({
          message: '取消收藏中...',
          forbidClick: true
        })
        const { data } = await delCollectedAPI(this.$route.query.id)
        this.articleDetails.is_collected = false
        this.$toast.success('取消收藏成功')
        console.log(data)
      } catch (error) {
        this.$toast.fail('取消收藏失败')
      }
    },
    // 加关注
    async addAttention() {
      try {
        this.$toast.loading({
          message: '关注中...',
          forbidClick: true
        })
        const { data } = await addAttentionAPI(this.articleDetails.aut_id)
        console.log(data)
        this.articleDetails.is_followed = true
      } catch (error) {
        this.$toast.fail('关注用户失败')
      }
    },
    // 取消关注
    async delAttention() {
      try {
        this.$toast.loading({
          message: '取消关注中...',
          forbidClick: true
        })
        const { data } = await delAttentionAPI(this.articleDetails.aut_id)
        console.log(data)
        this.articleDetails.is_followed = false
      } catch (error) {
        this.$toast.fail('取消关注失败')
      }
    },
    // 发评论
    post(data) {
      this.isShowPost = false
      this.comments.unshift(data.new_obj)
    },
    onReply(comment) {
      console.log(comment)
      this.isShowReply = true
      this.replyComment = comment
    },
    onReplyPost(arr) {
      this.commentslit = arr
    },
    // 图片预览
    ImagePreview() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #0098f7;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
.article-content {
  padding-top: 92px;
  .articles-title {
    font-size: 40px;
    color: #3a3a3a;
    padding: 50px 32px;
    margin: 0;
  }
  .user-info {
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    .user-name {
      display: flex;
      align-items: center;
      .user-img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .user-text {
        margin-left: 15px;
        p {
          margin: 0;
          font-size: 12px;
          color: #3a3a3a;
          line-height: 48px;
        }
        div {
          font-size: 12px;
          color: #b7b7b7;
          line-height: 36px;
        }
      }
    }
    .btn {
      width: 170px;
      height: 58px;
    }
  }
}
.end {
  margin: 32px 0;
  font-size: 28px;
  text-align: center;
  color: #969799;
}
.nomore {
  font-size: 28px;
  text-align: center;
  color: #969799;
  line-height: 100px;
}
.foot {
  height: 88px;
  .box {
    border-top: 0.01333rem solid #d8d8d8;
    background-color: #fff;
    height: 88px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    :deep(.btn) {
      width: 282px;
      height: 46px;
      &.van-button--default {
        color: #a7a7a7;
      }
    }
    .star2 {
      color: gold;
    }
    :deep(.van-icon) {
      font-size: 40px;
    }
  }
}
:deep(.article-content[data-v-60a2187c]) {
  padding: 55px 16px;
  font-size: 12px;
}
</style>
