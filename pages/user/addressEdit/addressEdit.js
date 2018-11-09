// pages/user/addressEdit/addressEdit.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{
      province: "广东省",
      city: "深圳市",
      area: "宝安区",
      detail: "龙华新区民治街道捷进中路58号那然色布斯台音布拉格"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo
    this.setData({
      province: userInfo.province || "",
      city: userInfo.city || "",
      area: userInfo.region || "",
      province: userInfo.address || "",
    })
  },

  clear: function(event){
    let that = this;
    let type = event.currentTarget.dataset.type, address = that.data.address;
    address[type] = "";
    that.setData({ address: address});
  },

  submit: function(){
    let that = this;
    // todo 提交信息

    wx.showToast({
      title: '修改成功',
      icon: "none",
      duration: 3000,
      success: () => {
        wx.navigateBack({
          delta: 1
        })
      }
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