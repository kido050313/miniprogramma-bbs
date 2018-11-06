// pages/myCoupon/myCoupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TOP_MENU: {
      0: { id: "t00", mean: "未使用", active: true, orderStatus: '' },
      1: { id: "t01", mean: "已使用", active: false, orderStatus: 'WAIT_BUYER_PAY' },
      2: { id: "t02", mean: "已过期", active: false, orderStatus: 'TRADE_GROUPPING' }
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  switchCouponType: function (event) {
    let that = this;
    let temp = that.data.TOP_MENU;
    let id = event.currentTarget.dataset.id;
    for (let i in temp) {
      if (temp[i].id == id) {
        temp[i].active = true;
        this.setData({ orderStatus: temp[i].orderStatus })
      } else {
        temp[i].active = false;
      }
    }
    this.setData({
      TOP_MENU: temp, orderList: [], page: 1, size: 5, canload: true
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