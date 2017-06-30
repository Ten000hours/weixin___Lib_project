Page({
  data: {
    lists: [],
    userName: '',
    style1: 'color: limegreen;border-bottom: solid 5rpx limegreen;',
    style2: 'color: black',
    iconPath: '../../img/scan.png'
  },

  onShow: function (options) {
    var that = this;
    wx.request({//已支付项
      url: 'https://www.siliangjiadan.cn/php/admin/searchAllUser.php',
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
  },

  inputChange: function (e) {//获取输入值
    var userName = e.detail.value;
    this.setData({
      userName: userName
    })
  },

  searchByName: function () {//通过用户名查找用户
    var that = this;
    if(this.data.userName==''){
      this.onShow();
      return;
    }
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/admin/searchUserByName.php',
      data: {
        userName: that.data.userName
      },
      method: 'GET',
      success: function (res) {
        if (res.data.length >= 1) {
          that.setData({
            lists: res.data
          });
        }
        else {
          wx.showModal({
            title: '提示',
            content: '未搜索到相应用户信息',
            showCancel: false
          })
        }
      }
    })
  },

  deleteUser: function (e) {//删除用户
    var userId = e.currentTarget.id;
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/admin/deleteUser.php',
      data: {
        userId: userId
      },
      method: 'GET',
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            icon: 'success',
            title: '删除用户成功',
            duration: 1000
          })
          that.onShow();
        }
        else {
          wx.showModal({
            title: '提示',
            content: '该用户已有相应参照，暂不允许删除',
            showCancel: false
          })
        }
      }
    })
  },

  gotoHistoryOrder: function (e) {//查看用户历史订单
    var userId = e.currentTarget.id;
    wx.navigateTo({
      url: '../historyOrder/historyOrder?id='+ userId
    })
  }

})