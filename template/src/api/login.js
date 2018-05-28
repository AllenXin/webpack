/**
 * 创建于 2018/3/27
 * 作者: Xinwang
 * 功能: 登录登出api
 */
import fetch from '@/utils/fetch'

export function login(userName, password) {
  return fetch({
    url: '/admin/user/name-login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function logout(userName) {
  return fetch({
    url: '/admin/user/logout',
    method: 'post'
  })
}
