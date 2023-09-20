<template>
  <div class="text-form-field">
    <div class="label">
      <p class="en">{{ enTitle }}</p>
      <p class="zh">{{ zhTitle }}</p>
    </div>
    <div style="margin-top: 6px; margin-bottom: 15px">
      <van-form>
        <van-field
          v-model="value"
          :disabled="disabled"
          :placeholder="placeholder"
          :rules="[
            {
              required: true,
              message: placeholder,
              trigger: 'onBlur'
            }
          ]"
        />
      </van-form>
    </div>
  </div>
</template>

<script>
import { Form, Field, CellGroup } from 'vant'
export default {
  props: ['zhTitle', 'enTitle', 'placeholder', 'modelValue', 'disabled'],
  emits: ['update:modelValue'],
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
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

:deep(.van-cell) {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #c5ced6;
}
</style>
