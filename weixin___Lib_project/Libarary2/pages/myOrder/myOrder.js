Page({
    data: {
        lists: []
    },

    returnLast: function () {
        wx.switchTab({
            url: '../me/me'
        })
    },

    onLoad: function (options) {
        var date = new Date();
        var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.setData({
            today: today
        })
        var userId = wx.getStorageSync('id');
        var that = this;
        wx.request({
            url: 'https://www.siliangjiadan.cn/php/order.php?userId=' + userId,
            success: function (res) {
                that.setData({
                    lists: res.data
                })
            }
        })
    },

    gotoDetail: function (e) {
        var bookId = e.currentTarget.id;//获取当前控件id
        wx.navigateTo({
            url: '../detail/detail?id=' + bookId
        });
    }
})