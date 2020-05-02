Component({
    properties: {
        data: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        poster: function() {
            this.triggerEvent("click-poster", {}, {});
        },
        jumpToDes: function(t) {
            var e = t.currentTarget.dataset.url;
            wx.navigateTo({
                url: e
            });
        }
    }
});