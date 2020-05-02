Object.defineProperty(exports, "__esModule", {
    value: !0
});

var basic_1 = require("../mixins/basic"), index_1 = require("../mixins/observer/index");

function mapKeys(s, a, t) {
    Object.keys(t).forEach(function(e) {
        s[e] && (a[t[e]] = s[e]);
    });
}

function VantComponent(e) {
    var s;
    void 0 === e && (e = {});
    var a = {};
    mapKeys(e, a, {
        data: "data",
        props: "properties",
        mixins: "behaviors",
        methods: "methods",
        beforeCreate: "created",
        created: "attached",
        mounted: "ready",
        relations: "relations",
        destroyed: "detached",
        classes: "externalClasses"
    });
    var t = e.relation;
    t && (a.relations = Object.assign(a.relations || {}, ((s = {})["../" + t.name + "/index"] = t, 
    s))), a.externalClasses = a.externalClasses || [], a.externalClasses.push("custom-class"), 
    a.behaviors = a.behaviors || [], a.behaviors.push(basic_1.basic), e.field && a.behaviors.push("wx://form-field"), 
    a.options = {
        multipleSlots: !0,
        addGlobalClass: !0
    }, index_1.observe(e, a), Component(a);
}

exports.VantComponent = VantComponent;