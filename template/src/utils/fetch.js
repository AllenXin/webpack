/**
 * 创建于 2018/1/15
 * 功能: axios封装
 */

import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/stock'
import { parseTime } from './index'
import { Message, MessageBox } from 'element-ui'

let baseURL = process.env.BASE_API

const tokenWhiteList = ['admin/menu/get-base-menu-tree']

// 创建axios实例
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 5000 // 请求超时时间改成了5s
})

// request拦截器
service.interceptors.request.use(config => {
  if (!config.spURL) config.baseURL = baseURL || process.env.BASE_API
  if (!config.spURL && store.getters.token) {
    config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  config.data = handleData(config.data) // 拦截是''的查询条件并删除,处理时间格式化
  config.params = handleData(config.params) // 拦截是''的查询条件并删除，处理时间格式化
  if (config.method.toLowerCase() === 'get') { // 解决IE下ajax请求发送不出去的问题
    config.params = config.params || {}
    config.params.forStupidIE = +new Date()
  }

  return config
}, error => {
  console.err(error, ' in fetch.js') // for debug
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // code为非20000或20001是抛错
    const res = response.data
    const config = response.config

    if (![20000, 20001].includes(res.code)) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if ([50008, 50012, 50014].includes(res.code)) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          center: true,
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        resetToken(res, config)
      }
      return Promise.reject(new Error('error'))
    } else {
      resetToken(res, config)
      return response.data
    }
  },
  error => {
    // 因为后台没有作OPTIONS请求判断，导致这边的error.response为空，无法判断具体http的status来决定message的报错信息
    // 此时的error.message都是'net error'
    error.message = '网络通讯异常，请检查！'
    store.dispatch('CancelFullscreenLoading')
    Message({ message: error.message, type: 'error' })
    return Promise.reject(error)
  }
)

function handleData(data) {
  if (data === undefined) return data
  if (data instanceof Array) return data
  if (data instanceof FormData) return data

  const result = {}
  for (const key of Object.keys(data)) {
    if (data[key] !== null || key === 'defaultInfo') {
      if (data[key] instanceof Date) {
        result[key] = parseTime(data[key])
      } else result[key] = data[key]
    }
  }
  return result
}

function resetToken(res, config) {
  if (res.token && !tokenWhiteList.includes(config.url.replace(config.baseURL, ''))) store.dispatch('resetToken', res.token)
}

var changeBaseURL = function(value) {
  baseURL = value
}

export default service
export { changeBaseURL, baseURL }
