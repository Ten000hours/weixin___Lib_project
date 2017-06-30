// pages/myMsg/myMsg.js
Page({
  data: {
    lists: [],
    img1: '../../img/yangjiang.jpg',
    img2: '../../img/ti.jpg',
    msg1: '部分预约已到期，请及时前往图书馆取书',
    msg2: '部分借阅的书籍即将到期，请及时归还'
  },

  onShow: function () {
    var userId = wx.getStorageSync('id');
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/message.php?userId=' + userId,
      success: function (res) {
        that.setData({
          lists: res.data
        })
      }
    })
  },

  returnLast: function () {
    wx.switchTab({
      url: '../me/me'
    })
  },

  gotoMsg: function (e) {
    var type_ = e.currentTarget.id;//获取当前消息类型
    if (type_ == 0) {
      wx.navigateTo({
        url: '../orderOnTime/orderOnTime'
      })
    }
    else{
      wx.navigateTo({
        url: '../borrowOnTime/borrowOnTime'
      })
    }
  }

})