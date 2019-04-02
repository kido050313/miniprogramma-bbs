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
      url: '../choiceCoupon/choiceCoupon?couponId=85690a423f94407c9ef6de2ffa4fa9a4',
    })
  },
  onHide:function(){
    this.onUnload()
  },
  onUnload:function(){

  }
})
