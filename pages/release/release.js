// var _http = require("../../utils/http.js"), _articles = require("../../models/articles.js"), _common = require("../../models/common.js"), _dialog = require("../../vant-weapp/dist/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog), _toast = require("../../vant-weapp/dist/toast/toast"), _toast2 = _interopRequireDefault(_toast);

// function _interopRequireDefault(t) {
//   return t && t.__esModule ? t : {
//     default: t
//   };
// }

var app = getApp(),
  weigh = 0;
  // articles = new _articles.articlesModel(),
  // common = new _common.commonModel(),
  // http = new _http.HTTP();

Page({
  data: {
    height: 2 * (2 * app.globalData.height + 24),
    is_sort: !1,
    title: "",
    topic: {
      id: 0,
      title: ""
    },
    cir: {
      id: 0,
      title: ""
    },
    clases: {
      id: 0,
      title: ""
    },
    video_url: "",
    subType: 1,
    data: [{
      type: 1,
      value: "",
      aside: "",
      is_aside: 0,
      weigh: weigh
    }],
    videoLim: 0,
    show: !1,
    redSet: {
      status: !1,
      redMoney: 0,
      redNumber: 0
    }
  },
  onLoad: function(t) {
    var e = this;
    console.log(t);
    var a = wx.getStorageSync("token"),
      i = wx.getStorageSync("cir"),
      o = wx.getStorageSync("topic"),
      s = wx.getStorageSync("markCheck");
    if (this.setData({
        markCheck: s
      }), a || wx.redirectTo({
        url: "/pages/login/login"
      }), i) {
      var n = this.data.cir;
      n.id = i.id, n.title = i.title, this.setData({
        cir: n
      });
    }
    if (o) {
      var d = this.data.topic;
      d.id = o.id, d.title = o.title, this.setData({
        topic: d
      });
    }
    this.setData({
      subType: t.subType
    }), common.videoLim().then(function(t) {
      e.setData({
        videoLim: t
      });
    });
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  inputTitle: function(t) {
    this.setData({
      title: t.detail
    });
  },
  addText: function() {
    console.log(weigh);
    var t = {
        type: 1,
        value: "",
        aside: "",
        is_aside: 0,
        weigh: weigh += 10
      },
      e = this.data.data;
    e.push(t), this.setData({
      data: e
    });
  },
  inputContent: function(t) {
    var e = t.currentTarget.dataset.index,
      a = t.detail.value,
      i = this.data.data;
    i[e].value = a, this.setData({
      data: i
    });
  },
  delText: function(t) {
    console.log(t);
    var a = this,
      i = t.currentTarget.dataset.index;
    wx.showModal({
      title: "提示",
      content: "确定删除该内容吗",
      success: function(t) {
        if (t.confirm) {
          var e = a.data.data;
          if (e.length <= 1) return void wx.showToast({
            title: "至少保留一个内容模块",
            icon: "none",
            duration: 2e3
          });
          e.splice(i, 1), a.setData({
            data: e
          });
        } else if (t.cancel) return;
      }
    });
  },
  chooseImg: function() {
    var i = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function(t) {
        t.tempFilePaths;
        weigh += 10;
        var e = {
            type: 2,
            value: t.tempFilePaths[0],
            aside: "",
            is_aside: 0,
            weigh: weigh
          },
          a = i.data.data;
        a.push(e), i.setData({
          data: a
        });
      }
    });
  },
  changeAside: function(t) {
    console.log(t);
    var e = t.currentTarget.dataset.index,
      a = this.data.data;
    a[e].is_aside = 0 == a[e].is_aside ? 1 : 0, 0 == a[e].is_aside && (a[e].aside = ""),
      this.setData({
        data: a
      });
  },
  inputAside: function(t) {
    var e = t.currentTarget.dataset.index,
      a = t.detail.value,
      i = this.data.data;
    i[e].aside = a, this.setData({
      data: i
    });
  },
  changeSort: function(t) {
    console.log(t);
    var e = this.data.data,
      a = t.detail;
    e[t.target.dataset.index].weigh = a, this.setData({
      data: e
    });
  },
  switchSort: function() {
    var t = !this.data.is_sort;
    if (!t) {
      var e = this.data.data;
      e.sort(this.compare("weigh")), this.setData({
        data: e
      });
    }
    this.setData({
      is_sort: t
    });
  },
  compare: function(a) {
    return function(t, e) {
      return t[a] - e[a];
    };
  },
  chooseTopic: function() {
    wx.navigateTo({
      url: "/pages/topic/index/index?check=1"
    });
  },
  chooseCri: function() {
    wx.navigateTo({
      url: "/pages/group-circle/index/index?check=1"
    });
  },
  chooseClases: function() {
    wx.navigateTo({
      url: "/pages/search-class/search-class?check=1"
    });
  },
  delTopic: function() {
    this.setData({
      topic: {
        id: 0,
        title: ""
      }
    });
  },
  delCir: function() {
    this.setData({
      cir: {
        id: 0,
        title: ""
      }
    });
  },
  delClases: function() {
    this.setData({
      clases: {
        id: 0,
        title: ""
      }
    });
  },
  subBefore: function() {
    var a = this;
    if (this.data.title.length < 6 || 30 < this.data.title.length) wx.showToast({
      title: "标题在6-30字之间",
      icon: "none",
      duration: 2e3
    });
    else if (0 != this.data.topic.id || 0 != this.data.cir.id || 0 != this.data.clases.id) {
      var i = this.data.data,
        o = 0;
      if (1 == this.data.subType)
        for (var t = 0; t < i.length; t++) {
          if ("" == i[t].value) return void wx.showToast({
            title: "请填写内容",
            icon: "none",
            duration: 2e3
          });
          2 == i[t].type && o++;
        }
      if (2 == this.data.subType) {
        if ("" == this.data.video_url) return void wx.showToast({
          title: "请选择视频",
          icon: "none",
          duration: 2e3
        });
        wx.showLoading({
          mask: !0,
          title: "正在上传视频"
        }), http.uploadFile({
          filePath: this.data.video_url
        }).then(function(t) {
          a.subData(t), wx.hideLoading();
        });
      }
      if (1 == this.data.subType)
        if (0 < o) {
          wx.showLoading({
            mask: !0,
            title: "正在上传图片"
          });
          for (var s = 0, e = function(e) {
              2 == i[e].type && http.uploadFile({
                filePath: i[e].value
              }).then(function(t) {
                i[e].value = t, ++s == o && (wx.hideLoading(), a.subData());
              });
            }, n = 0; n < i.length; n++) e(n);
        } else this.subData();
    } else wx.showToast({
      title: "圈子、话题、分类至少选择一个",
      icon: "none",
      duration: 2e3
    });
  },
  subData: function() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
    wx.showLoading({
      title: "发帖中"
    });
    var e = {};
    e.title = this.data.title, e.subType = this.data.subType, e.topic = this.data.topic,
      e.cir = this.data.cir, e.clases = this.data.clases, e.data = this.data.data, e.video_url = t,
      e.redSet = this.data.redSet, console.log(e), articles.subData({
        postData: e
      }).then(function(t) {
        e.redSet.status ? (wx.hideLoading(), wx.showLoading({
          title: "正在创建支付",
          mask: !0
        }), articles.payRed({
          id: t.id
        }).then(function(t) {
          wx.hideLoading(), wx.requestPayment({
            timeStamp: t.pay_data.timeStamp,
            nonceStr: t.pay_data.nonceStr,
            package: t.pay_data.package,
            signType: t.pay_data.signType,
            paySign: t.pay_data.paySign,
            success: function(t) {
              wx.showModal({
                title: "提示",
                content: "发帖成功",
                showCancel: !1,
                success: function(t) {
                  t.confirm ? wx.navigateBack({
                    delta: 1
                  }) : t.cancel && console.log("用户点击取消");
                }
              });
            },
            fail: function(t) {
              wx.showModal({
                title: "提示",
                content: "支付失败,您的帖子已发表,但红包帖功能不生效",
                showCancel: !1,
                success: function(t) {
                  t.confirm && wx.navigateBack({
                    delta: 1
                  });
                }
              });
            }
          });
        })) : (wx.hideLoading(), wx.showModal({
          title: "提示",
          content: "发帖成功",
          showCancel: !1,
          success: function(t) {
            t.confirm && wx.navigateBack({
              delta: 1
            });
          }
        }));
      });
  },
  addVideo: function() {
    var a = this;
    wx.chooseVideo({
      sourceType: ["album", "camera"],
      maxDuration: 60,
      camera: "back",
      success: function(t) {
        console.log(t);
        var e = 1024 * a.data.videoLim * 1024;
        t.size > e ? wx.showToast({
          title: "视频超过" + a.data.videoLim + "MB，无法上传",
          icon: "none",
          duration: 2e3
        }) : a.setData({
          video_url: t.tempFilePath
        });
      }
    });
  },
  formSubmit: function(t) {
    console.log(t);
    var e = t.detail.formId;
    common.saveFormId({
      formId: e,
      use_max: 1
    }).then(function(t) {});
  },
  showRedSet: function() {
    this.setData({
      show: !0
    });
  },
  confResSet: function() {
    var t = this.data.redSet,
      e = this;
    t.status ? 0 == t.redMoney || "" == t.redMoney || 0 == t.redNumber || "" == t.redNumber ? wx.showModal({
      title: "",
      showCancel: !1,
      content: "请填写正确红包参数",
      success: function(t) {
        t.confirm && e.setData({
          show: !0
        });
      }
    }) : t.redMoney / t.redNumber < .01 ? wx.showModal({
      title: "",
      showCancel: !1,
      content: "单个红包金额不能少于0.01元",
      success: function(t) {
        t.confirm && e.setData({
          show: !0
        });
      }
    }) : e.setData({
      show: !1
    }) : e.setData({
      show: !1
    });
  },
  changeRedStatus: function() {
    var t = this.data.redSet;
    t.status = !t.status, this.setData({
      redSet: t
    });
  },
  bindRedData: function(t) {
    console.log(t);
    var e = t.detail,
      a = t.currentTarget.dataset.type,
      i = this.data.redSet;
    "1" == a ? i.redMoney = e : i.redNumber = e, this.setData({
      redSet: i
    });
  },
  showRedNumMsg: function() {
    wx.showModal({
      title: "",
      showCancel: !1,
      content: "如红包个数为10个，系统将生成10个随机红包，10个随机红包相加总额为设置的红包金额(类似微信手气红包)",
      success: function(t) {
        t.confirm && console.log("用户点击确定");
      }
    });
  }
});