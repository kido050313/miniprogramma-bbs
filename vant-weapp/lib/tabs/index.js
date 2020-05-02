Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), touch_1 = require("../mixins/touch");

component_1.VantComponent({
    mixins: [ touch_1.touch ],
    classes: [ "nav-class", "tab-class", "tab-active-class", "line-class" ],
    relation: {
        name: "tab",
        type: "descendant",
        linked: function(t) {
            this.child.push(t), this.updateTabs(this.data.tabs.concat(t.data));
        },
        unlinked: function(t) {
            var e = this.child.indexOf(t), i = this.data.tabs;
            i.splice(e, 1), this.child.splice(e, 1), this.updateTabs(i);
        }
    },
    props: {
        color: String,
        sticky: Boolean,
        animated: Boolean,
        swipeable: Boolean,
        lineWidth: {
            type: Number,
            value: -1
        },
        lineHeight: {
            type: Number,
            value: -1
        },
        active: {
            type: Number,
            value: 0
        },
        type: {
            type: String,
            value: "line"
        },
        border: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4
        },
        offsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        tabs: [],
        lineStyle: "",
        scrollLeft: 0,
        scrollable: !1,
        trackStyle: "",
        wrapStyle: "",
        position: ""
    },
    watch: {
        swipeThreshold: function() {
            this.set({
                scrollable: this.child.length > this.data.swipeThreshold
            });
        },
        color: "setLine",
        lineWidth: "setLine",
        lineHeight: "setLine",
        active: "setActiveTab",
        animated: "setTrack",
        offsetTop: "setWrapStyle"
    },
    beforeCreate: function() {
        this.child = [];
    },
    mounted: function() {
        var e = this;
        this.setLine(!0), this.setTrack(), this.scrollIntoView(), this.getRect(".van-tabs__wrap").then(function(t) {
            e.navHeight = t.height, e.observerContentScroll();
        });
    },
    destroyed: function() {
        this.createIntersectionObserver().disconnect();
    },
    methods: {
        updateTabs: function(t) {
            t = t || this.data.tabs, this.set({
                tabs: t,
                scrollable: t.length > this.data.swipeThreshold
            }), this.setActiveTab();
        },
        trigger: function(t, e) {
            this.$emit(t, {
                index: e,
                title: this.data.tabs[e].title
            });
        },
        onTap: function(t) {
            var e = t.currentTarget.dataset.index;
            this.data.tabs[e].disabled ? this.trigger("disabled", e) : (this.trigger("click", e), 
            this.setActive(e));
        },
        setActive: function(t) {
            t !== this.data.active && (this.trigger("change", t), this.set({
                active: t
            }), this.setActiveTab());
        },
        setLine: function(o) {
            var r = this;
            if ("line" === this.data.type) {
                var t = this.data, c = t.color, h = t.active, l = t.duration, d = t.lineWidth, u = t.lineHeight;
                this.getRect(".van-tab", !0).then(function(t) {
                    var e = t[h], i = -1 !== d ? d : e.width / 2, a = -1 !== u ? "height: " + u + "px;" : "", n = t.slice(0, h).reduce(function(t, e) {
                        return t + e.width;
                    }, 0);
                    n += (e.width - i) / 2;
                    var s = o ? "" : "transition-duration: " + l + "s; -webkit-transition-duration: " + l + "s;";
                    r.set({
                        lineStyle: "\n            " + a + "\n            width: " + i + "px;\n            background-color: " + c + ";\n            -webkit-transform: translateX(" + n + "px);\n            transform: translateX(" + n + "px);\n            " + s + "\n          "
                    });
                });
            }
        },
        setTrack: function() {
            var a = this, t = this.data, n = t.animated, s = t.active, o = t.duration;
            if (!n) return "";
            this.getRect(".van-tabs__content").then(function(t) {
                var e = t.width;
                a.set({
                    trackStyle: "\n            width: " + e * a.child.length + "px;\n            left: " + -1 * s * e + "px;\n            transition: left " + o + "s;\n            display: -webkit-box;\n            display: flex;\n          "
                });
                var i = {
                    width: e,
                    animated: n
                };
                a.child.forEach(function(t) {
                    t.set(i);
                });
            });
        },
        setActiveTab: function() {
            var a = this;
            this.child.forEach(function(t, e) {
                var i = {
                    active: e === a.data.active
                };
                i.active && (i.inited = !0), i.active !== t.data.active && t.set(i);
            }), this.set({}, function() {
                a.setLine(), a.setTrack(), a.scrollIntoView();
            });
        },
        scrollIntoView: function() {
            var s = this, t = this.data, o = t.active;
            t.scrollable && Promise.all([ this.getRect(".van-tab", !0), this.getRect(".van-tabs__nav") ]).then(function(t) {
                var e = t[0], i = t[1], a = e[o], n = e.slice(0, o).reduce(function(t, e) {
                    return t + e.width;
                }, 0);
                s.set({
                    scrollLeft: n - (i.width - a.width) / 2
                });
            });
        },
        onTouchStart: function(t) {
            this.data.swipeable && this.touchStart(t);
        },
        onTouchMove: function(t) {
            this.data.swipeable && this.touchMove(t);
        },
        onTouchEnd: function() {
            if (this.data.swipeable) {
                var t = this.data, e = t.active, i = t.tabs, a = this.direction, n = this.deltaX, s = this.offsetX;
                "horizontal" === a && 50 <= s && (0 < n && 0 !== e ? this.setActive(e - 1) : n < 0 && e !== i.length - 1 && this.setActive(e + 1));
            }
        },
        setWrapStyle: function() {
            var t, e = this.data, i = e.offsetTop;
            switch (e.position) {
              case "top":
                t = "\n            top: " + i + "px;\n            position: fixed;\n          ";
                break;

              case "bottom":
                t = "\n            top: auto;\n            bottom: 0;\n          ";
                break;

              default:
                t = "";
            }
            t !== this.data.wrapStyle && this.set({
                wrapStyle: t
            });
        },
        observerContentScroll: function() {
            var n = this;
            if (this.data.sticky) {
                var s = this.data.offsetTop, t = wx.getSystemInfoSync().windowHeight;
                this.createIntersectionObserver().disconnect(), this.createIntersectionObserver().relativeToViewport({
                    top: -(this.navHeight + s)
                }).observe(".van-tabs", function(t) {
                    var e = t.boundingClientRect.top;
                    if (!(s < e)) {
                        var i = 0 < t.intersectionRatio ? "top" : "bottom";
                        n.$emit("scroll", {
                            scrollTop: e + s,
                            isFixed: "top" === i
                        }), n.setPosition(i);
                    }
                }), this.createIntersectionObserver().relativeToViewport({
                    bottom: -(t - 1 - s)
                }).observe(".van-tabs", function(t) {
                    var e = t.boundingClientRect, i = e.top;
                    if (!(e.bottom < n.navHeight)) {
                        var a = 0 < t.intersectionRatio ? "top" : "";
                        n.$emit("scroll", {
                            scrollTop: i + s,
                            isFixed: "top" === a
                        }), n.setPosition(a);
                    }
                });
            }
        },
        setPosition: function(t) {
            var e = this;
            t !== this.data.position && this.set({
                position: t
            }).then(function() {
                e.setWrapStyle();
            });
        }
    }
});