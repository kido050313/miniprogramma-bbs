// var _circles = require("../../models/circles.js"),
  // _categorys = require("../../models/categorys.js"),
  // _articles = require("../../models/articles.js"),
  // _topics = require("../../models/topics.js"),
const app = getApp();

const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
  // categorys = new _categorys.categorysModel(),
  // circles = new _circles.circlesModel(),
  // articles = new _articles.articlesModel(),
  // topics = new _topics.topicsModel(),
let pageNum = 1,
    pageSize = 6;

Page({
  data: {
    height: 2 * (2 * app.globalData.height + 24),
    checkIndex: 0,
    iden: "is_recom",
    showLoading: true,
    isEmpty: false,
    list: [],
    hostTopics: []
  },

  onLoad: function() {
    this.hostTopics();
    this.articlesList();
  },

  onPullDownRefresh: function() {

  },

  onShareAppMessage: function() {},

  onReachBottom: function() {
    this.data.isEmpty || (this.setData({
      showLoading: true
    }), this.data.totalPage < pageNum ? this.setData({
      showLoading: false,
      isEmpty: true
    }) : this.articlesList());
  },

  // getCircles: function() {
  //   var e = this;
  //   circles.recommend().then(function(t) {
  //     console.log(t), e.setData({
  //       hostCircles: t
  //     });
  //   });
  // },
 
 /**
  * 获取所有帖子
  */
  articlesList: function() {
    let userInfo = wx.getStorageSync('userInfo');
    console.log(pageNum)
    let data = {
      userId: userInfo.userId,
      page: pageNum,
      pageSize
    }
    util.request(api.getAllPosts, data, 'GET', 'json')
      .then(res => {
        let list = this.data.list.concat(res.data.list);
        this.setData({
          list,
          totalNum: res.data.total,
          totalPage: res.data.totalPage
        });
        if(res.data.totalPage <= pageNum) {
          this.setData({
            isEmpty: true,
            showLoading: false
          })
        }
        pageNum ++;
        console.log(pageNum)
      }) 
  },


  onClickNav: function(t) {
    console.log(t);
    var e = t.detail.dataset.index,
      i = t.detail.dataset.iden;
    pageNum = 1, this.setData({
      checkIndex: e,
      iden: i,
      list: [],
      isEmpty: !1,
      showLoading: !0
    }), this.articlesList();
  },

  /**
   * 获取所有话题
   */
  hostTopics: function() {
    let data = {
      page: 1,
      pageSize
    }
    util.request(api.getAllTopics, data, 'Get', 'json').then(res => {
      console.log(res)
      this.setData({
        hostTopics: res.data.list
      })
    })
  },

  onClickTopics: function(e) {
    console.log(e);
    let id = e.detail.dataset.id;
    wx.navigateTo({
      url: "/pages/bbsForum/topicList/index?id=" + id
    });
  },
  formSubmit: function(t) {
    console.log(t);
  },
  getMarkCheck: function() {
    common.getMarkCheck().then(function(t) {
      wx.setStorage({
        key: "markCheck",
        data: t
      });
    });
  }
});