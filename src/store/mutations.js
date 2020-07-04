export default {
  // 方法，不使用异步操作
  changeLogin (state, user) {
    state.Authorization = user.Authorization 
    localStorage.setItem('Authorization', user.Authorization);
  }
}