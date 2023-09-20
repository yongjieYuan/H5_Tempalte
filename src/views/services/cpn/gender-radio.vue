<!-- 性别选择 -->
<template>
  <div class="gender-radio">
    <!-- Gender（Please tick） 性别 （请打勾）  -->
    <div class="label">
      <p class="en">{{ enTitle }}</p>
      <p class="zh">{{ zhTitle }}</p>
    </div>
    <div class="gender-wrap">
      <div
        class="radio-item"
        v-for="(item, index) in options"
        :key="index"
        @click="value = item.value"
      >
        <span>{{ item.key }}</span>
        <i class="radio-btn" :class="{ checked: value === item.value }"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { RadioGroup, Radio } from 'vant'
export default {
  name: 'genderRadio',
  emits: ['update:modelValue'],
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  props: {
    enTitle: {
      type: String,
      default: ''
    },
    zhTitle: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: [
        { key: 'Male 男', value: 'Male' },
        { key: 'Female 女', value: 'Female' }
      ]
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
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
.gender-wrap {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .radio-item {
    display: flex;
    align-items: center;
    > span {
      font-size: 14px;
      color: #b9c4ce;
    }
  }
  .radio-btn {
    display: block;
    position: relative;
    width: 41px;
    height: 41px;
    margin-left: 4px;
    border: 1px solid #c5ced6;
    border-radius: 4px;
    background-color: #fff;
    &::before {
      .radio-style();
      background-color: #f1f5f8;
    }
    &.checked::before {
      .radio-style();
      background-color: #00b1cc;
    }
  }
}
.radio-style {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 10px;
}
</style>
