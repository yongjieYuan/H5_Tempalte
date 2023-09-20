<template>
  <nav class="nav-bar">
    <div class="head">
      <a class="logo-box" href="">
        <img class="logo-box__logo" src="~@images/logo.png" alt="KUNDAX"
      /></a>
      <i class="menu" @click="showPanel = !showPanel"></i>
    </div>
    <div
      v-if="
        $route.name !== 'aboutArticle' &&
        $route.name !== 'remittance' &&
        $route.name !== 'serviceArticle'
      "
      class="nav-panel"
      :class="{ show: showPanel }"
    >
      <NavPanel @close="showPanel = false" />
    </div>
    <div v-else-if="$route.name == 'aboutArticle'">
      <!-- 关于我们选项 -->
      <div class="menu-list" :class="{ menu: showPanel }">
        <ul>
          <li
            @click="navAboutArticlePage(item)"
            v-for="(item, index) in aboutNavList"
            :key="index"
          >
            {{ item.title }}
          </li>
          <!-- <li data-nav="about">公司介绍</li>
          <li data-nav="advantage">我们的优势</li>
          <li data-nav="policy">反洗钱政策</li>
          <li data-nav="disclaimer">免责声明</li>
          <li data-nav="honor">企业荣誉</li> -->
        </ul>
      </div>
    </div>
    <div class="menu-list" :class="{ menu: showPanel }" v-else>
      <ul>
        <li
          v-for="(item, index) in serviceNavList"
          :key="index"
          @click="navServicesArticlePage(item)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import NavPanel from './cpn/nav-panel.vue'
import { bus } from '@/mitt/mitt'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'NavBar',
  data() {
    return {
      showPanel: false
    }
  },
  components: {
    NavPanel
  },
  // // eslint-disable-next-line no-unused-vars
  // beforeRouteUpdate(to, _from) {
  //   this.mathRoute(to.name)
  // },
  created() {
    bus.on('close', () => {
      if (this.showPanel) {
        this.showPanel = false
      }
    })
  },
  unmounted() {
    /// 取消监听所有的事件
    bus.off('*')
  },
  methods: {
    navAboutArticlePage(e) {
      this.showPanel = false
      this.$router.push({ path: `/about/article/${e.id}` })
    },
    navServicesArticlePage(e) {
      this.showPanel = false
      this.$router.push({ path: e.path })
    },
    ...mapMutations(['updateAboutNavList'])
  },
  computed: {
    ...mapGetters(['aboutNavList', 'serviceNavList', 'isEn'])
  }
}
</script>

<style lang="less" scoped>
@navBarHeight: 44px;
.nav-bar {
  position: fixed;
  top: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 44px;
  padding: 7px 25px 7px 13px;
  background-color: var(--primary-color);
  z-index: 999;
  > .head {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .logo-box {
      display: inline-block;
      &__logo {
        width: 97.12px;
      }
    }

    .menu {
      display: block;
      width: 34px;
      height: 34px;
      background-size: 100% 100%;
      background: url('~@images/menu.png') no-repeat center/cover;
      &:active {
        background-color: #e2e4e7;
        transition: all 250ms ease-out;
        border-radius: 4px;
      }
    }
  }
  > .nav-panel {
    position: absolute;
    top: @navBarHeight;
    left: 0;
    right: 0;
    height: 0;
    background-color: #f1f5f8;
    transition: height 250ms ease-out;
    &.show {
      height: calc(100vh - @navBarHeight);
    }
  }
}
.menu-list {
  overflow: hidden;
  position: absolute;
  top: @navBarHeight;
  right: 20px;
  width: auto;
  height: 0;
  transition: height 250ms ease-out;
  ul {
    font-size: 12px;
    color: white;
    li {
      margin-top: 17px;
      line-height: 1.5;
      text-align: center;
    }
  }
  &.menu {
    height: 200px;
  }
}
</style>
