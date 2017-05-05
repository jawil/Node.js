'use strict'
/*要引入的模块*/
const https = require('https')

/*获取配置文件*/
let xmlData = require('./wxPredata.js'),
    config = require('../config/config.js'),
    parseXML = require('../util/parseXML.js'),
    getSign = require('../util/getSign.js'),
    pre_pay_url = config.wechat.pre_pay_url

//返回给客户端用jssdk发送支付请求的参数
const payConfig = {
    appId: '', //注意这里的appId的I是大写，大写的服气
    nonceStr: '',
    package: '',
    signType: '',
    timeStamp: ''
}

const options = {
    hostname: pre_pay_url,
    port: 443,
    path: '/pay/unifiedorder',
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
}

const req = https.request(options, res => {
    res.on('data', d => {
        //process.stdout.write(d);
        let xml = d.toString();
        //微信返回这么多数据中，真正对我们有用的只有 预支付订单号prepayId，微信返回的sign没有任何用
        parseXML(xml, (err, result) => {
            // console.log(result)
            payConfig.appId = result.xml.appid[0]
            payConfig.nonceStr = Math.random().toString(36).substr(2, 15)
            payConfig.package = `prepay_id=${result.xml.prepay_id[0]}`
            payConfig.timeStamp = Date.now().toString().substr(0, 10)
            payConfig.signType = 'MD5'
            payConfig.paySign = getSign(payConfig)

            console.log(payConfig)
        })
    })
})

req.on('error', e => {
    console.error(e)
})

req.write(JSON.stringify(xmlData))

req.end()

module.exports = payConfig