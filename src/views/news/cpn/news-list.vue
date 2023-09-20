<template>
  <div class="card-list">
    <div
      class="card-content"
      v-for="(item, index) in data"
      :key="index"
      @click="$router.push({ path: `/news/${type}/article/${item.id}` })"
    >
      <img :src="item.image" alt="" />
      <div class="card-text">
        <p class="card-text-first">{{ item.title }}</p>
        <p class="card-text-second">{{ item.createTime }}</p>
        <p class="card-text-third">
          {{ item.title }}
        </p>
      </div>
    </div>
    <van-button type="primary" color="#557087" @click="getMore"
      >查看更多</van-button
    >
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  emits: ['more'],
  components: {
    [Button.name]: Button
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    /// 文章所属栏目：公司:1 or 市场:2
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      page: 1,
      pageSize: 3
    }
  },
  methods: {
    getMore() {
      this.$emit('load', ++this.page, this.pageSize)
    }
  }
}
</script>

<style lang="less" scoped>
.card-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card-content {
  position: relative;
  margin-top: 27px;
  margin-bottom: 16px;
  width: 286px;
  height: 196px;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    object-fit: cover;
  }
  .card-text {
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 10px;
    text-align: center;
    > p {
      margin: 0;
    }
    .card-text-first {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 24px;
    }
    .card-text-second {
      font-size: 14px;
      margin: 3px 0 10px;
    }
    .card-text-third {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 12px;
      line-height: 1.5;
      text-align: start;
    }
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(122, 112, 122, 0.5);
  }
}
</style>
