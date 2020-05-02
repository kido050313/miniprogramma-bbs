Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), utils_1 = require("../common/utils"), DEFAULT_DURATION = 200;

component_1.VantComponent({
    classes: [ "active-class" ],
    props: {
        valueKey: String,
        className: String,
        itemHeight: Number,
        visibleItemCount: Number,
        initialOptions: {
            type: Array,
            value: []
        },
        defaultIndex: {
            type: Number,
            value: 0
        }
    },
    data: {
        startY: 0,
        offset: 0,
        duration: 0,
        startOffset: 0,
        options: [],
        currentIndex: 0
    },
    created: function() {
        var t = this, e = this.data, n = e.defaultIndex, i = e.initialOptions;
        this.set({
            currentIndex: n,
            options: i
        }).then(function() {
            t.setIndex(n);
        });
    },
    computed: {
        count: function() {
            return this.data.options.length;
        },
        baseOffset: function() {
            var t = this.data;
            return t.itemHeight * (t.visibleItemCount - 1) / 2;
        },
        wrapperStyle: function() {
            var t = this.data;
            return [ "transition: " + t.duration + "ms", "transform: translate3d(0, " + (t.offset + t.baseOffset) + "px, 0)", "line-height: " + t.itemHeight + "px" ].join("; ");
        }
    },
    watch: {
        defaultIndex: function(t) {
            this.setIndex(t);
        }
    },
    methods: {
        onTouchStart: function(t) {
            this.set({
                startY: t.touches[0].clientY,
                startOffset: this.data.offset,
                duration: 0
            });
        },
        onTouchMove: function(t) {
            var e = this.data, n = t.touches[0].clientY - e.startY;
            this.set({
                offset: utils_1.range(e.startOffset + n, -e.count * e.itemHeight, e.itemHeight)
            });
        },
        onTouchEnd: function() {
            var t = this.data;
            if (t.offset !== t.startOffset) {
                this.set({
                    duration: DEFAULT_DURATION
                });
                var e = utils_1.range(Math.round(-t.offset / t.itemHeight), 0, t.count - 1);
                this.setIndex(e, !0);
            }
        },
        onClickItem: function(t) {
            var e = t.currentTarget.dataset.index;
            this.setIndex(e, !0);
        },
        adjustIndex: function(t) {
            for (var e = this.data, n = t = utils_1.range(t, 0, e.count); n < e.count; n++) if (!this.isDisabled(e.options[n])) return n;
            for (n = t - 1; 0 <= n; n--) if (!this.isDisabled(e.options[n])) return n;
        },
        isDisabled: function(t) {
            return utils_1.isObj(t) && t.disabled;
        },
        getOptionText: function(t) {
            var e = this.data;
            return utils_1.isObj(t) && e.valueKey in t ? t[e.valueKey] : t;
        },
        setIndex: function(t, e) {
            var n = this, i = this.data, s = -(t = this.adjustIndex(t) || 0) * i.itemHeight;
            return t !== i.currentIndex ? this.set({
                offset: s,
                currentIndex: t
            }).then(function() {
                e && n.$emit("change", t);
            }) : this.set({
                offset: s
            });
        },
        setValue: function(t) {
            for (var e = this.data.options, n = 0; n < e.length; n++) if (this.getOptionText(e[n]) === t) return this.setIndex(n);
            return Promise.resolve();
        },
        getValue: function() {
            var t = this.data;
            return t.options[t.currentIndex];
        }
    }
});