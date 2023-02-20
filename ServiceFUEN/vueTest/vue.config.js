const path = require('path')
module.exports = {
  outputDir: "../wwwroot",
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  devServer: {
    open: true,
    host: 'localhost',  // 設置主機地址
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://localhost:7259',
        ws: true,     // 如果要代理 websockets
        secure: false,
        changOrigin: true,  //允許跨域
        // logLevel: "debug"
        // pathRewrite: {
        //   '^/api': '/api',
        // }
      },
    },
  },
  lintOnSave: false, //关闭eslint检查
  // publicPath: process.env.VUE_APP_PATH,
  productionSourceMap: false,
  filenameHashing: false,
  // css: {
  //   extract: false
  // },
}
