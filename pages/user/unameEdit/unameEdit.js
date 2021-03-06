// pages/user/unameEdit/unameEdit.js

const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo){
      this.setData({ username: app.globalData.userInfo.name })
    }
  },

  clearTxt: function(){
    let that = this;
    that.setData({ username: ""})
  },

  inputname: function(event){
    let value = event.detail.value;
    this.setData({
      username: value
    })
  },

  submit: function(){
    let that = this;
    // todo 提交信息
    app.globalData.userInfo && util.request(api.userUpdate, { name: that.data.username, customerId: app.globalData.userInfo.customerId}, "POST").then(function (res) {
      if (res.status == "200") {
        util.request(api.userQuery, { customerId: app.globalData.userInfo.customerId }, "POST", "form").then(function (res) {
          if (res.status == "200") {
            console.log('查询信息-->')
            console.log(res.data)
            app.globalData.userInfo.name = res.data.name
            that.setData({ username: res.data.name})
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