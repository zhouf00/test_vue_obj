import {auth2} from './auth2'

export function login() {
  return auth2({
    url: 'connect/oauth2/authorize?appid=wwa84b8b2c3e83d6e0&redirect_uri=test.windit.com.cn&\
    response_type=1000007&scope=snsapi_base&state=STATE#wechat_redirect',
    // params: {
    //   appid:'wwa84b8b2c3e83d6e0',
    //   redirect_uri: 'test.windit.com.cn',
    //   response_type: '1000007',
    //   scope: 'snsapi_base',
    //   state: 'STATE#wechat_redirect'

    // }
  })
}