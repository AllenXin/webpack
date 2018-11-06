/**
 * 创建于 2018/9/26
 * 作者: Xinwang
 * 功能: 数据字典处理
 */
import Vue from 'vue'
import store from '../store'
import {getAllFilter} from 'api/login'

// 添加数据字典到vuex 全局注册filter
export function getFilters() {
  getAllFilter().then(({ data }) => {
    const state = {}
    Object.keys(data).forEach(key => state[handleFilterName(key)] = data[key])
    // 动态注册vuex
    store.registerModule('filter', { state })

    // 全局注册filter
    for (const key of Object.keys(state)) {
      Vue.filter(key, function(value) {
        const item = store.state.filter[key].find(item => item.paramValue === value)
        return (item && item.paramDesc) || ''
      })
    }
  })
}

// 获得过滤结果
export function getFilter(key, paramValue) {
  const itemList = store.state.filter[key]
  if (!itemList || itemList.length === 0) return ''
  const item = store.state.filter[key].find(item => item.paramValue === paramValue)
  return (item && item.paramDesc) || ''
}

// _转驼峰
function handleFilterName(name) {
  const result = name.toLocaleLowerCase()
  return result.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
