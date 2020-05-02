// var _ciradmin = require("../../models/ciradmin.js"), _common = require("../../models/common.js"), ciradmin = new _ciradmin.ciradminModel(), common = new _common.commonModel();

Component({
    properties: {
        artid: {
            type: Number,
            value: 0
        },
        commentNumber: {
            type: Number,
            value: 0
        },
        goodsNumber: {
            type: Number,
            value: 0
        },
        goods: {
            type: Number,
            value: 0
        },
        // stored: {
        //     type: Number,
        //     value: 0
        // },
        // showStore: {
        //     type: Boolean,
        //     value: !0
        // },
        // showMore: {
        //     type: Boolean,
        //     value: !0
        // }
        showAdmin: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        showI: !1,
        actions: [ {
            name: "置顶/取消置顶"
        }, {
            name: "加精/取消加精"
        }, {
            name: "删除",
            className: "delArt"
        } ]
    },
    methods: {
        comment: function() {
            this.triggerEvent("click-comment", {}, {});
        },
        input: function() {
            this.triggerEvent("click-input", {}, {});
        },
        good: function() {
            this.triggerEvent("click-good", {}, {});
        },
        formSubmit: function(e) {
            console.log(e);
            var t = e.detail.formId;
            common.saveFormId({
                formId: t,
                use_max: 1
            }).then(function(e) {});
        },
        commentIcod: function() {
            this.triggerEvent("click-icod", {}, {});
        },
        store: function() {
            this.triggerEvent("click-store", {}, {});
        },
        more: function() {
            this.triggerEvent("click-more", {}, {});
        },
        onClose: function() {
            this.setData({
                showI: !1
            });
        },
        onSelect: function(e) {
            console.log(e.detail), this.setData({
                showI: !1
            });
            var t = this;
            this.setData({
                show: !1
            }), "置顶/取消置顶" == e.detail.name && ciradmin.tops({
                id: this.properties.artid
            }).then(function(e) {
                wx.showToast({
                    title: e.mss,
                    icon: "success",
                    duration: 2e3
                });
            }), "加精/取消加精" == e.detail.name && ciradmin.isEss({
                id: this.properties.artid
            }).then(function(e) {
                wx.showToast({
                    title: e.mss,
                    icon: "success",
                    duration: 2e3
                });
            }), "删除" == e.detail.name && wx.showModal({
                title: "提示",
                content: "确定删除吗",
                success: function(e) {
                    e.confirm ? ciradmin.delArt({
                        id: t.properties.artid
                    }).then(function(e) {
                        wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 2e3
                        }), setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 2e3);
                    }) : e.cancel && console.log("用户点击取消");
                }
            });
        },
        upShow: function() {
            this.setData({
                showI: !0
            });
        }
    }
});