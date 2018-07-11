/**
 * 创建于 2018/3/27
 * 作者: Xinwang
 * 功能: 角色管理api
 */
import fetch from '@/utils/fetch'

// 获取条件查询的角色列表, roleName传空字符串或者null返回所有
export function roleList(params) {
  return fetch({
    url: '/admin/role/list',
    method: 'get',
    params
  })
}

export function getList(params) {
  return fetch({
    url: '/admin/role/list',
    method: 'get',
    params
  })
}

/**
 * 查询用户详细信息
 * @param params
 */
export function getById(params) {
  return fetch({
    url: '/admin/role/get-role-by-id',
    method: 'get',
    params
  })
}

/**
 * 删除用户
 * @param roleId
 */
export function roleDelete(params) {
  return fetch({
    url: '/admin/role/delete',
    method: 'post',
    params
  })
}

/**
 * 增加角色
 * @param param
 */
export function roleAdd(param) {
  return fetch({
    url: '/admin/role/add',
    method: 'post',
    data: param
  })
}

/**
 * 修改角色
 * @param param
 */
export function roleEdit(param) {
  return fetch({
    url: '/admin/role/edit',
    method: 'post',
    data: param
  })
}

/**
 * 根据用户Id获取菜单数组(可赋予)
 * @param param
 */
export function getMenuByUser(params) {
  return fetch({
    url: '/admin/menu/get-out-menu-tree-by-user',
    method: 'get',
    params
  })
}

export function getRoleListAll(params) {
  return fetch({
    url: '/admin/role/list-all',
    method: 'get',
    params
  })
}

// 获取基本权限树
export function menuTreeList() {
  return fetch({
    url: '/admin/menu/get-base-menu-tree',
    method: 'get'
  })
}

// 根据用户名获取权限数组
export function getUserAuthArray(userId) {
  return fetch({
    url: '/admin/menu/get-menu-by-user',
    method: 'get',
    params: { userId}
  })
}
