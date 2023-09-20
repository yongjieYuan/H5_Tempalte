<template>
  <div class="drop-down" @click="showOptions">
    <van-popover :actions="actions" @select="onSelect" style="height: 20vh">
      <template #reference>
        <div class="left">
          <slot name="left"></slot>
          <i class="drop-down-icon" :class="{ up: isExpand }"></i>
        </div>
      </template>
    </van-popover>
  </div>
</template>

<script>
import { Popover } from 'vant'
export default {
  emits: ['onChange'],
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isExpand: false
    }
  },
  components: {
    [Popover.name]: Popover
  },
  methods: {
    showOptions() {
      this.isExpand = !this.isExpand
    },
    onSelect(action, index) {
      this.$emit('onChange', action, index)
    }
  },
  computed: {
    actions() {
      return this.options.map((item) => {
        return {
          text: item.exchangeCurrency || item.sourceCurrency,
          id: item.exchangeCurrencyId || item.sourceCurrencyId,
          cn: item.sourceCurrencyCN || item.exchangeCurrencyCN
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.drop-down .left {
  display: flex;
  align-items: center;
}
.drop-down-icon {
  width: 10px;
  height: 10px;
  background: url('~@images/arrow_down_grey.png') no-repeat center/contain;
  margin-left: 8px;
  transition: all 250ms;
  &.up {
    transform: rotate(-180deg);
  }
}
.drop-down-menu {
  overflow: auto;
  max-height: 120px;
  padding: 8px 10px;
  > li {
    font-size: 16px;
    color: var(--secondary-text-color);
    padding: 4px;
  }
}
</style>
