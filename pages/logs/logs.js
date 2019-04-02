//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  toChoiceCoupon: function () {
    wx.reLaunch({
      url: '../choiceCoupon/choiceCoupon?couponId=45f3bb23332b4703bf10e845f44a376f',
    })
  },
  onHide:function(){
    this.onUnload()
  },
  onUnload:function(){

  }
})
