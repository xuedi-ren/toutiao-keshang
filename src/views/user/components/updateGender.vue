<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @change="onChange"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      :default-index="value"
    />
  </div>
</template>

<script>
import { uploadUserGenderAPI } from '@/api'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  methods: {
    onChange(picker, value, index) {
      this.gender = index
    },
    async onConfirm() {
      try {
        const { data } = await uploadUserGenderAPI(this.gender)
        console.log(data)
        this.$emit('close')
        this.$emit('updateGender', this.gender)
        this.$toast.success('更新性别成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('更新性别失败')
      }
    },
  }
}
</script>

<style></style>
