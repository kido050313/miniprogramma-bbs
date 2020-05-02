var app = getApp();

Component({
    properties: {
        data: {
            type: Object,
            value: {}
        },
        followed: {
            type: Number,
            value: 0
        }
    },
    data: {
        height: ""
    },
    attached: function() {
        this.setData({
            height: app.globalData.height
        });
    },
    methods: {
        _back: function() {
            wx.navigateBack({
                delta: 1
            });
        },
        follow: function() {
            console.log(111);
            this.triggerEvent("click-follow", {}, {});
        }
    }
});