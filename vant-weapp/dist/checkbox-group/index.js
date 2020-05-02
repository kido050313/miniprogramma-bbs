var _component = require("../common/component");

(0, _component.VantComponent)({
    field: !0,
    relation: {
        name: "checkbox",
        type: "descendant",
        linked: function(e) {
            var a = this.data, n = a.value, t = a.disabled;
            e.set({
                value: -1 !== n.indexOf(e.data.name),
                disabled: t || e.data.disabled
            });
        }
    },
    props: {
        max: Number,
        value: Array,
        disabled: Boolean
    },
    watch: {
        value: function(a) {
            this.getRelationNodes("../checkbox/index").forEach(function(e) {
                e.set({
                    value: -1 !== a.indexOf(e.data.name)
                });
            });
        },
        disabled: function(a) {
            this.getRelationNodes("../checkbox/index").forEach(function(e) {
                e.set({
                    disabled: a || e.data.disabled
                });
            });
        }
    }
});