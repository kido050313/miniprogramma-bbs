// pages/myCoupon/myCoupon.js

const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TOP_MENU: {
      0: {
        id: "t00",
        mean: "未使用",
        active: true,
        couponStatus: '有效'
      },
      1: {
        id: "t01",
        mean: "已使用",
        active: false,
        couponStatus: '已核销'
      },
      2: {
        id: "t02",
        mean: "已过期",
        active: false,
        couponStatus: '已过期'
      }
    },
    couponData: [],
    customerInfo: {},
    loading: true,
    fromWhere: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      fromWhere: options.fromWhere
    })
    console.log(options)
    this.getMyCoupons('有效')
  },

  getMyCoupons: function(couponStatus) {
    let that = this;

    that.setData({
      loading: true
    })
    util.request(api.getMyCoupons, {
      customerId: app.globalData.userInfo.customerId
    }, "POST", "form").then(function(res) {
      if (res.status == "200") {
        // console.log(res.couponList)
        let couponList = res.couponList,
          couponData = [],
          customerInfo = res.customerInfo;
        couponList.map((item) => {
          if (item.couponStatus == couponStatus) {
            item.startTime = item.startTime && item.startTime.substring(0, 10);
            item.endTime = item.endTime && item.endTime.substring(0, 10);
            item.couponDesc = item.couponDesc.split("\n");
            couponData.push(item)
          }
        })
        // console.log(couponData)
        that.setData({
          loading: false,
          couponData: couponData,
          customerInfo: customerInfo
        })
      } else {
        wx.showModal({
          content: res.message,
          loading: false
        });
      }
    })
  },

  switchCouponType: function(event) {
    let that = this;
    let temp = that.data.TOP_MENU;
    let id = event.currentTarget.dataset.id;
    for (let i in temp) {
      if (temp[i].id == id) {
        temp[i].active = true;
        that.getMyCoupons(temp[i].couponStatus)
      } else {
        temp[i].active = false;
      }
    }
    this.setData({
      TOP_MENU: temp,
      page: 1,
      size: 5,
      canload: true
    })
  },

  switchBack: function() {
    if (this.data.fromWhere == '1') {
      console.log('goback to index')
      this.setData({
        fromWhere: 0
      })
      wx.redirectTo({
        url: '../index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.onUnload()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.switchBack()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})