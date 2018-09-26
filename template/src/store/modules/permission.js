/**
 * 创建于 2018/9/1
 * 作者: PandaCIMS
 * 功能: vuex permission
 */

import { asyncRouterMap, constantRouterMap } from '@/router/index'
import { filterAsyncRouter } from 'utils/auth'
import * as Roles from 'api/SystemManage/roleapi.js'

const webMenuTree = { type: 'WEB' }

const permission = {
  state: {
    routers: constantRouterMap, // 当前路由
    addRouters: [], // 后来增加的路由数组
    webPermission: [] // web权限数组
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers.concat([{ path: '*', redirect: '/404', hidden: true }])
      state.routers = constantRouterMap.concat(routers)
    },
    SET_WEB: (state, perm) => {
      if (!state.webPermission.length) { // 如果为空
        formateMenuTree(perm)
        state.webPermission.push(...perm)
      } else throw new Error('WEB 权限树非空，请确认是否添加新树')
    }
  },
  actions: {
    /**
     * 生成本地路由表
     * @param commit
     * @param data
     * @constructor
     */
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, data)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },

    /**
     * 获取 WEB 权限树
     * @param commit
     * @param state
     * @constructor
     */
    GetWebBaseMenuTree({ commit, state }) {
      return new Promise((resolve, reject) => {
        state.webPermission.length
          ? resolve(state.webPermission)
          : Roles.menuTreeList(webMenuTree, 'WEB').then(res => {
            commit('SET_WEB', res.data)
            resolve(res)
          }).catch(err => reject(err))
      })
    }
  }
}

/**
 * 每个子节点添加上disabled属性以便在tree中控制
 * @param perm 权限data
 */
function formateMenuTree(perm) {
  [...perm].forEach(T => {
    T.disabled = true
    if (T.children) {
      T.children.forEach(T2 => {
        T2.disabled = true
        T2.pnode = T.id
      })
    }
  })
}

export default permission
