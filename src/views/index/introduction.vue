<template>
  <section class="introduction">
    <template v-for="(item, index) in content" :key="index">
      <TitleCard
        :zhTitle="item.zhTitle"
        :enTitle="item.enTitle"
        :list="item.list"
      />
    </template>
  </section>
</template>

<script>
import TitleCard from './cpns/title-card.vue'
export default {
  name: 'introduction',
  props: {
    content: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    TitleCard
  }
}
</script>

<style lang="less" scoped>
.introduction {
  // display: flex;
  // flex-direction: column;
  // justify-content: space-around;
  // height: 100%;
  padding: 0 25px;
  + .introduction {
    margin-top: 55px;
  }
}
</style>
