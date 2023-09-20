<template>
  <section class="other">
    <!-- OTHER REQUIREMENTS 补充资料 -->
    <FormTitle zhTitle="补充资料" enTitle="OTHER REQUIREMENTS" />
    <!-- 说明 -->
    <ArticleCollpase class="tips">
      <p>
        Transfer money from overseas to Australia. Customers need to complete
        this form and provide the following appropriate documents
      </p>
      <p>境外向澳洲汇款时，客户需完成该表填写并提供以下相应文件</p>
      <p>
        A.Australian Documents Front and back sides of Australian driver's
        licence/ Passport photo page and signature page/ Front and back sides of
        ID card (Photo ID) Bank Card/Medicare Card Proof of address
      </p>
      <p>
        A.澳籍证件 澳洲驾照正反面 护照照片页及签名页 身份证正反面(Photo ID)
        银行卡或医保卡 地址证明
      </p>
      <p>
        B.Overseas Documents Front and back sides of ID card Passport photo page
        and signature page Australian bank account opening letter or proof of
        address (optional) Australian immigration letter (this applies to SIV
        clients only)
      </p>
      <p>
        B.海外证件 身份证正反面 护照照片页及签名页
        澳洲银行开户信或地址证明（可选）
        澳洲移民局准签打款信（该条仅适用SIV客户）
      </p>
      <p>
        C.Company documents Proof of company registration licenses (ABN, ACN,
        etc.) Documentation of the percentage of corporate shareholding in the
        company Valid identity document of the legal representative and proof of
        address Identification documents of shareholders of companies with more
        than 25% of shares and proof of address Business Customer Registration
        Form Customer Letter of Authorisation
      </p>
      <p>
        C.公司证件 公司注册执照证明（ABN、ACN等） 公司法人股权占比的文件
        法人代表有效身份证件以及地址证明 占股 25%
        以上的公司股东身份证件以及地址证明 企业客户开户信息表 企业客户授权费
      </p>
      <p>
        Attachment: Proof of address : bank statements or other bills valid for
        3 months,e.g. water, electricity, gas, telephone bills, etc.
      </p>
      <p>
        地址证明：3个月内有效的银行流水单或其他账单，如水费、电费、煤气费、话费账单等
      </p>
    </ArticleCollpase>
    <!-- Select customer type 选择客户类型 -->
    <SelectMenu
      zhTitle="选择客户类型"
      enTitle="Select customer type"
      :options="customerTypeOpts"
      v-model="otherFormData.customerType"
    />
    <!-- Select id type 选择证件类型-1 -->
    <SelectMenu
      zhTitle="选择证件类型-1"
      enTitle="Select id type"
      :options="idTypeOpts"
      v-model="otherFormData.customerIdTypeFirst"
    />
    <p class="tips">
      须是清晰彩色原件电子版本。可以是扫描件或数码拍摄照片，支持Jpg、Png、Jpeg的图片格式。驾照/Driver’s
      Licence请上传证件正反面照片 Please upload both front and back photos of
      your ID .
    </p>
    <UploadCpn
      uploadText="上传证件照片(正面)"
      @on-upload="(e) => (otherFormData.frontPhotoFirst = e)"
    />
    <UploadCpn
      uploadText="上传证件照片(反面)"
      @on-upload="(e) => (otherFormData.backPhotoFirst = e)"
    />
    <!-- It should be valid within three months 地址证明信件*信件有效期需在三个月之内 -->
    <SelectMenu
      zhTitle="地址证明信件*信件有效期需在三个月之内-1"
      enTitle="It should be valid within three months"
      :options="proofTypeOpts"
      v-model="otherFormData.proofType"
    />
    <UploadCpn
      uploadType="address"
      uploadText="上传照片"
      @on-upload="(e) => (otherFormData.proofPhoto = e)"
    />
    <!-- Passport / Driver’s Licence Issuer (护照/驾照发行机构) -->
    <TextFormField
      zhTitle="(护照/驾照发行机构)"
      enTitle="Passport / Driver’s Licence Issuer"
      v-model="otherFormData.customerIdIssue"
    />
    <!-- Take a selfie with your passport/driver's license 手持本人护照/驾照自拍照/ -->
    <div class="label">
      <p class="en">Take a selfie with your passport/driver's license</p>
      <p class="zh">手持本人护照/驾照自拍照</p>
    </div>
    <p style="margin: 10px; font-weight: 400; font-size: 14px; color: #b9c4ce">
      须是清晰彩色原件电子版本。可以是扫描件或数
      码拍摄照片，支持Jpg、Png、Jpeg的图片格式。
    </p>
    <!-- 手持本人护照/驾照自拍照/ -->
    <UploadCpn
      uploadType="selfPassport"
      uploadText="上传证件照片"
      @on-upload="(e) => (otherFormData.handPhoto = e)"
    />
    <!-- Select id type 选择证件类型-2 -->
    <SelectMenu
      zhTitle="选择证件类型-2"
      enTitle="Select id type"
      :options="customerIdTypeTwoOpts"
      v-model="otherFormData.customerIdTypeTwo"
    />
    <p class="tips">
      须是清晰彩色原件电子版本。可以是扫描件或数码拍摄照片，支持Jpg、Png、Jpeg的图片格式。请上传证件正反面照片
      Please upload both front and back photos of your ID .
    </p>
    <UploadCpn
      uploadType="id"
      uploadText="上传正面照片"
      @on-upload="(e) => (otherFormData.frontPhoto = e)"
    />
    <UploadCpn
      uploadType="id"
      uploadText="上传反面照片"
      @on-upload="(e) => (otherFormData.backPhoto = e)"
    />
    <!-- others 其他 -->
    <div class="label">
      <p class="en">others</p>
      <p class="zh">其他</p>
    </div>
    <van-uploader
      :after-read="afterRead"
      accept="image/*,.pdf,ppt,pptx,mp4,mp3"
    >
      <van-button type="primary" color="#557087">上传文件</van-button>
    </van-uploader>
    <div class="other-files-wrap">
      <div class="file" v-for="(item, index) in otherFiles" :key="index">
        <div class="upload-file-item">
          <img v-if="item.type === 'image'" :src="item.url" alt="" />
          <img v-else-if="item.type === 'pdf'" src="@images/pdf.png" alt="" />
          <span>{{ item.name }}</span>
        </div>
        <i class="close" @click="deleteFile(index)"
          ><van-icon name="cross" color="white"
        /></i>
      </div>
    </div>
  </section>
</template>

<script>
import FormTitle from './cpn/form-title.vue'
import ArticleCollpase from './cpn/article-collapse.vue'
import SelectMenu from './cpn/select-menu.vue'
import UploadCpn from './cpn/upload-cpn.vue'
import TextFormField from './cpn/text-form-field.vue'
import { Uploader, Button, Icon, showLoadingToast, showFailToast } from 'vant'
import * as $http from '@/service/api/index'
export default {
  name: 'other',
  components: {
    FormTitle,
    ArticleCollpase,
    SelectMenu,
    UploadCpn,
    TextFormField,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  data() {
    return {
      otherFormData: {},
      /// 其他文件
      otherFiles: [],
      customerTypeOpts: [
        { name: '澳洲证件客户', subname: 'Australian document customers' },
        { name: '海外证件客户', subname: 'Overseas document customers' },
        { name: '公司客户', subname: 'Client of Company' }
      ],
      idTypeOpts: [
        { name: '护照', subname: 'Passport' },
        { name: '澳洲证件客户', subname: "Driver's Licence" }
      ],
      /// 地址证明
      proofTypeOpts: [
        { name: '银行对账单', subname: 'bank statement' },
        { name: '电话或互联网账单', subname: 'phone or internet bills' },
        {
          name: '水、电、煤气账单',
          subname: 'water,electricity,gas,internet bills'
        },
        { name: '市政信', subname: 'council letter' }
      ],
      ///证件照类型2
      customerIdTypeTwoOpts: [
        { name: '澳洲身份证', subname: 'Photo ID' },
        { name: '澳洲医保卡', subname: 'Medicare Card' },
        { name: '中国身份证', subname: 'Chinese ID card' },
        { name: '澳洲银行卡', subname: 'Credit/Debit card' },
        { name: '其他有效证件', subname: 'Other valid ID' }
      ]
    }
  },
  methods: {
    deleteFile(index) {
      this.otherFiles.splice(index, 1)
    },
    /// 其他文件
    afterRead(file) {
      const loading = showLoadingToast({
        message: 'uploading',
        forbidClick: true
      })
      $http
        .uploadFile(file.file)
        .then((res) => {
          const fileType =
            file.file.type.split('/')[0] === 'image'
              ? 'image'
              : file.file.type.split('/')[1]
          /// 其他文件
          this.otherFiles.push({
            name: file.file.name,
            url: res.url,
            type: fileType
          })
        })
        .catch((err) => {
          showFailToast(err.message)
        })
        .finally(() => {
          loading.close()
        })
    },
    getFormData() {
      return {
        ...this.otherFormData,
        otherFiles: this.otherFiles.map((e) => e.url).join(',')
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
/*表单中的内容提示，如：声明，友情提示*/
p.tips {
  font-size: 14px;
  color: var(--primary-text-color);
  line-height: 1.5;
}
.tips {
  p {
    margin: 0;
    font-weight: 400;
    font-size: 11px;
    // color: #b9c4ce;
    color: #9aa4ae;
    word-break: break-all;
    line-height: 1.5;
  }
}
.other-files-wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 20px;
  justify-content: space-around;
  margin: 13px 0;
  .file {
    position: relative;
    flex: 1;
    padding: 13px 15px;
    border: 1px solid #e4e9ef;
    border-radius: 4px;
    background-color: white;
    .upload-file-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3px 0;
      background-color: #f1f5f8;
      img {
        height: 39.72px;
        object-fit: contain;
      }
      span {
        display: block;
        font-size: 8px;
        margin-top: 12px;
        color: var(--primary-text-color);
      }
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
}
</style>
