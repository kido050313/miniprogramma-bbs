// pages/bbsForum/post/index.js.js

const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('prew_video');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // methods

  /**
   * 选择视频
   */
  chooseVideo() {
    let that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        that.setData({
          videoUrl: res.tempFilePath
        })
      }
    })
  },

  /**
   * 全屏
   */

  bindVideoScreenchange(e) {
    var status = e.detail.fullScreen;
    var play = {
      playVideo: false
    }
    if(status) {
      play.playVideo = true;
    } else {
      this.videoContext.pause()
    }
    this.setData(play)
  },

  /**
   * 发表
   */
  submit() {
    console.log('send')
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