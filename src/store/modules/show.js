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
    listQuery:Object.assign({}, defaultListQuery)
  },
  mutations: {
    SET_LISTQUERY: (state) => {
      state.listQuery = Object.assign({}, defaultListQuery)
    }
  },
  actions: {
    QueryReset({commit}) {
      return new Promise(resolve => {
        commit('SET_LISTQUERY')
        resolve()
      })
    }
  }
}
export default show;