<!-- 自定义文本折叠 -->

<template>
  <div class="statement">
    <article
      :class="{ 'article-collapse': !isCollapse }"
      :style="{ '-webkit-line-clamp': clampLine }"
    >
      <slot></slot>
    </article>
    <van-button
      class="more"
      color="#557087"
      type="primary"
      square
      size="small"
      @click="isCollapse = !isCollapse"
      >{{ isCollapse ? '收起' : '点击查看更多' }}</van-button
    >
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'articelCollapse',
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      isCollapse: false
    }
  },
  props: {
    clampLine: {
      type: Number,
      default: 2
    }
  }
}
</script>

<style lang="less" scoped>
.statement {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article-collapse {
  // overflow: hidden;
  // text-overflow: ellipsis;
  // display: -webkit-box;
  // -webkit-box-orient: vertical;
  display: block;
  max-height: calc(1.2em * 3); /* Display up to 3 lines of text */
  line-height: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
}
.more {
  padding: 6px;
  font-size: 11px;
  margin: 13px 0;
}
</style>
