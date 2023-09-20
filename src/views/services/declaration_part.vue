<!-- 表单内容过多，提出表单中的声明部分 -->
<template>
  <div class="declaration-part">
    <!-- KUNDAX DECLARATION 坤达速汇声明 -->
    <FormTitle
      zhTitle="坤达速汇声明"
      enTitle="KUNDAX DECLARATION"
      style="border-top: none"
    />
    <div class="decla-content">
      <h4>KUNDAX Disclaimer</h4>
      <p>
        By conducting commercial transactions with Kundax and by submitting this
        form and associated forms of identification to us by mail, in person or
        electronically, the applicant and customer hereby agrees to and consents
        to the terms and conditions of service available from our website at
      </p>
      <a href="https://www.kundax.com.au">https://www.kundax.com.au</a>
      <br />
      <em>KUNDAX免责声明</em>
      <p>
        客户与Kundax进行商业交易，以邮件、电子通讯方式或亲临
        Kundax公司向我们提供此表格和相关身份证明，申请人和客户特此同意我们的官方网址https://www.kundax.com.au提供的服务条款和条件。
      </p>
    </div>
    <!-- CUSTOMER DECLARATION客户声明 -->
    <FormTitle zhTitle="客户声明" enTitle="CUSTOMER DECLARATION" />
    <div class="decla-content">
      <p>
        I authorise Kundax Pty Ltd to complete the above transaction. I take
        full responsibility of all the information above. I am NOT politically
        exposed persons (PEPs), all my funds are NOT sourced from any kinds of
        corruption, money laundering and terrorist financing activities.
      </p>
      <p>
        本人授权坤达速汇（Kundax Pty
        Ltd）完成以上交易，并为以上填写内容负责。本人不是政治要人或其亲密家人或密切关系人，我的资金来源不是通过贪污腐败、洗钱、犯罪、恐怖活动等获取。
      </p>
    </div>
    <!-- 签名 -->
    <!-- Name 全名 -->
    <TextFormField
      zhTitle="全名"
      enTitle="Name"
      placeholder="填写全名"
      v-model="customerName"
    />
    <SignatureCpn @confirm="onConfirm" />
    <!-- Date（D/M/Y) 日期（日/月/年） -->
    <DateFormField
      zhTitle="日期（日/月/年）"
      enTitle="Date（D/M/Y)"
      v-model:day="date.day"
      v-model:month="date.month"
      v-model:year="date.year"
    />
  </div>
</template>

<script>
import FormTitle from './cpn/form-title.vue'
import TextFormField from './cpn/text-form-field.vue'
import SignatureCpn from './cpn/signature-cpn.vue'
import DateFormField from './cpn/date-form-filed.vue'
import * as $http from '@/service/api/index'
export default {
  name: 'declartation-part',
  components: {
    FormTitle,
    TextFormField,
    DateFormField,
    SignatureCpn
  },
  data() {
    return {
      customerName: '',
      signatureImage: '',
      date: {
        year: new Date().getFullYear(),
        month: `${new Date().getMonth() + 1}`.padStart(2, '0'),
        day: `${new Date().getDate()}`.padStart(2, '0')
      }
    }
  },
  methods: {
    onConfirm(e) {
      $http.uploadBase64(e).then((res) => {
        this.signatureImage = res.url
      })
    },
    getFormData() {
      const year = this.date.year
      const month = this.date.month
      const day = this.date.day
      return {
        customerName: this.customerName,
        signatureImage: this.signatureImage,
        date: `${year}${month}${day}`
      }
    }
  }
}
</script>

<style TextFormFieldlang="less" scoped>
.decla-content {
  font-size: 11px;
  color: var(--secondary-text-color);
  margin-bottom: 18px;
  line-height: 14px;
}
h4,
p {
  margin: 0;
}

a {
  color: var(--secondary-text-color);
}

h4 {
  font-weight: normal;
}
</style>
