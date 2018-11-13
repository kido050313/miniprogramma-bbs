// pages/order/orderComment/orderComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starCheckedList:[false,false,false,false,false],
    labelList:[
      { value: "产品性价比高", checked: false },
      { value: "舒适好用", checked: false },
      { value: "便携方便", checked: false },
      { value: "服务良好", checked: false }
    ],
    hasComment: false,
    orderData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    that.setData({ type: options.type, orderData: JSON.parse(options.item)})
  },

  changeLabelStatus: function (event){
    let that = this;
    let index = event.currentTarget.dataset.index, labelList = that.data.labelList;
    
    labelList[index].checked = !labelList[index].checked;
    that.setData({ labelList: labelList})
  },

  changeStarStatus: function(event){
    let that = this;
    let index = event.currentTarget.dataset.index, starCheckedList = that.data.starCheckedList;

    for (let i = 0; i < starCheckedList.length; i++) {
      if (i <= index) {
        starCheckedList[i] = true;
      } else {
        starCheckedList[i] = false;
      }
    }
    that.setData({ starCheckedList: starCheckedList })
  },

  submit: function(){
    wx.navigateBack({
      delta: 1,
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