var _common = require("../../models/common.js"), common = new _common.commonModel();

Component({
    properties: {
        imgUrls: {
            type: Array,
            value: [ "http://sdev.car.dmoit.com/uploads/20190612/350e384cb226da7b27af4f3aa9bf314d.png", "http://sdev.car.dmoit.com/uploads/20190612/f4574cc6b28bfd2f15e3d9b03c81074a.png", "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=c87e52ca1a38534393cf8121a312b01f/e1fe9925bc315c60c9fcca4987b1cb134954772f.jpg" ]
        },
        heiget: {
            type: String,
            value: "150rpx"
        },
        bgColor: {
            type: String,
            value: "#fff"
        },
        shape: {
            type: String,
            value: "round"
        },
        position: {
            type: Number,
            value: 1
        }
    },
    data: {
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3
    },
    lifetimes: {
        attached: function() {
            var t = this;
            common.getImageNav({
                type: this.properties.position
            }).then(function(e) {
                t.setData({
                    images: e
                });
            });
        },
        detached: function() {}
    },
    methods: {
        jumpPage: function(e) {
            console.log(e);
            var t = e.currentTarget.dataset.index, a = this.data.images;
            1 == a[t].type ? wx.navigateTo({
                url: a[t].url
            }) : wx.navigateTo({
                url: "/pages/web-view/index?src=" + a[t].url
            });
        }
    }
});