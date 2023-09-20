<template>
  <div class="contact-us">
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
export default {
  components: {
    Footer
  }
}
</script>

<style lang="less" scoped>
@navBarHeight: 44px;
@contentHeight: calc(100vh - @navBarHeight);
.contact-us {
  height: @contentHeight;
}
</style>
