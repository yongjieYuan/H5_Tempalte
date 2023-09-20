<!-- 适用于服务的文章 -->
<template>
  <div class="service-article">
    <SideBar
      text-color="var(--primary-text-color)"
      style="border-right-color: #f1f5f8"
    />
    <div class="article-wrap">
      <div
        class="banner"
        :style="{ 'background-image': `url(${data.topImage})` }"
      >
        <div class="head">
          <h1 class="title en-title">
            {{ data.businessName }}
          </h1>
          <h1 class="title zh-title">
            {{ data.subtitile }}<van-icon name="arrow" />
          </h1>
          <div class="site">
            <span
              class="title zh-title"
              @click="$router.push({ name: 'services' })"
              >{{ $t('Service') }}</span
            >
            <span class="title zh-title">{{ data.businessName }}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <article v-html="data.content"></article>
      </div>
    </div>
    <Footer style="height: 100vh" />
  </div>
</template>

<script>
import { Icon } from 'vant'
import Footer from '@/components/footer.vue'
import SideBar from '@/components/side-bar.vue'
import { mapGetters } from 'vuex'
import * as $http from '@/service/api/index'
// import { AboutUsDynamicRoute } from '@/store/constants'
export default {
  components: {
    [Icon.name]: Icon,
    Footer,
    SideBar
  },
  created() {
    this.getArticleDetail(this.$route.params.id)
  },
  data() {
    return {
      /// 文章数据
      data: {}
    }
  },
  computed: {
    ...mapGetters(['isEn'])
  },
  beforeRouteUpdate(to, from, next) {
    this.getArticleDetail(to.params.id)
    next()
  },
  methods: {
    getArticleDetail(id) {
      $http.getServiceArticle(id).then((res) => {
        this.data = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
@sideBarWidth: 49px;

.banner {
  position: relative;
  width: 100%;
  height: 400px;
  background-repeat: no-repeat;
  background-size: cover;
  > .head {
    position: absolute;
    left: 27px;
    bottom: 10px;
  }
}
.about-article {
  background-color: #fff;
}
h1 {
  margin: 0;
}
.article-wrap {
  padding-left: @sideBarWidth;
  min-height: 100vh;
}
.title {
  font-weight: normal;
  &.zh-title {
    font-size: 10px;
  }
  &.en-title {
    width: 164px;
    font-size: 31px;
  }
}
.site > span {
  display: inline-block;
  margin-right: 30px;
}

.content {
  margin: 10px 22px 46px 19px;
  color: #b9c4ce;
  font-size: 14px;
}
</style>
