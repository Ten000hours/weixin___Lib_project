var app = getApp();
app.newFavor = false;
Page({
  data: {
    id: 0,
    userId: 0,
    lists: [],
    recommendLists: [],
    online: false,
    favorited: false,
    ordered: false,
    borrowed: false,
    color: "color:#66CD00;",
    colored: "color:#8a8a8a",
    txtFavor: '收藏',
    txtFavored: "已收藏",
    txtOrder: "预订",
    txtOrdered: "已预订",
    txtBorrow: '借阅',
    txBorrowed: '已借阅',
    imgFavor: '../../img/favorite.png',
    imgFavored: '../../img/favorited.png',
    imgOrder: '../../img/order.png',
    imgOrdered: '../../img/ordered.png',
  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    var that = this;
    var userId = wx.getStorageSync('id');
    var online = wx.getStorageSync('online');
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/detail.php?id=' + that.data.id,
      success: function (res) {
        that.setData({
          lists: res.data,
        });
        var bookWriterName = res.data[0].bookWriterName;
        var bookType = res.data[0].bookType;
        var bookName = res.data[0].bookName;
        wx.request({
          url: 'https://www.siliangjiadan.cn/php/relatedRecommend.php',
          data: {
            bookWriterName: bookWriterName,
            bookType: bookType,
            bookName: bookName
          },
          method: 'GET',
          success: function (res) {
            that.setData({
              recommendLists: res.data
            })
          }
        })
      }
    });
    if (online) {//如果在线就检查相应状态
      wx.request({//检查概述是否已被收藏
        url: 'https://www.siliangjiadan.cn/php/checkFavor.php?bookId=' + that.data.id + '&userId=' + userId,
        success: function (res) {
          if (res.data == 1) {
            that.setData({
              favorited: true
            });
          }
        }
      });
      wx.request({//检查是否被预订
        url: 'https://www.siliangjiadan.cn/php/checkOrder.php?bookId=' + that.data.id + '&userId=' + userId,
        success: function (res) {
          if (res.data == 1) {
            that.setData({
              ordered: true
            });
          }
        },
      })
    }
    else {//重置为初始状态
      this.setData({
        favorited: false,
        ordered: false,
        borrowed: false
      })
    }
  },

  returnLast: function () {
    wx.navigateBack();
  },

  operate: function (warning, func) {//基本操作，warning为登录时的提示语，func具体使用的函数的形参
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
      func();//调用func
    }
    else {
      wx.switchTab({
        url: '../me/me'
      })
      wx.showModal({
        title: '提示',
        content: warning,
        showCancel: false
      })
    }
  },

  requestForFavor: function () {//收藏请求
    if (!this.data.favorited) {
      var bookId = this.data.id;
      var userId = this.data.userId;
      var that = this;
      wx.request({
        url: 'https://www.siliangjiadan.cn/php/addFavor.php?userId=' + userId + '&bookId=' + bookId,
        success: function (res) {
          if (res.data == 1) {
            app.newFavor = true;
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1000
            });
            that.setData({
              favorited: true
            })
          }
          else {
            wx.showModal({
              content: '收藏失败',
              showCancel: false
            })
          }
        }
      });
    }
    else {
      wx.showModal({
        content: '已收藏',
        showCancel: false
      })
    }
  },

  gotoOrder: function () {//跳转至预订页
    if (this.data.lists[0].bookCollectNum <= 0) {//可借阅数小于1
      wx.showModal({
        content: '当前库存不足，暂不能预订',
        showCancel: false
      })
    }
    else if (!this.data.ordered) {//处于未预订状态
      wx.redirectTo({
        url: '../addOrder/addOrder?id=' + this.data.id
      })
    }
    else {
      wx.showModal({
        content: '已预订',
        showCancel: false
      })
    }
  },

  gotoDetail: function(e){//转至详情页
    var bookId = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + bookId
    })
  },

  favorite: function () {
    this.operate('亲，需要登录才可以收藏哦', this.requestForFavor);
  },

  order: function () {
    this.operate('亲，需要登录才可以预订哦', this.gotoOrder);
  }

})
