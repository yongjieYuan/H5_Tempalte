<!-- 汇率计算 -->
<template>
  <div class="calculator">
    <div class="dialog">
      <van-tabs
        v-model:active="active"
        title-inactive-color="white"
        title-active-color="white"
        color="white"
        background="transparent"
        line-width="91"
      >
        <van-tab title="外币现金兑换" name="first">
          <div class="tab-content">
            <div class="form-field">
              <DropDownMenu
                style="flex-shrink: 0"
                :options="sourceCurrency"
                @on-change="onSourceCurrencyChange"
              >
                <template v-slot:left>
                  <div class="currency">{{ source.text }}</div>
                </template>
              </DropDownMenu>
              <span class="divide"></span>
              <van-field
                v-model="sourceValue"
                placeholder="输入换算金额"
                input-align="right"
                type="number"
              />
            </div>
            <div class="form-field">
              <DropDownMenu
                style="flex-shrink: 0"
                :options="exchangeCurrency"
                @on-change="onExchangeCurrencyChange"
              >
                <template v-slot:left>
                  <div style="display: flex">
                    <div class="currency">{{ exchange.text }}</div>
                    <span class="currency-name">{{ exchange.cn }}</span>
                  </div>
                </template>
              </DropDownMenu>
              <div class="rate-value" v-if="JSON.stringify(rateValue) !== '{}'">
                <p>{{ computedResult }}</p>
                <em class="rate-detail"
                  >1 {{ isEn ? source.text : source.cn }} ={{
                    rateValue.sellCash
                  }}
                  {{ isEn ? exchange.text : exchange.cn }} 汇率={{
                    rateValue.sellCash
                  }}</em
                >
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="国际转账业务" name="second">
          <div class="tab-content">
            <div class="form-field">
              <DropDownMenu
                style="flex-shrink: 0"
                :options="exchangeCurrency"
                @on-change="onExchangeCurrencyChange"
              >
                <template v-slot:left>
                  <div class="currency">{{ source.text }}</div>
                </template>
              </DropDownMenu>
              <span class="divide"></span>
              <van-field
                v-model="sourceValue"
                placeholder="输入换算金额"
                input-align="right"
                type="number"
              />
            </div>
            <div class="form-field">
              <DropDownMenu
                style="flex-shrink: 0"
                :options="exchangeCurrency"
                @on-change="onExchangeCurrencyChange"
              >
                <template v-slot:left>
                  <div style="display: flex">
                    <div class="currency">{{ exchange.text }}</div>
                    <span class="currency-name">{{ exchange.cn }}</span>
                  </div>
                </template>
              </DropDownMenu>
              <div class="rate-value" v-if="JSON.stringify(rateValue) !== '{}'">
                <p>{{ computedResult }}</p>
                <em class="rate-detail"
                  >1 {{ isEn ? source.text : source.cn }} ={{
                    rateValue.sellCash
                  }}
                  {{ isEn ? exchange.text : exchange.cn }} 汇率={{
                    rateValue.sellCash
                  }}</em
                >
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="real-rate-info">
        <span>实时汇率</span>
        <span class="rate_nubmer">{{ rateValue.sellCash }} <i>CNY</i></span>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import DropDownMenu from './cpn/drop-down.vue'
import { Field } from 'vant'
import { mapGetters } from 'vuex'
import * as $http from '@/service/api/index'
export default {
  components: {
    DropDownMenu,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Field.name]: Field
  },
  data() {
    return {
      active: 'first',
      sourceCurrency: [],
      exchangeCurrency: [],
      sourceValue: 0,
      /// 选择的货币
      /// 数据结构： {text: ,id: ,cn}
      source: {},
      exchange: {},
      // intlSource: {},
      // intlExchange: {},
      /// 汇率
      rateValue: {}
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      $http.getSourceCurrency().then((res) => {
        this.sourceCurrency = res.filter(
          (item) => item.sourceCurrency === 'AUD'
        )
        // this.sourceCurrency = res
      })
      $http.getExchangeCurrency().then((res) => {
        this.exchangeCurrency = res
      })
    },
    // eslint-disable-next-line no-unused-vars
    onSourceCurrencyChange(item, index) {
      this.source = item
      if (this.exchange.id) {
        this.calcRate()
      }
    },
    // eslint-disable-next-line no-unused-vars
    onExchangeCurrencyChange(item, index) {
      this.exchange = item
      if (this.source.id) {
        this.calcRate()
      }
    },
    /// 计算汇率
    calcRate() {
      $http.calcRate(this.source.id, this.exchange.id).then((res) => {
        this.rateValue = res
      })
    }
  },
  computed: {
    ...mapGetters(['isEn']),
    /// 计算汇率
    computedResult() {
      if (
        !this.rateValue.sellCash ||
        !this.sourceValue ||
        this.sourceValue == 0
      )
        return 0
      return (this.rateValue.sellCash * parseFloat(this.sourceValue)).toFixed(7)
    }
  }
}
</script>

<style lang="less" scoped>
@contentHeight: calc(100vh - 44px);
.tab {
  background: green;
}
.calculator {
  position: relative;
  overflow: hidden;
  height: @contentHeight;
  background: url('~@images/currency.png') no-repeat center/cover;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    background-color: rgba(0, 0, 0, 0.7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
}

.dialog {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 322px;
  height: 258px;
  padding: 0 23px;
  background: url('~@images/blur_bg.png') no-repeat center/100% 100%;
  transform: translate(-50%, -50%);
}
.tab-content {
  margin-top: 8px;
}
.form-field {
  display: flex;
  align-items: center;
  padding: 13px 25px 12px 19px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 14px;
  .currency {
    width: 49px;
    height: 34px;
    background: var(--primary-blue);
    border-radius: 4px;
  }
  .divide {
    display: inline-block;
    width: 1px;
    height: 9px;
    margin-left: 13px;
    background-color: #c5ced6;
  }
}

.real-rate-info {
  display: flex;
  left: 42px;
  right: 42px;
  justify-content: space-between;
  span {
    display: inline-block;
    font-size: 15px;
    line-height: 1.5;
  }
  i {
    font-style: normal;
    font-size: 10px;
  }
  .rate_nubmer {
    font-weight: 600;
  }
}

.van-tab--active > :deep(.van-tab__text) {
  font-size: 15px;
}

.van-tabs__nav > :deep(.van-tab) {
  display: flex;
  flex: none;
  font-weight: normal;
  + .van-tab {
    margin-left: 16px;
  }
}
.currency {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.currency-name {
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-right: 4px;
  font-size: 7px;
  color: var(--secondary-text-color);
}

.van-field__body > :deep(input) {
  font-size: 17px;
  &::placeholder {
    font-weight: normal;
    font-size: 17px;
  }
}
.rate-value {
  display: flex;
  flex-direction: column;
  align-items: end;
  color: var(--primary-text-color);
  margin-left: 4px;
  p {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
  }
  em {
    font-size: 7px;
    line-height: 1.5;
    font-style: normal;
    font-weight: normal;
    color: var(--secondary-text-color);
  }
}
</style>
