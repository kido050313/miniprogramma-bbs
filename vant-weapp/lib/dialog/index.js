Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), button_1 = require("../mixins/button"), open_type_1 = require("../mixins/open-type");

component_1.VantComponent({
    mixins: [ button_1.button, open_type_1.openType ],
    props: {
        show: Boolean,
        title: String,
        message: String,
        useSlot: Boolean,
        className: String,
        asyncClose: Boolean,
        messageAlign: String,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        zIndex: {
            type: Number,
            value: 2e3
        },
        confirmButtonText: {
            type: String,
            value: "确认"
        },
        cancelButtonText: {
            type: String,
            value: "取消"
        },
        showConfirmButton: {
            type: Boolean,
            value: !0
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        transition: {
            type: String,
            value: "scale"
        }
    },
    data: {
        loading: {
            confirm: !1,
            cancel: !1
        }
    },
    watch: {
        show: function(n) {
            !n && this.stopLoading();
        }
    },
    methods: {
        onConfirm: function() {
            this.handleAction("confirm");
        },
        onCancel: function() {
            this.handleAction("cancel");
        },
        onClickOverlay: function() {
            this.onClose("overlay");
        },
        handleAction: function(n) {
            var o;
            this.data.asyncClose && this.set(((o = {})["loading." + n] = !0, o)), this.onClose(n);
        },
        close: function() {
            this.set({
                show: !1
            });
        },
        stopLoading: function() {
            this.set({
                loading: {
                    confirm: !1,
                    cancel: !1
                }
            });
        },
        onClose: function(n) {
            this.data.asyncClose || this.close(), this.$emit("close", n), this.$emit(n, {
                dialog: this
            });
            var o = this.data["confirm" === n ? "onConfirm" : "onCancel"];
            o && o(this);
        }
    }
});