<template>
  <div>
    <van-cell class="cell">
      <template #title>
        <div class="userInfo">
          <div class="comments-img">
            <van-image
              cover
              round
              width="100%"
              height="100%"
              :src="obj.aut_photo"
            />
          </div>
          <div class="user-text">
            <div class="number">
              <span>{{ obj.aut_name }}</span>
            </div>
            <p>{{ obj.content }}</p>
            <div class="time">
              <span>{{ obj.pubdate | relativeTime }}</span>
              <van-button
                class="btn"
                round
                type="default"
                size="small"
                @click="$emit('reply_cilck', obj)"
                >回复 {{ obj.reply_count }}</van-button
              >
            </div>
          </div>
        </div>
      </template>
      <van-icon
        v-if="obj.is_liking"
        class="like"
        name="good-job"
        @click="delLikeComments"
        ><span class="praise">{{
          obj.like_count === 0 ? '赞' : obj.like_count
        }}</span></van-icon
      >
      <van-icon v-else name="good-job-o" @click="addLikeComments"
        ><span class="praise">{{ obj.like_count || '赞' }}</span></van-icon
      >
    </van-cell>
  </div>
</template>

<script>
import { addLikeComments, delLikeComments } from '@/api'
export default {
  props: {
    obj: {
      type: Object,
      required: true
    },
  },
  methods: {
    async addLikeComments() {
      await addLikeComments(this.obj.com_id)
      this.obj.is_liking = true
      this.obj.like_count++
    },
    async delLikeComments() {
      await delLikeComments(this.obj.com_id)
      this.obj.is_liking = false
      this.obj.like_count--
    }
  }
}
</script>

<style scoped lang="less">
.cell {
  border-bottom: 0.02667rem solid #ebedf0;
}
.van-icon {
  font-size: 30px;
  color: #000;
}
.userInfo {
  display: flex;
  .comments-img {
    width: 72px;
    height: 72px;
    margin-right: 20px;
  }
  .user-text {
    .number {
      line-height: 24px;
      span {
        font-size: 26px;
        color: #406599;
        line-height: 24px;
      }
    }
    p {
      font-size: 32px;
      color: #222;
      margin: 36px 0;
    }
    .time {
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        color: #222;
        margin-right: 15px;
      }
      .btn {
        width: 130px;
        height: 48px;
      }
    }
  }
}
.praise {
  margin-left: 5px;
}
:deep(.like) {
  &.van-icon {
    color: red;
  }
}
</style>
