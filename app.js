var util = require('./utils/util.js');
var api = require('./config/api.js');

App({

  globalData: {
    appid: 'wxbcdaa51d5443fa77',
    secret: 'ab1be5dd290ec6f454cc03e8598462d0',
    userInfo: null
  },

  onLaunch: function () {
    let that = this;

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.request({
      // url: api.getToken + `?corpId=ww6513f60f6da03c2e`,
      url: api.getToken + `?corpId=ww9fa669a713c72aba`,
      data: {},
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('token=='+res.data.data)
        if (res.statusCode == 200) {
          wx.setStorageSync('token', res.data.data)

          // 登录
          wx.login({
            success: res => {
              if (res.code) {
                console.log("code==" + res.code)
                var d = that.globalData;//这里存储了appid、secret、token串  

                wx.request({
                  url: api.getOpenId,
                  data: {appid: d.appid,secret: d.secret,js_code: res.code,grant_type: "authorization_code"},
                  method: 'POST', 
                  header: {
                    'Content-Type': 'application/json',
                    'Authorization': wx.getStorageSync('token')
                  },
                  success: function (res) {
                    var openid = res.data.openid;
                    var unionid = res.data.unionid;
                    wx.setStorageSync('openid', openid);//存储openid  
                    wx.setStorageSync('unionid', unionid);//存储openid  
                  }
                });
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
        }
      },
      fail: function (err) {
        console.log("failed")
      }
    })

  }
})