var _common = require("../../models/common.js"),
    common = new _common.commonModel();

Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  data: {},
  methods: {
    onClickNav: function (o) {
      var e = {
        dataset: o.currentTarget.dataset
      };
      this.triggerEvent("click-nav", e, {});
    },
  }
});
