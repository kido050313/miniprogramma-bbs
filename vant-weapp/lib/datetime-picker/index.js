var __assign = function() {
    return (__assign = Object.assign || function(e) {
        for (var t, a = 1, n = arguments.length; a < n; a++) for (var r in t = arguments[a]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), utils_1 = require("../common/utils"), shared_1 = require("../picker/shared"), currentYear = new Date().getFullYear();

function isValidDate(e) {
    return utils_1.isDef(e) && !isNaN(new Date(e).getTime());
}

function range(e, t, a) {
    return Math.min(Math.max(e, t), a);
}

function padZero(e) {
    return ("00" + e).slice(-2);
}

function times(e, t) {
    for (var a = -1, n = Array(e); ++a < e; ) n[a] = t(a);
    return n;
}

function getTrueValue(e) {
    if (e) {
        for (;isNaN(parseInt(e, 10)); ) e = e.slice(1);
        return parseInt(e, 10);
    }
}

function getMonthEndDay(e, t) {
    return 32 - new Date(e, t - 1, 32).getDate();
}

var defaultFormatter = function(e, t) {
    return t;
};

component_1.VantComponent({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: __assign({}, shared_1.pickerProps, {
        formatter: {
            type: Function,
            value: defaultFormatter
        },
        value: null,
        type: {
            type: String,
            value: "datetime"
        },
        showToolbar: {
            type: Boolean,
            value: !0
        },
        minDate: {
            type: Number,
            value: new Date(currentYear - 10, 0, 1).getTime()
        },
        maxDate: {
            type: Number,
            value: new Date(currentYear + 10, 11, 31).getTime()
        },
        minHour: {
            type: Number,
            value: 0
        },
        maxHour: {
            type: Number,
            value: 23
        },
        minMinute: {
            type: Number,
            value: 0
        },
        maxMinute: {
            type: Number,
            value: 59
        }
    }),
    data: {
        innerValue: Date.now(),
        columns: []
    },
    watch: {
        value: function(e) {
            var t = this, a = this.data;
            (e = this.correctValue(e)) === a.innerValue || this.updateColumnValue(e).then(function() {
                t.$emit("input", e);
            });
        },
        type: "updateColumns",
        minHour: "updateColumns",
        maxHour: "updateColumns",
        minMinute: "updateColumns",
        maxMinute: "updateColumns"
    },
    methods: {
        getPicker: function() {
            if (null == this.picker) {
                var a = this.picker = this.selectComponent(".van-datetime-picker"), n = a.setColumnValues;
                a.setColumnValues = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return n.apply(a, e.concat([ !1 ]));
                };
            }
            return this.picker;
        },
        updateColumns: function() {
            var e = this.data.formatter, r = void 0 === e ? defaultFormatter : e, t = this.getRanges().map(function(e, t) {
                var a = e.type, n = e.range;
                return {
                    values: times(n[1] - n[0] + 1, function(e) {
                        var t = n[0] + e;
                        return t = "year" === a ? "" + t : padZero(t), r(a, t);
                    })
                };
            });
            return this.set({
                columns: t
            });
        },
        getRanges: function() {
            var e = this.data;
            if ("time" === e.type) return [ {
                type: "hour",
                range: [ e.minHour, e.maxHour ]
            }, {
                type: "minute",
                range: [ e.minMinute, e.maxMinute ]
            } ];
            var t = this.getBoundary("max", e.innerValue), a = t.maxYear, n = t.maxDate, r = t.maxMonth, u = t.maxHour, i = t.maxMinute, o = this.getBoundary("min", e.innerValue), s = o.minYear, m = o.minDate, l = [ {
                type: "year",
                range: [ s, a ]
            }, {
                type: "month",
                range: [ o.minMonth, r ]
            }, {
                type: "day",
                range: [ m, n ]
            }, {
                type: "hour",
                range: [ o.minHour, u ]
            }, {
                type: "minute",
                range: [ o.minMinute, i ]
            } ];
            return "date" === e.type && l.splice(3, 2), "year-month" === e.type && l.splice(2, 3), 
            l;
        },
        correctValue: function(e) {
            var t = this.data, a = "time" !== t.type;
            if (a && !isValidDate(e)) e = t.minDate; else if (!a && !e) {
                e = padZero(t.minHour) + ":00";
            }
            if (!a) {
                var n = e.split(":"), r = n[0], u = n[1];
                return (r = padZero(range(r, t.minHour, t.maxHour))) + ":" + (u = padZero(range(u, t.minMinute, t.maxMinute)));
            }
            return e = Math.max(e, t.minDate), e = Math.min(e, t.maxDate);
        },
        getBoundary: function(e, t) {
            var a, n = new Date(t), r = new Date(this.data[e + "Date"]), u = r.getFullYear(), i = 1, o = 1, s = 0, m = 0;
            return "max" === e && (i = 12, o = getMonthEndDay(n.getFullYear(), n.getMonth() + 1), 
            s = 23, m = 59), n.getFullYear() === u && (i = r.getMonth() + 1, n.getMonth() + 1 === i && (o = r.getDate(), 
            n.getDate() === o && (s = r.getHours(), n.getHours() === s && (m = r.getMinutes())))), 
            (a = {})[e + "Year"] = u, a[e + "Month"] = i, a[e + "Date"] = o, a[e + "Hour"] = s, 
            a[e + "Minute"] = m, a;
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.innerValue);
        },
        onChange: function() {
            var e, t = this, a = this.data, n = this.getPicker();
            if ("time" === a.type) {
                var r = n.getIndexes();
                e = r[0] + a.minHour + ":" + (r[1] + a.minMinute);
            } else {
                var u = n.getValues(), i = getTrueValue(u[0]), o = getTrueValue(u[1]), s = getMonthEndDay(i, o), m = getTrueValue(u[2]);
                "year-month" === a.type && (m = 1), m = s < m ? s : m;
                var l = 0, p = 0;
                "datetime" === a.type && (l = getTrueValue(u[3]), p = getTrueValue(u[4])), e = new Date(i, o - 1, m, l, p);
            }
            e = this.correctValue(e), this.updateColumnValue(e).then(function() {
                t.$emit("input", e), t.$emit("change", n);
            });
        },
        updateColumnValue: function(e) {
            var t = this, a = [], n = this.data, r = n.type, u = n.formatter, i = void 0 === u ? defaultFormatter : u, o = this.getPicker();
            if ("time" === r) {
                var s = e.split(":");
                a = [ i("hour", s[0]), i("minute", s[1]) ];
            } else {
                var m = new Date(e);
                a = [ i("year", "" + m.getFullYear()), i("month", padZero(m.getMonth() + 1)) ], 
                "date" === r && a.push(i("day", padZero(m.getDate()))), "datetime" === r && a.push(i("day", padZero(m.getDate())), i("hour", padZero(m.getHours())), i("minute", padZero(m.getMinutes())));
            }
            return this.set({
                innerValue: e
            }).then(function() {
                return t.updateColumns();
            }).then(function() {
                return o.setValues(a);
            });
        }
    },
    created: function() {
        var e = this, t = this.correctValue(this.data.value);
        this.updateColumnValue(t).then(function() {
            e.$emit("input", t);
        });
    }
});