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
        @cancel="$router.back()"
      />
    </form>
    <!-- <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult>
    <SearchHistory></SearchHistory> -->
    <div class="container">
      <component
        :is="componentName"
        :keywords="keywords"
        @search="onSearch"
        :searchHistorys="searchHistorys"
        @delAll="searchHistorys = []"
      ></component>
    </div>
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import Storage from '@/utils/storage'
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
      isShowSearchRensult: false,
      searchHistorys: Storage.get('TOUTIAO_SEARCH_HISTORY') || []
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
    onSearch(value) {
      this.keywords = value
      // 判断搜索历史是否重复
      const index = this.searchHistorys.indexOf(value)
      if (index !== -1) {
        this.searchHistorys.splice(index, 1)
      }
      this.searchHistorys.unshift(value)
      // 展示搜索结果
      this.isShowSearchRensult = true
    },
    onSearchFocus() {
      this.isShowSearchRensult = false
    }
  },
  watch: {
    searchHistorys(value) {
      Storage.set('TOUTIAO_SEARCH_HISTORY', value)
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.container {
  padding-top: 108px;
}
</style>
