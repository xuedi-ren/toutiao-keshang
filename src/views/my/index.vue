<template>
  <div>
    <!-- ! 头部区域 -->
    <header>
      <div class="login" v-if="isLogin">已登陆</div>
      <div class="logout" v-else>未登陆</div>
    </header>
    <!-- ! 中间 -->
    <main>收藏/历史/消息通知/小智同学</main>
    <!-- ! 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '标题',
          message:
            '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。'
        })
        .then(() => {
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style></style>
