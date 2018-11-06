/* eslint-disable */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 输入时间戳 按照fmt格式化
* fmt为格式 ex: yyyy-MM-dd hh:mm:ss => 2018-07-23 21:52:44
*/
export const formatTime1 = (timestamp, fmt) => {
  const time = new Date(timestamp)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const types = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds()
  }
  for (const type in types) {
    if (new RegExp(`(${type})`).test(fmt)) {
      const str = types[type] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : `00${str}`.substr(str.length))
    }
  }
  return fmt
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function cloneObject(obj) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      const newArr = []
      for (let i = 0; i < obj.length; i++) {
        newArr.push(cloneObject(obj[i]))
      }
      return newArr
    } else {
      const newObj = {}
      for (const key in obj) {
        newObj[key] = cloneObject(obj[key])
      }
      return newObj
    }
  } else {
    return obj
  }
}

/**
 * 复制obj2部分属性到obj1中
 *
 * @export
 * @param {any} obj1 原对象
 * @param {any} obj2 被复制属性的对象
 */
export function cloneObjProp(obj1, obj2) {
  Object.keys(obj1).forEach(key => {
    if (obj2.hasOwnProperty(key)) {
      obj1[key] = cloneObject(obj2[key])
    }
  })
}

/**
 * utf-16转utf-8
 *
 * @export
 * @param str
 * @return {string}
 */
export function utf16to8(str) {
  let out, i, len, c
  out = ''
  len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}

/**
 * 时间四舍五入到小时
 * @example 2018.1.2 9:12:30
 * @param time 2018.1.2 9:30:0
 * @return {Date} new Date
 */
export function roundTimeOff(time) {
  const y = time.getFullYear()                  // 年
  const m = time.getMonth()                     // 月 注意这里不用+1
  const d = time.getDate()                      // 日
  const h = time.getHours()                     // 小时
  return new Date(y, m, d, h, 0, 0)
}

/**
 * Base64工具库
 * @example 编码 - Base64.encode("hello wrold")
 * @example 解码 - Base64.decode("d3d3Ljc4b2EuY29t")
 * @type {Object}
 */
export const Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  // public method for encoding
  encode: function(input) {
    let output = ''
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4
    let i = 0

    input = Base64._utf8_encode(input)

    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)

      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63

      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }

      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
    }

    return output
  },

  // public method for decoding
  decode: function(input) {
    let output = ''
    let chr1, chr2, chr3
    let enc1, enc2, enc3, enc4
    let i = 0

    input = input.replace(/[^A-Za-z0-9+\/=]/g, '')

    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++))
      enc2 = this._keyStr.indexOf(input.charAt(i++))
      enc3 = this._keyStr.indexOf(input.charAt(i++))
      enc4 = this._keyStr.indexOf(input.charAt(i++))

      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4

      output = output + String.fromCharCode(chr1)

      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2)
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3)
      }
    }

    output = Base64._utf8_decode(output)

    return output
  },

  // private method for UTF-8 encoding
  _utf8_encode: function(string) {
    string = string.replace(/\r\n/g, '\n')
    let utftext = ''

    for (let n = 0; n < string.length; n++) {
      const c = string.charCodeAt(n)

      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }

    return utftext
  },

  // private method for UTF-8 decoding
  _utf8_decode: function(utftext) {
    let string = ''
    let i = 0
    let c = 0
    let c2 = 0
    let c3 = 0

    while (i < utftext.length) {
      c = utftext.charCodeAt(i)

      if (c < 128) {
        string += String.fromCharCode(c)
        i++
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt(i + 1)
        c3 = utftext.charCodeAt(i + 2)
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }

    return string
  }

}

/**
 * 删除数组中key与item相同的的元素
 * @param array
 * @param item
 * @param key
 */
export function removeItemInArray(array, item, key) {
  if (key) {
    let sub = array.findIndex(T => T[key] === item[key])
    array.splice(sub, 1)
  } else {
    let sub = array.findIndex(T => T === item)
    array.splice(sub, 1)
  }
}

/**
 * 返回getter中的过滤器函数
 * @param key 索引
 */
export const rowFilter = key => (row, column, val, idx) => store.getters.getFilterFunc(key)(row[key])

/**
 * 用在scope中的过滤器函数
 * @param key
 */
export const scopeFilter = key => (idx, row) => store.getters.getFilterFunc(key)(row[key])

/**
 * 用户自定义的过滤器函数
 * @param key 函数名
 */
export const userFilter = key => UserFilter[key]

/**
 * 添加日期并且格式化
 * @param date 初始日期
 * @param amount 添加的天数
 * @returns {*} 格式化后的日期
 */
export const addDaysFormate = (date, amount) => parseTime(addDays(date, amount))

/**
 * 生成简单表格校验
 * @param key validate的key
 * @param msg 校验信息
 * @return {Function}
 * @param that
 */
export const formValidateGene = (key, msg, that) => (rule, value, cb) => {
  if (Validate[key](value)) {
    cb()
  } else {
    _undefined(that.errMsg) || (that.errMsg = msg)
    cb(new Error(msg))
  }
}

/* 生成非空表单校验 */
export const notemptyGene = (msg, that) => (rule, value, cb) => {
  if (value === '' || _isNil(value)) {
    _undefined(that.errMsg) || (that.errMsg = msg)
    cb(new Error('msg'))
  } else {
    cb()
  }
}

/* 取值时间校验 */
export const planTimeGene = (key, that) => (rule, value, callback) => {
  const planBeginTime = _get(that[key], rule.fullField.replace(/.\w+$/, '.planBeginTime'))
  const planEndTime = _get(that[key], rule.fullField.replace(/.\w+$/, '.planEndTime'))
  if (planBeginTime && planEndTime && _isBefore(planEndTime, planBeginTime)) {
    _undefined(that.errMsg) || (that.errMsg = '计划完成时间不能在计划开始时间之前！')
    callback(new Error('计划完成时间不能在计划开始时间之前！'))
  } else {
    callback()
  }
}

/**
 * 去除时分秒
 * @param key 要去除的key
 */
export const rmHour = key => (row, column) => parseTime(row[key], '{y}-{m}-{d}')

