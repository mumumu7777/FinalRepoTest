const path = require('path')
module.exports = {
  outputDir: "../wwwroot", // npm run build 檔案放的位置,預設是dist資料夾
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')// 指定@=src這層目錄
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
