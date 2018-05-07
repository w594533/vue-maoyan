<template>
  <div>
    <spinner type="lines" v-if="loading"></spinner>
    <div v-else>
      <scroller v-if="datas.length > 0" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div>
          <flexbox :gutter="5" v-for="(data, index) in datas">
            <flexbox-item :span="4" class="movie-img">
              <img :src="data.images.small" :alt="data.alt" @click="toDetail(data.id)"/>
            </flexbox-item>
            <flexbox-item class="movie-detail">
              <h2>{{ data.title }}</h2>
              <rater :value="data.rating.average" :disabled="true"></rater>
              <p>{{ data.rating.average }}分</p>
              <p v-if="data.directors.length">导演：{{ data.directors[0].name }}</p>
              <p v-if="data.casts.length">
                主演：{{ data.casts[0].name }}
                <span v-if="data.casts[1]">, {{ data.casts[1].name }}</span>
              </p>
            </flexbox-item>
          </flexbox>
          <load-more tip="loading" v-if="hasNextPage"></load-more>
          <load-more v-else :show-loading="false" tip="已经到底" background-color="#fbf9fe"></load-more>
        </div>
      </scroller>
      <load-more v-else :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, Spinner, Rater, Scroller, LoadMore } from 'vux'
export default {
  props: ['datas', 'loading', 'onFetching', 'hasNextPage'],
  components: {
    Flexbox,
    FlexboxItem,
    Spinner,
    Rater,
    Scroller,
    LoadMore
  },
  data () {
    return {

    }
  },
  mounted () {
    console.log('属性', this.$props)
  },
  methods: {
    onScrollBottom () {
      this.$emit('onScrollBottom')
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.scrollerBottom.reset()
        })
      }, 2000)
    },
    toDetail (id) {
      console.log(id)
      this.$router.push("/detail/"+id)
    }
  }
}
</script>
<style>
.movie-img img {
  width: 100%;
}
.movie-detail p {
    font-size: 14px;
    color: #666;
}
.movie-detail h2 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}
</style>
