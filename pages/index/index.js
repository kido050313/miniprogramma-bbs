//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    // hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        // hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          // hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            // hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    console.log(app.globalData.userInfo)
  },
  getUserInfo: function(e) {

    let userInfo = {};
    if (e.detail.userInfo){
      userInfo = e.detail.userInfo;
    }

    wx.navigateTo({
      url: '../login/login?userInfo=' + JSON.stringify(userInfo),
    })
  },

  login: function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  
  receiveCoupon: function(){
    wx.navigateTo({
      url: '../coupon/couponReceive',
    })
  },

  toUserCenter: function(){
    wx.navigateTo({
      url: '../user/userInfo',
    })
  },

  toCouponList: function(){
    wx.navigateTo({
      url: '../myCoupon/myCoupon',
    })
  },

  toOrderList: function(){
    wx.navigateTo({
      url: '../order/orderList',
    })
  }
})
