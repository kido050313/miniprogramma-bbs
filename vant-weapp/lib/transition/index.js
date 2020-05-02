Object.defineProperty(exports, "__esModule", {
    value: !0
});

var component_1 = require("../common/component"), transition_1 = require("../mixins/transition");

component_1.VantComponent({
    classes: [ "enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class" ],
    mixins: [ transition_1.transition(!0) ]
});