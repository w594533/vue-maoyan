<template>
  <div>
    <spinner type="lines" v-if="loading"></spinner>
    <div v-else>
      <x-header :title="info.title"></x-header>
      <section class="msg-movie">
        <flexbox>
          <flexbox-item :span="4" class="msg-img-wrap">
            <img :src="info.images.small" :alt="info.alt"/>
          </flexbox-item>
          <flexbox-item class="">
            <h3 class="msg-movie-title">{{info.title}}</h3>
            <rater :value="info.rating.average" :disabled="true"></rater>
            <p>{{info.year}}年</p>
            <p>{{info.genres.join(", ")}}</p>
            <p v-for="item in info.countries">{{item}}</p>
            <p v-for="item in info.durations" v-if="item.indexOf('中国')>0">{{item}}</p>
            <p v-for="item in info.pubdates" v-if="item.indexOf('中国')>0">{{item}}</p>
          </flexbox-item>
        </flexbox>
      </section>
      <section class="msg-count">
        <div>{{info.wish_count}}人想看</div>
        <div>{{info.reviews_count}}人看过</div>
      </section>
      <section class="msg-summary">
        {{info.summary}}
      </section>
      <section class="msg-star">
        <h3>演职人员</h3>
          <div class="box msg-scroll">
            <div class="box-item" v-for="item in info.directors">
              <img :src="info.images.small" :alt="item.alt"/>
              <p class="role">{{item.name}}[导演]</p>
            </div>
            <div class="box-item" v-for="item in info.casts">
              <img :src="info.images.small" :alt="item.alt"/>
              <p class="role">{{item.name}}</p>
            </div>
          </div>
      </section>
    </div>
  </div>
</template>
<script>
import { XHeader, Spinner, Rater, Scroller, Flexbox, FlexboxItem } from 'vux'
export default {
  components: {
    XHeader,
    Spinner,
    Rater,
    Scroller,
    Flexbox,
    FlexboxItem,
  },
  data () {
    return {
      info: {},
      loading: true
    }
  },
  mounted () {
    this.fetchDetail()
  },
  methods: {
    fetchDetail () {
      const id = this.$route.params.id
      if (!id) return
      this.$http.jsonp('https://api.douban.com/v2/movie/subject/'+id, {}).then(function (response) {
        this.info = response.data
        this.loading = false
      }).catch(function (response) {
        console.log(response)
      })
    }
  }

}
</script>
<style>
.msg-img-wrap {
  margin-right: 10px;
}
.msg-img-wrap img {
  width: 100%;
  border: 1px solid white;
}
.msg-movie {
  display: flex;
  padding: 15px;
  color: #6b6868;
  background-color: #b4b1b1;
}
.msg-count {
   display: flex;
   justify-content: center;
   padding: 10px;
 }
 .msg-count div {
   margin-right: 20px;
   margin-left: 20px;
   font-size: 14px;
   line-height: 30px;
   text-align: center;
   width: 100px;
   height: 30px;
   color: white;
   border-radius: 5px;
   background-color: #e54847;
 }
 .msg-summary {
   padding: 10px;
   font-size: 14px;
   color: #555;
 }

.msg-scroll {
    white-space: nowrap;
    overflow-x: scroll;
    margin-top: 10px;
}

.box-item {
  width: 100px;
  display: inline-block;
  margin-left: 5px;
}
.box-item img {
  width: 100%;
}
.box-item:first-child {
  margin-left: 0;
}
.role {
    font-size: 14px;
    margin: 2px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
</style>
