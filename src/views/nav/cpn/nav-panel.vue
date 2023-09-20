<template>
  <div class="panel-detail">
    <aside>
      <button class="close-btn" @click="$emit('close')"></button>
    </aside>
    <div class="right">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item v-for="(item, index) in panelContent" :key="index">
          <template #title>
            <div class="service-title">
              <h2 class="en">{{ item.title }}</h2>
              <h2>{{ item.subtitle }}</h2>
            </div>
          </template>
          <ul class="services-item">
            <li
              v-for="(title, index) in item.list"
              :key="index"
              @click="nav(title)"
            >
              <span>{{ title.til }}</span>
              <span>{{ title.enTil }}</span>
            </li>
          </ul>
          <template #right-icon>
            <div class="collapse-right-icon">
              <i
                :class="{
                  'collapse-open': activeName !== index,
                  'collapse-close': activeName === index
                }"
              ></i>
            </div>
          </template>
        </van-collapse-item>
      </van-collapse>
      <div class="switch-lang">
        <button
          :style="{ opacity: isEn ? 0.5 : 1 }"
          @click="switchLang('zh_CN')"
        >
          CN
        </button>
        <button
          :style="{ opacity: isEn ? 1 : 0.5 }"
          @click="switchLang('en_US')"
        >
          EN
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
import * as $http from '@/service/api/index'
export default {
  name: 'NavPanel',
  emits: ['close'],
  data() {
    return {
      activeName: 0,
      panelContent: [
        {
          title: 'About Us',
          subtitle: '关于我们',
          list: []
        },
        {
          title: 'Service',
          subtitle: '业务介绍',
          list: [
            {
              til: '在线开户',
              enTil: 'ONLINE REGISTRATION',
              route: '/remittance'
            }
          ]
        },
        {
          title: 'Rate',
          subtitle: '实时汇率',
          list: [{ til: '带您了解最新的汇率情况', route: '/guide/rate' }]
        },
        {
          title: 'News',
          subtitle: '最新资讯',
          list: [
            { til: '公司要闻', enTil: 'Company News', routerName: 'news' },
            {
              til: '汇市动态',
              enTil: 'Market Insight',
              routerName: 'news',
              tag: 'insight'
            }
          ]
        }
      ]
    }
  },
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  created() {
    this.getAboutNavList()
    this.getServiceList()
  },
  methods: {
    ...mapMutations(['updateAboutNavList', 'updateServiceList']),
    ///  获取关于我们的数据列表
    getAboutNavList() {
      $http.getArticleList().then((res) => {
        const list = []
        for (const item of res) {
          list.push({
            til: item.titile,
            enTil: item.subtitile,
            route: `/about/article/${item.id}`
          })
        }
        this.panelContent[0].list = list
        this.updateAboutNavList(res)
      })
    },
    /// 获取业务介绍列表
    getServiceList() {
      $http.getServicesList().then((res) => {
        const list = []
        for (const item of res) {
          list.push({
            til: item.titile,
            enTil: item.subtitile,
            route: `/service/article/${item.id}`
          })
        }
        this.panelContent[1].list.splice(1)
        this.panelContent[1].list.splice(1, 0, ...list)
        // 更新服务列表
        this.updateServiceList(res)
      })
    },
    switchLang(lang) {
      this.$i18n.locale = lang
      this.$store.commit('setLocale', lang)
      this.getAboutNavList()
      this.getServiceList()
    },
    nav(e) {
      if (e.routerName) {
        if (e.tag) {
          this.$router.push({ name: e.routerName, params: { tag: e.tag } })
        } else {
          this.$router.push({ name: e.routerName })
        }
      } else {
        this.$router.push({ path: e.route })
      }

      this.close()
    },
    /// 关闭下拉栏
    close() {
      this.$emit('close')
    }
  },
  computed: {
    ...mapGetters(['isEn'])
  }
}
</script>

<style lang="less" scoped>
.panel-detail {
  position: relative;
  overflow: auto;
  display: flex;
  height: 100%;
  z-index: 999;
  > aside {
    display: flex;
    justify-content: center;
    width: 48px;
    height: 100%;
    border-right: 1px solid white;
  }
  > .right {
    position: relative;
    flex: 1;
    height: 100%;
    > .switch-lang {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 32px;
      display: flex;
      justify-content: space-evenly;
      button {
        border: none;
        background-color: transparent;
        color: var(--primary-text-color);
        font-size: 18px;
      }
    }
  }
}
.close-btn {
  width: 24px;
  height: 24px;
  margin-top: 17px;
  border: none;
  background: url('~@images/close.png') no-repeat center/contain;
  &:active {
    box-shadow: 0 0 0 6px white;
    opacity: 0.2;
  }
}

.service-title > h2 {
  font-weight: normal;
  color: var(--primary-text-color);
  font-size: 15px;
  line-height: 1.2;
  margin: 0;
  & + h2 {
    margin-top: 3px;
  }
  &.en {
    font-weight: 600;
    font-size: 26px;
  }
}
.services-item {
  > li {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    span {
      flex: 1;
    }
  }
}
.en-title {
  font-size: 26px;
  font-weight: 600;
}
.collapse-right-icon {
  display: flex;
  align-items: center;
  width: 28px;
  > i {
    display: inline-block;
  }
  > .collapse-open {
    width: 100%;
    height: 100%;
    background: url('~@images/plus.png') no-repeat center/contain;
  }

  > .collapse-close {
    width: 24.94px;
    height: 2px;
    background-color: var(--primary-text-color);
  }
}

:deep(.van-cell) {
  background: #f1f5f8 !important;
  &::after {
    background-color: var(--primary-text-color);
  }
}
</style>
