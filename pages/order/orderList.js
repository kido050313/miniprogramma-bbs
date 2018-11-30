// pages/order/orderList.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: [],
    page: 1,
    pageSize: 5,
    loading: true,
    canload: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  queryOrderList: function(){
    let that = this;
    that.setData({ loading: true})
    let queryString = `?customerId=${app.globalData.userInfo.customerId}&page=${that.data.page}&pageSize=${that.data.pageSize}`
    util.request(api.orderQuery + queryString, {}, "POST").then(function (res) {
      if (res.status == "200") {
        let canload = true;
        let orderData = that.data.orderData.concat(res.data.rows);
        if (orderData.length == res.data.total) {
          canload = false
        }
        that.setData({
          canload: canload,
          loading: false,
          orderData: orderData,
        });
      } else {
        wx.showModal({
          content: res.message,
          loading: false,
          showCancel: false
        });
      }
    })
  },

  toCartItem: function(event){
    let {type,item} = event.currentTarget.dataset;
    // wx.navigateTo({
    //   url: `./orderComment/orderComment?type=${type}&item=${JSON.stringify(item)}`,
    // })
    wx.navigateTo({
      url: `./orderItem/orderItem?orderItem=${JSON.stringify(item)}`,
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
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({ orderData: []})
      this.queryOrderList()
    } else {
      this.setData({ loading: false })
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
    let that = this;
    if (that.data.canload) {
      let page = that.data.page + 1;
      that.setData({
        page: page
      })
      this.queryOrderList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})