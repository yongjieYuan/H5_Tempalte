<template>
  <NavBar />
  <main>
    <router-view v-slot="{ Component }">
      <transition enter-active-class="animate__animated animate__fadeIn">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import NavBar from '@/views/nav/nav-bar.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar
  },
  methods: {
    ...mapMutations(['setLocale'])
  },
  created() {
    const curLocale = this.$i18n.locale
    this.setLocale(curLocale)
  }
}
</script>

<style lang="less" scoped>
@import './assets/css/common.css';
@navBarHeight: 44px;
main {
  overflow: hidden;
  margin-top: @navBarHeight;
  /* 设置子元素字体颜色*/
  color: white;
}
</style>
