<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单输入框 -->
    <van-form @submit="onSubmit" class="form-m" ref="inp">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <!-- 插入字体图标 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 插入字体图标 -->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 发送验证码 -->
        <template #button>
          <van-button
            round
            size="mini"
            class="code-btn"
            v-if="isShowCode"
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >
          <van-count-down
            :time="3 * 1000"
            format="sss"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div class="btn">
        <!-- 登录按钮 -->
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'
import { login, getCodeAPI } from '@/api'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCode: true
    }
  },
  methods: {
    loading () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
    },
    async onSubmit () {
      try {
        this.loading()
        const { data: { data } } = await login(this.mobile, this.code)
        console.log(data)
        this.$store.commit('SET_TOKEN', data)
        this.$router.push('/layout/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分失败
        console.log(error)
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode () {
      this.$refs.inp.validate('mobile').then(async () => {
        this.loading()
        try {
          await getCodeAPI(this.mobile)

          this.$toast.success('获取验证成功发')
          this.isShowCode = false
        } catch (error) {
          const status = error.response.status
          let message = '手机号错误'
          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form-m) {
  i.toutiao {
    font-size: 40px;
    margin-right: 30px;
  }
  .btn {
    margin: 53px 28px;
  }
}
:deep(.code-btn) {
  padding: 0 0.2rem;
  background-color: #eee;
  color: #a9929b;
}
</style>
