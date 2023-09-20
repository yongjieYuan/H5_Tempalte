<!-- 上传组件 -->
<template>
  <div class="upload-cpn">
    <div class="left">
      <div class="photo placeholder" :class="[!image ? uploadType : '']">
        <img
          v-if="image"
          :src="image"
          alt=""
          style="width: 100%; height: 100%; object-fit: contain"
        />
      </div>
    </div>

    <div class="right">
      <van-uploader :after-read="afterRead">
        <i class="upload-btn"></i>
        <span class="upload-text">{{ uploadText }}</span>
      </van-uploader>
    </div>
  </div>
</template>

<script>
import { Uploader, showLoadingToast, showFailToast } from 'vant'
import * as $http from '@/service/api/index'
export default {
  name: 'upladCpn',
  emits: ['onUpload'],
  props: {
    uploadType: {
      type: String,
      default: 'passport',
      validator(value) {
        /* passport: 护照 */
        /* manPassport: 手持护照*/
        /* id: id证件照*/
        /* address: 地址证明*/
        return ['passport', 'selfPassport', 'id', 'address'].includes(value)
      }
    },
    uploadText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      image: ''
    }
  },
  components: {
    [Uploader.name]: Uploader
  },
  methods: {
    // beforeRead(file) {
    //   if (
    //     file.type !== 'image/jpg' &&
    //     file.type !== 'image/jpeg' &&
    //     file.type !== 'image/png'
    //   ) {
    //     showToast('请上传图片!')
    //     return false
    //   }
    //   return true
    // },
    afterRead(file) {
      const loading = showLoadingToast({
        message: 'uploading',
        forbidClick: true
      })
      $http
        .uploadImage(file.file)
        .then((res) => {
          this.image = res.url
          this.$emit('onUpload', res.url)
        })
        .catch((err) => {
          showFailToast(err.message)
        })
        .finally(() => {
          loading.close()
        })
    }
  }
}
</script>

<style lang="less" scoped>
.upload-cpn {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 153px;
  border-radius: 4px;
  margin: 13px 0;
  > .left {
    flex: 4;
    height: 100%;
    background-color: #fff;
    .photo {
      position: relative;
      &.placeholder {
        width: 100%;
        height: 100%;
        &.passport::before {
          .photo-placeholder();
          background: url('~@images/passport.png') no-repeat center/contain;
        }
        &.selfPassport::before {
          .photo-placeholder();
          background: url('~@images/self-photo.png') no-repeat center/contain;
        }
        &.id::before {
          .photo-placeholder();
          background: url('~@images/id-photo.png') no-repeat center/contain;
        }
        &.address::before {
          .photo-placeholder();
          background: url('~@images/address-photo.png') no-repeat center/contain;
        }
      }
    }
  }
  .photo-placeholder {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 88.56px;
    height: 119.04px;
  }
  .right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    height: 100%;
    padding: 0 11px;
    background-color: var(--primary-text-color);
    i.upload-btn {
      position: relative;
      display: block;
      width: 33.97px;
      height: 29.1px;
      margin: 0 auto;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background: url('~@images/upload.png') no-repeat center/contain;
      }
    }
    span.upload-text {
      display: inline-block;

      margin-top: 11px;
      font-size: 8px;
    }
  }
}
</style>
