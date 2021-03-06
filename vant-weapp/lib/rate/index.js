var __assign = function() {
    return (__assign = Object.assign || function(e) {
        for (var t, n = 1, o = arguments.length; n < o; n++) for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
        return e;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component");

component_1.VantComponent({
    field: !0,
    classes: [ "icon-class" ],
    props: {
        value: Number,
        readonly: Boolean,
        disabled: Boolean,
        allowHalf: Boolean,
        size: {
            type: Number,
            value: 20
        },
        icon: {
            type: String,
            value: "star"
        },
        voidIcon: {
            type: String,
            value: "star-o"
        },
        color: {
            type: String,
            value: "#ffd21e"
        },
        voidColor: {
            type: String,
            value: "#c7c7c7"
        },
        disabledColor: {
            type: String,
            value: "#bdbdbd"
        },
        count: {
            type: Number,
            value: 5
        }
    },
    data: {
        innerValue: 0
    },
    watch: {
        value: function(e) {
            e !== this.data.innerValue && this.set({
                innerValue: e
            });
        }
    },
    methods: {
        onSelect: function(e) {
            var t = this.data, n = e.currentTarget.dataset.score;
            t.disabled || t.readonly || (this.set({
                innerValue: n + 1
            }), this.$emit("input", n + 1), this.$emit("change", n + 1));
        },
        onTouchMove: function(n) {
            var o = this, e = n.touches[0], a = e.clientX, r = e.clientY;
            this.getRect(".van-rate__icon", !0).then(function(e) {
                var t = e.sort(function(e) {
                    return e.right - e.left;
                }).find(function(e) {
                    return a >= e.left && a <= e.right && r >= e.top && r <= e.bottom;
                });
                null != t && o.onSelect(__assign({}, n, {
                    currentTarget: t
                }));
            });
        }
    }
});