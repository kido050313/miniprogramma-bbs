Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), safe_area_1 = require("../mixins/safe-area");

component_1.VantComponent({
    mixins: [ safe_area_1.safeArea() ],
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        zIndex: {
            type: Number,
            value: 100
        },
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        onSelect: function(e) {
            var t = e.currentTarget.dataset.index, a = this.data.actions[t];
            !a || a.disabled || a.loading || this.$emit("select", a);
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onClose: function() {
            this.$emit("close");
        }
    }
});