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
    labelList:[],
    hasComment: false,
    item: {},
    orderItem: {},
    commentData: [],
    commentValue: "",
    evaluateLevel: '0'
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
      this.orderCommentQuery(item.orderId)
    }
  },

  orderCommentQuery: function (orderId){
    let that = this;
    util.request(api.orderCommentQuery, { "orderId": orderId}, "POST").then(function (res) {
      if (res.status == "200") {
        console.log(res)
        if(res.data && JSON.stringify(res.data)!="{}"){
          let { creationDate, evaluateLevel, evaluateText, evaluateTabDTO } = res.data, { starCheckedList, item } = that.data;
          item["creationDate"] = creationDate;
          item["evaluateText"] = evaluateText;

          for (let i = 0; i < Number(evaluateLevel); i++) {
            starCheckedList[i] = true;
          }

          evaluateTabDTO && evaluateTabDTO.map((item)=>{
            item.checked = true;
          })

          that.setData({
            labelList: evaluateTabDTO,
            starCheckedList: starCheckedList,
            item: item
          })
        }
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

    that.showEvaluateTabs(index+1)
    that.setData({ starCheckedList: starCheckedList, evaluateLevel: index+1 })
  },

  showEvaluateTabs: function (evaluateLevel){
    let that = this;
    util.request(api.getEvaluateTabsByLevel, { evaluateLevel: evaluateLevel}, "POST").then(function (res) {
      if (res.status == "200") {
        console.log(res)
        if(res.data){
          let { evaluateLevelText, evaluateConfigTabModels } = res.data, labelList = [];
          evaluateConfigTabModels && evaluateConfigTabModels.map((item)=>{
            labelList.push({ evaluateTab: item.evaluateTab, checked: false, evaluateTabId: item.evaluateTabId, evaluateConfigId: item.evaluateConfigId })
          })
          that.setData({labelList: labelList})
        }
      } else {
        wx.showModal({
          content: res.message,
          loading: false
        });
      }
    })
  },

  inputTxt: function (event){
    console.log('22222')
    let value = event.detail.value;
    this.setData({
      commentValue: value
    })
    console.log(value)
  },

  submit: function(){
    let that = this;
    let { labelList, commentValue, evaluateLevel, orderItem, item } = that.data, evaluateTabDTO=[]
    console.log(orderItem)
    console.log(item)

    if(evaluateLevel == '0'){
      wx.showModal({
        title: '提示',
        content: '请至少完成“星级评分”方可提交评价噢',
        showCancel: false
      });
    } else{
      let labelCheckedLen = 0
      labelList && labelList.map((item) => {
        if (item.checked) {
          labelCheckedLen ++;
          evaluateTabDTO.push({ evaluateConfigId: item.evaluateConfigId })
        }
      })

      if (labelCheckedLen == 0){
        evaluateTabDTO = null
      }
      that.submitComment(evaluateLevel, commentValue, orderItem.orderExternalId, item.productCode, item.orderId, evaluateTabDTO)
    }
  },

  submitComment: function (evaluateLevel, evaluateText, orderExternalId, productCode, orderId, evaluateTabDTO){
    let that = this, params = {};
    if (evaluateTabDTO){
      params = {
        orderId: orderId,
        evaluateLevel: evaluateLevel,
        evaluateText: evaluateText,
        orderExternalId: orderExternalId,
        productCode: productCode,
        evaluateTabDTO: evaluateTabDTO
      }
    }else{
      params = {
        orderId: orderId,
        evaluateLevel: evaluateLevel,
        evaluateText: evaluateText,
        orderExternalId: orderExternalId,
        productCode: productCode
      }
    }
    
    util.request(api.submitComment, params, "POST").then(function (res) {
      if (res.status == "2000000") {
        wx.showToast({
          title: '评价成功',
          icon: "none",
          duration: 3000,
          success: () => {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      } else {
        wx.showModal({
          content: res.message,
          loading: false
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