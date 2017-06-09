Page({
  data: {
    account: 0,
    status: false,
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

  recharge: function () {
    if (this.data.account == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入金额',
        showCancel: false
      })
      return;
    }
    if (this.data.account > 200) {
      wx.showModal({
        title: '提示',
        content: '充值一次性不超过200元',
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
        url: 'https://www.siliangjiadan.cn/php/updateAccount.php?userId=' + userId + '&account=' + this.data.account,
        success: function (res) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 1000
          })
          wx.navigateBack();
        }
      })
    }
  }

})