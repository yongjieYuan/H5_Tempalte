<template>
  <div class="select-menu">
    <div class="label">
      <p class="en">{{ enTitle }}</p>
      <p class="zh">{{ zhTitle }}</p>
    </div>
    <van-cell
      is-link
      :title="value ? value : '请选择'"
      @click="show = true"
      @select="onSelect"
      title-class="cell-title-style"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <div class="cell-right-icon">
          <van-icon name="arrow" color="#557087" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet
      v-model:show="show"
      :actions="options"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { ActionSheet, Cell } from 'vant'
import { Icon } from 'vant'
export default {
  name: 'selectMenu',
  emits: ['update:modelValue'],
  props: ['zhTitle', 'enTitle', 'placeholder', 'options', 'modelValue'],
  components: {
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onCancel() {
      this.show = false
    },
    onSelect(val) {
      this.value = `${val.name} ${val.subname}`
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.label {
  margin-top: 13px;
  margin-bottom: 6px;
  p {
    position: relative;
    margin: 0;
    padding-left: 7px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--primary-text-color);
  }
  .en {
    position: relative;
    padding-left: 7px;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -3.5px;
      transform: translateY(-50%);
      width: 7px;
      height: 7px;
      border-radius: 3.5px;
      background-color: var(--primary-text-color);
    }
  }
}
:deep(.van-cell) {
  border: 1px solid #c5ced6;
  border-radius: 4px;
}
:deep(.cell-title-style) {
  font-size: 14px;
  color: var(--secondary-text-color);
}
</style>
