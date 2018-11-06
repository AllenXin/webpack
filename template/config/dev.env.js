'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TOBACKEND: process.env.TOBACKEND,
  BASE_API: '"http://172.16.33.118:10030/wms"'   //  todo 修改地址
})
