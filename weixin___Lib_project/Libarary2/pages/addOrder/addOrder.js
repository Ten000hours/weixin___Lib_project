var app = getApp();
app.newOrder = false;
Page({
  data: {
    date: '',
    today: '',
    endDate: '',
    bookId: 0
  },

  onLoad: function (options) {
    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    date.setDate(date.getDate() + 7);//获取七天后的日期
    var endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.setData({
      bookId: options.id,
      date: today,
      today: today,
      endDate: endDate
    })
    wx.showModal({
      title: '提示',
      content: '亲,最大预订期限不能超过七天哦',
      showCancel: false
    })
  },

  dateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  returnLast: function () {
    wx.navigateBack();
  },

  order: function () {
    var userId = wx.getStorageSync('id');
    var bookId = this.data.bookId;
    var takeTime = this.data.date;
    var that = this;
    wx.showToast({
      title: '请等待',
      icon: 'loading',
      duration: 1000
    });
    wx.request({//重新确定是否还可以借阅
      url: 'https://www.siliangjiadan.cn/php/detail.php?id=' + bookId,
      success: function (res) {
        wx.hideToast();
        if (res.data[0].bookCollectNum > 0) {
          wx.request({
            url: 'https://www.siliangjiadan.cn/php/addReserve.php?bookId=' + bookId + "&userId=" + userId + "&takeTime=" + takeTime,
            success: function (res) {
              if (res.data == 11) {
                app.newOrder = true;
                wx.showModal({
                  title: '提示',
                  content: '预约成功',
                  showCancel: false,
                  success() {
                    wx.redirectTo({
                      url: '../detail/detail?id=' + bookId
                    });//返回详情页
                  }
                })
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: '预订失败',
                  showCancel: false
                })
              }
            }
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '该时段库存不足,暂不予以预订',
            showCancel: false
          })
        }
      }
    })
  }
})