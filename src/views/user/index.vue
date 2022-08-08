<template>
  <div>
    <!-- !顶部导航 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="nav-bar"
    />
    <!-- !具体头像 -->
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
      <updateAvator
        :photo="photo"
        v-if="isShow"
        @upload-avator="userInfo.photo = $event"
      ></updateAvator>
    </van-popup>
    <!-- !昵称 -->
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isShowNickName = true"
    />
    <!-- !性别 -->
    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
      @click="isShowGender = true"
    />
    <!-- !生日 -->
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="isShowBirthday = true"
    />
    <!-- !编辑昵称 -->
    <van-popup
      class="nickName-popup"
      v-model="isShowNickName"
      closeable
      :style="{ height: '100%', width: '100%' }"
      position="bottom"
    >
      <updateInfo
        :value="userInfo.name"
        @onclose="isShowNickName = false"
        @updateNickName="userInfo.name = $event"
      ></updateInfo>
    </van-popup>
    <!-- !编辑性别 -->
    <van-popup
      class="nickName-popup"
      v-model="isShowGender"
      closeable
      position="bottom"
    >
      <updateGender
      v-if="isShowGender"
        v-model="userInfo.gender"
        @close="isShowGender = false"
        @updateGender="updateGenders"
      ></updateGender>
    </van-popup>
    <!-- !编辑生日 -->
    <van-popup
      class="nickName-popup"
      v-model="isShowBirthday"
      closeable
      position="bottom"
    >
      <updateBirthday
      v-if="isShowBirthday"
        v-model="userInfo.birthday"
        @close="isShowBirthday = false"
        @updateBirthday="userInfo.birthday=$event"
      ></updateBirthday>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
import updateAvator from './components/updateAvator.vue'
import { resolveToBase64 } from '@/utils'
import updateInfo from './components/updateInfo.vue'
import updateGender from './components/updateGender.vue'
import updateBirthday from './components/updateBirthday.vue'
export default {
  name: 'User',
  components: {
    updateAvator,
    updateInfo,
    updateGender,
    updateBirthday
  },
  data() {
    return {
      userInfo: {},
      isShow: false,
      photo: '',
      isShowNickName: false,
      isShowGender: false,
      isShowBirthday: false,
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
    },
    updateGenders(ind) {
      console.log(ind)
      this.userInfo.gender = ind
      console.log(this.userInfo.gender)
      // this.getUserInfo()
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
.nickName-popup {
  background-color: #fff;
}
:deep(.van-icon-cross) {
  display: none;
}
</style>
