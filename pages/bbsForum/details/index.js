var _slicedToArray = function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, e) {
      var o = [],
        a = !0,
        i = !1,
        n = void 0;
      try {
        for (var s, l = t[Symbol.iterator](); !(a = (s = l.next()).done) && (o.push(s.value), !e || o.length !== e); a = !0);
      } catch (t) {
        i = !0, n = t;
      } finally {
        try {
          !a && l.return && l.return();
        } finally {
          if (i) throw n;
        }
      }
      return o;
    }(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  },
  // _articles = require("../../../models/articles.js"),
  // _comment = require("../../../models/comment.js"),
  // _common = require("../../../models/common.js"),
  // _follow2 = require("../../../models/follow.js"),
  // _http = require("../../../utils/http.js"),
  app = getApp(),
  // http = new _http.HTTP(),
  // articles = new _articles.articlesModel(),
  // comment = new _comment.commentModel(),
  // common = new _common.commonModel(),
  // _follow = new _follow2.followModel(),
  pageNum = 1,
  pageSize = 6;

Page({
  data: {
    height: 2 * (2 * app.globalData.height + 24),
    userShow: !1,
    isShow: !1,
    showLoading: !0,
    isEmpty: !1,
    list: [],
    moreShow: !1,
    show: !1,
    time: 60,
    actions: [{
      name: "分享",
      openType: "share"
    }, {
      name: "举报"
    }]
  },
  onLoad: function(t) {
    pageNum = 1;
    var e = t.id;
    this.setData({
      id: e
    });
    var o = wx.getStorageSync("markCheck");
    this.setData({
      markCheck: o
    }), this.getDes(), this.getComment();
    var a = this;
    setInterval(function() {
      var t = a.data.time;
      t <= 0 ? t = 0 : t -= 1, a.setData({
        time: t
      });
    }, 1e3);
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {
    this.data.isEmpty || (this.setData({
      showLoading: !0
    }), this.data.totalPage < pageNum ? this.setData({
      showLoading: !1,
      isEmpty: !0
    }) : this.getComment());
  },
  onShareAppMessage: function() {},
  onPageScroll: function(t) {
    var e = !1;
    100 < t.scrollTop && (e = !0), this.setData({
      userShow: e
    });
  },
  onClose: function() {
    this.setData({
      show: !1
    });
  },
  onSelect: function(t) {
    console.log(t.detail);
    var e = this;
    this.setData({
      show: !1
    }), "举报" == t.detail.name && wx.navigateTo({
      url: "/pages/report/index?to_user_id=" + this.data.data.user_id + "&type=2&to_id=" + this.data.data.id
    }), "删除" == t.detail.name && wx.showModal({
      title: "提示",
      content: "确定删除吗",
      success: function(t) {
        t.confirm ? articles.delArt({
          id: e.data.data.id
        }).then(function(t) {
          wx.navigateBack({
            delta: 1
          });
        }) : t.cancel && console.log("用户点击取消");
      }
    });
  },
  getDes: function() {
    var o = this;
    articles.getDes({
      id: this.data.id
    }).then(function(t) {
      if (console.log(t), 1 == t.isDelete) {
        var e = o.data.actions;
        e.push({
          name: "删除",
          className: "delArt"
        }), o.setData({
          actions: e
        });
      }
      o.setData({
        data: t
      });
    });
  },
  upShow: function() {
    this.setData({
      isShow: !0
    });
  },
  getComment: function() {
    var o = this,
      t = this.data.id;
    comment.getComment({
      id: t,
      pageNumber: pageNum,
      pageSize: pageSize
    }).then(function(t) {
      var e = o.data.list.concat(t.list);
      o.setData({
        list: e,
        totalNum: t.total,
        totalPage: t.total_page
      }), t.total_page <= pageNum && o.setData({
        isEmpty: !0,
        showLoading: !1
      }), pageNum++;
    });
  },
  putComment: function(t) {
    var o = this,
      e = t.detail;
    if (console.log(e), "" != e.value) {
      wx.showLoading({
        mask: !0,
        title: "发表中"
      });
      var a = {};
      if (a.post_id = e.post_id, a.one_id = e.one_id, a.two_id = e.two_id, a.value = e.value,
        0 < e.images.length)
        for (var i = 0, n = e.images, s = function(e) {
            http.uploadFile({
              filePath: n[e]
            }).then(function(t) {
              n[e] = t, ++i == n.length && (a.images = n, comment.putComment({
                data: a
              }).then(function(t) {
                o.setData({
                  isShow: !1,
                  list: [],
                  isEmpty: !1,
                  showLoading: !0
                }), pageNum = 1, o.getComment(), wx.hideLoading();
              }));
            });
          }, l = 0; l < n.length; l++) s(l);
      else comment.putComment({
        data: a
      }).then(function(t) {
        o.setData({
          isShow: !1,
          list: [],
          isEmpty: !1,
          showLoading: !0
        }), pageNum = 1, o.getComment(), wx.hideLoading();
      });
    } else wx.showModal({
      title: "提示",
      content: "请输入内容",
      showCancel: !1,
      success: function(t) {
        t.confirm;
      }
    });
  },
  clickInput: function() {
    this.setData({
      isShow: !0
    });
  },
  clickGood: function() {
    var e = this,
      o = this.data.data;
    articles.getGood({
      id: o.id
    }).then(function(t) {
      1 == o.goods ? (o.goods = 0, o.good_count--) : (o.goods = 1, o.good_count++), e.setData({
        data: o
      });
    });
  },
  clickStore: function() {
    var e = this,
      o = this.data.data;
    articles.storeArt({
      id: o.id
    }).then(function(t) {
      1 == o.stored ? o.stored = 0 : o.stored = 1, e.setData({
        data: o
      });
    });
  },
  more: function() {
    this.setData({
      show: !0
    });
  },
  poster: function() {
    var t = this;
    common.getIcode({
      page: "/pages/article/details/index",
      scene: "id:" + t.data.data.id
    }).then(function(t) {
      console.log(t);
    });
  },
  follow: function() {
    var e = this,
      o = this.data.data;
    _follow.followed({
      follow_id: o.user.id
    }).then(function(t) {
      o.followed = 0 == o.followed ? 1 : 0, 1 == o.followed && wx.showToast({
        title: "关注成功",
        icon: "none",
        duration: 2e3
      }), e.setData({
        data: o
      });
    });
  },
  setTime: function() {
    var t = this.data.time;
    t -= 1, this.setData({
      time: t
    });
  },
  getRed: function() {
    0 < this.data.time ? wx.showModal({
      content: "还没到时间哦，先看看内容逛逛评论吧~",
      showCancel: !1,
      success: function(t) {
        t.confirm && console.log("用户点击确定");
      }
    }) : wx.navigateTo({
      url: "/pages/red-view/index?id=" + this.data.data.id
    });
  }
});