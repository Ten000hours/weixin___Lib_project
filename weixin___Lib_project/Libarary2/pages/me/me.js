var app = getApp()
app.newBorrow = false;
app.newOrder = false;
app.newFavor = false;
Page({
  data: {
    online: false,
    userId: 0,
    userName: '',
    password: '',
    userInfo: {},
    newBorrow: false,
    newMsg: false,
    newOrder: false,
    newFavor: false,
    newWallet: false
  },

  onShow: function () {
    var status = wx.getStorageSync('online');
    var name = wx.getStorageSync('userName');
    var that = this;
    if (status) {//如果处于在线状态，设定相应的信息
      app.getUserInfo(function (userInfo) {
        that.setData({
          userInfo: userInfo
        })
      })
      this.setData({
        online: status,
        userName: name,
        newBorrow: app.newBorrow,
        newOrder: app.newOrder,
        newFavor: app.newFavor
      })
    }
    this.check();
    this.deleteOrder();
  },

  check: function () {//检查是否有预约到期或借阅快要到期的书
    var date = new Date();
    var that = this;
    var userId = wx.getStorageSync('id');
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    wx.request({//检查今天是否已检查过预约到期
      url: 'https://www.siliangjiadan.cn/php/checkMsg1.php?userId=' + userId + '&date=' + today,
      success: function (res) {
        if (res.data == 0) {//没有检查过
          that.checkOrder()
        }
      }
    })
    wx.request({//检查今天是否已检查过借阅快到期的书
      url: 'https://www.siliangjiadan.cn/php/checkMsg2.php?userId=' + userId + '&date=' + today,
      success: function (res) {
        if (res.data == 0) {//没有检查过
          that.checkBorrow()
        }
      }
    })
  },

  checkOrder: function () {//检查是否有到期的书
    var date = new Date();
    var that = this;
    var userId = wx.getStorageSync('id');
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var currentTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      + ' ' + date.getHours() + ':' + date.getMinutes()
      + ':' + date.getSeconds();
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/orderExpire.php?dateTime=' + today + '&userId=' + userId,
      success: function (res) {
        if (res.data.length > 0) {//如果有就插入消息
          that.setData({
            newMsg: true
          })
          wx.request({
            url: 'https://www.siliangjiadan.cn/php/addMsg.php?type=0&dateTime=' + currentTime + '&date=' + today + '&userId=' + userId
          })
        }
      }
    })
  },

  deleteOrder: function () {//删除预约到期的书
    var date = new Date();
    var that = this;
    var userId = wx.getStorageSync('id');
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/delOrder.php?dateTime=' + today + '&userId=' + userId,
    })
  },


  checkBorrow: function () {//检查是否有书籍借阅即将到期
    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var currentTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      + ' ' + date.getHours() + ':' + date.getMinutes()
      + ':' + date.getSeconds();
    date.setDate(date.getDate() + 7);//获取七天后的日期
    var that = this;
    var userId = wx.getStorageSync('id');
    var deadDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    wx.request({//检查是否有到期的书
      url: 'https://www.siliangjiadan.cn/php/borrowExpire.php?dateTime=' + deadDay + '&userId=' + userId,
      success: function (res) {
        if (res.data.length > 0) {//如果有就插入消息
          that.setData({
            newMsg: true
          })
          wx.request({
            url: 'https://www.siliangjiadan.cn/php/addMsg.php?type=1&dateTime=' + currentTime + '&date=' + today + '&userId=' + userId
          })
        }
      }
    })
  },

  getUserName: function (e) {//未登录状态获取用户名
    this.setData({
      userName: e.detail.value
    })
  },

  getPassword: function (e) {//未登录状态获取密码
    this.setData({
      password: e.detail.value
    })
  },

  login: function () {
    var that = this;
    var name = this.data.userName;
    var pass = this.data.password;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })

    if (name == '') {
      wx.showModal({//判断用户名是否为空
        title: '提示',
        content: '用户名不能为空！',
        showCancel: false
      })
      return;
    }

    if (pass == '') {//判断密码是否为空
      wx.showModal({
        title: '提示',
        content: '密码不能为空！',
        showCancel: false
      })
      return;
    }

    wx.showToast({
      title: '登录中',
      icon: 'loading',
      duration: 5000
    });
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/login.php?userName=' + name + '&userPass=' + pass,
      success: function (res) {
        var userId = res.data;
        if (res.data > 0) {
          wx.setStorage({//设置缓存信息
            key: 'id',
            data: userId
          });
          wx.setStorage({
            key: 'online',
            data: true,
          });
          that.setData({
            online: true,
            userId: res.data
          });
          wx.hideToast();
          wx.request({//获取用户名
            url: 'https://www.siliangjiadan.cn/php/getUserName.php?userId=' + userId,
            success: function (res) {
              wx.setStorage({//设置缓存信息
                key: 'userName',
                data: res.data[0].userName,
              });
              that.setData({
                userName: res.data[0].userName
              })
            }
          })
        }
        else {
          wx.hideToast();
          wx.showModal({
            content: '用户或密码错误',
            showCancel: false
          })
        }
      }
    })
  },

  gotoRegister: function () {//转向注册页
    wx.navigateTo({
      url: '../signUp/signUp'
    })
  },

  logout: function () {//退出登录
    wx.showToast({
      icon: 'loading',
      duration: 100
    });
    wx.setStorageSync('online', false);
    this.setData({
      online: wx.getStorageSync('online'),
      userName: '',
      password: ''
    });
  },

  gotoMyBorrow: function () {//转向我的借阅
    app.newBorrow = false;
    this.setData({
      newBorrow: false
    })
    wx.navigateTo({
      url: '../myBorrow/myBorrow'
    })
  },

  gotoMyMsg: function () {//转向我的消息
    this.setData({
      newMsg: false
    })
    wx.navigateTo({
      url: '../myMsg/myMsg'
    })
  },

  gotoMyOrder: function () {//转向我的预订
    app.newOrder = false;
    this.setData({
      newOrder: false
    })
    wx.navigateTo({
      url: '../myOrder/myOrder'
    })
  },

  gotoMyFavorite: function () {//转向我的收藏
    app.newFavor = false;
    this.setData({
      newFavor: false
    })
    wx.navigateTo({
      url: '../myFavorite/myFavorite'
    })
  },

  gotoMyWallet: function () {//转向我的钱包
    wx.navigateTo({
      url: '../myWallet/myWallet'
    })
  },

  gotoMySafety: function () {//转向我的安全，即重置密码
    wx.navigateTo({
      url: '../rstPass/rstPass'
    })
  },

  forgetPass: function () {//重置密码
    wx.navigateTo({
      url: '../rstPass/rstPass'
    })
  },

})
