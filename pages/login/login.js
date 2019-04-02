// pages/login/login.js

const util = require('../../utils/util.js');
const api = require('../../config/api.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    phone: "",
    code: "",
    showCountdown: false,
    countdown: 0,
    comeFrom: '0',
    couponId: '',
    shouldItUnload:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // TODO:新增逻辑获取来源参数，并存储为当前页属性，以防登录失败刷新
  onLoad: function(options) {
    // console.log(options.userInfo)
    this.setData({
      comeFrom: options.comeFrom,
      couponId: options.couponId
    })
    if(options.comeFrom=='1'){
      this.setData({
        shouldItUnload: true
      })
    }
    console.log(this.data.comeFrom)
    if (options.userInfo) {
      this.setData({
        userInfo: JSON.parse(options.userInfo)
      })
      // console.log(this.userInfo)
    }
    if (!wx.getStorageSync("token")) {
      this.getToken();
    }
  },

  getToken() {
    wx.request({
      // url: api.getToken + `?corpId=ww9fa669a713c72aba`, //测试
      url: api.getToken + `?corpId=ww6513f60f6da03c2e`,
      data: {},
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log('token==' + res.data.data)
        if (res.statusCode == 200) {
          wx.setStorageSync('token', res.data.data)
        }
      },
      fail: function(err) {
        console.log("failed")
      }
    })
  },

  //获取手机验证码
  getCode: function(e) {
    let that = this;
    console.log(that.data.phone);
    if (that.data.phone == '' || that.data.phone == undefined) {
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        showCancel: false
      });
    } else {
      that.sendCheckCode();
    }
  },

  //发送验证码
  sendCheckCode: function() {
    let that = this;
    util.request(api.getCode, {
      phoneNumber: that.data.phone
    }, "POST", "form").then(function(res) {
      if (res.status == "200") {
        that.setData({
          showCountdown: true,
          countdown: 59
        })
        setTimeout(that.countdown, 1000);
      } else {
        wx.showModal({
          content: res.message,
          showCancel: false
        });
      }
    })
  },

  //计时器
  countdown: function() {
    let that = this,
      countdown = that.data.countdown;
    if (countdown > 0) {
      countdown--;
      that.setData({
        countdown: countdown,
        showCountdown: true
      })
      setTimeout(that.countdown, 1000);
    } else {
      that.setData({
        showCountdown: false
      })
    }
  },


  inputPhone: function(event) {
    let value = event.detail.value;
    this.setData({
      phone: value
    })
  },

  login: function(phone, code) {
    let that = this;
    util.request(api.login, {
      phoneNumber: phone,
      code: code,
      source: "小程序"
    }, "POST", "form").then(function(res) {
      if (res.status == "200") {
        wx.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 3000
        })
        that.setData({
          shouldItUnload:false
        })
        let userInfo = that.data.userInfo,
          info = res.data;

        console.log("info before------>")
        console.log(info)
        console.log(userInfo)
        info.nickname = userInfo.nickName;
        info.photoUrl = userInfo.avatarUrl;


        console.log("info after------>")
        console.log(info)
        app.globalData.userInfo = info;

        that.saveNickName(userInfo.nickName)

        // 将userInfo存入本地缓存
        wx.setStorageSync("userInfo", info)
        console.log(that.data.comeFrom == '1')
        if (that.data.comeFrom == '1') {
          wx.reLaunch({
            url: '../choiceCoupon/choiceCoupon?couponId=' + that.data.couponId,
          })
        } else {
          wx.navigateBack({
            delta: 1,
          })
        }
      } else {
        wx.showModal({
          content: res.message,
          showCancel: false
        });
      }
    })
  },

  saveNickName: function(nickname) {
    util.request(api.userUpdate, {
      nickname: nickname,
      customerId: app.globalData.userInfo.customerId,
      wxOpenid: wx.getStorageSync("openid"),
      wxUnionId: wx.getStorageSync("unionid")
    }, "POST").then(function(res) {
      if (res.status == "200") {
        console.log("保存微信昵称成功：微信昵称为->" + nickname)
      } else {
        wx.showModal({
          content: res.message,
          showCancel: false
        });
      }
    })
  },

  formSubmit: function(e) {
    let that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let form = e.detail.value;
    if (form.phone == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        showCancel: false
      });
    } else if (form.code == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号码验证码',
        showCancel: false
      });
    } else {
      if (wx.getStorageSync("token")) {
        that.login(form.phone, form.code);
      } else {
        wx.request({
          // url: api.getToken + `?corpId=ww9fa669a713c72aba`,
          url: api.getToken + `?corpId=ww6513f60f6da03c2e`,
          data: {},
          method: "POST",
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            console.log('token==' + res.data.data)
            if (res.statusCode == 200) {
              wx.setStorageSync('token', res.data.data)
              that.login(form.phone, form.code);
            }
          },
          fail: function(err) {
            console.log("failed")
          }
        })
      }
    }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // this.onUnload()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if(this.data.shouldItUnload){
      if (this.data.comeFrom == '1') {
        wx.reLaunch({
          url: '../index/index',
        })
      }
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

  }
})