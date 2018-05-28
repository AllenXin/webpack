/**
 * 创建于 2018/1/15
 * 功能: 权限相关工具函数
 */

/**
 * 合并成带权限的路由表
 * @param x 递归的路由(可能为一级或者二级)
 * @param y 有权限的路由id数组
 * @returns 返回过滤后的权限表
 */
export function filterAuth(x, y) {
  return x.filter(auth => {
    if (auth.children && auth.children.length) { // 路由上有二级菜单的一级菜单
      auth.children = filterAuth(auth.children, y)
    }
    if (auth.props) { // 二级菜单的按钮权限
      for (const item of Object.keys(auth.props)) {
        auth.props[item].show = y.includes(auth.props[item].id)
      }
    }
    return auth.children && auth.children.length || y.includes(auth.id)
  })
}

/**
 * 把过滤权限后的路由表跟本地路由表合并，特别是把props信息加入到本地
 * @param asyncRouterMap 合并前是本地的路由表，包括icon、redirect,component等
 * @param permission 根据权限id数组过滤后的路由表
 */
export function filterAsyncRouter(asyncRouterMap, permission) {
  return asyncRouterMap.filter((route, index, array) => {
    if (route.hidden === true) return true // 有hidden即使没权限也保留路由，但也不显示在侧边栏
    const routePermission = permission.find(T => route.path === T.path) // 按照path一一对应
    if (routePermission) { // 有权限的菜单内
      if (routePermission.props) {
        route.props = route.props
          ? Object.assign(route.props, routePermission.props)
          : routePermission.props
      }
      
      if (route.children && route.children.length) {
        if (route.children.length === 1) {
          if (routePermission.children.length && routePermission.children[0].props) {
            const routeProps = route.children && route.children[0].props
            const permProps = routePermission.children[0].props
            route.children[0].props = routeProps
              ? Object.assign(routeProps, permProps)
              : permProps
          }
          return true
        }
        route.children = filterAsyncRouter(route.children, routePermission.children)
      }
      return true
    }
    return false
  })
}
