<template>
  <div class="radio-cell-group">
    <div class="label">
      <p class="en">{{ enTitle }}</p>
      <p class="zh">{{ zhTitle }}</p>
    </div>
    <van-radio-group v-model="value">
      <van-cell
        v-for="(item, index) in options"
        :title="item"
        :key="index"
        :title-class="{
          'cell-title': true,
          'cell-title-checked': value === item
        }"
        clickable
        @click="checkRadio(item)"
      >
        <template #right-icon>
          <i :class="value == item ? 'radio-icon-checked' : 'radio-icon'"></i>
        </template>
      </van-cell>
      <van-cell
        title="Others 其他"
        :title-class="{
          'cell-title': true,
          'cell-title-checked': currentChecked == 'Others'
        }"
        clickable
        @click="checkOthers"
      >
        <template #right-icon>
          <i
            :class="
              currentChecked == 'Others' ? 'radio-icon-checked' : 'radio-icon'
            "
          ></i>
        </template>
      </van-cell>
    </van-radio-group>
    <van-field
      v-model="othersReason"
      @update:model-value="onInput"
      :disabled="currentChecked !== 'Others'"
      rows="3"
      autosize
      type="textarea"
      style="margin-top: 10px"
    />
  </div>
</template>

<script>
import { Cell, CellGroup, RadioGroup, Radio, Field } from 'vant'
export default {
  name: 'radioCellGroup',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Field.name]: Field
  },
  emits: ['update:checked'],
  props: {
    zhTitle: { type: String, default: '' },
    enTitle: { type: String, default: '' },
    checked: { type: String, default: '' },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentChecked: '',
      othersReason: ''
    }
  },
  methods: {
    checkRadio(item) {
      this.currentChecked = item
      this.value = item
    },
    checkOthers() {
      this.currentChecked = 'Others'
      this.value = ''
    },
    onInput(e) {
      this.othersReason = e
      this.value = e
    }
  },
  computed: {
    value: {
      get() {
        return this.checked
      },
      set(val) {
        this.$emit('update:checked', val)
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
.radio-icon {
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid #f1f5f8;
  border-radius: 10px;
}
.radio-icon-checked {
  display: block;
  width: 20px;
  height: 20px;
  background-color: #00b1cc;
  border-radius: 10px;
}
:deep(.van-cell) {
  border: 1px solid #c5ced6;
  border-radius: 4px;
  + .van-cell {
    margin-top: 10px;
  }
}

:deep(.cell-title) {
  font-size: 14px;
  font-weight: 400;
  color: var(--secondary-text-color);
}

:deep(.cell-title-checked) {
  color: var(--primary-text-color);
}
</style>
