Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), link_1 = require("../mixins/link"), button_1 = require("../mixins/button"), open_type_1 = require("../mixins/open-type");

component_1.VantComponent({
    classes: [ "icon-class", "text-class" ],
    mixins: [ link_1.link, button_1.button, open_type_1.openType ],
    props: {
        text: String,
        info: String,
        icon: String,
        disabled: Boolean,
        loading: Boolean
    },
    methods: {
        onClick: function(n) {
            this.$emit("click", n.detail), this.jumpLink();
        }
    }
});