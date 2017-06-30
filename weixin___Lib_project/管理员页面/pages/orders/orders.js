Page({
  data: {
    lists1: [],
    lists2: [],
    userName: '',
    boolPay: true,
    boolPayed: false,
    style1: 'color: limegreen;border-bottom: solid 5rpx limegreen;',
    style2: 'color: black',
    iconPath: '../../img/scan.png',
    boolScan: true,
  },

  onShow: function (options) {
    var that = this;
    wx.request({//已支付项
      url: 'https://www.siliangjiadan.cn/php/admin/havePayfor.php',
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
      url: 'https://www.siliangjiadan.cn/php/admin/payedFor.php',
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

  inputChange: function (e) {//获取输入框的值
    var userName = e.detail.value;
    this.setData({
      userName: userName
    })
  },

  searchByName: function () {//通过用户名查看订单
    var that = this;
    if (this.data.userName == '') {
      this.onShow();
      return;
    }
    wx.request({//已支付项
      url: 'https://www.siliangjiadan.cn/php/admin/searchPayByName.php?userName=' + that.data.userName,
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
    wx.request({//已返还项
      url: 'https://www.siliangjiadan.cn/php/admin/searchPayByName.php?userName=' + that.data.userName,
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
  },

  searchByScan: function () {//扫码方法
  var that = this;
    wx.scanCode({
      success: function (res) {
        var value = res.result;//获得相应字符串
        if (value.substr(0, 7) == 'userId=') {
          var strs = value.split("&");
          var str1 = strs[0];
          var str2 = strs[1];
          var userId = str1.substr(7, str1.length - 7);
          var bookId = str2.substr(7, str1.length - 7);
          wx.request({//查询订单信息
            url: 'https://www.siliangjiadan.cn/php/admin/serchOrderByScan.php',
            data: {
              userId: userId,
              bookId: bookId
            },
            method: 'GET',
            success: function (res) {
              console.log(res.data);
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
        }
        else {
          wx.showModal({
            title: '提示',
            content: '未获得相应订单信息',
            showCancel: false
          })
        }
      }
    })
  },

  gotoDetail: function(e){
    var bookId = e.currentTarget.id;
    wx.navigateTo({
       url: '../detail/detail?id=' + bookId
    })
  },

  returnBook: function (e) {//返还书籍
    var that = this;
    var index = e.currentTarget.id;
    var userId = this.data.lists1[index].userId;
    var bookId = this.data.lists1[index].bookId;
    var price = this.data.lists1[index].bookPrice;
    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/admin/returnBook.php',
      data: {
        userId: userId,
        bookId: bookId,
        price: price,
        dateTime: today
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data == 111) {
          that.onShow();
        }
        wx.showToast({
          icon: 'success',
          title: '还书成功',
          duration: 1000
        })
      }
    })
  }

})