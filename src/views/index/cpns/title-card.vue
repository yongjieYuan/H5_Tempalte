<template>
  <div class="title-card">
    <!-- 栏目 -->
    <div class="label-title">
      <h2 class="en">{{ enTitle }}</h2>
      <h2 class="zh">{{ zhTitle }}</h2>
    </div>
    <!-- 选项 -->
    <div class="tit_area">
      <h3
        class="tit"
        v-for="(item, index) in list"
        :key="index"
        @click="nav(item)"
      >
        {{ item.text }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    zhTitle: {
      type: String,
      default: ''
    },
    enTitle: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    nav(item) {
      if (item.routerName) {
        if (item.tag) {
          this.$router.push({
            name: item.routerName,
            params: { tag: item.tag }
          })
        } else {
          this.$router.push({ name: item.routerName })
        }
      } else {
        this.$router.push({ path: item.path })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title-card {
  color: white;
  h2,
  h3 {
    margin: 0;
    font-weight: 500;
  }
  + .title-card {
    margin-top: 55px;
  }
}
.label-title {
  position: relative;
  width: 214px;
  font-size: 28px;
  color: white;
  h2 {
    &.en {
      font-size: 28px;
    }
    &.zh {
      font-size: 24px;
    }
    margin: 0;
    & + h2 {
      margin-top: 9px;
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: -13px;
    bottom: 5px;
    display: inline-block;
    width: 6px;
    background: white;
  }
}
.tit_area {
  margin-top: 59px;
  margin-left: 13px;
}
h3.tit {
  font-size: 15px;
  letter-spacing: 1px;
  & + h3 {
    margin-top: 25px;
  }
}
</style>
