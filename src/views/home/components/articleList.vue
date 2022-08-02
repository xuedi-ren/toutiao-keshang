<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="loadNextPageArticle">
      <van-list
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多文章了~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <articleItem
          v-for="obj in articles"
          :key="obj.art_id"
          :articleInfo="obj"
        ></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api/'
import articleItem from '@/components/articleItem.vue'
export default {
  components: {
    articleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articles: [],
      loading: false,
      pre_timestamp: '',
      finished: false,
      error: false,
      refreshing: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
        // 保存下一页时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('请刷新后重新获取文章')
      }
    },
    // 加载下一页文章
    async loadNextPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        // 存储数据
        if (data.data.pre_timestamp === null) {
          this.finished = true
        }
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 更新时间戳
        this.pre_timestamp = data.data.pre_timestamp
        console.log(data)
      } catch (error) {
        this.error = true
      } finally {
        // 更新loading
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style></style>
