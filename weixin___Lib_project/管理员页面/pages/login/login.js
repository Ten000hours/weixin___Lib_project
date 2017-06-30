Page({
  data: {
    online: false,
    adminName: '',
    password: '',
  },

  getAdminName: function (e) {//未登录状态获取用户名
    this.setData({
      adminName: e.detail.value
    })
  },

  getPassword: function (e) {//未登录状态获取密码
    this.setData({
      password: e.detail.value
    })
  },

  login: function () {
    var that = this;
    var name = this.data.adminName;
    var pass = this.data.password;
    if (name == '') {
      wx.showModal({//判断用户名是否为空
        title: '提示',
        content: '账号不能为空！',
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
      url: 'https://www.siliangjiadan.cn/php/admin/login.php',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        adminName: name,
        adminPass: pass
      },
      success: function (res) {
        wx.hideToast();
        if (res.data.length > 0) {
          wx.switchTab({
            url: '../orders/orders'
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
  }
})
