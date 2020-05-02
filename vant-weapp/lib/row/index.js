Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component");

component_1.VantComponent({
    relation: {
        name: "col",
        type: "descendant",
        linked: function(t) {
            this.data.gutter && t.setGutter(this.data.gutter);
        }
    },
    props: {
        gutter: Number
    },
    watch: {
        gutter: "setGutter"
    },
    mounted: function() {
        this.data.gutter && this.setGutter();
    },
    methods: {
        setGutter: function() {
            var e = this, t = this.data.gutter, n = "-" + Number(t) / 2 + "px", r = t ? "margin-right: " + n + "; margin-left: " + n + ";" : "";
            this.set({
                style: r
            }), this.getRelationNodes("../col/index").forEach(function(t) {
                t.setGutter(e.data.gutter);
            });
        }
    }
});