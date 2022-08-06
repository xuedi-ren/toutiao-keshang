<template>
  <div>
    <!-- !顶部导航 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="nav-bar"
    />
    <!-- !具体信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <input
        type="file"
        hidden
        ref="file"
        accept=".png, .jpg, .gif, .jpeg"
        @change="selectPhoto"
      />
    </van-cell>
    <!-- !展示头像弹层 -->
    <van-popup
      class="avator-popup"
      v-model="isShow"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <updateAvator :photo="photo" v-if="isShow" @upload-avator="userInfo.photo = $event"></updateAvator>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
import updateAvator from './components/updateAvator.vue'
import { resolveToBase64 } from '@/utils'
export default {
  name: 'User',
  components: {
    updateAvator
  },
  data() {
    return {
      userInfo: {},
      isShow: false,
      photo: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfoAPI()
        console.log(data.data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('获取用户信息失败，请刷新后重试')
      }
    },
    async selectPhoto(e) {
      const file = e.target.files[0]
      // const url = window.URL.createObjectURL(file)
      // this.photo = url
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   this.photo = e.target.result
      //   e.target.value = ''
      //   this.isShow = true
      // }
      const url = await resolveToBase64(file)
      this.photo = url
      // 清空value， 让用户可以选择同一张图片
      e.target.value = ''
      this.isShow = true
    }
  }
}
</script>

<style scoped lang="less">
:deep(.nav-bar) {
  background-color: #3396fc;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
