<template>
  <div>
    <van-cell
     v-for="(item, index) in suggestions"
     :key="index"
      icon="search"
      @click="$emit('search', item)"
      >
      <div v-html="hightLight(item)"></div>
    </van-cell>
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
        this.suggestions = data.data.options.filter((obj) => {
          return Boolean(obj)
        })
      } catch (error) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 500),
    hightLight(text) {
      const res = `<span style="color: red">${this.keywords}</span>`
      const reg = new RegExp(this.keywords, 'gi')
      return text.replace(reg, res)
    }
  }
}
</script>

<style></style>
