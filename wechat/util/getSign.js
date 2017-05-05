'use strict'
/*要引入的模块*/
let querystring = require('querystring'),
    crypto = require('crypto')

/*获取配置文件*/
let config = require('../config/config.js'),
    key = config.wechat.key //微信支付的商户号appkey

/*parseSign非空参数值的参数按照参数名ASCII码从小到大排序（字典序）*/
const getSignValue = function(args) {
    let arr = Object.keys(args)
    arr.sort()
    let sortedObj = {}

    for (var ele of arr) {
        if (sortedObj[ele] == '') { //如果参数的值为空不参与签名；
            continue;
        } else {
            sortedObj[ele] = args[ele]
        }
    }

    /*对stringSignTemp进行MD5运算，再将得到的字符串所有字符转换为大写，得到sign值signValue。*/
    let stringSignTemp = querystring.unescape(querystring.stringify(sortedObj) + "&key=" + key)
    let md5 = crypto.createHash('md5')
    md5.update(stringSignTemp, 'utf8')

    return md5.digest('hex').toUpperCase()

}
module.exports = getSignValue