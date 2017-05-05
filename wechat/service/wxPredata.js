'use strict'

/*要引入的模块*/
let moment = require('moment')

/*获取配置文件*/
let config = require('../config/config.js'),
    parseXML = require('../util/parseXML.js'),
    getSign = require('../util/getSign.js')


let wechat = config.wechat,
    appid = wechat.appid,
    key = wechat.key,
    mchid = wechat.mchid,
    nonce_str = Math.random().toString(36).substr(2, 15)

let out_trade_no = (function() {
    return moment().format('YYYYMMDDhhmmss') + Math.floor(10000 + Math.random() * 100000)
})()

const parseSign = {
    appid: appid,
    attach: 'hello',
    body: 'test',
    mch_id: mchid,
    nonce_str: nonce_str,
    notify_url: 'http://www.weixin.qq.com/wxpay/pay.php',
    openid: 'oBciqwIjBJdq36oEHiJtjmEbjK24',
    out_trade_no: out_trade_no,
    total_fee: 88,
    trade_type: 'JSAPI',
    spbill_create_ip: '127.0.0.1'
}

//获得签名
const signValue = getSign(parseSign)

//prePay需要的数据
const sendData = Object.assign({}, parseSign, { sign: signValue })

module.exports = parseXML(sendData)