/**
 * 创建于 2018/9/26
 * 作者: Xinwang
 * 功能: 数据字典处理
 */

import {getAllFilter} from 'api/login'

// 添加数据字典到vuex 全局注册filter
export function getFilters() {
  getAllFilter().then(res => {
    const state = {}
    const getters = {}
    for (const key in res.data) {
      state[handleFilterName(key)] =  res.data[key]
      // getters[handleFilterName(key)] = function(state) {
      //   return res.data[key]
      // }
    }
    // 动态注册vuex
    store.registerModule('filter', {
      // getters,
      state
    })
    // 全局注册filter
    for (const key of Object.keys(state)) {
      Vue.filter(key, function(value) {
        const item = store.state.filter[key].find(item => item.paramValue === value)
        return (item && item.paramDesc) || value
      })
    }
  })
}

// 获得过滤结果
export function getFilter(key, paramValue) {
  const itemList = store.state.filter[key]
  if (!itemList || itemList.length === 0) return paramValue
  const item = store.state.filter[key].find(item => item.paramValue === paramValue)
  return (item && item.paramDesc) || paramValue
}

// _转驼峰
function handleFilterName(name) {
  const result = name.toLocaleLowerCase()
  return result.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
