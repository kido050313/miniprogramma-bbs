//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: ""
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
        userInfo: app.globalData.userInfo
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
      wx.navigateTo({
        url: '../login/login?userInfo=' + JSON.stringify(userInfo),
      })
    }
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
