// pages/user/userInfo.js

const util = require('../../utils/util.js');
const api = require('../../config/api.js');

const app = getApp()

const date = new Date();
const years = [];
const months = [];
const days = [];
//获取年
for (let i = 1900; i <= date.getFullYear(); i++) {
  years.push("" + i + "年");
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i + "月");
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i + "日");
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    showPicker: false,
    time: '',
    multiArray: [years, months, days],
    multiIndex: [90, 5, 16],
    choose_year: '',
    userInfo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      //设置默认的年份
      this.setData({
        choose_year: this.data.multiArray[0][0],
        userInfo: app.globalData.userInfo,
        time: app.globalData.userInfo.birthTime
      })
    }
  },

  editUname: function(){
    wx.navigateTo({
      url: './unameEdit/unameEdit',
    })
  },

  editPhone: function () {
    wx.navigateTo({
      url: './phoneEdit/phoneEdit',
    })
  },

  editGender: function () {
    wx.navigateTo({
      url: './genderEdit/genderEdit',
    })
  },

  editAddress: function () {
    wx.navigateTo({
      url: './addressEdit/addressEdit',
    })
  },

  editBirthday: function(){
    let that = this;
    that.setData({ showPicker: true})
  },

  editProfession: function(){
    wx.navigateTo({
      url: './professionEdit/professionEdit',
    })
  },

  //获取时间日期
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);

    let time = year.replace("年", "") + '-' + month.replace("月", "") + '-' + day.replace("日", "")

    this.setData({
      time: time
    })
    // console.log(this.data.time);
    this.submit(time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },

  submit(time){
    console.log(time);
    let that = this;
    // todo 提交信息
    app.globalData.userInfo && util.request(api.userUpdate, { birthTime: time, customerId: app.globalData.userInfo.customerId }, "POST").then(function (res) {
      if (res.status == "200") {
        let queryString = `?customerId=${app.globalData.userInfo.customerId}`
        util.request(api.userQuery + queryString, {}, "POST").then(function (res) {
          if (res.status == "200") {
            console.log('查询信息-->')
            console.log(res.data)
            app.globalData.userInfo.birthTime = res.data.birthTime
            that.setData({ time: res.data.birthTime })
            console.log("===生日修改成功====")
          }
        })
      } else {
        wx.showModal({
          content: res.message,
          showCancel: false
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
    if (app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        time: app.globalData.userInfo.birthTime
      })
    }
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