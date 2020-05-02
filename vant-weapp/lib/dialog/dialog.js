var __assign = function() {
    return (__assign = Object.assign || function(e) {
        for (var t, n = 1, o = arguments.length; n < o; n++) for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
        return e;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var queue = [];

function getContext() {
    var e = getCurrentPages();
    return e[e.length - 1];
}

var Dialog = function e(o) {
    return o = __assign({}, e.currentOptions, o), new Promise(function(e, t) {
        var n = (o.context || getContext()).selectComponent(o.selector);
        delete o.selector, n ? (n.set(__assign({
            onCancel: t,
            onConfirm: e
        }, o)), queue.push(n)) : console.warn("未找到 van-dialog 节点，请确认 selector 及 context 是否正确");
    });
};

Dialog.defaultOptions = {
    show: !0,
    title: "",
    message: "",
    zIndex: 100,
    overlay: !0,
    className: "",
    asyncClose: !1,
    messageAlign: "",
    transition: "scale",
    selector: "#van-dialog",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnClickOverlay: !1,
    confirmButtonOpenType: ""
}, (Dialog.alert = Dialog).confirm = function(e) {
    return Dialog(__assign({
        showCancelButton: !0
    }, e));
}, Dialog.close = function() {
    queue.forEach(function(e) {
        e.close();
    }), queue = [];
}, Dialog.stopLoading = function() {
    queue.forEach(function(e) {
        e.stopLoading();
    });
}, Dialog.setDefaultOptions = function(e) {
    Object.assign(Dialog.currentOptions, e);
}, Dialog.resetDefaultOptions = function() {
    Dialog.currentOptions = __assign({}, Dialog.defaultOptions);
}, Dialog.resetDefaultOptions(), exports.default = Dialog;