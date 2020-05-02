const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Component({

  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  data: {},

  methods: {
    /**
     * 点赞
     */
    onClickGood: function(e) {
      console.log(e);
      let id = e.currentTarget.dataset.id,
        index = e.currentTarget.dataset.index,
        userInfo = wx.getStorageSync('userInfo'),
        _isLiked = this.properties.list[index].isLiked == 1 ? 0 : 1;
      let data = {
        postsId: id,
        userId: userInfo.userId,
        isLiked: _isLiked
      }
      util.request(api.liked, data, 'POST', 'json')
        .then(res => {
          let list = this.properties.list;
          let isLiked = 'list[' + index + ']isLiked';
          // this.setData({
          //   isLiked: _isLiked
          // })

          if (list[index].isLiked == 1) {
            list[index].isLiked = 0;
            list[index].likedNumber--;
          } else {
            list[index].isLiked = 1;
            list[index].likedNumber++;
          }
          this.setData({
            list
          })
        })

      // articles.getGood({
      //   id: t
      // }).then(function (e) {
      //   var t = a.properties.list;
      //   1 == t[r].goods ? (t[r].goods = 0, t[r].good_count--) : (t[r].goods = 1, t[r].good_count++),
      //     a.setData({
      //       list: t
      //     });
      // });
    },

    /**
     * 对应话题列表
     */
    clickTopic: function(e) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/bbsForum/topicList/index?id=" + id
      });
    },

    /**
     * 帖子详情
     */
    clickTitle: function(e) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/bbsForum/details/index?id=" + id
      });
    },

    viewImages: function(e) {
      console.log(e);
      var t = e.currentTarget.dataset.imageindex,
        a = e.currentTarget.dataset.index,
        r = this.properties.list[a].images;
      console.log(r), wx.previewImage({
        current: r[t],
        urls: r
      });
    },
    showImage: function(e) {
      var t = e.currentTarget.dataset.src;
      wx.previewImage({
        current: t,
        urls: [t]
      });
    },
    tocenter: function(e) {
      var t = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/user-center/index?user_id=" + t
      });
    }
  },

});