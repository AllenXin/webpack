/**
 * 创建于 2018/9/1
 * 作者: PandaCIMS
 * 功能: AES加密
 */

import CryptoJS from 'crypto-js'
// 秘钥
const CRYPTOJSKEY = 'UGFuZGFDSU1TIQAS'

export default {

  // 加密
  /*
  * {param} word 加密明文
  * return  str 加密结果
  */
  encrypt(word) {
    var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY)
    var srcs = CryptoJS.enc.Utf8.parse(word)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
    return encrypted.toString()
  },
  // 解密
  /*
  * {param} word 解密密文
  * return  str 解密结果
  */
  decrypt(word) {
    var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY)
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}
