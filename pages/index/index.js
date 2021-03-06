//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    userInfo: undefined,
    couponCanReceive: 0,
    myCouponCount: 0
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    let token = wx.getStorageSync("token")
    console.log(app.globalData.userInfo)
    // 从本地缓存中取出userInfo（注释）
    app.globalData.userInfo = wx.getStorageSync("userInfo")
    if (app.globalData.userInfo) {
      let customerNum = app.globalData.userInfo.customerNum;
      customerNum = customerNum.replace(/(\d{4})(?=\d)/g, '$1 ');
      console.log(customerNum)
      app.globalData.userInfo.customerNum = customerNum;
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }

    if(wx.getStorageSync("token")){
      this.getAllCoupons();
    }
  },

  getAllCoupons: function () {
    let that = this;
    util.request(api.couponReceiveQuery, {
      activityType:'0'
    }, "POST").then(function (res) {
      let couponData = res;
      that.setData({
        couponCanReceive: couponData.length,
      });
    })
  },

  getAllCoupons: function() {
    let that = this;
    util.request(api.couponReceiveQuery, {
      activityType: '0'
    }, "POST", "form").then(function(result) {
      let couponData = result;
      that.setData({
        couponCanReceive: couponData.length,
      });
    })
  },

  getMyCoupons: function(couponStatus) {
    let that = this;
    util.request(api.getMyCoupons, {
      customerId: app.globalData.userInfo.customerId
    }, "POST", "form").then(function(res) {
      if (res.status == "200") {
        let couponList = res.couponList,
          couponData = [],
          customerInfo = res.customerInfo;
        couponList.map((item) => {
          if (item.couponStatus == couponStatus) {
            couponData.push(item)
          }
        })
        that.setData({
          myCouponCount: couponData.length
        })
      } else {
        wx.showModal({
          content: res.message
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let token = wx.getStorageSync("token")

    if (token) {
      this.getAllCoupons();
      this.updateUserInfo();
      if (app.globalData.userInfo) {
        this.getMyCoupons('有效')
      }
    } else {
      this.getToken();
      if (wx.getStorageSync("token")) {
        that.getAllCoupons();
        that.updateUserInfo();
      }
    }
  },

  onHide:function(){
    this.onUnload()
  },

  onUnload:function(){
  },

  updateUserInfo() {
    let that = this;
    console.log(app.globalData.userInfo.customerId)
    util.request(api.userQuery, {
      customerId: app.globalData.userInfo.customerId
    }, "POST", "form").then(function(res) {
      if (res.status == "200") {

        let {
          photoUrl,
          customerNum
        } = app.globalData.userInfo;
        customerNum = customerNum && customerNum.replace(/(\d{4})(?=\d)/g, '$1 ');

        app.globalData.userInfo = res.data;
        app.globalData.userInfo.photoUrl = photoUrl;
        app.globalData.userInfo.customerNum = customerNum;

        that.setData({
          userInfo: app.globalData.userInfo
        })
      }
    })
  },

  getToken() {
    let that = this;
    wx.request({
      // url: api.getToken + `?corpId=ww9fa669a713c72aba`,
      url: api.getToken,
      data: {
        username: 'admin',
        password: 'lishisheng'
      },
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // console.log('token==' + res.data.data)
        console.log(res.statusCode)
        if (res.statusCode == 200) {

          let token = res.data.data.tokenHead + ' ' + res.data.data.token
          wx.setStorageSync('token', token)
          console.log(wx.getStorageSync('token'))
        }
      },
      fail: function(err) {
        console.log("failed")
      }
    })
  },

  getUserInfo: function(e) {
    // console.log(e.currentTarget.dataset)
    console.log(e)
    let gotoPage = e.currentTarget.dataset.page
    let userInfo = {};
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      if (app.globalData.userInfo) {
        if (gotoPage == "user") {
          this.toUserCenter();
        } else if (gotoPage == "coupon") {
          this.toCouponList();
        } else if (gotoPage == "order") {
          this.toOrderList();
        }
      } else {
        userInfo = e.detail.userInfo;
        // wx.navigateTo({
        //   url: '../login/login?userInfo=' + JSON.stringify(userInfo),
        // })
      }
      this.login(e.detail.userInfo);

    }
  },

  login: function (userInfo) {
    let that = this;
    wx.login({
      success: function(res) {
        wx.showToast({
          title: '拼命登录中...',
          icon: 'none',
          duration: 1000
        })
        console.log(res);
        util.request(api.login, {
            code: res.code,
            userInfo
        }, "POST", "json").then(res => {
            if (res.code == "200") {
              wx.showToast({
                title: '登录成功',
                icon: 'none',
                duration: 3000
              })
              let info = res.data;
              console.log("info before------>")
              console.log(info)
              console.log(userInfo)
              info.nickname = userInfo.nameNickName;
              info.photoUrl = userInfo.avatarUrl;
              console.log("info after------>")
              console.log(info)
              app.globalData.userInfo = info;
              
              // 将userInfo存入本地缓存
              wx.setStorageSync("userInfo", info)

            } else {
              wx.showModal({
                content: res.message,
                showCancel: false
              });
            }
          })
      }
    })
  },

  receiveCoupon: function() {
    wx.navigateTo({
      url: '../coupon/couponReceive',
    })
  },

  toUserCenter: function() {
    wx.navigateTo({
      url: '../user/userInfo',
    })
  },

  toCouponList: function() {
    wx.navigateTo({
      url: '../myCoupon/myCoupon',
    })
  },

  toOrderList: function() {
    wx.navigateTo({
      url: '../order/orderList',
    })
  },

  toYouZan: function() {
    wx.navigateTo({
      url: '../youzan/youzan',
    })
  },

  toChoiceCoupon: function () {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  toService: function() {
    wx.navigateTo({
      url: '../service/service',
    })
  },
})