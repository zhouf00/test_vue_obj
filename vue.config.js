module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'utils': '@/utils',
        'store': '@/store'
      }
    },
  },
  devServer: {
    headers:{
      'Access-Control-Allow-Origin': '*',
    },
    hotOnly:false,
    disableHostCheck: true
  },
}