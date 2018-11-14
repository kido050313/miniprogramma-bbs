// pages/coupon/couponReceive.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e.currentTarget.dataset)
    let gotoPage = e.currentTarget.dataset.page
    let userInfo = {};
    if (e.detail.userInfo) {
      userInfo = e.detail.userInfo;
      wx.navigateTo({
        url: '../login/login?userInfo=' + JSON.stringify(userInfo),
      })
    }
  },

  receive: function(){
    wx.showToast({
      title: '领取成功',
      mask: true,
      duration: 2000,
      icon: "none"
    })
  },

  finished: function(){
    wx.showToast({
      title: '领取失败! 该券已被领取完',
      mask: true,
      duration: 2000,
      icon: "none"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})