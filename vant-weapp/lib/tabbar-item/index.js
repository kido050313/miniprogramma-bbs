Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component");

component_1.VantComponent({
    props: {
        info: null,
        icon: String,
        dot: Boolean
    },
    relation: {
        name: "tabbar",
        type: "ancestor",
        linked: function(t) {
            this.parent = t;
        }
    },
    data: {
        active: !1
    },
    methods: {
        onClick: function() {
            this.parent && this.parent.onChange(this), this.$emit("click");
        },
        setActive: function(t) {
            var e = t.active, n = t.color;
            return this.data.active !== e ? this.set({
                active: e,
                color: n
            }) : Promise.resolve();
        }
    }
});