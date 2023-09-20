const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/h5/' : '/',
  transpileDependencies: true,
  // 网页标题
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'KUNDAX'
      return args
    })
    config.resolve.alias
      .set('@images', '@/assets/images')
      .set('@components', '@/components')
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://139.159.184.131', //接口域名
        changeOrigin: true, //是否跨域
        ws: false, //是否代理 websockets
        secure: false, //是否https接口
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
