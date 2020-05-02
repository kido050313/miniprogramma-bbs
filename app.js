var util = require('./utils/util.js');
var api = require('./config/api.js');

App({

  globalData: {
    appid: 'wx9fee57c2d64a1428',
    secret: 'f064a1e886135dd904beafe5fe9aa1ee',
    userInfo: null
  },

  onLaunch: function () {
    let that = this;
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    this.globalData.userInfo=wx.getStorageSync('userInfo')
    wx.request({
      url: api.getToken,//test
      // url: api.getToken + `?corpId=ww9fa669a713c72aba`,//test
      data: {
        username: 'admin',
        password: 'lishisheng'
      },
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('token=='+res.data.data)
        if (res.statusCode == 200) {
          let token = res.data.data.tokenHead + ' ' + res.data.data.token
          wx.setStorageSync('token', token)

          // 登录
          // wx.login({
          //   success: res => {
          //     if (res.code) {
          //       console.log("code==" + res.code)
          //       var d = that.globalData;//这里存储了appid、secret、token串  

          //       wx.request({
          //         url: api.getOpenId,
          //         data: {appid: d.appid,secret: d.secret,js_code: res.code,grant_type: "authorization_code"},
          //         method: 'POST', 
          //         header: {
          //           'Content-Type': 'application/json',
          //           'Authorization': wx.getStorageSync('token')
          //         },
          //         success: function (res) {
          //           var openid = res.data.openid;
          //           var unionid = res.data.unionid;
          //           wx.setStorageSync('openid', openid);//存储openid  
          //           wx.setStorageSync('unionid', unionid);//存储openid  
          //         }
          //       });
          //     } else {
          //       console.log('获取用户登录态失败！' + res.errMsg)
          //     }
          //   }
          // })
        }
      },
      fail: function (err) {
        console.log("failed")
      }
    })

  }
})