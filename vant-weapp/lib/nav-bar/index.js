Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), safe_area_1 = require("../mixins/safe-area");

component_1.VantComponent({
    mixins: [ safe_area_1.safeArea({
        safeAreaInsetTop: !0
    }) ],
    classes: [ "title-class" ],
    props: {
        title: String,
        fixed: Boolean,
        leftText: String,
        rightText: String,
        leftArrow: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 120
        }
    },
    methods: {
        onClickLeft: function() {
            this.$emit("click-left");
        },
        onClickRight: function() {
            this.$emit("click-right");
        }
    }
});