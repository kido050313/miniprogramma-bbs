Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component");

component_1.VantComponent({
    relation: {
        type: "ancestor",
        name: "badge-group",
        linked: function(e) {
            this.parent = e;
        }
    },
    props: {
        info: null,
        title: String
    },
    methods: {
        onClick: function() {
            var e = this, t = this.parent;
            if (t) {
                var n = t.badges.indexOf(this);
                t.setActive(n).then(function() {
                    e.$emit("click", n), t.$emit("change", n);
                });
            }
        },
        setActive: function(e) {
            return this.set({
                active: e
            });
        }
    }
});