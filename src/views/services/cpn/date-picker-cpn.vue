<template>
  <div class="date-picker">
    <van-button type="primary" plain @click="showBottom = !showBottom">
      <template #default>
        <span class="btn-text">{{ dateText }}</span>
        <span class="btn-text">{{ value }}</span>
      </template>
    </van-button>
    <van-popup v-model:show="showBottom" round position="bottom">
      <van-date-picker
        :columns-type="[dateType]"
        :min-date="new Date(1970)"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { Button } from 'vant'
import { Popup } from 'vant'
import { DatePicker } from 'vant'
export default {
  name: 'datePicker',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number]
    },
    dateType: {
      type: String,
      default: 'day',
      validator(value) {
        return ['year', 'month', 'day'].includes(value)
      }
    },
    dateText: {
      type: String,
      default: ''
    }
  },
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [DatePicker.name]: DatePicker
  },
  data() {
    return {
      showBottom: false
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
  },
  methods: {
    onConfirm(data) {
      this.value = data.selectedValues[0]
      this.showBottom = false
    },
    onCancel() {
      this.showBottom = false
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-button) {
  border: 1px solid var(--secondary-text-color);
}
:deep(.van-button__text) {
  font-size: 14px;
  color: var(--secondary-text-color);
}
span.btn-text + span {
  margin-left: 18px;
}
</style>
