<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="obj in resultsList"
        :key="obj.art_id"
        :title="obj.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api/'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      resultsList: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResultAPI({
          q: this.keywords,
          page: this.page,
          per_page: this.per_page
        })
        const { results } = data.data
        this.resultsList.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
