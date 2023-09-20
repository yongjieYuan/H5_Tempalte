<!-- 关于我们的文章 -->
<template>
  <div class="article-wrap">
    <SideBar
      text-color="var(--primary-text-color)"
      style="border-right-color: #f1f5f8"
    />
    <article>
      <div class="banner">
        <div class="head">
          <h1 class="title en-title">
            {{ type === 1 ? 'Company News' : 'Market Insight' }}
          </h1>
          <h1 class="title zh-title">
            {{ type === 1 ? '公司要闻' : '汇市动态' }}<van-icon name="arrow" />
          </h1>
          <div class="site">
            <span
              class="title zh-title"
              @click="$router.push({ name: 'news' })"
              >{{ $t('News') }}</span
            >
            <span class="title zh-title" @click="$router.push({ name: 'news' })"
              >{{ type === 1 ? $t('Company_News') : $t('Market_Insight') }}
            </span>
            <span class="title zh-title">{{ data.title }}</span>
          </div>
        </div>
      </div>
      <div class="content" v-html="data.content"></div>
    </article>
    <Footer style="height: 100vh" />
  </div>
</template>

<script>
import { Icon } from 'vant'
import Footer from '@/components/footer.vue'
import SideBar from '@/components/side-bar.vue'
import { mapGetters } from 'vuex'
import * as $http from '@/service/api/index'
export default {
  components: {
    [Icon.name]: Icon,
    Footer,
    SideBar
  },
  data() {
    return {
      type: 1,
      data: {}
    }
  },
  created() {
    this.type = this.$route.params.type
    const id = this.$route.params.id
    this.getArticle(id)
  },
  methods: {
    getArticle(id) {
      $http.getNewsArticle(id).then((res) => {
        this.data = res
      })
    }
  },
  computed: {
    ...mapGetters(['isEn'])
  }
}
</script>

<style lang="less" scoped>
@sideBarWidth: 49px;

.banner {
  position: relative;
  width: 100%;
  height: 400px;
  background: url('https://picsum.photos/seed/picsum/200/300') no-repeat
    center/cover;
  > .head {
    position: absolute;
    left: 27px;
    bottom: 10px;
  }
}
.article-wrap {
  background-color: #fff;
}
h1 {
  margin: 0;
  + h1 {
    margin-top: 3px;
  }
}
article {
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
