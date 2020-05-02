Component({
  properties: {
    isShow: {
      type: Boolean,
      value: !1
    },
    params: {
      type: Object,
      value: {
        key: "",
        id: 0,
        title: ""
      }
    }
  },
  data: {},
  methods: {
    downShow: function () {
      this.setData({
        isShow: !1
      });
    },
    upShow: function () {
      this.setData({
        isShow: !0
      });
    },
    toSub: function (e) {
      this.setData({
        isShow: !1
      }), 
      wx.removeStorageSync("cir"),
      wx.removeStorageSync("topic"),
      0 != this.properties.params.id && wx.setStorageSync(this.properties.params.key, this.properties.params);
      var o = e.currentTarget.dataset.type;
      wx.navigateTo({
        url: "/pages/release/release?subType=" + o + "&params=" + this.properties.params
      });
    },
    // formSubmit: function (e) {
    //   console.log(e);
    //   var o = e.detail.formId;
    //   common.saveFormId({
    //     formId: o,
    //     use_max: 1
    //   }).then(function (e) { });
    // }
  }
});