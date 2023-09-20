import { createI18n } from 'vue-i18n'
import locales, { localeKey } from './locales/locales'

// 获取浏览器语言
let currentLanguage = navigator.language.replace(/-(\S*)/, '')

// 设置一个默认语言
const defaulLocale = JSON.stringify({ curLocale: 'zh_CN' })

// 从本地存储获取
let lsLocale = localStorage.getItem(localeKey) || defaulLocale
currentLanguage = JSON.parse(lsLocale).curLocale

/// 创建i18n
const i18n = createI18n({
  locale: currentLanguage,
  legacy: false,
  fallbackLocale: 'en_US', // 备用语言
  globalInjection: true, // 全局注册 $t
  messages: locales
})

export default i18n
