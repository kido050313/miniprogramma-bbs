Object.defineProperty(exports, "__esModule", {
    value: !0
});

var behavior_1 = require("./behavior"), props_1 = require("./props");

function observe(e, r) {
    var o = e.watch, s = e.computed;
    if (r.behaviors.push(behavior_1.behavior), o) {
        var p = r.properties || {};
        Object.keys(o).forEach(function(e) {
            if (e in p) {
                var r = p[e];
                null !== r && "type" in r || (r = {
                    type: r
                }), r.observer = o[e], p[e] = r;
            }
        }), r.properties = p;
    }
    s && (r.methods = r.methods || {}, r.methods.$options = function() {
        return e;
    }, r.properties && props_1.observeProps(r.properties));
}

exports.observe = observe;