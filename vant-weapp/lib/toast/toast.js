var __assign = function() {
    return (__assign = Object.assign || function(e) {
        for (var t, n = 1, o = arguments.length; n < o; n++) for (var s in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
        return e;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var utils_1 = require("../common/utils"), defaultOptions = {
    type: "text",
    mask: !1,
    message: "",
    show: !0,
    zIndex: 1e3,
    duration: 3e3,
    position: "middle",
    forbidClick: !1,
    loadingType: "circular",
    selector: "#van-toast"
}, queue = [], currentOptions = __assign({}, defaultOptions);

function parseOptions(e) {
    return utils_1.isObj(e) ? e : {
        message: e
    };
}

function getContext() {
    var e = getCurrentPages();
    return e[e.length - 1];
}

function Toast(e) {
    var t = __assign({}, currentOptions, parseOptions(e)), n = (t.context || getContext()).selectComponent(t.selector);
    if (n) return delete t.context, delete t.selector, n.clear = function() {
        n.set({
            show: !1
        }), t.onClose && t.onClose();
    }, queue.push(n), n.set(t), clearTimeout(n.timer), 0 < t.duration && (n.timer = setTimeout(function() {
        n.clear(), queue = queue.filter(function(e) {
            return e !== n;
        });
    }, t.duration)), n;
    console.warn("未找到 van-toast 节点，请确认 selector 及 context 是否正确");
}

var createMethod = function(t) {
    return function(e) {
        return Toast(__assign({
            type: t
        }, parseOptions(e)));
    };
};

Toast.loading = createMethod("loading"), Toast.success = createMethod("success"), 
Toast.fail = createMethod("fail"), Toast.clear = function() {
    queue.forEach(function(e) {
        e.clear();
    }), queue = [];
}, Toast.setDefaultOptions = function(e) {
    Object.assign(currentOptions, e);
}, Toast.resetDefaultOptions = function() {
    currentOptions = __assign({}, defaultOptions);
}, exports.default = Toast;