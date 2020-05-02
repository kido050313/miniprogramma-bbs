Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), color_1 = require("../common/color");

component_1.VantComponent({
    props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
            type: String,
            value: "horizontal"
        },
        activeColor: {
            type: String,
            value: color_1.GREEN
        }
    }
});