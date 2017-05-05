'use strict'
/*要引入的模块*/
const https = require('https')

/*获取配置文件*/
var config = require('../config/config.js'),
    login_url = config.login_url,
    wechat = config.wechat,
    appid = wechat.appid,
    scope_type = wechat.scope_type,
    secret = wechat.secret,
    auth_url = wechat.auth_url,
    access_token_url = wechat.access_token_url,
    refresh_token_url = wechat.refresh_token_url,
    user_info_url = wechat.user_info_url

/*要存取的变量*/
let openid, expires_in, access_token, refresh_token;

var get_auth_url = auth_url.
replace('APPID', appid).
replace('REDIRECT_URI', login_url).
replace('SCOPE', scope_type)

console.log(get_auth_url)

/*code说明 ：
code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。*/

const code = '051b7gWF1kycQ2049fVF12OlWF1b7gWs'

/*向微信服务器发起一个get请求，拿到access_token，refresh_token是用户刷新access_token需要用到的token*/
function getAccessToken(callBack) {
    var get_access_token_url = access_token_url.
    replace('APPID', appid).
    replace('SECRET', secret).
    replace('CODE', code)

    https.get(get_access_token_url, res => {
        res.on('data', d => {
            //process.stdout.write(d);
            var d_toJson = JSON.parse(d.toString())

            openid = d_toJson.openid
            access_token = d_toJson.access_token
            expires_in = d_toJson.expires_in
            refresh_token = d_toJson.refresh_token;
            console.log(refresh_token)
            callBack && callBack()
        });

    }).on('error', (e) => {
        console.error(e);
    })
}

//getAccessToken();

/*用户刷新access_token，坑，这里的用户是指开发者*/
function refreshToken(callBack) {

    var refresh_token = '7bEzgIDDqR20v1mpHGNIgGs2KfRL1t4-gEW5ZPnqi3wemE_UmXx-f19r--RvCdrb1T-oZPvpcLpmPbkQWwi_l1McmsF6H9zPAtrGFBybzBQ'

    var get_refresh_token_url = refresh_token_url.
    replace('APPID', appid).
    replace('REFRESH_TOKEN', refresh_token)

    https.get(get_refresh_token_url, res => {

        res.on('data', d => {
            //process.stdout.write(d);
            var d_toJson = JSON.parse(d.toString())
            access_token = d_toJson.access_token
            openid = d_toJson.openid
            console.log(d_toJson.openid)
            callBack && callBack()
        });
    }).on('error', e => {
        console.error(e);
    })
}

refreshToken(getUserInfo)

function getUserInfo() {
    var get_user_info_url = user_info_url.
    replace('OPENID', openid).
    replace('ACCESS_TOKEN', access_token)

    https.get(get_user_info_url, res => {

        res.on('data', d => {
            //process.stdout.write(d);
            var d_toJson = JSON.parse(d.toString())
            console.log(d_toJson)

        });
    }).on('error', e => {
        console.error(e);
    })
}