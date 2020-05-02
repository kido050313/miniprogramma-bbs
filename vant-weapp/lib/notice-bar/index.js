Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), FONT_COLOR = "#ed6a0c", BG_COLOR = "#fffbe8";

component_1.VantComponent({
    props: {
        text: {
            type: String,
            value: ""
        },
        mode: {
            type: String,
            value: ""
        },
        url: {
            type: String,
            value: ""
        },
        openType: {
            type: String,
            value: "navigate"
        },
        delay: {
            type: Number,
            value: 1
        },
        speed: {
            type: Number,
            value: 50
        },
        scrollable: {
            type: Boolean,
            value: !0
        },
        leftIcon: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: FONT_COLOR
        },
        backgroundColor: {
            type: String,
            value: BG_COLOR
        },
        wrapable: Boolean
    },
    data: {
        show: !0
    },
    watch: {
        text: function() {
            this.set({}, this.init);
        }
    },
    created: function() {
        this.resetAnimation = wx.createAnimation({
            duration: 0,
            timingFunction: "linear"
        });
    },
    destroyed: function() {
        this.timer && clearTimeout(this.timer);
    },
    methods: {
        init: function() {
            var s = this;
            Promise.all([ this.getRect(".van-notice-bar__content"), this.getRect(".van-notice-bar__wrap") ]).then(function(t) {
                var e = t[0], i = t[1];
                if (null != e && null != i && e.width && i.width) {
                    var n = s.data, a = n.speed, o = n.scrollable, r = n.delay;
                    if (o && i.width < e.width) {
                        var l = e.width / a * 1e3;
                        s.wrapWidth = i.width, s.contentWidth = e.width, s.duration = l, s.animation = wx.createAnimation({
                            duration: l,
                            timingFunction: "linear",
                            delay: r
                        }), s.scroll();
                    }
                }
            });
        },
        scroll: function() {
            var t = this;
            this.timer && clearTimeout(this.timer), this.timer = null, this.set({
                animationData: this.resetAnimation.translateX(this.wrapWidth).step().export()
            }), setTimeout(function() {
                t.set({
                    animationData: t.animation.translateX(-t.contentWidth).step().export()
                });
            }, 20), this.timer = setTimeout(function() {
                t.scroll();
            }, this.duration);
        },
        onClickIcon: function() {
            this.timer && clearTimeout(this.timer), this.timer = null, this.set({
                show: !1
            });
        },
        onClick: function(t) {
            this.$emit("click", t);
        }
    }
});