<template>
  <div class="channel">
    <!-- ! 我的频道 -->
    <van-cell title="我的频道">
      <van-button round size="small" class="edit-btn" @click="isedit = !isedit">
        {{ isedit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        :class="['mychannel', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isedit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- ! 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem" direction="horizontal">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel as getAllChannelAPI } from '@/api'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isedit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannel()
  },
  methods: {
    // 请求所有频道
    async getAllChannel() {
      try {
        const { data } = await getAllChannelAPI()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast.fail('请刷新后重新获取频道')
      }
    },
    changeActive(index, item) {
      console.log(index)
      // 判断是否是编辑状态
      if (this.isedit) {
        // 是编辑状态 删除
        if (item.name === '推荐') return
        this.$emit('del-channel', item.id)
      } else {
        // 不是编辑状态 关闭弹窗 切换active
        this.$parent.$parent.show = false
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((obj) => {
        return !this.myChannels.find((obj1) => obj1.id === obj.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.active {
  color: red;
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;

  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border: 0.02667rem solid red;
    }
  }
  :deep(.van-cell::after) {
    border-bottom: none;
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  :deep(.van-grid-item__icon) {
    font-size: 40px;
  }
  :deep(.mychannel) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(40%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
