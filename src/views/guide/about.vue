<template>
  <div class="about-us">
    <div class="header">
      <h1 class="en">About Us</h1>
      <h1 class="zh">关于我们</h1>
    </div>
    <div
      class="banner"
      @click="nav(`/about/article/${item.id}`)"
      v-for="(item, index) in list"
      :key="index"
    >
      <img :src="item.cover" alt="cover" />
      <div class="title">
        <h3 class="en">{{ item.titile }}</h3>
        <h3 class="zh">{{ item.subtitile }}</h3>
      </div>
    </div>
    <!-- <div class="banner" @click="nav('/about/article/advantage')">
      <img src="https://picsum.photos/id/259/300/200" alt="" />
      <h3>{{ $t('Our_Advantage') }}</h3>
    </div>
    <div class="banner" @click="nav('/about/article/policy')">
      <img src="https://picsum.photos/id/259/300/200" alt="" />
      <h3>{{ $t('Disclaimer') }}</h3>
    </div>
    <div class="banner" @click="nav('/about/article/disclaimer')">
      <img src="https://picsum.photos/id/259/300/200" alt="" />
      <h3>{{ $t('Kundax_Honor') }}</h3>
    </div>
    <div class="banner" @click="nav('/about/article/honor')">
      <img src="https://picsum.photos/id/259/300/200" alt="" />
      <h3>{{ $t('Kundax_Honor') }}</h3>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as $http from '@/service/api/index'
export default {
  created() {
    this.getAboutUsList()
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    nav(e) {
      this.$router.push({ path: e })
    },
    async getAboutUsList() {
      this.list = await $http.getArticleList()
    }
  },
  components: {},
  computed: {
    ...mapGetters(['isEn'])
  }
}
</script>

<style lang="less" scoped>
.about-us {
  padding: 0 20px;
}
.header {
  margin-top: 55px;
  margin-bottom: 62px;
  h1 {
    margin: 0;
    font-size: 17px;
    font-weight: normal;
    line-height: 1.5;
    &.en {
      font-size: 53px;
      font-weight: 600;
    }
  }
}
.banner {
  &:last-child {
    margin-bottom: 27px;
  }
  & + .banner {
    margin-top: 38px;
  }
  img {
    width: 286px;
    height: 150px;
    border-radius: 4px;
    object-fit: cover;
  }
  .title {
    position: relative;
    left: 7px;
    margin: 0;
    margin-top: 19px;
    &::after {
      content: '';
      position: absolute;
      left: -7px;
      top: 2px;
      bottom: 2px;
      width: 1px;
      background-color: #fff;
    }
    h3 {
      margin: 0;
      font-size: 11px;
      font-weight: normal;
      line-height: 1.5;
      .en {
        font-size: 14px;
      }
    }
  }
}
</style>
