<template>
  <div>
    <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      :title="item"
      icon="search"
    />
  </div>
</template>

<script>
import { getSearchSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsAPI(this.keywords)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 500)
  }
}
</script>

<style></style>
