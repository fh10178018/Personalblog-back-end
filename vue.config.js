const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': { // 代理标识
        target: process.env.VUE_APP_HTTP_BASEURL, // 指向的实际地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },

  chainWebpack: (config) => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
    config.resolve.alias
      .set('@$', path.join(__dirname, 'src'))
      .set('components', path.join(__dirname, 'src/components'))
      .set('assets', path.join(__dirname, 'src/assets'))
      .set('http', path.join(__dirname, 'src/http'))
      .set('store', path.join(__dirname, 'src/store'))
  },

  lintOnSave: false,
  publicPath: process.env.VUE_PUBLIC_PATH
}
