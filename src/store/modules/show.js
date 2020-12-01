const defaultListQuery = {
  page: 1,
  pageSize: 10,
  name: "",
  sn: "",
  area: "",
  status: null
};

const show = {
  state: {
    listQuery:Object.assign({}, defaultListQuery),
    marketListQuery:Object.assign({}, defaultListQuery)
  },
  mutations: {
    SET_LISTQUERY: (state) => {
      state.listQuery = Object.assign({}, defaultListQuery)
    },
    SET_MARKETLISTQUERY: (state) => {
      state.marketListQuery = Object.assign({}, defaultListQuery)
    }
  },
  actions: {
    QueryReset({commit}, str=null) {
      return new Promise(resolve => {
        if (str === 'marketListQuery') {
          commit('SET_MARKETLISTQUERY')
        } else {
          commit('SET_LISTQUERY')
        }
        resolve()
      })
    }
  }
}
export default show;