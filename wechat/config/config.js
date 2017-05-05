'use strict'
var config = {
    debug: false,
    host_url: 'http://mtest.xiaochedong.com',
    login_url: 'http://mtest.xiaochedong.com/login.html',
    wechat: {
        appid: 'wxbf3fb3b1dbedad23',

        key: 'b7bb4ebf4afb276480cdc3bff2360c7d',

        scope_type: 'snsapi_userinfo',

        secret: '3f730d4f6d27b31554607c73aeb8c608',

        mchid: '1369730802',

        access_token_url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code',

        refresh_token_url: 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN',

        user_info_url: 'https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN',

        pre_pay_url: 'api.mch.weixin.qq.com',

        notify_url: 'http://mtest.xiaochedong.com/rest/svcWx/mdPayNotify',

        auth_url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect'
    }
}
module.exports = config