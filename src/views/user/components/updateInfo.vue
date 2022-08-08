<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="$emit('onclose')"
      @click-right="uploadUserInfo"
    />
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新的昵称"
      show-word-limit
      class="field"
    />
  </div>
</template>

<script>
import { uploadUserInfoAPI } from '@/api'
export default {
  props: {
    value: {
      type: String,
    }
  },
  data() {
    return {
      message: this.value
    }
  },
  methods: {
    async uploadUserInfo() {
      if (!this.message.length) {
        return this.$toast.fail('用户名不能为空')
      }
      try {
        const { data } = await uploadUserInfoAPI(this.message)
        console.log(data)
        this.$emit('onclose')
        this.$emit('updateNickName', this.message)
        this.$toast.success('更新昵称成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('更新昵称失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.field) {
  &.van-cell::after {
    border-bottom: none;
  }
}
</style>
