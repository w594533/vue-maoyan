<template>
  <tab :line-width=1>
    <tab-item :selected="tabSelected === item.key" v-for="(item, index) in tabItems" @on-item-click="tabClick(item.key)" :key="item.key">{{item.title}}</tab-item>
  </tab>
</template>
<script>
import { Tab, TabItem } from 'vux'
export default {
  props: ['tabSelected'],
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      tabItems: [{
        key: 'in_theaters',
        title: '正在上映'
      }, {
        key: 'coming_soon',
        title: '即将上映'
      }]
    }
  },
  methods: {
    tabClick (key) {
      this.$emit('tabClick', key)
    }
  }
}
</script>
