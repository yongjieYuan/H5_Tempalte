<template>
  <div class="submit-dialog">
    <i class="close" @click="$emit('onClose')"
      ><van-icon name="cross" color="white"
    /></i>
    <p>提交成功！我们收到会第一时间联系你。 <br />如需汇款请继续填写：</p>
    <van-button color="#557087" type="primary" @click="nav(1)"
      >汇款表格（澳洲向境外）</van-button
    >
    <van-button
      color="#557087"
      type="primary"
      style="margin-top: 10px"
      @click="nav(2)"
      >客户登记授权表（境外向澳洲）</van-button
    >
  </div>
</template>

<script>
import { Button, Icon } from 'vant'
export default {
  emits: ['onClose', 'onNav'],
  methods: {
    nav(e) {
      this.$emit('onNav', e)
    }
  },
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  }
}
</script>

<style lang="less" scoped>
.submit-dialog {
  position: fixed;
  top: 50%;
  left: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  height: 228px;
  padding: 25px 39px;
  transform: translateY(-50%);
  background-color: #fff;
  p {
    margin: 0;
    margin-bottom: 30px;
    font-size: 12px;
    text-align: center;
    color: var(--primary-text-color);
    line-height: 1.5;
  }
  i.close {
    position: absolute;
    top: 1px;
    right: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-text-color);
    font-style: normal;
    font-size: 10px;
    width: 12px;
    height: 12px;
    padding: 2px;
    border-radius: 8px;
  }
}
</style>
