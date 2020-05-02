Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), safe_area_1 = require("../mixins/safe-area");

component_1.VantComponent({
    mixins: [ safe_area_1.safeArea() ],
    classes: [ "bar-class", "price-class", "button-class" ],
    props: {
        tip: null,
        tipIcon: String,
        type: Number,
        price: null,
        label: String,
        loading: Boolean,
        disabled: Boolean,
        buttonText: String,
        currency: {
            type: String,
            value: "¥"
        },
        buttonType: {
            type: String,
            value: "danger"
        },
        decimalLength: {
            type: Number,
            value: 2
        }
    },
    computed: {
        hasPrice: function() {
            return "number" == typeof this.data.price;
        },
        priceStr: function() {
            return (this.data.price / 100).toFixed(this.data.decimalLength);
        },
        tipStr: function() {
            var e = this.data.tip;
            return "string" == typeof e ? e : "";
        }
    },
    methods: {
        onSubmit: function(e) {
            this.$emit("submit", e.detail);
        }
    }
});