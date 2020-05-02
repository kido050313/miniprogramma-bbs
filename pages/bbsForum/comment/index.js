// var _articles = require("../../../models/articles.js"),
//   _comment2 = require("../../../models/comment.js"),
//   _common = require("../../../models/common.js"),
//   _follow = require("../../../models/follow.js"),
//   _http = require("../../../utils/http.js"),
let  app = getApp(),
//   http = new _http.HTTP(),
//   articles = new _articles.articlesModel(),
//   comment = new _comment2.commentModel(),
//   common = new _common.commonModel(),
//   follow = new _follow.followModel(),
  pageNum = 1,
  pageSize = 6;

Page({
  data: {
    height: 2 * (2 * app.globalData.height + 24),
    showLoading: !0,
    isEmpty: !1,
    list: [],
    one_id: 0,
    two_id: 0,
    post_id: 0,
    isShow: !1,
    commentIndex: 0
  },
  onLoad: function(t) {
    pageNum = 1;
    var e = t.id;
    this.setData({
      id: e,
      one_id: e
    }), this.getComment(), this.getCommDes();
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
  getCommDes: function() {
    var e = this,
      t = this.data.id;
    comment.getCommDes({
      commentId: t
    }).then(function(t) {
      e.setData({
        comment: t
      });
    });
  },
  getComment: function() {
    var o = this,
      t = this.data.id;
    comment.getSonComment({
      commentId: t,
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
  toUserDes: function(t) {
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/user-center/index?user_id=" + e
    });
  },
  followed: function(t) {
    var e = this,
      o = this.data.comment.user_id,
      n = this.data.comment;
    follow.followed({
      follow_id: o
    }).then(function(t) {
      n.followed = 0 == n.followed ? 1 : 0, 1 == n.followed && wx.showToast({
        title: "关注成功",
        icon: "none",
        duration: 2e3
      }), e.setData({
        comment: n
      });
    });
  },
  viewImages: function(t) {
    console.log(t);
    var e = t.currentTarget.dataset.index,
      o = t.currentTarget.dataset.images;
    wx.previewImage({
      current: o[e],
      urls: o
    });
  },
  goods: function(t) {
    var n = this,
      e = t.currentTarget.dataset.id,
      a = t.currentTarget.dataset.index;
    comment.goods({
      id: e
    }).then(function(t) {
      if ("my" == a) {
        var e = n.data.comment;
        1 == e.goods ? (e.goods = 0, e.good_number--) : (e.goods = 1, e.good_number++),
          n.setData({
            comment: e
          });
      } else {
        var o = n.data.list;
        1 == o[a].goods ? (o[a].goods = 0, o[a].good_number--) : (o[a].goods = 1, o[a].good_number++),
          n.setData({
            list: o
          });
      }
    });
  },
  toReport: function() {
    wx.navigateTo({
      url: "/pages/report/index?to_user_id=" + this.data.comment.user_id + "&type=3&to_id=" + this.data.comment.id
    });
  },
  upShow: function() {
    this.setData({
      isShow: !0
    });
  },
  clickInput: function(t) {
    console.log(t), this.setData({
      isShow: !0,
      two_id: t.currentTarget.dataset.index
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
      var n = {};
      if (n.post_id = e.post_id, n.one_id = e.one_id, n.two_id = e.two_id, n.value = e.value,
        0 < e.images.length)
        for (var a = 0, i = e.images, s = function(e) {
            http.uploadFile({
              filePath: i[e]
            }).then(function(t) {
              i[e] = t, ++a == i.length && (n.images = i, comment.putComment({
                data: n
              }).then(function(t) {
                if (0 == o.data.two_id) {
                  var e = o.data.comment;
                  e.com_number++, o.setData({
                    comment: e
                  });
                }
                o.setData({
                  isShow: !1,
                  list: [],
                  isEmpty: !1,
                  showLoading: !0
                }), pageNum = 1, o.getComment(), wx.hideLoading();
              }));
            });
          }, m = 0; m < i.length; m++) s(m);
      else comment.putComment({
        data: n
      }).then(function(t) {
        if (0 == o.data.two_id) {
          var e = o.data.comment;
          e.com_number++, o.setData({
            comment: e
          });
        }
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
  delComm: function(t) {
    var e = t.currentTarget.dataset.id,
      o = (t.currentTarget.dataset.index, t.currentTarget.dataset.admindel);
    wx.showModal({
      title: "提示",
      content: "确定删除吗",
      success: function(t) {
        t.confirm ? comment.delComm({
          id: e,
          adminDel: o
        }).then(function(t) {
          wx.showModal({
            title: "提示",
            content: "删除成功",
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        }) : t.cancel && console.log("用户点击取消");
      }
    });
  },
  delCommSon: function(t) {
    var o = this,
      e = t.currentTarget.dataset.id,
      n = t.currentTarget.dataset.index,
      a = t.currentTarget.dataset.admindel;
    wx.showModal({
      title: "提示",
      content: "确定删除吗",
      success: function(t) {
        t.confirm ? comment.delComm({
          id: e,
          adminDel: a
        }).then(function(t) {
          var e = o.properties.list;
          e.splice(n, 1), o.setData({
            list: e
          }), wx.showToast({
            title: "删除成功",
            icon: "success",
            duration: 2e3
          });
        }) : t.cancel && console.log("用户点击取消");
      }
    });
  }
});