Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), link_1 = require("../mixins/link"), button_1 = require("../mixins/button"), open_type_1 = require("../mixins/open-type");

component_1.VantComponent({
    mixins: [ link_1.link, button_1.button, open_type_1.openType ],
    props: {
        text: String,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            value: "danger"
        }
    },
    methods: {
        onClick: function(e) {
            this.$emit("click", e.detail), this.jumpLink();
        }
    }
});