const app = getApp();

const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

let pageNum = 1,
  pageSize = 6;

Page({
  data: {
    height: 2 * (2 * app.globalData.height + 24),
    navData: {
      color: "#fff",
      frontColor: "#ffffff",
      bgcolor: "",
      title: ""
    },

    checkIndex: 0,
    iden: "new",
    showLoading: !0,
    isEmpty: !1,
    list: [],
    topic: {
      key: "topic",
      id: 0,
      title: ""
    }
  },
  onLoad: function(options) {
    pageNum = 1;
    var id = options.id;
    this.setData({
      id
    }), this.topicsDet(), this.articlesList();
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    var t = this;
    setTimeout(function() {
      pageNum = 1, t.setData({
        list: [],
        arrange: !1,
        isEmpty: !1,
        showLoading: !0
      }), t.articlesList(), t.topicsDet(), wx.stopPullDownRefresh();
    }, 1e3);
  },
  onReachBottom: function() {
    this.data.isEmpty || (this.setData({
      showLoading: !0
    }), this.data.totalPage < pageNum ? this.setData({
      showLoading: !1,
      isEmpty: !0
    }) : this.articlesList());
  },
  onShareAppMessage: function() {},
  onPageScroll: function(t) {
    var i = {
      color: "#fff",
      frontColor: "#ffffff",
      bgcolor: "",
      title: ""
    };
    50 < t.scrollTop && (i.frontColor = "#000000", i.color = "#000", i.bgcolor = "#fff",
      i.title = "#" + this.data.topicsDet.title + "#"), wx.setNavigationBarColor({
      frontColor: i.frontColor,
      backgroundColor: "#ff0000",
      animation: {
        duration: 400,
        timingFunc: "easeIn"
      }
    }), this.setData({
      navData: i
    });
  },
  topicsDet: function() {
    var a = this;
    topics.topicsDet({
      id: this.data.id
    }).then(function(t) {
      var i = a.data.topic;
      i.id = t.id, i.title = "#" + t.title + "#", a.setData({
        topicsDet: t,
        topic: i
      });
    });
  },
  articlesList: function() {
    var a = this;
    articles.getArtByTopicOrCir({
      id: this.data.id,
      iden: this.data.iden,
      by: "top",
      pageNumber: pageNum,
      pageSize: pageSize
    }).then(function(t) {
      var i = a.data.list.concat(t.list);
      a.setData({
        list: i,
        totalNum: t.total,
        totalPage: t.total_page
      }), t.total_page <= pageNum && a.setData({
        isEmpty: !0,
        showLoading: !1
      }), pageNum++, console.log(t);
    });
  },
  onClickNav: function(t) {
    console.log(t);
    var i = t.detail.dataset.index,
      a = t.detail.dataset.iden;
    pageNum = 1, this.setData({
      checkIndex: i,
      iden: a,
      list: [],
      isEmpty: !1,
      showLoading: !0
    }), this.articlesList();
  }
});