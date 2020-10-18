import {login, logout, getUser} from 'network/api/login'
import {auth2} from 'network/api/auth2'
import {getToken, setToken, removeToken} from 'utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          const tokenStr = data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Auth2({commit},code) {
      return new Promise((resolve, reject) => {
        auth2(code).then(response => {
          const data = response
          const tokenStr = data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    UserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getUser().then(response => {
          const data = response.results
          // 验证返回的roles是否为空数组
          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
          } else {
            reject('UserInfo: roles must be a non-null array!')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user