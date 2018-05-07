<template>
  <div>
    <v-header @tabClick="tabClick" v-bind:tabSelected="tabSelected"></v-header>
    <v-list @onScrollBottom="onScrollBottom" :onFetching="onFetching" :datas="datas" v-bind:loading="loading" :hasNextPage="hasNextPage"></v-list>
  </div>
</template>
<script>
import header from './header'
import list from './list'
import http from '@/http'
export default {
  components: {
    'v-header': header,
    'v-list': list
  },
  data () {
    return {
      tabSelected: 'in_theaters',
      loading: true,
      onFetching: false,
      hasNextPage: true,
      limit: 20, // 每页显示的数量
      current: 1,
      datas: []
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    tabClick (selected) {
      this.tabSelected = selected
      this.current = 1
      this.datas = []
      this.hasNextPage = true
      this.loading = true
      this.fetch()
    },
    onScrollBottom () {
      if (!this.onFetching) {
        this.fetch()
      }
    },
    fetch (params = {}) {
      if (!this.hasNextPage) return
      this.onFetching = true
      this.$http.jsonp('https://api.douban.com/v2/movie/'+this.tabSelected, {
        params: {
          start: (this.current - 1) * this.limit,
          ...params
        }
      })
        .then(function (response) {
          const data = response.data
          if (this.limit * this.current >= data.total) {
            this.hasNextPage = false
          } else {
            this.current++
          }
          this.datas.push(...data.subjects)
          this.loading = false
          this.onFetching = false
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  }
}
</script>
