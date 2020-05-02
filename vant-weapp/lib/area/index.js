var __assign = function() {
    return (__assign = Object.assign || function(e) {
        for (var t, n = 1, i = arguments.length; n < i; n++) for (var s in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
        return e;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), shared_1 = require("../picker/shared");

component_1.VantComponent({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: __assign({}, shared_1.pickerProps, {
        value: String,
        areaList: {
            type: Object,
            value: {}
        },
        columnsNum: {
            type: [ String, Number ],
            value: 3
        }
    }),
    data: {
        columns: [ {
            values: []
        }, {
            values: []
        }, {
            values: []
        } ],
        displayColumns: [ {
            values: []
        }, {
            values: []
        }, {
            values: []
        } ]
    },
    watch: {
        value: function(e) {
            this.code = e, this.setValues();
        },
        areaList: "setValues",
        columnsNum: function(e) {
            this.set({
                displayColumns: this.data.columns.slice(0, +e)
            });
        }
    },
    mounted: function() {
        this.setValues();
    },
    methods: {
        getPicker: function() {
            return null == this.picker && (this.picker = this.selectComponent(".van-area__picker")), 
            this.picker;
        },
        onCancel: function(e) {
            this.emit("cancel", e.detail);
        },
        onConfirm: function(e) {
            this.emit("confirm", e.detail);
        },
        emit: function(e, t) {
            t.values = t.value, delete t.value, this.$emit(e, t);
        },
        onChange: function(e) {
            var t = this, n = e.detail, i = n.index, s = n.picker, c = n.value;
            this.code = c[i].code, this.setValues().then(function() {
                t.$emit("change", {
                    picker: s,
                    values: s.getValues(),
                    index: i
                });
            });
        },
        getConfig: function(e) {
            var t = this.data.areaList;
            return t && t[e + "_list"] || {};
        },
        getList: function(e, t) {
            var n = [];
            if ("province" !== e && !t) return n;
            var i = this.getConfig(e);
            return n = Object.keys(i).map(function(e) {
                return {
                    code: e,
                    name: i[e]
                };
            }), t && ("9" === t[0] && "city" === e && (t = "9"), n = n.filter(function(e) {
                return 0 === e.code.indexOf(t);
            })), n;
        },
        getIndex: function(e, t) {
            var n = "province" === e ? 2 : "city" === e ? 4 : 6, i = this.getList(e, t.slice(0, n - 2));
            "9" === t[0] && "province" === e && (n = 1), t = t.slice(0, n);
            for (var s = 0; s < i.length; s++) if (i[s].code.slice(0, n) === t) return s;
            return 0;
        },
        setValues: function() {
            var e = this, t = this.getConfig("county"), n = this.code || Object.keys(t)[0] || "", i = this.getList("province"), s = this.getList("city", n.slice(0, 2)), c = this.getPicker();
            if (c) {
                var r = [];
                return r.push(c.setColumnValues(0, i, !1)), r.push(c.setColumnValues(1, s, !1)), 
                s.length && "00" === n.slice(2, 4) && (n = s[0].code), r.push(c.setColumnValues(2, this.getList("county", n.slice(0, 4)), !1)), 
                Promise.all(r).catch(function() {}).then(function() {
                    return c.setIndexes([ e.getIndex("province", n), e.getIndex("city", n), e.getIndex("county", n) ]);
                }).catch(function() {});
            }
        },
        getValues: function() {
            var e = this.getPicker();
            return e ? e.getValues().filter(function(e) {
                return !!e;
            }) : [];
        },
        getDetail: function() {
            var e = this.getValues(), t = {
                code: "",
                country: "",
                province: "",
                city: "",
                county: ""
            };
            if (!e.length) return t;
            var n = e.map(function(e) {
                return e.name;
            });
            return t.code = e[e.length - 1].code, "9" === t.code[0] ? (t.country = n[1] || "", 
            t.province = n[2] || "") : (t.province = n[0] || "", t.city = n[1] || "", t.county = n[2] || ""), 
            t;
        },
        reset: function() {
            return this.code = "", this.setValues();
        }
    }
});