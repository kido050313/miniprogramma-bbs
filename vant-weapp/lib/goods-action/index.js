Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), safe_area_1 = require("../mixins/safe-area");

component_1.VantComponent({
    mixins: [ safe_area_1.safeArea() ]
});