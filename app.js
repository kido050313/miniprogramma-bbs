//app.js

var util = require('./utils/util.js');
var api = require('./config/api.js');

App({

  globalData: {
    appid: 'wxbcdaa51d5443fa77',//appid需自己提供，此处的appid我随机编写
    secret: 'ab1be5dd290ec6f454cc03e8598462d0',//secret需自己提供，此处的secret我随机编写
    userInfo: null
  },

  onLaunch: function () {

    let that = this;

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    wx.request({
      // url: api.getToken +`?corpId=ww9fa669a713c72aba`,
      url: api.getToken + `?corpId=ww6513f60f6da03c2e`,
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
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              if (res.code) {
                console.log("code==" + res.code)
                var d = that.globalData;//这里存储了appid、secret、token串  

                wx.request({
                  url: api.getOpenId,
                  data: {appid: d.appid,secret: d.secret,js_code: res.code,grant_type: "authorization_code"},
                  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
                  header: {
                    'Content-Type': 'application/json',
                    'Authorization': wx.getStorageSync('token')
                  }, // 设置请求的 header  
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