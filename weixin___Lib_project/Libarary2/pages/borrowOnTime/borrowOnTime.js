let app = getApp();
Page({
  data: {
    lists: []
  },
  returnLast: function () {
    wx.navigateBack();
  },
  onLoad: function (options) {
    var date = new Date();
    date.setDate(date.getDate() + 7);//获取七天后的日期
    var deadDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var userId = wx.getStorageSync('id');
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/borrowOnTime.php?userId=' + userId + '&dateTime=' + deadDay,
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