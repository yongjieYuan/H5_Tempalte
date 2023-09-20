import { createStore } from 'vuex'
import { localeKey } from '../i18n/locales/locales'

const store = createStore({
  state() {
    return {
      /// 语言
      locale: '',
      /// 关于我们的导航栏内容
      aboutNavList: [],
      /// 业务介绍列表
      serviceList: []
    }
  },
  getters: {
    isEn(state) {
      return state.locale === 'en_US'
    },
    aboutNavList(state) {
      return state.aboutNavList.map((item) => {
        return {
          id: item.id,
          title: item.titile
        }
      })
    },
    serviceNavList(state) {
      return state.serviceList.map((item) => {
        return {
          text: item.titile,
          path: `/service/article/${item.id}`
        }
      })
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setLocale(state, localeName) {
      state.locale = localeName
      const localeValue = JSON.stringify({ curLocale: localeName })
      /// 本地持久化存储
      window.localStorage.setItem(localeKey, localeValue)
    },
    updateAboutNavList(state, data) {
      state.aboutNavList = data
    },
    updateServiceList(state, data) {
      state.serviceList = data
    }
  },
  actions: {}
})

export default store
