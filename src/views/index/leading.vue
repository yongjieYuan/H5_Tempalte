<template>
  <div class="leading">
    <!-- 邮箱联系 -->
    <div class="email-to">
      <a class="intl-text" @click.prevent="switchLocale"
        ><span :class="{ underline: !isEn }">CN</span>/<span
          :class="{ underline: isEn }"
          >EN</span
        ></a
      >
      <i class="icon-email" @click="$router.push({ name: 'contact' })"></i>
    </div>
    <!-- 业务介绍 -->
    <section>
      <div>
        <h4>"Remit" <br />to the world</h4>
        <span class="capability">Currency Exchange | Money Transfer</span>
        <em class="choose-us">选择我们的理由</em>
      </div>
      <!-- 汇率  -->
      <div class="rate-box">
        <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="(item, index) in indexRateList" :key="index">
            <div class="grid-box">
              <div class="item" v-for="(i, idx) in 2" :key="idx">
                <div class="item-row">
                  <span class="blue-block">{{ item.sourceCurrency }}</span>
                  <span class="text key">{{
                    idx == 0 ? '现汇买入率' : '现汇卖出率'
                  }}</span>
                </div>
                <div class="item-row">
                  <span class="blue-block">{{ item.exchangeCurrency }}</span>
                  <span class="text value">{{
                    idx == 0 ? item.weBuyTt : item.weSellTt
                  }}</span>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <button class="icon-button"></button>
    </section>
    <div class="spacer"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as $http from '@/service/api/index'
import { Swipe, SwipeItem } from 'vant'
export default {
  name: 'leading',
  data() {
    return {
      /// 首页汇率
      indexRateList: []
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  computed: {
    ...mapGetters(['isEn'])
  },
  methods: {
    switchLocale() {
      const curLocale = this.$store.state.locale
      if (curLocale == 'zh_CN') {
        this.$i18n.locale = 'en_US'
        this.$store.commit('setLocale', 'en_US')
      } else {
        this.$i18n.locale = 'zh_CN'
        this.$store.commit('setLocale', 'zh_CN')
      }
    }
  },
  created() {
    $http.getIndexRate().then((data) => {
      this.indexRateList = data
    })
  }
}
</script>

<style lang="less" scoped>
@navBarHeight: 44px;
.intl-text {
  display: inline-block;
  margin-right: 15px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  &:active {
    border-bottom: 1px solid white;
  }
  > .underline {
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: all 250ms;
  }
}
.icon-email {
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url('~@images/email.png') no-repeat center/cover;
}
.spacer {
  flex: 1;
}
.icon-button {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border: none;
  background: url('~@images/arrow_down.png') no-repeat center/contain;
}
.leading {
  display: flex;
  flex-flow: column-reverse nowrap;
  position: relative;
  min-height: calc(100vh - @navBarHeight);
  color: white;
  > .email-to {
    display: flex;
    position: absolute;
    top: 11px;
    right: 14px;
    align-items: center;
  }
  > section {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0 25px;
    h4 {
      margin: 0;
      font-size: 38px;
      line-height: 53px;
      font-weight: normal;
    }
    .capability {
      font-size: 15px;
      line-height: 21px;
      letter-spacing: 1;
    }
    .choose-us {
      position: relative;
      display: block;
      font-size: 20px;
      font-style: normal;
      letter-spacing: 2px;
      margin-top: 13px;
      &::after {
        content: '';
        position: absolute;
        top: 20px;
        left: 0;
        display: inline-block;
        width: 190px;
        height: 20px;
        background: url('~@images/guide_line.png') no-repeat center/cover;
      }
    }
  }
}

.rate-box {
  margin-top: 20px;
  padding: 17px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  backdrop-filter: blur(10px);
}

.grid-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 291px;
  height: 83px;
  span {
    color: #557087;
    &.text {
      margin-left: 9px;
    }
    &.key {
      font-size: 9px;
    }
    &.value {
      font-size: 22px;
    }
  }
  .item-row {
    display: flex;
    align-items: center;
  }
  .blue-block {
    display: inline-block;
    width: 26px;
    height: 17px;
    text-align: center;
    line-height: 17px;
    background-color: #0045ff;
    font-size: 7px;
    color: white;
  }
}
</style>
