Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component");

component_1.VantComponent({
    field: !0,
    relation: {
        name: "radio-group",
        type: "ancestor"
    },
    classes: [ "icon-class", "label-class" ],
    props: {
        name: null,
        value: null,
        disabled: Boolean,
        labelDisabled: Boolean,
        labelPosition: String,
        checkedColor: String
    },
    methods: {
        emitChange: function(e) {
            var a = this.getRelationNodes("../radio-group/index")[0] || this;
            a.$emit("input", e), a.$emit("change", e);
        },
        onChange: function(e) {
            this.emitChange(e.detail.value);
        },
        onClickLabel: function() {
            this.data.disabled || this.data.labelDisabled || this.emitChange(this.data.name);
        }
    }
});