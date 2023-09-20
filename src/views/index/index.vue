<template>
  <div class="index-view" :style="{ backgroundImage }">
    <Leading />
    <Introduction
      v-for="(item, index) in services"
      :content="item"
      :key="index"
    />
    <Footer style="margin-top: 55px" />
    <!-- <van-swipe vertical :show-indicators="false" :loop="false">
      <van-swipe-item>

      </van-swipe-item>
      <van-swipe-item v-for="(item, index) in services" :key="index">

      </van-swipe-item>
      <van-swipe-item>

      </van-swipe-item>
    </van-swipe> -->
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import { mapGetters } from 'vuex'
import Leading from './leading.vue'
import Introduction from './introduction.vue'
import Footer from '@/components/footer.vue'
import * as $http from '@/service/api/index'
export default {
  data() {
    return {
      backgroundImage: '',
      services: [
        [
          {
            enTitle: 'BUSSINESS INTRODUCTION',
            zhTitle: '业务介绍',
            list: [{ text: '在线开户', routerName: 'remittance' }]
          },
          {
            enTitle: 'REAL TIME EXCHANGE RATE',
            zhTitle: '实时汇率',
            list: [{ text: '带您了解最新的汇率情况', routerName: 'rate' }]
          }
        ],
        [
          {
            enTitle: 'CONTACT US',
            zhTitle: '联系我们',
            list: [
              { text: '联系方式', routerName: 'contact' },
              { text: '诚邀合作', routerName: 'contact' }
            ]
          },
          {
            enTitle: 'NEWS',
            zhTitle: '最新资讯',
            list: [
              { text: '公司要闻', routerName: 'news' },
              { text: '汇市动态', routerName: 'news', tag: 'insight' }
            ]
          }
        ]
      ]
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    Leading,
    Introduction,
    Footer
  },
  created() {
    $http.getBackground('首页').then((res) => {
      this.backgroundImage = `url(${res})`
    })
    this.services[0][0].list.push(...this.serviceNavList)
  },
  computed: {
    ...mapGetters(['serviceNavList'])
  }
}
</script>

<style lang="less" scoped>
@navBarHeight: 44px;
.index-view {
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: calc(100vh - @navBarHeight);
  .van-swipe,
  .van-swipe-item {
    height: 100%;
  }
}
</style>
