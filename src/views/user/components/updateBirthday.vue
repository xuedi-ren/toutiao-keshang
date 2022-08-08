<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { uploadUserBirthdayAPI } from '@/api'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm() {
      try {
        const currentDate = this.dayjs(this.currentDate).format('YYYY-MM-DD')
        console.log(currentDate)
        const { data } = await uploadUserBirthdayAPI(currentDate)
        console.log(data)
        this.$emit('close')
        this.$emit('updateBirthday', currentDate)
        this.$toast.success('更新生日成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('更新生日失败')
      }
    }
  }
}
</script>

<style></style>
