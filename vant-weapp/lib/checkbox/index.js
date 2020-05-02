Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component");

component_1.VantComponent({
    field: !0,
    relation: {
        name: "checkbox-group",
        type: "ancestor"
    },
    classes: [ "icon-class", "label-class" ],
    props: {
        value: null,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: "round"
        }
    },
    methods: {
        emitChange: function(e) {
            var t = this.getRelationNodes("../checkbox-group/index")[0];
            t ? this.setParentValue(t, e) : (this.$emit("input", e), this.$emit("change", e));
        },
        toggle: function() {
            this.data.disabled || this.emitChange(!this.data.value);
        },
        onClickLabel: function() {
            this.data.disabled || this.data.labelDisabled || this.emitChange(!this.data.value);
        },
        setParentValue: function(e, t) {
            var a = e.data.value.slice(), i = this.data.name;
            if (t) {
                if (e.data.max && a.length >= e.data.max) return;
                -1 === a.indexOf(i) && (a.push(i), e.$emit("input", a), e.$emit("change", a));
            } else {
                var n = a.indexOf(i);
                -1 !== n && (a.splice(n, 1), e.$emit("input", a), e.$emit("change", a));
            }
        }
    }
});