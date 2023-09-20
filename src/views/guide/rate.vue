<template>
  <div class="real-rate" :class="isEn">
    <div class="header">
      <h1 class="en">Rate</h1>
      <h1 class="zh">实时汇率</h1>
    </div>
    <!-- 标题 -->
    <div class="caption">
      <div>
        <p class="en">CURRENCY PAIR</p>
        <p>交易币比对</p>
      </div>
      <div>
        <p class="en">SELL CASH</p>
        <p>现钞买入价</p>
      </div>
      <div>
        <p class="en">BUY CASH</p>
        <p>现钞卖出价</p>
      </div>
      <div>
        <p class="en">SELL TT</p>
        <p>现汇买入价</p>
      </div>
      <div>
        <p class="en">BUY TT</p>
        <p>现汇卖出价</p>
      </div>
    </div>
    <!-- 数据 -->
    <section id="list-data" class="data">
      <BScroll>
        <div class="content">
          <div class="card" v-for="(item, index) in rateList" :key="index">
            <div class="left">
              <div class="coins">AUD</div>
              <div class="coins">CNY</div>
            </div>
            <p>{{ item.weSellCash }}</p>
            <p>{{ item.weBuyCash }}</p>
            <p>{{ item.weSellTt }}</p>
            <p>{{ item.weBuyTt }}</p>
          </div>
        </div>
      </BScroll>
    </section>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll.vue'
import * as $http from '@/service/api/index'
export default {
  data() {
    return {
      rateList: []
    }
  },
  components: {
    BScroll
  },
  mounted() {
    $http.getExchangeRate().then((res) => {
      this.rateList = res.nowRateList
    })
    /// 计算“汇率计算”按钮的高度，放置遮挡住滚动的列表内容
    const el = document.querySelector('#list-data') //获取到列表容器的高度
    // const btnEl = document.querySelector('#exchange-btn') //获取按钮的节点
    // const btnHeight = btnEl.offsetHeight
    const innerHeight = window.innerHeight
    el.setAttribute(
      'style',
      `height: calc(${innerHeight}px - ${el.offsetTop}px - 123px)`
    )
  }
}
</script>

<style lang="less" scoped>
@navBarHeight: 44px;
@contentHeight: calc(100vh - @navBarHeight);
.content-padding {
  padding: 0 20px;
}
.real-rate {
  box-sizing: border-box;
  height: @contentHeight;
  overflow: hidden;
  .content-padding();
}
.header {
  margin: 0;
  margin-top: 42px;
  margin-bottom: 12px;
  h1 {
    margin: 0;
    font-size: 17px;
    font-weight: normal;
    line-height: 1.5;
    &.en {
      font-size: 53px;
      font-weight: 600;
    }
    &.zh {
      font-size: 17px;
    }
  }
}

.caption {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 7px;
  justify-items: center;
  padding-bottom: 15px;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 10px;
      font-weight: normal;
      margin: 0;
      text-align: center;
      &.en {
        font-size: 8px;
      }
    }
  }
}

.data {
  .card {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 4px;
    padding: 7px 12px;
    background-color: white;
    & + .card {
      margin-top: 7px;
    }
    .coins {
      width: 26px;
      height: 18px;
      background-color: var(--primary-blue);
      border-radius: 4px;
      font-size: 10px;
      text-align: center;
      line-height: 18px;
      & + .coins {
        margin-top: 3px;
      }
    }
  }
  p {
    color: var(--primary-text-color);
    font-size: 13px;
  }
}
</style>
