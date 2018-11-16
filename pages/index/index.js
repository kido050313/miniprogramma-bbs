//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    userInfo: undefined,
    couponCanReceive: 0,
    myCouponCount: 0
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
      let customerNum = app.globalData.userInfo.customerNum;
      customerNum = customerNum.replace(/(\d{4})(?=\d)/g, '$1 ');
      console.log(customerNum)
      app.globalData.userInfo.customerNum = customerNum;
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }

    if(wx.getStorageSync("token")){
      this.getAllCoupons();
    }
  },

  getAllCoupons: function () {
    let that = this;
    util.request(api.couponReceiveQuery, {}, "POST").then(function (res) {
      let couponData = res;
      that.setData({
        couponCanReceive: couponData.length,
      });
    })
  },

  getMyCoupons: function (couponStatus) {
    let that = this;

    let queryString = `?phoneNum=${app.globalData.userInfo.phoneNumber}`
    util.request(api.getMyCoupons + queryString, {}, "POST").then(function (res) {
      if (res.status == "200") {
        let couponList = res.couponList, couponData = [], customerInfo = res.customerInfo;
        couponList.map((item) => {
          if (item.couponStatus == couponStatus) {
            couponData.push(item)
          }
        })
        that.setData({
          myCouponCount: couponData.length
        })
      } else {
        wx.showModal({
          content: res.message
        });
      }
    })
  },

  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo){
      this.getMyCoupons('有效')
      let customerNum = app.globalData.userInfo.customerNum;
      customerNum = customerNum.replace(/(\d{4})(?=\d)/g, '$1 ');
      console.log(customerNum)
      app.globalData.userInfo.customerNum = customerNum;
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    console.log(app.globalData.userInfo)
  },

  getUserInfo: function(e) {
    console.log(e.currentTarget.dataset)
    let gotoPage = e.currentTarget.dataset.page
    let userInfo = {};
    if (e.detail.userInfo){
      if(app.globalData.userInfo){
        if (gotoPage=="user"){
          this.toUserCenter();
        } else if (gotoPage == "coupon"){
          this.toCouponList();
        }else if(gotoPage == "order"){
          this.toOrderList();
        }
      }else{
        userInfo = e.detail.userInfo;
        wx.navigateTo({
          url: '../login/login?userInfo=' + JSON.stringify(userInfo),
        })
      }
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
