var app = getApp();
app.newBorrow = false;//全局变量，借阅状态
app.QRContent = '';//全局变量，借书二维码的内容
Page({
  data: {
    boolNotPay: true,
    boolPay: false,
    boolPayed: false,
    lists: [],
    lists1: [],
    lists2: [],
    style1: 'color: limegreen;border-bottom: solid 5rpx limegreen;',
    style2: 'color: black',
    acconut: 0
  },

  onShow: function (options) {
    var userId = wx.getStorageSync('id');
    var that = this;
    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    wx.request({//删除过期的订单
      url: 'https://www.siliangjiadan.cn/php/delBorrow.php?dateTime=' + today + '&userId=' + userId,
    })
    wx.request({//用户账户余额
      url: 'https://www.siliangjiadan.cn/php/getUserAccount.php?userId=' + userId,
      success: function (res) {
        that.setData({
          account: res.data[0].userAccount
        })
      }
    })
    wx.request({//待支付项
      url: 'https://www.siliangjiadan.cn/php/toFinishBorrow.php?userId=' + userId,
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            lists: res.data
          });
        }
        else {
          that.setData({
            lists: []
          });
        }
      }
    })
    wx.request({//已支付项
      url: 'https://www.siliangjiadan.cn/php/finishBorrow.php?userId=' + userId,
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
      url: 'https://www.siliangjiadan.cn/php/finishedBorrow.php?userId=' + userId,
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
    if (id == 'tab0') {
      this.setData({
        boolNotPay: true,
        boolPay: false,
        boolPayed: false,
      })
    }
    else if (id == 'tab1') {
      this.setData({
        boolNotPay: false,
        boolPay: true,
        boolPayed: false,
      })
    }
    else {
      this.setData({
        boolNotPay: false,
        boolPay: false,
        boolPayed: true,
      })
    }
  },

  gotoRecharge: function () {//跳转至充值页面
    wx.navigateTo({
      url: '../recharge/recharge'
    })
  },

  gotoWithdraw: function () {//跳转至提现页面
    wx.navigateTo({
      url: '../withdraw/withdraw'
    })
  },

  payForDeposit: function (e) {//支付押金
    var id = e.currentTarget.id;
    var account = this.data.account;
    var bookPrice = this.data.lists[id].bookPrice;
    var bookId = this.data.lists[id].bookId;
    var userId = wx.getStorageSync('id');
    var that = this;
    if (account - bookPrice < 0) {
      wx.showModal({
        title: '提示',
        content: '余额已不足，请及时充值',
        showCancel: false
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '确定要借阅该书籍吗？',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.siliangjiadan.cn/php/payForDeposite.php?bookPrice=' + bookPrice + '&userId=' + userId + '&bookId=' + bookId,
              success: function (res) {
                if (res.data == 11) {
                  app.newBorrow = true;
                  that.onShow();
                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000
                  })
                  app.QRContent = 'userId=' + userId + '&bookId=' + bookId;
                  wx.navigateTo({
                    url: '../borrowQR/borrowQR'
                  })
                }
              }
            })
          }
        }
      })
    }
  },

  gotoBorrowQR: function (e) {//转至借书二维码
    var bookId = e.currentTarget.id;//获取当前控件id
    var userId = wx.getStorageSync('id');
    app.QRContent = 'userId=' + userId + '&bookId=' + bookId;
    wx.navigateTo({
      url: '../borrowQR/borrowQR'
    });
  },

  cancel: function (e) {//取消借阅
    var bookId = e.currentTarget.id;//获取当前控件id
    var userId = wx.getStorageSync('id');
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/cancelBorrow.php?bookId=' + bookId + '&userId=' + userId,
    })
    wx.showToast({
      title: '已取消',
      icon: 'success',
      duration: 2000
    })
    this.onShow();
  }

})