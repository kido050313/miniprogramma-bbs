Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component");

component_1.VantComponent({
    field: !0,
    classes: [ "input-class", "right-icon-class" ],
    props: {
        size: String,
        icon: String,
        label: String,
        error: Boolean,
        fixed: Boolean,
        focus: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        rightIcon: String,
        disabled: Boolean,
        autosize: Boolean,
        readonly: Boolean,
        required: Boolean,
        password: Boolean,
        iconClass: String,
        clearable: Boolean,
        inputAlign: String,
        customClass: String,
        customStyle: String,
        confirmType: String,
        confirmHold: Boolean,
        errorMessage: String,
        placeholder: String,
        placeholderStyle: String,
        errorMessageAlign: String,
        showConfirmBar: {
            type: Boolean,
            value: !0
        },
        adjustPosition: {
            type: Boolean,
            value: !0
        },
        cursorSpacing: {
            type: Number,
            value: 50
        },
        maxlength: {
            type: Number,
            value: -1
        },
        type: {
            type: String,
            value: "text"
        },
        border: {
            type: Boolean,
            value: !0
        },
        titleWidth: {
            type: String,
            value: "90px"
        }
    },
    data: {
        showClear: !1
    },
    beforeCreate: function() {
        this.focused = !1;
    },
    methods: {
        onInput: function(e) {
            var t = this, o = (e.detail || {}).value, i = void 0 === o ? "" : o;
            this.set({
                value: i,
                showClear: this.getShowClear(i)
            }, function() {
                t.emitChange(i);
            });
        },
        onFocus: function(e) {
            var t = e.detail || {}, o = t.value, i = void 0 === o ? "" : o, n = t.height, a = void 0 === n ? 0 : n;
            this.$emit("focus", {
                value: i,
                height: a
            }), this.focused = !0, this.blurFromClear = !1, this.set({
                showClear: this.getShowClear()
            });
        },
        onBlur: function(e) {
            var t = this, o = e.detail || {}, i = o.value, n = void 0 === i ? "" : i, a = o.cursor, r = void 0 === a ? 0 : a;
            this.$emit("blur", {
                value: n,
                cursor: r
            }), this.focused = !1;
            var l = this.getShowClear();
            this.data.value === n ? this.set({
                showClear: l
            }) : this.blurFromClear || this.set({
                value: n,
                showClear: l
            }, function() {
                t.emitChange(n);
            });
        },
        onClickIcon: function() {
            this.$emit("click-icon");
        },
        getShowClear: function(e) {
            return e = void 0 === e ? this.data.value : e, this.data.clearable && this.focused && e && !this.data.readonly;
        },
        onClear: function() {
            var e = this;
            this.blurFromClear = !0, this.set({
                value: "",
                showClear: this.getShowClear("")
            }, function() {
                e.emitChange(""), e.$emit("clear", "");
            });
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.value);
        },
        emitChange: function(e) {
            this.$emit("input", e), this.$emit("change", e);
        }
    }
});