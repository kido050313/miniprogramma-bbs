Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), safe_area_1 = require("../mixins/safe-area");

component_1.VantComponent({
    mixins: [ safe_area_1.safeArea() ],
    relation: {
        name: "tabbar-item",
        type: "descendant",
        linked: function(e) {
            this.children = this.children || [], this.children.push(e), this.setActiveItem();
        },
        unlinked: function(t) {
            this.children = this.children || [], this.children = this.children.filter(function(e) {
                return e !== t;
            }), this.setActiveItem();
        }
    },
    props: {
        active: Number,
        activeColor: String,
        fixed: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    watch: {
        active: function(e) {
            this.currentActive = e, this.setActiveItem();
        }
    },
    created: function() {
        this.currentActive = this.data.active;
    },
    methods: {
        setActiveItem: function() {
            var i = this;
            return Array.isArray(this.children) && this.children.length ? Promise.all(this.children.map(function(e, t) {
                return e.setActive({
                    active: t === i.currentActive,
                    color: i.data.activeColor
                });
            })) : Promise.resolve();
        },
        onChange: function(e) {
            var t = this, i = (this.children || []).indexOf(e);
            i !== this.currentActive && -1 !== i && (this.currentActive = i, this.setActiveItem().then(function() {
                t.$emit("change", i);
            }));
        }
    }
});