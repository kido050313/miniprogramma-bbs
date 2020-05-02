// pages/bbsForum/postImg/index.js
let id = 0; // 用来记录当前第几个图文

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [
      {
        type: 'text',
        value: ''
      }
    ]
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // methods

  /**
   * 插入文本
   */
  addText() {
    let _content = [{
      id: ++id,
      type: 'text',
      value: ''
    }];
    this.setData({
      content: this.data.content.concat(_content)
    })
  },

  /**
   * 插入图文,上传图片
   */
  chooseImg: function () {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
       
        var tempFilePaths = res.tempFilePaths
        // 多图片
        // that.data.urls = that.data.urls.concat(tempFilePaths)
        // 单图片
        that.data.urls = tempFilePaths[0]
        // that.setData({
        //   images: tempFilePaths[0],
        //   urls: that.data.urls
        // })

        let _content = [{
          id: ++id,
          type: 'img',
          url: tempFilePaths[0],
          narratorStatus: false, // 有无旁白,默认false-无
          value: ''
        }]
        that.setData({
          content: that.data.content.concat(_content)
        })
      }
    })
  },

  /**
   * 删除插入的
   */
  deleteContent(e) {
    let index = e.currentTarget.dataset.index;
    console.log(this.data.conetent)
    if(this.data.content.length == 1) {
      wx.showToast({
        icon: 'none',
        title: '至少保留一个内容模块',
      })
      return;
    }
    this.data.content.splice(index, 1)
    this.setData({
      content: this.data.content
    })
  },

  /**
   * 添加旁白
   */
  addNarrator(e) {
    let index = e.currentTarget.dataset.index;
    let newNarratorStatus = 'content[' + index +'].narratorStatus';
    this.setData({
      [newNarratorStatus]: true
    })
  },

  /**
   * 删除旁白
   */
  deleteNarrator(e) {
    let index = e.currentTarget.dataset.index;
    let newNarratorStatus = 'content[' + index + '].narratorStatus';
    this.setData({
      [newNarratorStatus]: false
    })
  },


  /**
   * 文本内容
   */
  bindTextAreaBlur(e) {
    console.log(e)
  },



  // 发表
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