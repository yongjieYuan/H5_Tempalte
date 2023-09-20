<template>
  <footer>
    <div class="contact">
      <h2>Contact</h2>
      <h3>{{ systemInfo.contractPhone }}</h3>
    </div>
    <div class="part branch">
      <h4>Sydney office：</h4>
      <ul class="detail">
        <li>Email: {{ systemInfo.email }}</li>
        <li>Tel: {{ systemInfo.tel }}</li>
        <li>Fax: {{ systemInfo.fax }}</li>
        <li>Address: {{ systemInfo.address }}</li>
      </ul>
    </div>
    <div class="part working-time">
      <h4>Trading hours：</h4>
      <ul class="detail">
        <li>Mon-Fri: systemInfo.tradingHours</li>
        <li>Weekends and Public holidays:</li>
        <li>{{ systemInfo.tradingHoursHoliday }}</li>
      </ul>
    </div>
    <div class="qr-code-area">
      <div class="qr-code">
        <img :src="systemInfo.publicCode" alt="" />
        <p>坤达速汇公众号</p>
      </div>
      <div class="qr-code">
        <img :src="systemInfo.storeCode" alt="" />
        <p>
          坤达<br />
          Chatswood<br />门店
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import * as $http from '@/service/api/index'
export default {
  data() {
    return {
      systemInfo: {}
    }
  },
  created() {
    $http.getSystemParam().then((res) => {
      this.$nextTick(() => {
        this.systemInfo = res[0]
      })
    })
  }
}
</script>

<style lang="less" scoped>
h2,
h3,
h4 {
  margin: 0;
  font-weight: normal;
}

h2 {
  font-size: 43px;
}

h3 {
  font-size: 30px;
}

footer {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  height: 100%;
  padding: 0 28px;
  background-color: var(--primary-text-color);
  z-index: 99;
  > .part {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }
}
.contact {
  text-align: center;
  > h3 {
    margin-top: 17px;
  }
}
h4 {
  font-size: 18px;
}
li {
  font-size: 14px;
  color: #b9c4ce;
}
.qr-code {
  display: flex;
  flex-direction: column;
  align-content: center;
  > img {
    width: 125px;
    height: 125px;
  }
  > p {
    margin: 0;
    margin-top: 9px;
    width: 100%;
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
  }
}
.qr-code-area {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.detail {
  margin-top: 13px;
}
</style>
