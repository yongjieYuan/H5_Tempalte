<!-- 汇款表单：表单主要内容，”声明“已拆分至同一文件夹下 -->
<template>
  <div class="remittance">
    <SideBar textColor="#557087" style="background-color: white" />
    <!-- 头部 -->
    <header>
      <div class="banner">
        <h1 class="title en-title">Service</h1>
        <h1 class="title zh-title">业务介绍<van-icon name="arrow" /></h1>
        <div class="site">
          <span class="parent">业务介绍</span>
          <van-icon name="arrow" size="6px" style="margin: 0 15px" />
          <span class="child">在线开户</span>
        </div>
      </div>
    </header>
    <main>
      <!-- 切换表格 -->
      <div class="switch-btn">
        <van-button
          type="primary"
          :color="formType === 1 ? '#557087' : 'rgba(85, 112, 135, .3)'"
          @click="formType = 1"
          >汇款表格</van-button
        >
        <van-button
          type="primary"
          @click="formType = 2"
          :color="formType === 2 ? '#557087' : 'rgba(85, 112, 135, .3)'"
          >客户登记授权表</van-button
        >
        <van-button
          type="primary"
          @click="formType = 3"
          :color="formType === 3 ? '#557087' : 'rgba(85, 112, 135, .3)'"
          >企业开户信息表</van-button
        >
      </div>
      <!-- 说明 -->
      <p class="attention">
        尊敬的客户您好，请详细填写以下内容，填写后完成您在坤达速汇的授权登记。资料不全会造成汇款延误
        ，感谢您的配合。 <br />Please fill in the following form carefully
        ,after completing the form, you will complete the registration at
        Kundax. Incomplete information will cause remittance delays. We
        appreciate your understanding and support.
      </p>
      <!-- 汇款人资料 -->
      <section class="form-field">
        <!-- 标题 -->
        <FormTitle
          zhTitle="汇款人资料"
          enTitle="SENDER’SDETAILS"
          v-if="formType == 1"
        />
        <FormTitle
          zhTitle="客户资料"
          enTitle="CUSTOMER DETAIL"
          v-else-if="formType == 2"
        />
        <FormTitle
          zhTitle="公司信息"
          enTitle="COMPANY DETAILS"
          v-else-if="formType == 3"
        />
        <!-- 内容 -->
        <!-- 汇款身份 -->
        <div class="form-wrap">
          <div class="remitter-role" v-if="formType == 1">
            <!-- 个人 -->
            <van-button
              type="primary"
              @click="senderType = 1"
              :color="senderType != 1 ? 'white' : '#557087'"
              :style="
                senderType != 1
                  ? 'border: 1px solid #557087; color: #557087'
                  : ''
              "
              >Individual 个人</van-button
            >
            <!-- 公司 -->
            <van-button
              type="primary"
              @click="senderType = 2"
              :color="senderType != 2 ? 'white' : '#557087'"
              :style="
                senderType != 2
                  ? 'border: 1px solid #557087; color: #557087'
                  : ''
              "
              >Corporate Client 公司</van-button
            >
          </div>
          <!-- Sender’s Familv Name 汇款人姓名 -->
          <TextFormField
            zhTitle="汇款人姓名"
            v-if="(formType == 1 && senderType == 1) || formType == 2"
            enTitle="Sender’s Familv Name"
            placeholder="填写汇款人姓名"
            v-model="formData.name"
          />
          <!-- Gender（Please tick） 性别 （请打勾）  -->
          <GenderRadio
            v-if="formType == 2"
            v-model="formData.gender"
            zhTitle="性别 （请打勾）"
            enTitle="Gender（Please tick"
          />
          <!-- 出生日期 -->
          <DateFormField
            v-if="formType !== 3"
            zhTitle="出生日期"
            enTitle="Date of Birth（D/M/Y）"
            v-model:day="birthDay.day"
            v-model:month="birthDay.month"
            v-model:year="birthDay.year"
          />
          <!-- Company Name 公司名称 -->
          <TextFormField
            v-if="(formType == 1 && senderType == 2) || formType === 3"
            v-model="formData.name"
            zhTitle="公司名称"
            enTitle="Company Name"
            placeholder="填写公司名称"
          />
          <!-- ABN / ACN 企业注册号码 -->
          <TextFormField
            v-if="formType === 3"
            zhTitle="企业注册号码"
            v-model="formData.number"
            enTitle="AABN / ACN"
            placeholder="填写企业注册号码"
          />
          <!-- ABN/ACN No.澳洲企业编号 -->
          <TextFormField
            v-if="formType == 1 && senderType == 2"
            zhTitle="澳洲企业编号"
            v-model="formData.number"
            enTitle="ABN/ACN No."
            placeholder="填写澳洲企业编号"
          />
          <!-- Mobile No. / Home Number 手机号/家庭电话 -->
          <TextFormField
            v-if="formType === 2"
            zhTitle="手机号/家庭电话"
            enTitle="Mobile No. / Home Number"
            placeholder="手机号/家庭电话"
            v-model="formData.phone"
          />
          <!-- Contact (Family / Given Name)  联系人姓名 -->
          <TextFormField
            v-if="formType === 3"
            zhTitle="联系人姓名"
            enTitle="Contact (Family / Given Name)"
            placeholder="填写联系人姓名"
            v-model="formData.contractName"
          />
          <!-- Contact Number 联系电话 -->
          <TextFormField
            v-if="formType === 3"
            zhTitle="联系电话"
            enTitle="Contact Number"
            placeholder="联系电话"
            v-model="formData.phone"
          />
          <!-- Occupation 职业 -->
          <TextFormField
            v-if="formType !== 3"
            zhTitle="职业"
            enTitle="Occupation"
            placeholder="填写职业"
            v-model="formData.occupation"
          />
          <!-- Email 邮箱 -->
          <TextFormField
            zhTitle="邮箱"
            enTitle="Email"
            placeholder="填写邮箱"
            v-model="formData.email"
          />
          <!-- Mobile No.电话号码 -->
          <TextFormField
            v-if="formType === 1"
            zhTitle="电话号码"
            enTitle="Mobile No."
            placeholder="填写电话号码"
            v-model="formData.phone"
          />
          <!-- ID Type  证件类型 -->
          <TextFormField
            v-if="formType !== 3"
            zhTitle="证件类型"
            enTitle="ID Type "
            placeholder="填写证件类型"
            v-model="formData.idType"
          />
          <!-- ID No.证件号码 -->
          <TextFormField
            v-if="formType !== 3"
            zhTitle="证件号码"
            enTitle="ID No."
            placeholder="填写证件号码"
            v-model="formData.idNumber"
          />
          <!--EID Expiry Date（D/M/Y）证件有效期限-->
          <DateFormField
            v-if="formType == 2"
            zhTitle="证件有效期限"
            enTitle="EID Expiry Date（D/M/Y）"
            v-model:day="expireDate.day"
            v-model:month="expireDate.month"
            v-model:year="expireDate.year"
          />
          <!--Expiry Date（D/M/Y）有效期限-->
          <DateFormField
            v-if="formType == 1"
            zhTitle="有效期限"
            enTitle="Expiry Date（D/M/Y）"
            v-model:day="expireDate.day"
            v-model:month="expireDate.month"
            v-model:year="expireDate.year"
          />
          <!-- Sender’s Address 汇款人地址 -->
          <TextFormField
            v-if="formType === 1"
            zhTitle="汇款人地址"
            enTitle="Sender’s Address"
            placeholder="详细地址"
            v-model="formData.address"
          />
          <!-- Customer’s Address 客户地址 -->
          <TextFormField
            v-if="formType == 2"
            zhTitle="客户地址"
            enTitle="Customer’s Address"
            placeholder="详细地址"
            v-model="formData.address"
          />
          <!-- Fax 传真 -->
          <TextFormField
            v-if="formType === 3"
            zhTitle="传真"
            enTitle="Fax"
            placeholder="填写传真"
            v-model="formData.fax"
          />
          <!-- Company Address 公司地址  -->
          <TextFormField
            v-if="formType === 3"
            zhTitle="公司地址"
            enTitle="Company Address"
            placeholder="详细地址"
            v-model="formData.address"
          />
        </div>
      </section>
      <!-- Source of Funds（Please tick） 资金来源 （请打勾） -->
      <section v-if="formType !== 3">
        <RadioCellGroup
          zh-title="资金来源（请打勾）"
          enTitle="Source of Funds（Please tick"
          :options="fundsSource"
          v-model:checked="formData.source"
        />
      </section>
      <!-- Money Transfer Purpose ( Please tick ) 汇款用途（请打勾） -->
      <section v-if="formType !== 3">
        <RadioCellGroup
          zh-title="汇款用途（请打勾）"
          enTitle=" Money Transfer Purpose ( Please tick )"
          :options="transPurpose"
          v-model:checked="formData.purpose"
        />
      </section>
      <!-- PAYMENT DETAILS 汇款信息 -->
      <section v-if="formType !== 3">
        <FormTitle zhTitle="汇款信息" enTitle="PAYMENT DETAILS" />
        <!-- Base Currency 基准货币 -->
        <TextFormField
          zhTitle="基准货币"
          enTitle="Base Currency"
          placeholder="填写基准货币"
          v-model="formData.baseCurrency"
        />
        <!-- Target currency 目标货币 -->
        <TextFormField
          zhTitle="目标货币"
          enTitle="Target currency"
          placeholder="填写目标货币"
          v-model="formData.targetCurrency"
        />
        <!-- Payment Method ( please tick ) 付款方式（ 请打勾 ） -->
        <RadioCellGroup
          zh-title="付款方式（ 请打勾 ）"
          enTitle="Payment Method ( please tick )"
          :options="payMethods"
          v-model:checked="formData.paymentMethod"
        />
      </section>
      <!-- 收款人信息 -->
      <!-- RECIPIENT'S DETAILS 收款人信息 -->
      <section v-if="formType !== 3">
        <FormTitle zhTitle="收款人信息" enTitle="RECIPIENT'S DETAILS" />
        <template v-if="formType == 1">
          <!-- Recipient's Name (Family/Given) 收款人姓名 -->
          <TextFormField
            zhTitle="收款人姓名"
            enTitle="Recipient's Name (Family/Given)"
            v-model="formData.recipientName"
          />
          <!-- Relationship With Sender  和汇款人关系 -->
          <TextFormField
            zhTitle="和汇款人关系"
            enTitle="Relationship With Sender"
            v-model="formData.relationship"
          />
          <!-- Contact Number 联络电话号码 -->
          <TextFormField
            zhTitle="联络电话号码"
            enTitle="Contact Number"
            v-model="formData.contactNumber"
          />
          <!-- Recipient's Residential Address 收款人地址 -->
          <TextFormField
            zhTitle="收款人地址"
            enTitle="Recipient's Residential Address"
            v-model="formData.recipientAddress"
          />
          <!-- Bank Name 银行名称 -->
          <TextFormField
            zhTitle="银行名称"
            enTitle="Bank Name"
            v-model="formData.bankName"
          />
          <!-- Bank Account Number (IBAN if in Eourope)  银行账号 (如收款人在欧洲，此处填写IBM） -->
          <TextFormField
            zhTitle="银行账号 (如收款人在欧洲，此处填写IBM）"
            enTitle="Bank Account Number (IBAN if in Eourope)"
            v-model="formData.bankAccountNumber"
          />
          <!-- Bank Address (Branch Details) 银行地址 (支行信息) -->
          <TextFormField
            zhTitle="银行地址 (支行信息)"
            enTitle="Bank Address (Branch Details) "
            v-model="formData.bankAddress"
          />
          <!-- BIC/Swift Code (optional) 国际清算账户号 (选填) -->
          <TextFormField
            zhTitle="国际清算账户号 (选填)"
            enTitle="BIC/Swift Code (optional) "
            v-model="formData.optionalCode"
          />
        </template>
        <template v-if="formType == 2">
          <!-- A/C Name 开户名 -->
          <TextFormField
            enTitle="A/C Name"
            zhTitle="开户名"
            placeholder="填写开户名"
            v-model="formData.accountName"
          />
          <!-- Contact Number 联络电话号码 -->
          <TextFormField
            enTitle="Contact Number"
            zhTitle="联络电话号码"
            placeholder="填写联络电话号码"
            v-model="formData.contactNumber"
          />
          <!-- Recipient's Residential Address 收款人地址 -->
          <TextFormField
            enTitle="Recipient's Residential Address"
            zhTitle="收款人地址"
            placeholder="详细地址"
            v-model="formData.recipientAddress"
          />
          <!-- Bank Name 银行名称 -->
          <TextFormField
            enTitle="Bank Name"
            zhTitle="银行名称"
            placeholder="填写银行名称"
            v-model="formData.bankName"
          />
          <!-- Bank Address 银行地址 -->
          <TextFormField
            enTitle="Bank Address"
            zhTitle="银行地址"
            placeholder="详细地址"
            v-model="formData.bankAddress"
          />
          <!-- BSB Number 银行支行代号 -->
          <TextFormField
            enTitle="BSB Number"
            zhTitle="银行支行代号"
            placeholder="填写银行支行代号"
            v-model="formData.bankCode"
          />
          <!-- A/C Number 账户号码 -->
          <TextFormField
            enTitle="A/C Number"
            zhTitle="账户号码"
            placeholder="填写账户号码"
            v-model="formData.bankAccountNumber"
          />
          <!-- Swift Code（optinal）   银行代码（选填） -->
          <TextFormField
            enTitle="Swift Code（optinal）"
            zhTitle="银行代码（选填）"
            placeholder="填写银行代码（选填）"
            v-model="formData.swiftCode"
          />
        </template>
      </section>
      <section v-if="formType === 3">
        <OfficialAuthorisationPart ref="officalAuthPart" />
      </section>
      <!-- OTHER REQUIREMENTS 补充资料 -->
      <section>
        <OtherPart ref="otherForm" />
      </section>
      <!-- KIND REMINDER 友情提醒 -->
      <FormTitle zhTitle="友情提醒" enTitle="KIND REMINDER" />
      <ArticleCollapse class="tips">
        <p>
          1.Please kindly note that Kundax does not take any cash deposit and
          any transfer directly from Chinese company accounts.As the account
          number changes from time to time, please be sure to verify the
          validity of the account number with us on the day of transfer. In
          addition, each transfer must be made in strict accordance with the
          amount and method specified by our company.
        </p>
        <p>
          1.请注意，我司不接受任何形式的现金存款及从中国大陆公司账户直接转入所提供账户的转款。因账号时有改变，请务必在转账当天与我们核实使用账号的有效性。另外，每笔转账必须严格按照我司指定金额及方式转款。
        </p>
        <p>
          2.When you transfer your money, for the column of REMARKS, please
          LEAVE IT BLANK or fill in with information advised only by Kundax
          Customer Service.After transaction please remember to put your
          transfer receipt and email them to the Kundax email address which is
          dealing with your case.
        </p>
        <p>
          2.汇款时在"备注/附言"栏，请保持空白、或填写"往来款",不要填写其他信息。转款后，请将转款的收据或底单发送至为您办理业务的坤达速汇营业部联系人。
        </p>
        <p>
          3.Reminder: Please do not believe any false propaganda of any fake
          company, institution, person or website. Whenever you receive a text
          message or phone call from a stranger who requesting transfer or
          remittance money, please don’t listen, believe, transfer or remittance
          money to them . Avoid being deceived.
        </p>
        <p>
          3.慎防诈骗提示：请不要相信任何虚假公司、机构、个人及网站虚假宣传，凡是接到陌生人要求转账、汇款的短信或电话、请您做到不听、不信、不转账、不汇款，以防受骗。
        </p>
      </ArticleCollapse>
      <!-- 速汇声明 -->
      <section>
        <DeclarationPart ref="declaraForm" />
      </section>
      <van-button
        type="primary"
        color="#557087"
        @click="onSubmit"
        style="
          font-size: 7px;
          border-radius: 0;
          padding: 12px 71px;
          margin: 24px 16px;
        "
        >Submission Form 提交表格</van-button
      >
      <van-checkbox
        v-model="isAgree"
        checked-color="#557087"
        shape="square"
        icon-size="14px"
        style="margin-bottom: 45px"
        >我已阅读并同意
        <a href="">《隐私保护政策条款》</a
        >，并确认上述信息和提供的文件真实无误。</van-checkbox
      >
    </main>
    <Footer />
    <van-overlay z-index="9999" :show="showDialog">
      <SubmitDialog @onClose="showDialog = false" @onNav="handleDialogEvent" />
    </van-overlay>
  </div>
</template>

<script>
import SideBar from '@/components/side-bar.vue'
import Footer from '@/components/footer.vue'
import FormTitle from './cpn/form-title.vue'
import TextFormField from './cpn/text-form-field.vue'
import DateFormField from './cpn/date-form-filed.vue'
/// 声明部分
import DeclarationPart from './declaration_part.vue'
/// 补充资料
import OtherPart from './other_part.vue'
/// 企业开户 OFFICIAL AUTHORISATION
import OfficialAuthorisationPart from './official-authorisation-part.vue'
import RadioCellGroup from './cpn/radio-cell-group.vue'
import ArticleCollapse from './cpn/article-collapse.vue'
import GenderRadio from './cpn/gender-radio.vue'
import SubmitDialog from './cpn/submit-dialog.vue'
import { otherFormValidateKeys } from '@/store/constants'
import { Icon, Checkbox, Button, Overlay, showToast } from 'vant'
import * as $http from '@/service/api/index'
export default {
  components: {
    ArticleCollapse,
    DateFormField,
    DeclarationPart,
    Footer,
    FormTitle,
    GenderRadio,
    OtherPart,
    OfficialAuthorisationPart,
    RadioCellGroup,
    SideBar,
    SubmitDialog,
    TextFormField,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Overlay.name]: Overlay
  },
  data() {
    return {
      /// 表单数据
      formData: {},
      /// 出生日期
      birthDay: {},
      /// 有效期限
      expireDate: {},
      /// 1:汇款表格，2:客户登记授权表 3: 企业开户信息
      formType: 1,
      /// 汇款人类型
      /// 1: 个人，2: 公司
      senderType: 1,
      showDialog: false,
      /// 同意条款
      isAgree: false,
      /// 资金来源
      fundsSource: [
        'Deposit 存款',
        'Loan 借款',
        'Gift 馈赠',
        'Business Income 生意收入'
      ],
      /// 汇款用途
      transPurpose: [
        'Family Support 家用',
        'Gift 馈赠',
        'Business Purpose 商业用途'
      ],
      /// 付款方式
      payMethods: ['Cash 现金', 'Money Transfer 转账']
    }
  },
  created() {
    const type = this.$route.params.type
    if (type) {
      this.initData()
      this.formType = type
    }
  },
  methods: {
    /// 初始化数据
    initData() {
      this.formData = {}
      this.birthDay = {}
      this.expireDate = {}
      this.isAgree = false
    },
    /// 提交
    onSubmit() {
      if (!this.isAgree) {
        showToast('请同意我们的条款')
        return
      }
      /// 处理出生日期格式
      this.formData.birthDay = this.formatDate(
        this.birthDay.year,
        this.birthDay.month,
        this.birthDay.day
      )
      /// 处理expireDate
      this.formData.expireDate = this.formatDate(
        this.expireDate.year,
        this.expireDate.month,
        this.expireDate.day
      )
      /// 获取补充资料的内容
      const otherForm = this.$refs.otherForm.getFormData()
      /// 获取声明内容
      const declaraForm = this.$refs.declaraForm.getFormData()
      let data = Object.assign(this.formData, otherForm, declaraForm)
      if (data.signatureImage === '') {
        showToast('请确认签名信息')
        return
      }
      /// 表单类型
      const type = this.senderType == 1 ? 'INDIVIDUAL' : 'COMPANY'
      data.type = type
      /// 检验表单
      if (!this.validator(this.formType, data)) {
        return
      }
      if (this.formType === 1) {
        $http
          .saveRemittance(data)
          // eslint-disable-next-line no-unused-vars
          .then((_) => {
            showToast('提交成功')
            location.reload()
          })
          // eslint-disable-next-line no-unused-vars
          .catch((err) => {
            showToast('提交失败')
          })
      } else if (this.formType === 2) {
        $http
          .saveAuthorization(data)
          // eslint-disable-next-line no-unused-vars
          .then((_) => {
            showToast('提交成功')
            location.reload()
          })
          // eslint-disable-next-line no-unused-vars
          .catch((err) => {
            showToast('提交失败')
          })
      } else if (this.formType === 3) {
        // 企业开户
        const authFormData = this.$refs.officalAuthPart.getFormData()
        data = Object.assign(data, authFormData)
        delete data.birthDay
        delete data.expireDate
        delete data.type
        $http
          .saveEnterprise(data)
          // eslint-disable-next-line no-unused-vars
          .then((_) => {
            this.showDialog = true
          })
          // eslint-disable-next-line no-unused-vars
          .catch((err) => {
            showToast('提交失败')
          })
      }
    },
    /// 格式化日期
    formatDate(year, month, day) {
      const _year = year
      const _month = `${month}`.padStart(2, '0')
      const _day = `${day}`.padStart(2, '0')
      return _year + _month + _day
    },
    handleDialogEvent(e) {
      this.showDialog = false
      this.initData()
      this.formType = e
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    // 表单验证
    validator(type, data) {
      let errorMsg = null
      if (type === 2) {
        if (data.gender === '') {
          showToast('请选择性别')
          return false
        }
      }
      if (type !== 3) {
        if (!data.source || !data.purpose || !data.paymentMethod) {
          showToast('请检查资金来源、用途或付款方式等输入信息')
          return false
        }
      }
      /// 检查补充资料的填写
      for (const key of otherFormValidateKeys) {
        if (!data[key]) {
          errorMsg = '请检查补充资料的填写'
          break
        }
      }
      if (errorMsg !== null) {
        showToast(errorMsg)
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less" scoped>
@sideBarWidth: 49px;
.remittance {
  overflow: hidden;
  min-height: 100vh;
  background: #f1f5f8;
}

h1 {
  margin: 0;
  line-height: 1.5;
  font-weight: normal;
  &.zh-title {
    font-size: 10px;
  }
  &.en-title {
    font-size: 31px;
    font-weight: 600;
  }
}

.site span {
  font-size: 10px;
}

header {
  position: relative;
  width: 100%;
  height: 400px;
  margin-left: @sideBarWidth;
  background: url('~@images/open-an-account-online_bg.png') no-repeat
    center/cover;
  > .banner {
    position: absolute;
    left: 27px;
    bottom: 10px;
  }
}

main {
  padding-left: 9px;
  padding-right: 20px;
  margin-left: @sideBarWidth;
}
.switch-btn {
  display: flex;
  justify-content: space-evenly;
  margin: 34px 0;
}
:deep(.van-button__text) {
  font-size: 10px;
}
.attention {
  margin-left: 11px;
  color: var(--secondary-text-color);
  font-size: 12px;
  line-height: 24px;
}

.remitter-role {
  display: flex;
  justify-content: space-between;
}

section.form-field {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  .form-wrap {
    padding: 6px;
  }
}

:deep(.van-checkbox__label) {
  margin-left: 3px;
  line-height: 1.5;
  font-size: 8px;
  color: var(--secondary-text-color);
  a {
    color: var(--primary-text-color);
  }
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
</style>
