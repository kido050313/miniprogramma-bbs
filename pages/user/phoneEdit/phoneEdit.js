// pages/user/phoneEdit/phoneEdit.js

const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    code: "",
    showCountdown: false,
    countdown: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获取手机验证码
  getCode: function (e) {
    let that = this;
    console.log(that.data.phone);
    if (that.data.phone == '' || that.data.phone == undefined) {
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        showCancel: false
      });
    } else {
      that.sendCheckCode();
    }
  },

  //发送验证码
  sendCheckCode: function () {
    let that = this;
    let queryString = `?phoneNumber=${that.data.phone}`
    util.request(api.getCode + queryString, {}, "POST").then(function (res) {
      if (res.status == "200") {
        that.setData({
          showCountdown: true,
          countdown: 59
        })
        setTimeout(that.countdown, 1000);
      } else {
        wx.showModal({
          content: res.message,
          showCancel: false
        });
      }
    })
  },

  //计时器
  countdown: function () {
    let that = this, countdown = that.data.countdown;
    if (countdown > 0) {
      countdown--;
      that.setData({
        countdown: countdown,
        showCountdown: true
      })
      setTimeout(that.countdown, 1000);
    } else {
      that.setData({
        showCountdown: false
      })
    }
  },

  inputPhone: function (event) {
    let value = event.detail.value;
    this.setData({
      phone: value
    })
  },

  formSubmit: function (e) {
    let that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let form = e.detail.value;
    if (form.phone == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        showCancel: false
      });
    } else if (form.code == "") {
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
        showCancel: false
      });
    } else {
      app.globalData.userInfo && util.request(api.userUpdate, { phoneNumber: form.phone, phoneCode: form.code, customerId: app.globalData.userInfo.customerId }, "POST").then(function (res) {
        if (res.status == "200") {
          let queryString = `?customerId=${app.globalData.userInfo.customerId}`
          util.request(api.userQuery + queryString, {}, "POST").then(function (res) {
            if (res.status == "200") {
              console.log('查询信息-->')
              console.log(res.data)
              app.globalData.userInfo.phoneNumber = res.data.phoneNumber
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
            }
          })
        } else {
          wx.showModal({
            content: res.message,
            showCancel: false
          });
        }
      })
    }
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