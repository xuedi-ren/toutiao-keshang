<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/video" icon="search">视频</van-tabbar-item>
      <van-tabbar-item replace to="/layout/q1" icon="home-o">问答</van-tabbar-item>
      <van-tabbar-item replace to="/layout/profile" icon="search">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
