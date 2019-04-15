const util = require('../../utils/util.js');
const api = require('../../config/api.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    couponData: [],
    loading: true,
    couponId: '',
    shouldItUnload: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      couponId: options.couponId,
      userInfo: wx.getStorageSync('userInfo')
    })
    this.getAllCoupons()
  },

  // getAllCoupons: function(){
  //   let that = this;
  //   // that.setData({ loading: true})
  //   util.request(api.couponReceiveQuery, {
  //     activityType:0
  //   }, "POST").then(function (res) {
  //     console.log(res)
  //     let couponData = res;
  //     couponData.map((item)=>{
  //       item.startTime = item.startTime && item.startTime.substring(0,10);
  //       item.overdueTime = item.overdueTime && item.overdueTime.substring(0, 10);   
  //       item.couponDesc = item.couponDesc.split("\n");  
  //       console.log(item.couponDesc)    
  //     })
  //     that.setData({
  //       loading: false,
  //       couponData: couponData,
  //     });
  //   })
  // },

  getAllCoupons: function() {
    let that = this;
    util.request(api.couponReceiveQuery, {
      couponId: that.data.couponId,
      activityType: '1'
    }, "POST", "form").then(function(res) {
      // console.log(res)
      let couponData = res;
      couponData.map((item) => {
        item.startTime = item.startTime && item.startTime.substring(0, 10);
        item.overdueTime = item.overdueTime && item.overdueTime.substring(0, 10);
        item.couponDesc = item.couponDesc.split("\n");
        // console.log(item.couponDesc)
      })
      that.setData({
        loading: false,
        couponData: couponData,
      });
    })
  },

  getUserInfo: function(e) {
    console.log('getUserInfo')
    // console.log(e.currentTarget.dataset)
    let gotoPage = e.currentTarget.dataset.page
    let that = this
    let userInfo = {};
    if (e.detail.userInfo) {
      userInfo = e.detail.userInfo;
      that.setData({
        shouldItUnload: false
      })
      wx.navigateTo({
        url: '../login/login?comeFrom=1&couponId=' + that.data.couponId + '&userInfo=' + JSON.stringify(userInfo),
      })
    }
  },

  receive: function(item, formId) {
    // let item = event.currentTarget.dataset.item;
    let that = this;
    let {
      userInfo
    } = that.data;

    if (item.receivedStatus) {
      util.request(api.couponReceive, {
        customerId: userInfo.customerId,
        couponId: item.couponId
      }, "POST", "form").then(function(res) {
        // console.log(res)
        if (res.status == "200") {
          that.sendTemplate(item, formId)
        } else {
          wx.showToast({
            title: res.message,
            duration: 2000,
            icon: "none"
          })
        }
      })
      that.setData({
        shouldItUnload: false
      })
      wx.navigateTo({
        url: '../myCoupon/myCoupon?fromWhere=1',
      })
      that.onUnload()
      that.getAllCoupons()
    } else {
      wx.showToast({
        title: '领取失败! 该券已被领取完',
        duration: 2000,
        icon: "none"
      })
    }
  },

  formSubmit: function(event) {
    // console.log(event.detail.value)
    let {
      item
    } = event.detail.value, formId = event.detail.formId;
    item = JSON.parse(item)
    // console.log(item)
    // console.log("formId=" + formId)
    // this.sendTemplate(item, formId)
    console.log(item)
    this.receive(item, formId)
  },

  sendTemplate: function(item, formId) {
    // console.log(item)

    let expiryDate = "",
      couponCondition = "";

    if (item.overdueType == '0') {
      expiryDate = `${item.startTime} 至 ${item.overdueTime}`
    } else {
      expiryDate = `自领取之日起,第${item.receivedEffectDay}天 生效`
    }

    if (item.couponCondition != '0') {
      couponCondition = `满 ${item.couponCondition} 元可用`
    } else {
      couponCondition = "无使用门槛"
    }

    let timestamp = Date.now()

    let date = util.formatTime(timestamp)

    let template_id = 'fPV8wXARZzhqInGrSnq6RIsiVzNkU5lNccKtM2BK6L0';
    // let template_id = 'fPV8wXARZzhqInGrSnq6RKYROe0GTOLpSyZ3aEOfXwQ';
    let touser = wx.getStorageSync("openid");
    let params = {
      "template_id": template_id, //模版id
      "touser": touser, //接受者的openid
      "page": "pages/index/index", //点击模板卡片后的跳转页面
      "form_id": formId, //表单提交场景下，为 submit 事件带上的 formId
      "data": JSON.stringify({ //模板内容，不填则下发空模板
        "keyword1": { //卡券名称
          "value": item.couponName
        },
        "keyword2": { //使用限制
          "value": couponCondition
        },
        "keyword3": { //领取时间
          "value": date
        },
        "keyword4": { //有效日期
          "value": expiryDate
        }
      }),
      "emphasis_keyword": "keyword1.value" //模板需要放大的关键词，不填则默认无放大
    }

    console.log("params")
    console.log(params)


    util.request(api.sendTemplateMsg, params, "POST").then(function(res) {
      // console.log(res)
      if (res.status == "200") {
        // wx.showToast({
        //   title: '推送成功',
        //   duration: 2000,
        //   icon: "none"
        // })
        wx.showToast({
          title: '领取成功',
          duration: 2000,
          icon: "none"
        })
      } else {
        wx.showToast({
          title: res.message,
          duration: 2000,
          icon: "none"
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    let that = this
    // wx.setTimeout(() => {
    //   that.onUnload()
    // }, 10)
    that.onUnload()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.data.shouldItUnload) {
      setTimeout(function() {
        wx.redirectTo({
          url: '../index/index',
        })
      }, 200)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})