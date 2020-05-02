Object.defineProperty(exports, "__esModule", {
    value: !0
});

var cache = null;

function getSafeArea() {
    return new Promise(function(r, e) {
        null != cache ? r(cache) : wx.getSystemInfo({
            success: function(e) {
                var t = e.model, a = e.screenHeight, s = e.statusBarHeight, o = /iphone x/i.test(t), n = /iPhone11/i.test(t) && 812 === a;
                r(cache = {
                    isIPhoneX: o || n,
                    statusBarHeight: s
                });
            },
            fail: e
        });
    });
}

exports.safeArea = function(e) {
    var t = void 0 === e ? {} : e, a = t.safeAreaInsetBottom, s = void 0 === a || a, o = t.safeAreaInsetTop;
    return Behavior({
        properties: {
            safeAreaInsetTop: {
                type: Boolean,
                value: void 0 !== o && o
            },
            safeAreaInsetBottom: {
                type: Boolean,
                value: s
            }
        },
        created: function() {
            var s = this;
            getSafeArea().then(function(e) {
                var t = e.isIPhoneX, a = e.statusBarHeight;
                s.set({
                    isIPhoneX: t,
                    statusBarHeight: a
                });
            });
        }
    });
};