<template>
  <div>
    <!-- ! 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search" @click="$router.push('/search')">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- ! tab -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="obj in Channels" :key="obj.id" :title="obj.name">
        <articleList :id="obj.id"></articleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <!-- ! 频道弹层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPopup
        :myChannels="Channels"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></ChannelPopup>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelAPI,
  delChannel,
  addChannel,
  setMyChannelsToLocal,
  getMyChannelsToLocal
} from '@/api'
import articleList from './components/articleList.vue'
import ChannelPopup from '@/components/ChannelPopup.vue'
export default {
  components: {
    articleList,
    ChannelPopup
  },
  data() {
    return {
      active: 0,
      Channels: [],
      show: false
    }
  },
  created() {
    this.initMyChannels()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    initMyChannels() {
      if (this.isLogin) {
        this.getMyChannel()
      } else {
        console.log(getMyChannelsToLocal())
        const myLocalChannels = getMyChannelsToLocal()
        if (myLocalChannels) {
          this.Channels = myLocalChannels
        } else {
          this.getMyChannel()
        }
      }
    },
    async getMyChannel() {
      try {
        const { data } = await getMyChannelAPI()
        this.Channels = data.data.channels
      } catch (error) {
        console.log(error.message)
        this.$toast.fail('获取频道失败， 请刷新')
      }
    },
    // 删除频道列表
    async delChannel(id) {
      this.$toast.loading({
        message: '删除数据中...',
        forbidClick: true
      })
      if (this.isLogin) {
        // 删除服务器数据
        await delChannel(id)
      } else {
        setMyChannelsToLocal(this.Channels.filter((obj) => obj.id !== id))
      }
      try {
        // 删除页面上的数据
        this.Channels = this.Channels.filter((obj) => obj.id !== id)
        this.$toast.success('删除数据成功')
      } catch (error) {
        this.$toast.fail('删除数据失败')
      }
    },
    async addChannel(channel) {
      this.$toast.loading({
        message: '添加数据中...',
        forbidClick: true
      })
      if (this.isLogin) {
        // 添加线上
        await addChannel(channel.id, this.Channels.length)
      } else {
        getMyChannelsToLocal(this.Channels.push(channel))
      }
      try {
        // 添加视图
        this.Channels.push(channel)
        this.$toast.success('添加数据成功')
      } catch (error) {
        this.$toast.fail('添加数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 999;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 92px;
  right: 0;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__wrap .van-tabs__nav .van-tab) {
  height: 100%;
}
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
