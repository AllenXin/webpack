/**
 * 创建于 2018/2/1
 * 作者: PandaCIMS
 * 功能: vue的过滤器
 */

/**
 * 运行状态 / 故障等级
 * @param value  0 1 2 3 4
 * @return {string}    0-正常, 1-低, 2-中, 3-高, 4-紧急
 */
export function runningStatusFilter(value) {
  return ['运行', '低', '中', '高', '紧急'][value] || ''
}

