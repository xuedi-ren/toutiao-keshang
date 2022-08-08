<template>
  <div>
    <!-- ! 头部区域 -->
    <header class="header">
      <!-- ?已登陆 -->
      <div class="login" v-if="isLogin">
        <div class="user-info">
          <div class="user-message">
            <div class="user-img">
              <van-image
                class="img"
                width="100%"
                height="100%"
                round
                fit="cover"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="user-text">
              <span>前端大麻哈</span>
            </div>
          </div>
          <van-button
            type="info"
            size="mini"
            round
            @click="$router.push('/user')"
            >编辑资料</van-button
          >
        </div>
        <div class="user-attention">
          <div>
            <span>5028</span>
            <span>头条</span>
          </div>
          <div>
            <span>5</span>
            <span>粉丝</span>
          </div>
          <div>
            <span>0</span>
            <span>关注</span>
          </div>
          <div>
            <span>0</span>
            <span>获赞</span>
          </div>
        </div>
      </div>
      <!-- ?未登录 -->
      <div class="logout" v-else>
        <div class="logout-img">
          <van-image
            round
            width="100%"
            height="100%"
            :src="require('@/assets/images/mobile.png')"
          />
        </div>
        <div class="logout-text" @click="$router.push('/login')">
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>
    <!-- ! 中间 -->
    <main class="main">
      <!-- 收藏 历史 -->
      <van-grid clickable :column-num="2" class="grid">
        <van-grid-item icon="home-o" text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item icon="search" text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 消息通知 小智同学 -->
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </main>
    <!-- ! 底部 -->
    <footer class="footer">
      <button v-if="isLogin" @click="logout">
        <span>退出</span>
      </button>
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

<style scoped lang="less">
.header {
  height: 401px;
  background: url('~@/assets/images/banner.png') no-repeat;
  .login {
    height: 401px;
    padding-top: 116px;
    box-sizing: border-box;
    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 32px;
      .user-message {
        display: flex;
        align-items: center;
        width: 418px;
        .user-img {
          width: 136px;
          height: 136px;
          margin-right: 20px;
          .img {
            border: 3px solid #fff;
          }
        }
        .user-text {
          font-size: 30px;
          color: #fff;
        }
      }
      :deep(.van-button--info) {
        background-color: #fff;
      }
      :deep(.van-button--mini) {
        color: #666;
        font-size: 0.05rem !important;
        width: 120px;
        height: 32px;
      }
    }
    .user-attention {
      display: flex;
      justify-content: space-around;
        height: 156px;
      div {
        font-size: 26px;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span:nth-child(1) {
          margin-bottom: 8px;
        }
      }
    }
  }
  .logout {
    display: flex;
    flex-direction: column;
    height: 401px;
    justify-content: center;
    align-items: center;
    .logout-img {
      width: 132px;
      height: 132px;
    }
    .logout-text {
      margin-top: 10px;
      font-size: 28px;
      color: #fff;
    }
  }
}
.main {
  .grid {
    margin-bottom: 10px;
  }
  .toutiao {
    font-size: 48px;
    color: #eb5253;
  }
}
.footer {
  margin-top: 10px;
  height: 88px;
  button {
    width: 100%;
    height: 88px;
    background-color: #fff;
    border: 1px solid #fff;
    span {
      font-size: 28px;
      color: red;
    }
  }
}
</style>
