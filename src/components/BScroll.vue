<template>
  <div class="wrapper" ref="wrapper"><slot></slot></div>
</template>

<script>
import BScroll from '@better-scroll/core'
export default {
  data() {
    return {
      scroll: null
    }
  },
  props: {
    bonceTop: {
      type: Boolean,
      default: true
    },
    bonceBottom: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        bounce: {
          top: this.bonceTop,
          bottom: this.bonceBottom
        }
      })
      this.scroll.refresh()
    }, 200)
  },
  unmounted() {
    this.scroll = null
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  overflow: hidden;
}
</style>
