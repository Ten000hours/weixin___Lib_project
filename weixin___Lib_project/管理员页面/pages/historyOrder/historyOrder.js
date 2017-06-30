Page({
  data: {
    lists1: [],
    lists2: [],
    boolPay: true,
    boolPayed: false,
    style1: 'color: limegreen;border-bottom: solid 5rpx limegreen;',
    style2: 'color: black',
    iconPath: '../../img/scan.png',
  },

  onLoad: function (options) {
    var that = this;
    var userId = options.id;
    wx.request({//已支付项
      url: 'https://www.siliangjiadan.cn/php/admin/havePayforById.php',
      data: {
        userId: userId
      },
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            lists1: res.data
          });
        }
        else {
          that.setData({
            lists1: []
          });
        }
      }
    })
    wx.request({//待返回项
      url: 'https://www.siliangjiadan.cn/php/admin/payedForById.php',
      data: {
        userId: userId
      },
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            lists2: res.data
          });
        }
        else {
          that.setData({
            lists2: []
          });
        }
      }
    })
  },

  chooseTab: function (e) {//选项
    var id = e.currentTarget.id;
    if (id == 'tab1') {
      this.setData({
        boolPay: true,
        boolPayed: false,
      })
    }
    else {
      this.setData({
        boolPay: false,
        boolPayed: true,
      })
    }
  },

  gotoDetail: function (e) {
    var bookId = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + bookId
    })
  },

  returnLast: function(){//回到上一个页面
    wx.switchTab({
      url: '../users/users'
    })
  }

})