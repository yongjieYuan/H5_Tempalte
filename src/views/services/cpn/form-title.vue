<template>
  <div class="form-title">
    <h4>{{ enTitle }}</h4>
    <h4>{{ zhTitle }}</h4>
  </div>
</template>

<script>
export default {
  props: ['zhTitle', 'enTitle']
}
</script>

<style lang="less" scoped>
.form-title {
  position: relative;
  margin-top: 18px;
  margin-bottom: 22px;
  padding: 10px 0;
  padding-left: 11px;
  border-top: 1px solid #e4e9ef;
  border-bottom: 1px solid #e4e9ef;
  color: var(--primary-text-color);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 14px;
    bottom: 14px;
    width: 6px;
    background-color: var(--primary-text-color);
  }
}

h4 {
  margin: 0;
  font-weight: normal;
  font-size: 22px;
}
</style>
