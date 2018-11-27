// pages/order/orderComment/orderComment.js
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starCheckedList:[false,false,false,false,false],
    labelList:[
      { evaluateTab: "产品性价比高", checked: false, evaluateTabId: "", evaluateConfigId: "" },
      { evaluateTab: "舒适好用", checked: false, evaluateTabId: "", evaluateConfigId: "" },
      { evaluateTab: "便携方便", checked: false, evaluateTabId: "", evaluateConfigId: "" },
      { evaluateTab: "服务良好", checked: false, evaluateTabId: "", evaluateConfigId: ""  }
    ],
    hasComment: false,
    item: {},
    orderItem: {},
    commentData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    let { type, item, orderItem} = options
    item = JSON.parse(item);
    orderItem = JSON.parse(orderItem);

    that.setData({ hasComment: type, item, orderItem})

    // 已经评价
    if(type){
      this.orderCommentQuery(orderItem.orderExternalId, item.productCode)
    }else{

    }
  },

  orderCommentQuery: function (orderExternalId, productCode){
    let that = this;
    let queryString = `?orderExternalId=${orderExternalId}&productCode=${productCode}`
    util.request(api.orderCommentQuery + queryString, {}, "POST").then(function (res) {
      if (res.status == "200") {
        console.log(res)
        let { commentData, evaluateTabDTO } = res.data, { starCheckedList } = that.data;
        
        for (let i = 0;i < Number(commentData.evaluateLevel); i++) {
          starCheckedList[i] = true;
        }

        that.setData({
          labelList: evaluateTabDTO,
          starCheckedList: starCheckedList,
          commentData: commentData
        })
      } else {
        wx.showModal({
          content: res.message,
          loading: false
        });
      }
    })
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

    that.showEvaluateTabs(index)
    that.setData({ starCheckedList: starCheckedList })
  },

  showEvaluateTabs: function (evaluateLevel){
    let that = this;
    let queryString = `?evaluateLevel=${evaluateLevel}`
    util.request(api.getEvaluateTabsByLevel + queryString, {}, "POST").then(function (res) {
      if (res.status == "200") {
        console.log(res)
      } else {
        wx.showModal({
          content: res.message,
          loading: false
        });
      }
    })
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