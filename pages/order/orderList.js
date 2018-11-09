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
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo){
      this.queryOrderList()
    } 
  },

  queryOrderList: function(){
    let that = this;
    that.setData({ loading: true})
    let queryString = `?customerId=${app.globalData.userInfo.customerId}&page=${that.data.page}&pageSize=${that.data.pageSize}`
    util.request(api.orderQuery + queryString, {}, "POST").then(function (res) {
      if (res.status == "200") {
        that.setData({
          orderData: res.data,
          loading: false
        })
      } else {
        wx.showModal({
          content: res.message,
          showCancel: false
        });
      }
    })
  },

  toComent: function(event){
    let type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: './orderComment/orderComment?type='+type,
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