Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.commonModel = void 0;

var _createClass = function() {
    function n(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    return function(e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    };
  }(),
  _http = require("../utils/util.js");

function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
  if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var commonModel = function(e) {
  function t() {
    return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
  }
  return _inherits(t, _http.request), _createClass(t, [{
    key: "login",
    value: function(e) {
      return this.request({
        data: e,
        url: "User/wxLogin"
      });
    }
  }, {
    key: "getIcode",
    value: function(e) {
      return this.request({
        data: e,
        url: "Common/getIcode"
      });
    }
  }, {
    key: "getImageNav",
    value: function(e) {
      return this.request({
        data: e,
        url: "Common/getImageNav"
      });
    }
  }, {
    key: "getNoticeList",
    value: function(e) {
      return this.request({
        data: e,
        url: "Common/getNoticeList"
      });
    }
  }, {
    key: "search",
    value: function(e) {
      return this.request({
        data: e,
        url: "Common/search"
      });
    }
  }, {
    key: "hostKey",
    value: function() {
      return this.request({
        url: "Common/hostKey"
      });
    }
  }, {
    key: "explain",
    value: function(e) {
      return this.request({
        url: "common/explain",
        data: {
          id: e
        }
      });
    }
  }, {
    key: "getCopay",
    value: function(e) {
      return this.request({
        data: e,
        url: "Common/getCopay"
      });
    }
  }, {
    key: "videoLim",
    value: function(e) {
      return this.request({
        data: e,
        url: "Common/videoLim"
      });
    }
  }, {
    key: "saveFormId",
    value: function(e) {
      return this.request({
        data: e,
        url: "Common/saveFormId"
      });
    }
  }, {
    key: "getUserMoney",
    value: function(e) {
      return this.request({
        data: e,
        url: "User/userMoney"
      });
    }
  }, {
    key: "getUserOrder",
    value: function(e) {
      return this.request({
        data: e,
        url: "User/userOrder"
      });
    }
  }, {
    key: "getWidhSet",
    value: function(e) {
      return this.request({
        data: e,
        url: "Common/widthSetting"
      });
    }
  }, {
    key: "postWith",
    value: function(e) {
      return this.request({
        data: e,
        url: "User/postWith"
      });
    }
  }, {
    key: "getMarkCheck",
    value: function() {
      return this.request({
        url: "Common/getMarkCheck"
      });
    }
  }]), t;
}();

exports.commonModel = commonModel;