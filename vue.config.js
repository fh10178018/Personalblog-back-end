const path = require('path')
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  devServer: {
    proxy: {
      '/api': { //代理标识
        target: 'http://127.0.0.1:3000',//指向的实际地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@$', path.join(__dirname, 'src'))
      .set('components', path.join(__dirname, 'src/components'))
      .set('assets', path.join(__dirname, 'src/assets'))
      .set('http', path.join(__dirname, 'src/http'))
      .set('store', path.join(__dirname, 'src/store'))
  }
}
