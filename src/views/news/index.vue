<!-- 新闻界面 -->
<template>
  <div class="news" :style="{ 'background-image': `url(${backgroundImage})` }">
    <SideBar />
    <section class="content">
      <div class="title">
        <h1 class="en">News</h1>
        <h1 class="zh">最新资讯</h1>
      </div>
      <div class="news-list">
        <div class="card-container">
          <div class="news-card">
            <h2 class="card-title en">COMPANY NEWS</h2>
            <h2 class="card-title zh">公司要闻</h2>
            <NewsList :data="companyNews" :type="1" @load="loadCoMore" />
          </div>
          <div class="news-card">
            <h2 id="market-insight" class="card-title en">MARKET INSIGHT</h2>
            <h2 class="card-title zh">汇市动态</h2>
            <NewsList :data="marketNews" :type="2" @load="loadMktMore" />
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import SideBar from '@/components/side-bar.vue'
import { Button } from 'vant'
import { mapGetters } from 'vuex'
import NewsList from './cpn/news-list.vue'
import * as $http from '@/service/api/index'
export default {
  components: {
    Footer,
    SideBar,
    NewsList,
    [Button.name]: Button
  },
  created() {
    this.getBackground()
    this.loadCoMore(1, 3)
    this.loadMktMore(1, 3)
  },
  mounted() {
    if (this.$route.params.tag == 'insight') {
      setTimeout(() => {
        const insightEl = document.querySelector('#market-insight')
        const topOffset = insightEl.offsetTop
        window.scrollTo({ top: topOffset, behavior: 'smooth' })
      }, 600)
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 600)
    }
  },
  data() {
    return {
      backgroundImage: '',
      companyNews: [],
      marketNews: []
    }
  },
  methods: {
    getBackground() {
      $http.getBackground('关于我们').then((res) => {
        this.backgroundImage = res
      })
    },
    loadCoMore(page, pageSize) {
      $http.getNewsList(1, page, pageSize).then((res) => {
        this.companyNews = this.companyNews.concat(res.informationResultList)
      })
    },
    loadMktMore(page, pageSize) {
      $http.getNewsList(2, page, pageSize).then((res) => {
        this.marketNews = this.marketNews.concat(res.informationResultList)
      })
    }
  },
  computed: {
    ...mapGetters(['isEn'])
  }
}
</script>

<style lang="less" scoped>
@contentHeight: calc(100vh - 44px);
p {
  margin: 0;
}
.news {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow-y: auto;
  overflow-x: hidden;
}
.content {
  min-height: @contentHeight;
  padding-left: 49px;
}
.news-list {
  padding: 20px;
  background-color: #fff;
}
.title {
  padding: 62px 0 57px 20px;
  h1 {
    margin: 0;
    font-weight: normal;
    line-height: 1.5;
  }
  .en {
    font-size: 53px;
  }
  .zh {
    font-size: 17px;
  }
}

.news-card {
  h2 {
    color: var(--primary-text-color);
  }
  h2.card-title {
    font-weight: normal;
    margin: 0;
    line-height: 1.5;
    &.zh {
      font-size: 14px;
    }
    &.en {
      font-size: 28px;
    }
  }
  & + .news-card {
    margin-top: 24px;
  }
}
.van-button {
  width: 100%;
  font-size: 10px;
  margin-top: 16px;
}
</style>
