Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), transition_1 = require("../mixins/transition"), safe_area_1 = require("../mixins/safe-area");

component_1.VantComponent({
    classes: [ "enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class" ],
    mixins: [ transition_1.transition(!1), safe_area_1.safeArea() ],
    props: {
        transition: {
            type: String,
            observer: "observeClass"
        },
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            value: 100
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        position: {
            type: String,
            value: "center",
            observer: "observeClass"
        }
    },
    created: function() {
        this.observeClass();
    },
    methods: {
        onClickOverlay: function() {
            this.$emit("click-overlay"), this.data.closeOnClickOverlay && this.$emit("close");
        },
        observeClass: function() {
            var e = this.data, s = e.transition, t = e.position;
            this.updateClasses(s || t), "none" === s && this.set({
                duration: 0
            });
        }
    }
});