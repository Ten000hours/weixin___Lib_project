var app = getApp()
Page({
  data: {
    online: false,
    userId: 0,
    userName: '',
    password: '',
    userInfo: {},
    showBadge: false,
    meList: [
      {
        text: '我的借阅',
        icon: '/img/044.png',
        url: '../myborrow/myborrow'
      },
      {
        text: '我的消息',
        icon: '/img/074.png',
        url: ''
      },
      {
        text: '我的预约',
        icon: '/img/089.png',
        url: '../order/order'
      },
      {
        text: '我的收藏',
        icon: '/img/022.png',
        url: ''
      },
      {
        text: '我的钱包',
        icon: '/img/056.png',
        url: ''
      },
      {
        text: '我的安全',
        icon: '/img/027.png',
        url: ''
      }
    ]
  },

  onLoad: function () {
    var status = wx.getStorageSync('online');
    var name = wx.getStorageSync('userName');
    if (status) {
      app.getUserInfo(function (userInfo) {
        that.setData({
          userInfo: userInfo
        })
      })
    }
    this.setData({
      online: status,
      userName: name
    })
    var that = this;
  },

  getUserName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  getPassword: function (e) {
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
        if (res.data > 0) {
          wx.setStorage({//设置缓存信息
            key: 'userName',
            data: name,
          });
          wx.setStorage({
            key: 'id',
            data: res.data,
          });
          wx.setStorage({
            key: 'online',
            data: true,
          });
          that.setData({
            online: wx.getStorageInfoSync('online'),
            userId: res.data
          });
          wx.hideToast();
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
  }

})
