Page({
  data: {
    account: 0,
    balance: 0,
    status: false,
  },

  onShow: function () {
    var userId = wx.getStorageSync('id');
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/getUserAccount.php?userId=' + userId,
      success: function (res) {
        that.setData({
          balance: res.data[0].userAccount
        })
      }
    })
  },

  returnLast: function () {//跳回上一页
    wx.navigateBack();
  },

  checkAccount: function (account) {//检查金额合理性
    var input = /^[+]?\d*\.?\d*$/;
    if (!input.test(account)) {
      this.setData({
        status: false,
        warning: '请输入正确的金额格式'
      })
      return false;
    }
    else {
      this.setData({
        warning: ''
      })
    }
    return true;
  },

  getAccount: function (e) {//获得金额
    var account = e.detail.value;
    if (this.checkAccount(account)) {//如果是数字
      this.setData({
        account: account,
        status: true,
      })
    }
  },

  withdraw: function () {
    if (this.data.account == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入金额',
        showCancel: false
      })
      return;
    }
    if (this.data.account - this.data.balance >0) {
      var that = this;
      wx.showModal({
        title: '提示',
        content: '提现金额不能超过' + that.data.balance + '元',
        showCancel: false
      })
      return;
    }
    if (!this.data.status) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的金额格式',
        showCancel: false
      })
    }
    else {
      var userId = wx.getStorageSync('id');
      wx.request({
        url: 'https://www.siliangjiadan.cn/php/updateAccount.php?userId=' + userId + '&account=-' + this.data.account,
        success: function (res) {
          console.log(res.data);
          if (res.data == 1) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack();
          }
        }
      })
    }
  }

})