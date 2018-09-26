/**
 * 创建于 2018/9/1
 * 作者: PandaCIMS
 * 功能: vuex getter
 */
const getters = {
  // 用户信息
  uid: state => state.user.uid,
  photo: state => state.user.photo,
  token: state => state.user.token,
  mobile: state => state.user.mobile,
  username: state => state.user.username,
  realname: state => state.user.realname,

  // 权限信息
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,

  // 应用信息
  fullscreenLoading: state => state.app.fullscreenLoading
}
export default getters
