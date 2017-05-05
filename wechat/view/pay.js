'use strict'
/*要引入的模块*/

let querystring = require('querystring'),
    axios = require('axios')

/*获取配置文件*/
let payConfig = require('../service/wxPrepay.js')

console.log(payConfig)

//<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

//页面要引入JSSDK,首先要验证这个页面url,然后这个页面才有权限使用JSSDK,获取微信支付,分享朋友圈JSSDK的config签名
! function getJSSDKsign() {
    var data = {
        url: '要使用JSSDK的页面地址'
    }
    axios({
        method: 'post',
        url: '服务器接收的地址',
        data: querystring.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
    }).then(res => {
        var data = res.data
        if (data.rspCode == "00") {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline', //分享到朋友圈
                    'onMenuShareAppMessage', //分享到我的微信好友
                    'onMenuShareQQ', //分享到我的QQ好友
                    'chooseWXPay' //支付
                ]
            })
        } else {
            alert(data.rspDesc);
        }
    }).catch(err => {
        console.error(err)
    })
}()

//用户发起支付，调出支付窗口
wx.ready(function() {
    wx.chooseWXPay({

        timestamp: payConfig.timeStamp, //支付签名时间戳
        nonceStr: payConfig.nonceStr, // 支付签名随机串，
        package: payConfig.package, //预支付订单号
        signType: payConfig.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payConfig.paySign, // 支付签名

        //支付成功支付回调
        success: function(res) {},
        cancel: function(res) {},
        error: function(res) {}
    })
})