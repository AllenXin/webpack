/**
 * 创建于 2018/1/15
 * 功能: cookie操作封装
 */

import Cookies from 'js-cookie'

const Uid = 'rcp_uid' // 本地Uid头
const Photo = 'rcp_photo' // 本地photo头
const Mobile = 'rcp_mobile' // 本地mobile头
const Namestr = 'rcp_userName' // 本地username头
const Realname = 'rcp_realName' // 本地Realname头
const Token = 'rcp_Admin-Token' // 本地Token头

/**
 * cookie.get方法偏函数
 * @returns {Function}
 */
function cookieGet(tar) {
  return function() {
    return Cookies.get(tar)
  }
}

/**
 * cookie.set方法偏函数
 * @param tar set的对象
 * @returns {Function} 接受一个参数
 */
function cookieSet(tar) {
  return function(param) {
    return Cookies.set(tar, param, { expires: tar === Token ? 1 / 48 : 1 })
  }
}

/**
 * cookie.remove方法偏函数
 * @returns {Function}
 */
function cookieRemove(tar) {
  return function() {
    return Cookies.remove(tar)
  }
}

export const getToken = cookieGet(Token)
export const setToken = cookieSet(Token)
export const removeToken = cookieRemove(Token)

export const getUid = cookieGet(Uid)
export const setUid = cookieSet(Uid)
export const removeUid = cookieRemove(Uid)

export const getUsername = cookieGet(Namestr)
export const setUsername = cookieSet(Namestr)
export const removeUsername = cookieRemove(Namestr)

export const getPhoto = cookieGet(Photo)
export const setPhoto = cookieSet(Photo)
export const removePhoto = cookieRemove(Photo)

export const getRealname = cookieGet(Realname)
export const setRealname = cookieSet(Realname)
export const removeRealname = cookieRemove(Realname)

export const getMobile = cookieGet(Mobile)
export const setMobile = cookieSet(Mobile)
export const removeMobile = cookieRemove(Mobile)


/**
 * 移除全部cookie
 */
export function removeAll() {
  removeToken()
  removeUid()
  removeUsername()
  removePhoto()
  removeRealname()
  removeMobile()
}
