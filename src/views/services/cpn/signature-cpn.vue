<template>
  <div class="signature-wrap">
    <van-button type="primary" color="#557087" size="small" @click="show = true"
      >签名</van-button
    >
    <van-image v-if="image" :src="image" />
  </div>
  <van-dialog
    v-model:show="show"
    :showConfirmButton="false"
    close-on-click-overlay
  >
    <van-signature
      :class="{ 'sign-placeholder': showPlacholder }"
      @submit="onSubmit"
      @start="showPlacholder = false"
      @clear="onClear"
      ref="signature"
      clear-button-text="Re-sign 重签"
    />
  </van-dialog>
</template>

<script>
import { Button, Signature, Image as VanImage, showToast, Dialog } from 'vant'
export default {
  name: 'signatureCpn',
  emits: ['confirm'],
  components: {
    [Signature.name]: Signature,
    [VanImage.name]: VanImage,
    [Dialog.name]: Dialog,
    [Button.name]: Button
  },
  data() {
    return {
      image: '',
      showPlacholder: true,
      show: false
    }
  },
  methods: {
    onSubmit(e) {
      this.image = e.image
      if (!this.image) {
        showToast('请签名')
        return
      }
      this.show = false
      this.$emit('confirm', e.image)
    },
    onClear() {
      this.showPlacholder = true
    }
  }
}
</script>

<style lang="less" scoped>
.signature-wrap {
  text-align: center;
}
:deep(.van-signature__content) {
  height: 40vh;
  border: 1px solid var(--primary-text-color);
}
:deep(.sign-placeholder > .van-signature__content) {
  &::after {
    content: '签名处';
    position: absolute;
    color: var(--secondary-text-color);
    font-weight: 400;
    font-size: 20px;
    z-index: 1;
  }
}
// :deep(.van-signature__footer) {
//   display: flex;
//   justify-content: start;
//   color: black;
// }

:deep(.van-signature__footer) {
  > button {
    color: white;
    border-radius: 0;
    border: none;
    background-color: var(--primary-text-color);
  }
}
</style>
