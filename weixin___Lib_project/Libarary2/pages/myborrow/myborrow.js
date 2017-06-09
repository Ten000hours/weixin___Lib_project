var app = getApp();
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
        var userId = wx.getStorageSync('id');
        var that = this;
        wx.request({
            url: 'https://www.siliangjiadan.cn/php/borrow.php?userId=' + userId,
            success: function (res) {
                that.setData({
                    lists: res.data
                });
            }
        })
    },

    gotoBorrowQR: function (e) {
        var bookId = e.currentTarget.id;//获取当前控件id
        var userId = wx.getStorageSync('id');
        app.QRContent = 'userId=' + userId + '&bookId=' + bookId;
        wx.navigateTo({
            url: '../borrowQR/borrowQR'
        });
    }
})