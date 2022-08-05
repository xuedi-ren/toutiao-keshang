<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3396fb"
        placeholder="请输入搜索关键词"
        show-action
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
      />
    </form>
    <!-- <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult>
    <SearchHistory></SearchHistory> -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'Search',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSearchRensult: false
    }
  },
  computed: {
    componentName() {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchRensult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch() {
      console.log('小啊giao')
      this.isShowSearchRensult = true
    },
    onSearchFocus() {
      this.isShowSearchRensult = false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
