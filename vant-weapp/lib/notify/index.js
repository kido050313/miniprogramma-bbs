Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), color_1 = require("../common/color"), safe_area_1 = require("../mixins/safe-area");

component_1.VantComponent({
    mixins: [ safe_area_1.safeArea() ],
    props: {
        text: String,
        color: {
            type: String,
            value: "#fff"
        },
        backgroundColor: {
            type: String,
            value: color_1.RED
        },
        duration: {
            type: Number,
            value: 3e3
        },
        zIndex: {
            type: Number,
            value: 110
        }
    },
    methods: {
        show: function() {
            var e = this, t = this.data.duration;
            clearTimeout(this.timer), this.set({
                show: !0
            }), 0 < t && t !== 1 / 0 && (this.timer = setTimeout(function() {
                e.hide();
            }, t));
        },
        hide: function() {
            clearTimeout(this.timer), this.set({
                show: !1
            });
        }
    }
});