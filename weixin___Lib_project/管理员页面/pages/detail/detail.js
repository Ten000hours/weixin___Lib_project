var app = getApp();
app.newFavor = false;
Page({
  data: {
    id: 0,
    lists: []
  },

  onLoad: function (options) {
    var id = options.id;
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/detail.php?id=' + id,
      success: function (res) {
        that.setData({
          lists: res.data,
        });
      }
    });
  },

  returnLast: function () {
    wx.navigateBack();
  }

})
