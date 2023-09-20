<template>
  <div class="date-form-field">
    <div class="label">
      <p class="en">{{ enTitle }}</p>
      <p class="zh">{{ zhTitle }}</p>
    </div>
    <div class="date-pick-wrap" :class="{ mask: disabled }">
      <DatePickerCpn dateText="日" v-model="dayVal" />
      <DatePickerCpn dateText="月" dateType="month" v-model="monthVal" />
      <DatePickerCpn dateText="年" dateType="year" v-model="yearVal" />
    </div>
  </div>
</template>

<script>
import DatePickerCpn from '@/views/services/cpn/date-picker-cpn.vue'
export default {
  name: 'dateFormField',
  props: ['day', 'month', 'year', 'zhTitle', 'enTitle', 'disabled'],
  emits: ['update:day', 'update:month', 'update:year'],
  components: {
    DatePickerCpn
  },
  computed: {
    dayVal: {
      get() {
        return this.day
      },
      set(value) {
        this.$emit('update:day', value)
      }
    },
    monthVal: {
      get() {
        return this.month
      },
      set(value) {
        this.$emit('update:month', value)
      }
    },
    yearVal: {
      get() {
        return this.year
      },
      set(value) {
        this.$emit('update:year', value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.date-pick-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;

  &.mask::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}

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
</style>
