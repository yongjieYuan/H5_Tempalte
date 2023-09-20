import { get, post, upload, uploadBase64 as postBase64 } from '../index'
import store from '@/store/index'

/// 上传图片
export const uploadImage = (data) => upload('/api/home/getImgUrl.json', data)

/// 上传文件
export const uploadFile = (data) => upload('/api/home/getFileUrl.json', data)

/// 上传base64文件
export const uploadBase64 = (base64) =>
  postBase64('/api/home/getBase64ImgUrl.json', base64)

/// 获取首页汇率
export const getIndexRate = () => get('/api/home/getIndexRate.json')

/// 获取背景
export const getBackground = (position) =>
  get('/api/home/getBackGround.json', { position })

/// 获取系统参数
export const getSystemParam = () => get('/api/home/getSystemParam.json')

/// 获取实时汇率
export const getExchangeRate = () => get('/api/home/getExchangeRate.json')

///  获取关于我们文章列表数据
export const getArticleList = () => {
  /// 获取当前语言环境
  const isEn = store.getters.isEn
  return get('/api/home/getArticleList.json', { format: isEn ? 2 : 1 })
}

/// 获取关于我们文章详情
export const getArticleDetail = (id) => {
  /// format： 1. 中文，2.英文
  const isEn = store.getters.isEn
  return get('/api/home/getArticleInfo.json', { format: isEn ? 2 : 1, id })
}

/// 获取业务介绍
export const getServicesList = () => {
  const isEn = store.getters.isEn
  return get('/api/home/getBusinessList.json', { format: isEn ? 2 : 1 })
}

/// 获取业务介绍文章详情
export const getServiceArticle = (id) => {
  const isEn = store.getters.isEn
  return get('/api/home/getMainBusinessInfo.json', { format: isEn ? 2 : 1, id })
}

export const getSourceCurrency = () => get('/api/home/getSourceCurrency.json')

export const getExchangeCurrency = () =>
  get('/api/home/getExchangeCurrency.json')

/// 获取货币之间汇率
/// 数据结构
/// data:{buyCash: 1.1952482, sellCash: 1.0435066, sellTt: 1.11586696, buyTt: 1.14915952}
export const calcRate = (sourceCurrencyId, exchangeCurrencyId) =>
  get('api/home/getRate.json', { sourceCurrencyId, exchangeCurrencyId })

/// 获取新闻资讯文章列表
export const getNewsList = (categoryId, pageNumber, pageSize) => {
  const lang = store.getters.isEn
  return get('/api/home/getInformationList.json', {
    format: lang ? 2 : 1,
    categoryId,
    pageSize,
    pageNumber
  })
}

/// 获取新闻资讯文章详情
export const getNewsArticle = (id) => {
  const lang = store.getters.isEn
  return get('/api/home/getInformationInfo.json', {
    format: lang ? 2 : 1,
    id
  })
}

/// 汇款表格保存
export const saveRemittance = (data) => {
  return post('/api/home/remittanceSave.json', data)
}

/// 客户登记授权表保存
export const saveAuthorization = (data) => {
  return post('/api/home/authorizationSave.json', data)
}
/// 企业开户
export const saveEnterprise = (data) => {
  return post('/api/home/enterpriseSave.json', data)
}
