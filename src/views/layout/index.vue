<template>
  <div>
    <!--! 二级路由  -->
    <router-view></router-view>
    <!-- !tabbar 导航 -->
    <van-tabbar route>
      <van-tabbar-item
        replace
        v-for="(obj, index) in tabbarData"
        :key="index"
        :to="obj.to"
      >
        <template #icon>
          <span :class="`toutiao ${obj.icon}`"></span>
          <span>{{ obj.text }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarData: [
        {
          to: '/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: 'toutiao-shipin',
          text: '视频'
        },
        {
          to: '/qa',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  margin-bottom: 0;
  font-size: 30px;
  .toutiao {
    font-size: 40px;
  }
}
</style>
