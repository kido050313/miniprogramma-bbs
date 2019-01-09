// pages/user/addressEdit/addressEdit.js

const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: "",
    city: "",
    region: "",
    detail: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo
    if(userInfo){
      this.setData({
        province: userInfo.province || "",
        city: userInfo.city || "",
        region: userInfo.region || "",
        detail: userInfo.address || "",
      })
    }
  },

  clear: function(event){
    let that = this;
    let type = event.currentTarget.dataset.type;
    switch(type){
      case "province": that.setData({ province: "" });break;
      case "city": that.setData({ city: "" }); break;
      case "region": that.setData({ region: "" }); break;
      case "detail": that.setData({ detail: "" }); break;
    }
  },

  formSubmit: function (e) {
    let that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let form = e.detail.value;
    if (form.provice == "") {
      wx.showModal({
        title: '提示',
        content: '请输入所在省',
        showCancel: false
      });
    } else if (form.city == "") {
      wx.showModal({
        title: '提示',
        content: '请输入所在市',
        showCancel: false
      });
    } else if (form.region == "") {
      wx.showModal({
        title: '提示',
        content: '请输入所在区/县',
        showCancel: false
      });
    } else if (form.detail == "") {
      wx.showModal({
        title: '提示',
        content: '请输入详细地址',
        showCancel: false
      });
    } else {
      let addressDetail = [form.province, form.city, form.region, form.detail];
      console.log(addressDetail.join(" "))
      app.globalData.userInfo && util.request(api.userUpdate, { addressDetail: addressDetail.join(" "), customerId: app.globalData.userInfo.customerId }, "POST").then(function (res) {
        if (res.status == "200") {
          util.request(api.userQuery, { customerId: app.globalData.userInfo.customerId }, "POST", "form").then(function (res) {
            if (res.status == "200") {
              console.log('查询信息-->')
              console.log(res.data)
              app.globalData.userInfo.province = res.data.province;
              app.globalData.userInfo.city = res.data.city;
              app.globalData.userInfo.region = res.data.region;
              app.globalData.userInfo.address = res.data.address;
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

  inputProvince: function (event) {
    let value = event.detail.value;
    this.setData({
      provice: value
    })
  },

  inputCity: function (event) {
    let value = event.detail.value;
    this.setData({
      city: value
    })
  },

  inputRegion: function (event) {
    let value = event.detail.value;
    this.setData({
      region: value
    })
  },

  inputDetail: function (event) {
    let value = event.detail.value;
    this.setData({
      detail: value
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