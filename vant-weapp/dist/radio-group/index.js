var _component = require("../common/component");

(0, _component.VantComponent)({
    field: !0,
    relation: {
        name: "radio",
        type: "descendant",
        linked: function(e) {
            var a = this.data, n = a.value, t = a.disabled;
            e.set({
                value: n,
                disabled: t || e.data.disabled
            });
        }
    },
    props: {
        value: null,
        disabled: Boolean
    },
    watch: {
        value: function(a) {
            this.getRelationNodes("../radio/index").forEach(function(e) {
                e.set({
                    value: a
                });
            });
        },
        disabled: function(a) {
            this.getRelationNodes("../radio/index").forEach(function(e) {
                e.set({
                    disabled: a || e.data.disabled
                });
            });
        }
    }
});