Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component");

component_1.VantComponent({
    props: {
        show: Boolean,
        mask: Boolean,
        customStyle: String,
        duration: {
            type: [ Number, Object ],
            value: 300
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    methods: {
        onClick: function() {
            this.$emit("click");
        },
        noop: function() {}
    }
});