<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :immediate-check="false"
    >
      <commentsItem
        v-for="(item, index) in list"
        :key="index"
        :obj="item"
        @reply_cilck="$emit('reply_cilck', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api'
import commentsItem from './commentsItem.vue'
export default {
  components: {
    commentsItem,
  },
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      Validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      limit: 10,
      offset: null,
      error: false
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        const { results } = data.data
        this.list.push(...results)
        this.$emit('updata-totalCount', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      }
    }
  }
}
</script>

<style></style>
