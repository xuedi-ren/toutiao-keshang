<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单输入框 -->
    <van-form @submit="onSubmit" class="form-m">
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
import { login } from '@/api/user'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules
    }
  },
  methods: {
    async onSubmit () {
      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
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
</style>
