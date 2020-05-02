// var _comment = require("../../models/comment.js"), _http = require("../../utils/http.js"), _common = require("../../models/common.js");

function _defineProperty(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

// var http = new _http.HTTP(), comment = new _comment.commentModel(), common = new _common.commonModel();

Component({
    properties: {
        isShow: {
            type: Boolean,
            value: !0
        },
        postId: {
            type: Number,
            value: 0
        },
        oneId: {
            type: Number,
            value: 0
        },
        twoId: {
            type: Number,
            value: 0
        }
    },
    data: {
        images: [],
        value: ""
    },
    methods: {
        downShow: function() {
            this.setData({
                isShow: !1
            });
        },
        upShow: function() {
            this.setData({
                isShow: !0
            });
        },
        chooseImg: function() {
            var a = this;
            wx.chooseImage({
                count: 3,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    var t = e.tempFilePaths, o = a.data.images.concat(t);
                    6 < o.length ? wx.showModal({
                        title: "提示",
                        content: "图片最多只能上传3张",
                        showCancel: !1,
                        success: function(e) {
                            e.confirm;
                        }
                    }) : (a.setData({
                        images: o
                    }), console.log(o));
                }
            });
        },
        formSubmit: function(e) {
            console.log(e);
            var t = e.detail.formId;
            common.saveFormId({
                formId: t,
                use_max: 1
            }).then(function(e) {});
        },
        delImage: function(e) {
            console.log(e);
            var t = e.currentTarget.dataset.index, o = this.data.images;
            o.splice(t, 1), this.setData({
                images: o
            });
        },
        input: function(e) {
            console.log(e);
            var t = e.detail.value;
            console.log(t), this.setData({
                value: t
            });
        },
        putComments: function() {
            var e, t = (_defineProperty(e = {
                value: this.data.value,
                post_id: this.properties.postId,
                one_id: this.properties.oneId,
                two_id: this.properties.twoId
            }, "value", this.data.value), _defineProperty(e, "images", this.data.images), e);
            this.triggerEvent("click-put", t, {});
        },
        putComment: function() {
            var o = this;
            if ("" != this.data.value) {
                var a = {};
                if (a.post_id = this.properties.postId, a.one_id = this.properties.oneId, a.two_id = this.properties.twoId, 
                a.value = this.data.value, 0 < this.data.images.length) for (var n = 0, i = this.data.images, e = function(t) {
                    http.uploadFile({
                        filePath: i[t]
                    }).then(function(e) {
                        i[t] = e, ++n == i.length && (a.images = i, comment.putComment({
                            data: a
                        }).then(function(e) {
                            o.setData({
                                isShow: !1
                            });
                        }));
                    });
                }, t = 0; t < i.length; t++) e(t); else comment.putComment({
                    data: a
                }).then(function(e) {
                    o.setData({
                        isShow: !1
                    });
                });
            } else wx.showModal({
                title: "提示",
                content: "请输入内容",
                showCancel: !1,
                success: function(e) {
                    e.confirm;
                }
            });
        }
    }
});