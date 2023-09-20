<!-- 带有侧边栏页面的主体内容 -->
<template>
  <div
    class="guide"
    :style="{ backgroundImage: !this.isBlur ? background : '' }"
  >
    <!-- 模糊背景 -->
    <div
      class="bg-blur"
      v-if="this.isBlur"
      :style="{ backgroundImage: background }"
    ></div>
    <SideBar />
    <div class="content" :style="{ 'margin-left': isContactUs ? 0 : '' }">
      <router-view v-slot="{ Component }">
        <transition enter-active-class="animate__animated animate__bounceInUp">
          <component :is="Component" />
        </transition>
      </router-view>
      <div
        id="exchange-btn"
        v-if="isBlur"
        class="exchange-calculate"
        @click="$router.push({ path: '/calculator' })"
      >
        <i></i>
        <p>汇率计算器</p>
      </div>
    </div>
    <Footer v-if="showFooter" class="footer-height" />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import SideBar from '../../components/side-bar.vue'

import * as $http from '@/service/api/index'
export default {
  data() {
    return {
      isBlur: false,
      showFooter: true,
      background: '',
      // 以下界面使用纯白
      filterRoutes: ['aboutArticle'],
      // 是否是“联系我们”,如果是，.content的左边距要去掉
      isContactUs: false
    }
  },
  components: {
    SideBar,
    Footer
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(to, from) {
    if (to.name === 'rate') {
      this.isBlur = true
    } else {
      this.isBlur = false
    }
    if (to.name === 'rate' || to.name === 'contact') {
      this.showFooter = false
    } else {
      this.showFooter = true
    }
    if (to.name === 'contact') {
      this.isContactUs = true
    } else {
      this.isContactUs = false
    }
    this.getBackground(to.name)
  },
  beforeRouteEnter(to, from, next) {
    /// 获取当前路由名
    next((vm) => {
      vm.getBackground(to.name)
    })
  },
  created() {
    const currRoute = this.$router.currentRoute._rawValue.name
    if (currRoute === 'rate') {
      this.isBlur = true
      this.showFooter = false
    } else if (currRoute === 'contact') {
      this.showFooter = false
      this.isBlur = false
      this.isContactUs = true
    }
  },
  methods: {
    /// 获取背景图片
    getBackground(routeName) {
      let param = '关于我们'
      switch (routeName) {
        case 'about':
          param = '关于我们'
          break
        case 'services':
          param = '业务介绍'
          break
        case 'rate':
          param = '实时汇率'
          break
        case 'contact':
          param = '联系我们'
          break
      }
      if (param === '实时汇率') {
        this.background = `url(${require('@/assets/images/currency.png')})`
      } else {
        $http.getBackground(param).then((res) => {
          if (res instanceof Array && res.length == 0) {
            return
          }
          this.background = `url(${res})`
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@navBarHeight: 44px;
@contentHeight: calc(100vh - @navBarHeight);
.guide {
  overflow: auto;
  overflow-x: hidden;
  min-height: @contentHeight;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  transition: all 500ms;
}
.content {
  position: relative;
  flex: 1;
  min-height: @contentHeight;
  // height: @contentHeight;
  margin-left: 49px;
  z-index: 99;
}
.footer-height {
  height: calc(100vh - @navBarHeight);
}

.bg-blur {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: -10px;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  -o-filter: blur(10px);
  filter: blur(10px);
}
.exchange-calculate {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 49px;
  right: 0;
  background-color: var(--primary-blue);
  font-size: 14px;
  height: 60px;
  i {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-right: 4px;
    background: url('~@images/calculate.png') no-repeat center/contain;
  }
  p {
    margin: 0;
  }
}
</style>
