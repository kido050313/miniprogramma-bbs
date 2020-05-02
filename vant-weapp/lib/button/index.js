Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), button_1 = require("../mixins/button"), open_type_1 = require("../mixins/open-type");

component_1.VantComponent({
    mixins: [ button_1.button, open_type_1.openType ],
    classes: [ "hover-class", "loading-class" ],
    props: {
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        type: {
            type: String,
            value: "default"
        },
        size: {
            type: String,
            value: "normal"
        },
        loadingSize: {
            type: String,
            value: "20px"
        }
    },
    methods: {
        onClick: function() {
            this.data.disabled || this.data.loading || this.$emit("click");
        }
    }
});