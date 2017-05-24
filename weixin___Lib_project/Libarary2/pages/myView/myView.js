Page({
  data: {
    content: '',
    userId: '',
    content: '',
    online: false
  },

  onLoad: function (options) {
    var Id = wx.getStorageSync('id');
    var status = wx.getStorageSync('online');
    if (status) {
      this.setData({
        userId: Id,
        online: status
      });
    }
  },

  returnLast: function () {
    wx.switchTab({
      url: '../communicate/communicate'
    })
  },

  getContent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  publish: function () {
    if (this.data.online) {
      var id = this.data.userId;
      var date = new Date();
      var content = this.data.content;
      var currentTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        + ' ' + date.getHours() + ':' + date.getMinutes()
        + ':' + date.getSeconds();
      wx.showToast({
        title: '发布中',
        icon: 'loading',
        duration: 1000
      });
      wx.request({
        url: 'https://www.siliangjiadan.cn/php/publishCom.php?userId=' + id + '&view=' + content + '&dateTime=' + currentTime,
        success: function (res) {
          if (res.data == 1) {
            wx.switchTab({
              url: '../communicate/communicate'
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '发布失败',
              showCancel: false
            })
          }
        }
      })
    }
  }

})