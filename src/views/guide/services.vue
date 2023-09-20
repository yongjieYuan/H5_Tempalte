<template>
  <div class="services">
    <div class="header">
      <h1 class="en">Service</h1>
      <h1>业务介绍</h1>
    </div>
    <!-- 业务类型 -->
    <ul class="types">
      <li @click="$router.push({ name: 'remittance' })">
        <img src="@images/register.png" />
        <div class="title">
          <p class="en">ONLINE REGISTRATION</p>
          <p>在线开户</p>
        </div>
      </li>
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="$router.push({ path: `/service/article/${item.id}` })"
      >
        <img :src="item.cover" />
        <div class="title">
          <p class="en">{{ item.titile }}</p>
          <p>{{ item.subtitile }}</p>
        </div>
      </li>
      <!-- <li>
        <img src="@images/remittance.png" />
        <p :class="{ en: isEn }">{{ $t('International_Remittance') }}</p>
      </li>
      <li>
        <img src="@images/faq.png" />
        <p :class="{ en: isEn }">{{ $t('FAQS') }}</p>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as $http from '@/service/api/index'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getServicesList()
  },
  computed: {
    ...mapGetters(['isEn'])
  },
  methods: {
    getServicesList() {
      $http.getServicesList().then((res) => {
        this.list = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
@navBarHeight: 44px;
@contentHeight: calc(100vh - @navBarHeight);
.content-padding {
  padding: 0 20px;
}
.services {
  min-height: @contentHeight;
  // height: @contentHeight;
  .content-padding();
}
.header {
  margin-top: 62px;
  margin-bottom: 52px;
  h1 {
    margin: 0;
    font-size: 17px;
    font-weight: normal;
    line-height: 1.5;
    &.en {
      font-size: 53px;
      font-weight: 600;
    }
  }
}

.types {
  display: grid;
  // grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  align-content: space-between;
  margin-bottom: 32px;
  > li {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 114px;
    img {
      width: 114px;
      height: 114px;
      object-fit: contain;
    }
    &:nth-child(3) {
      margin-top: 20px;
      & + li {
        margin-top: 20px;
      }
    }
  }
  .title {
    position: relative;
    left: 9px;
    margin-top: 24px;
    &::before {
      content: '';
      position: absolute;
      display: inline-block;
      flex-flow: row nowrap;
      top: 3px;
      bottom: 3px;
      left: -9px;
      width: 1px;
      background-color: #fff;
    }
    > p {
      display: inline-block;
      font-size: 18px;
      line-height: 1.5;
      margin: 0 auto;
      + p {
        margin-top: 10px;
      }
      &.en {
        font-size: 12px;
      }
    }
  }
}
</style>
