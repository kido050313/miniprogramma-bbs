Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        jumpType: {
            type: String,
            value: "navigate"
        },
        url: {
            type: String,
            value: ""
        },
        line: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        _jump: function() {
            "navigate" == this.properties.jumpType ? wx.navigateTo({
                url: this.properties.url
            }) : wx.switchTab({
                url: this.properties.url
            });
        }
    }
});