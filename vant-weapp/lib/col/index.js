Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component");

component_1.VantComponent({
    relation: {
        name: "row",
        type: "ancestor"
    },
    props: {
        span: Number,
        offset: Number
    },
    data: {
        style: ""
    },
    methods: {
        setGutter: function(e) {
            var t = e / 2 + "px", o = e ? "padding-left: " + t + "; padding-right: " + t + ";" : "";
            o !== this.data.style && this.set({
                style: o
            });
        }
    }
});