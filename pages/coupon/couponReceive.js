// pages/coupon/couponReceive.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    couponData: [],
    loading: true
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
    this.getAllCoupons()
  },

  getAllCoupons: function(){
    let that = this;
    // that.setData({ loading: true})
    util.request(api.couponReceiveQuery, {}, "POST").then(function (res) {
      console.log(res)
      let couponData = res;
      couponData.map((item)=>{
        item.startTime = item.startTime && item.startTime.substring(0,10);
        item.overdueTime = item.overdueTime && item.overdueTime.substring(0, 10);   
        item.couponDesc = item.couponDesc.split("\n");  
        console.log(item.couponDesc)    
      })
      that.setData({
        loading: false,
        couponData: couponData,
      });
    })
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

  receive: function (item){
    // let item = event.currentTarget.dataset.item;
    // console.log(item)

    let that = this;
    let {userInfo} = that.data;

    if (item.receivedStatus){
      let queryString = `?phoneNum=${userInfo.phoneNumber}&couponId=${item.couponId}`
      util.request(api.couponReceive+queryString, {}, "POST").then(function (res) {
        console.log(res)
        if (res.status == "200") {
          wx.showToast({
            title: '领取成功',
            duration: 2000,
            icon: "none"
          })
          // that.sendTemplate(item)
        } else{
          wx.showToast({
            title: res.message,
            duration: 2000,
            icon: "none"
          })
        }
      })
      that.getAllCoupons()
    }else{
      wx.showToast({
        title: '领取失败! 该券已被领取完',
        duration: 2000,
        icon: "none"
      })
    }
  },

  formSubmit: function (event){
    console.log(event.detail.value)
    let {item} = event.detail.value, formId = event.detail.formId ;

    item = JSON.parse(item)
    console.log(item)
    console.log("formId="+formId)

    this.receive(item)
  },

  sendTemplate: function(item){

    let templateConfigId = '718CJxMsHiPPOGHHvf2z2zDsN0esZwgAKpWVqr1bniA';
    let touser = wx.getStorageSync("openid");
    let queryString = `?templateConfigId=${templateConfigId}&touser=${touser}`

    let expiryDate = "", couponCondition="";

    if (item.overdueType == '0'){
      expiryDate = `${item.startTime} 至 ${item.overdueTime}`
    }else{
      expiryDate = `自领取之日起,第${item.receivedEffectDay}天 生效`
    }

    if (item.couponCondition != '0'){
      couponCondition = `满 ${item.couponCondition} 元可用`
    }else{
      couponCondition = "无使用门槛"
    }
    let data = {
      "couponName": {
        "value": "339208499"
      },
      "couponCondition": {
        "value": "2015年01月05日 12:30"
      },
      "receiveTime": {
        "value": Date.now()
      } ,
      "expiryDate": {
        "value": '有效日期'
      }
    }
    util.request('http://www.51shoop.cn/api/dmpMarketing/smallProgramAccessConfig/sendMsg' + queryString, {}, "POST").then(function (res) {
      console.log(res)
      if (res.status == "200") {
        wx.showToast({
          title: '推送成功',
          duration: 2000,
          icon: "none"
        })
      } else {
        wx.showToast({
          title: res.message,
          duration: 2000,
          icon: "none"
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