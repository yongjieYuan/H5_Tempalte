<!-- 侧边栏 -->
<template>
  <nav class="side-bar">
    <ul class="nav-title" :style="{ color: textColor }">
      <li
        class="tab"
        v-for="(item, index) in navTitle"
        :key="index"
        @click="nav(item)"
        :class="{
          selected: currRoute == item.routeName,
          'dark-indicator': $route.name === 'aboutArticle'
        }"
      >
        {{ isEn ? item.en : item.zh }}
      </li>
    </ul>
  </nav>
</template>

<script>
import { bus } from '@/mitt/mitt'
import { mapGetters } from 'vuex'
export default {
  name: 'side-bar',
  created() {
    this.currRoute = this.$router.currentRoute._rawValue.name
    if (this.currRoute === 'aboutArticle') {
      this.currRoute = 'about'
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(to, from) {
    this.currRoute = to.name
    if (this.currRoute === 'aboutArticle') {
      this.currRoute = 'about'
    }
  },
  props: {
    // 导航栏文本颜色
    textColor: {
      type: String,
      default: 'white'
    }
    /// 导航栏border颜色
  },
  data() {
    return {
      currRoute: '',
      navTitle: [
        { zh: '首页', en: 'INDEX', routeName: 'index' },
        { zh: '关于我们', en: 'ABOUT US', routeName: 'about' },
        { zh: '业务介绍', en: 'BUSINESS INTRODUCTION', routeName: 'services' },
        { zh: '实时汇率', en: 'LIVE RATE', routeName: 'rate' },
        { zh: '联系我们', en: 'CONTACT US', routeName: 'contact' }
      ]
    }
  },
  methods: {
    nav(route) {
      this.currRoute = route.routeName
      this.$router.push({ name: this.currRoute })
      bus.emit('close', '')
    }
  },
  computed: {
    ...mapGetters(['isEn'])
  }
}
</script>

<style lang="less" scoped>
.side-bar {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 48px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
}
.nav-title {
  > li {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 14px;
    letter-spacing: 1px;
    // 文字竖向排列
    writing-mode: vertical-lr;
    // &.enMode {
    //   transform: rotate(180deg);
    // }
    & + li {
      margin-top: 25px;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: #fff;
      opacity: 0;
      transition: opacity 350ms;
    }
    &.selected::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: #fff;
      opacity: 1;
    }
    &.selected.dark-indicator::after {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: var(--primary-text-color);
      opacity: 1;
    }
  }
}
</style>
