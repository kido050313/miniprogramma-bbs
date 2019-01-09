// pages/order/orderItem/orderItem.js

const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderExternalId: "",
    loading: false,
    orderData: [],
    orderItem: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let orderItem = JSON.parse(options.orderItem)
    
    this.setData({ orderItem: orderItem})

    // this.getOrderProdDetail(orderItem.orderExternalId)
  },

  getOrderProdDetail: function (orderExternalId){
    let that = this;
    that.setData({ loading: true })
    
    util.request(api.OrderProdDetailQuery, { orderExternalId: orderExternalId}, "POST", "form").then(function (res) {
      if (res.status == "200") {
        console.log(res)
        that.setData({
          orderData: res.data
        })
      } else {
        wx.showModal({
          content: res.message,
          loading: false
        });
      }
    })
  },

  toComment: function (event) {
    let { type, item } = event.currentTarget.dataset;
    let { orderItem } = this.data;

    wx.navigateTo({ 
      url: `../orderComment/orderComment?type=${type}&item=${JSON.stringify(item)}&orderItem=${JSON.stringify(orderItem)}`,
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
    let orderItem = this.data.orderItem
    this.getOrderProdDetail(orderItem.orderExternalId)
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