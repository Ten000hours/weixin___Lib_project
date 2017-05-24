var util = require("../../utils/util")

Page({
  data: {
    communicates: [],
    online: false
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/communicate.php',
      success: function (res) {
        that.setData({
          communicates: res.data
        });
      }
    })
  },
  gotoMyView: function () {
    var that = this;
    var Id = wx.getStorageSync('id');
    var status = wx.getStorageSync('online');
    if (status) {
      this.setData({
        userId: Id,
        online: status
      });
    }
    if (this.data.online) {
      wx.redirectTo({
        url: '../../pages/myView/myView'
      })
    }
    else {
      wx.switchTab({
        url: '../me/me'
      })
      wx.showModal({
        title: '提示',
        content: '亲，登陆后才能分享信息哦',
        showCancel: false
      })
    }
  }
})