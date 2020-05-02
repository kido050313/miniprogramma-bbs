Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), nextTick = function() {
    return new Promise(function(t) {
        return setTimeout(t, 20);
    });
};

component_1.VantComponent({
    classes: [ "title-class", "content-class" ],
    relation: {
        name: "collapse",
        type: "ancestor",
        linked: function(t) {
            this.parent = t;
        }
    },
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        isLink: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        contentHeight: 0,
        expanded: !1,
        transition: !1
    },
    mounted: function() {
        var t = this;
        this.updateExpanded().then(nextTick).then(function() {
            t.set({
                transition: !0
            });
        });
    },
    methods: {
        updateExpanded: function() {
            if (!this.parent) return Promise.resolve();
            var t = this.parent.data, e = t.value, n = t.accordion, i = this.parent.children, a = void 0 === i ? [] : i, o = this.data.name, s = a.indexOf(this), r = null == o ? s : o, c = n ? e === r : (e || []).some(function(t) {
                return t === r;
            }), l = [];
            return c !== this.data.expanded && l.push(this.updateStyle(c)), l.push(this.set({
                index: s,
                expanded: c
            })), Promise.all(l);
        },
        updateStyle: function(e) {
            var n = this;
            return this.getRect(".van-collapse-item__content").then(function(t) {
                return t.height;
            }).then(function(t) {
                return e ? n.set({
                    contentHeight: t ? t + "px" : "auto"
                }) : n.set({
                    contentHeight: t + "px"
                }).then(nextTick).then(function() {
                    return n.set({
                        contentHeight: 0
                    });
                });
            });
        },
        onClick: function() {
            if (!this.data.disabled) {
                var t = this.data, e = t.name, n = t.expanded, i = this.parent.children.indexOf(this), a = null == e ? i : e;
                this.parent.switch(a, !n);
            }
        },
        onTransitionEnd: function() {
            this.data.expanded && this.set({
                contentHeight: "auto"
            });
        }
    }
});