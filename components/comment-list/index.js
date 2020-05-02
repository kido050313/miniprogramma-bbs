// var _comment = require("../../models/comment.js"), comment = new _comment.commentModel();

Component({
    properties: {
        list: {
            type: Array,
            value: []
        }
    },
    data: {},
    methods: {
        goods: function(e) {
            var o = this, t = e.currentTarget.dataset.id, n = e.currentTarget.dataset.index;
            comment.goods({
                id: t
            }).then(function(e) {
                var t = o.properties.list;
                1 == t[n].goods ? (t[n].goods = 0, t[n].good_number--) : (t[n].goods = 1, t[n].good_number++), 
                o.setData({
                    list: t
                });
            });
        },
        toUserDes: function(e) {
            console.log(e);
            var t = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/pages/user-center/index?user_id=" + t
            });
        },
        toDes: function(e) {
            var t = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/pages/article/comment/index?id=" + t
            });
        },
        delComm: function(e) {
            var o = this;
            console.log(e);
            var t = e.currentTarget.dataset.id, n = e.currentTarget.dataset.index, r = e.currentTarget.dataset.admindel;
            wx.showModal({
                title: "提示",
                content: "确定删除吗",
                success: function(e) {
                    e.confirm ? comment.delComm({
                        adminDel: r,
                        id: t
                    }).then(function(e) {
                        var t = o.properties.list;
                        t.splice(n, 1), o.setData({
                            list: t
                        }), wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 2e3
                        });
                    }) : e.cancel && console.log("用户点击取消");
                }
            });
        }
    }
});