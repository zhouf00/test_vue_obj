module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    },
  },
  // 用花生壳
  devServer:{
    disableHostCheck:true
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
  
}