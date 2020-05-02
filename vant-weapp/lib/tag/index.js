Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), color_1 = require("../common/color"), DEFAULT_COLOR = "#999", COLOR_MAP = {
    danger: color_1.RED,
    primary: color_1.BLUE,
    success: color_1.GREEN
};

component_1.VantComponent({
    props: {
        size: String,
        type: String,
        mark: Boolean,
        color: String,
        plain: Boolean,
        round: Boolean,
        textColor: String
    },
    computed: {
        style: function() {
            var o, t = this.data.color || COLOR_MAP[this.data.type] || DEFAULT_COLOR, r = ((o = {})[this.data.plain ? "color" : "background-color"] = t, 
            o);
            return this.data.textColor && (r.color = this.data.textColor), Object.keys(r).map(function(o) {
                return o + ": " + r[o];
            }).join(";");
        }
    }
});