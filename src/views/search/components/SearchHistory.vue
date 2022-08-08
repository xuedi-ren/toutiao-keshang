<template>
  <div>
     <van-cell title="搜索历史">
      <div v-if="isShowDel" >
        <span @click="$emit('delAll')">全部删除</span>
        &nbsp;&nbsp;&nbsp;
      <span @click="isShowDel=false">完成</span>
      </div>
      <van-icon name="delete-o" @click="isShowDel=true" v-else/>
     </van-cell>
     <van-cell
     :title="item"
     v-for="(item, index) in searchHistorys"
     :key="index"
     @click="onSearchItem(item, index)"
     >
      <van-icon name="close" v-if="isShowDel"/>
     </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShowDel: false,
    }
  },
  methods: {
    onSearchItem(item, index) {
      if (this.isShowDel) {
        this.searchHistorys.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  },
}
</script>

<style>

</style>
