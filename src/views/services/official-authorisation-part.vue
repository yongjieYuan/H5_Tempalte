<template>
  <div class="offical-auth">
    <!-- OFFICIAL AUTHORISATION  官方授权 -->
    <FormTitle zhTitle="官方授权" enTitle="OFFICIAL AUTHORISATION" />
    <div class="statement">
      <p>To the Following Personnel to Trade with Kundax</p>
      <p>兹授权与坤达速汇交接的指定人员如下</p>
    </div>
    <!-- Name 名字 -->
    <section v-for="(item, index) in 3" :key="index">
      <div class="part">
        <span>Personnel {{ index + 1 }}</span>
        <span>人员{{ index + 1 }}</span>
      </div>
      <!-- Contact Number 联系电话 -->
      <TextFormField
        zhTitle="联系电话"
        enTitle="Contact Number"
        placeholder="填写联系电话"
        v-model="personList[index].contractNumber"
      />
      <!-- ID No.  证件号码 -->
      <TextFormField
        zhTitle="证件号码"
        enTitle="ID No."
        placeholder="填写证件号码"
        v-model="personList[index].idNumber"
      />
      <!-- Expiry Date（D/M/Y）有效期限 -->
      <DateFormField
        zhTitle="有效期限"
        enTitle="Expiry Date（D/M/Y）"
        v-model:day="personList[index].expire_day"
        v-model:month="personList[index].expire_month"
        v-model:year="personList[index].expire_year"
      />
      <!-- Tel 电话 -->
      <TextFormField
        zhTitle="电话"
        enTitle="Tel"
        placeholder="填写电话"
        v-model="personList[index].phone"
      />
      <!-- Position 职位 -->
      <TextFormField
        zhTitle="职位"
        enTitle="Position"
        placeholder="填写职位"
        v-model="personList[index].position"
      />
      <!-- Name 名字 -->
      <TextFormField
        zhTitle="名字"
        enTitle="Name"
        placeholder="填写名字"
        v-model="personList[index].name"
      />
    </section>
    <div class="tips">
      <p>Note: Kundax Must be Informed of Any Changes to the Above.</p>
      <p>注：以上名单如有变化必须及时通知坤达速汇</p>
    </div>
  </div>
</template>

<script>
import FormTitle from './cpn/form-title.vue'
import TextFormField from './cpn/text-form-field.vue'
import DateFormField from './cpn/date-form-filed.vue'
import { showToast } from 'vant'
export default {
  name: 'officalAuth',
  components: {
    FormTitle,
    TextFormField,
    DateFormField
  },
  data() {
    return {
      personList: [{}, {}, {}]
    }
  },
  methods: {
    getFormData() {
      if (!this.validator()) {
        showToast('请填写人员完整的有效期')
        return
      }
      const data = [{}, {}, {}]
      /// 处理日期
      this.personList.forEach((item, index) => {
        data[index].contractNumber = item.contractNumber
        data[index].idNumber = item.idNumber
        data[
          index
        ].expireDate = `${item.expire_year}${item.expire_month}${item.expire_day}`
        data.phone = item.phone
        data.position = item.position
        data.name = item.name
      })
      return {
        personList: JSON.stringify(data)
      }
    },
    validator() {
      let res = true
      for (const item of this.personList) {
        if (!item.expire_year || !item.expire_month || !item.expire_day) {
          res = false
          break
        }
      }
      return res
    }
  }
}
</script>

<style lang="less" scoped>
section > .part {
  display: block;
  margin-top: 13px;
  margin-bottom: 8px;
  padding-left: 11px;
  span {
    display: block;
    font-size: 13px;
    color: var(--primary-text-color);
  }
}
.statement {
  padding: 0 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e9ef;
  p {
    margin: 0;
    font-size: 13px;
    color: var(--primary-text-color);
  }
}
.tips {
  > p {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: var(--primary-text-color);
  }
}
</style>
