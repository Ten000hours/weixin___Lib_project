Page({
  data: {
    warning: '',
    userName: '',
    IdNum: '',
    password: '',
    comfirm: '',
    boolComfirm: false,
    boolRst: false,
    boolName: false,
    boolId: false
  },

  checkUserName: function (name) {//检查用户名的合理性
    var input = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;//利用正则表达式限定只能为汉字，字母，数字以及下划线
    if (!input.test(name)) {
      this.setData({
        boolName: false,
        warning: '用户名只支持汉字、数字、字母及下划线'
      })
      return false;
    }
    else {
      this.setData({
        boolName: true,
        warning: ''
      })
    }
    return true;
  },


  checkIdNum: function (IdNum) {//检查身份证号
    if (IdNum.length != 18) {
      this.setData({
        boolId: false,
        warning: '请输入正确的身份证号位数'
      })
      return false;
    }
    else if ((IdNum[IdNum.length - 1] > '9' || IdNum[IdNum.length - 1] < '0') && IdNum[IdNum.length - 1] != 'X') {
      this.setData({
        boolId: false,
        warning: '请输入正确的身份证号格式'
      })
      return false;
    }
    else {
      for (var i = 0; i < IdNum.length - 1; i++) {
        if (IdNum[i] > '9' || IdNum[i] < '0') {
          this.setData({
            boolId: false,
            warning: '请输入正确的身份证号格式'
          })
          return false;
        }
      }
      this.setData({
        boolId: true,
        warning: ''
      })
      return true;
    }
  },

  getUserName: function (e) {
    var name = e.detail.value;
    this.setData({
      userName: name
    })
    if (!this.checkUserName(name)) {
      return;
    }
  },

  getIdNum: function (e) {
    var IdNum = e.detail.value;
    this.setData({
      IdNum: IdNum
    })
    if (!this.checkIdNum(IdNum)) {
      return;
    }
  },

  comfirm: function () {
    if (!this.data.boolId || !this.data.boolName) {
      wx.showModal({
        title: '提示',
        content: '请完善相应信息，或注意相应格式',
        showCancel: false
      })
    }
    else {
      var that = this;
      wx.request({
        url: 'https://www.siliangjiadan.cn/php/checkExist.php?userName=' + this.data.userName + '&userIdNum=' + this.data.IdNum,
        success: function (res) {
          if (res.data == 1) {
            that.setData({
              boolComfirm: true
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '该用户不存在，或者身份证信息出错',
              showCancel: false
            })
          }
        }
      })
    }
  },

  getPassword: function (e) {//获取密码
    var password = e.detail.value;
    this.setData({
      password: password
    })
  },

  getComfirm: function (e) {//确认密码
    var comfirm = e.detail.value;
    this.setData({
      comfirm: comfirm
    })
    if (comfirm != this.data.password) {
      this.setData({
        boolRst: false,
        warning: '两次输入的密码不一致'
      })
    }
    else {
      this.setData({
        boolRst: true,
        warning: ''
      })
    }
  },

  reset: function () {
    if (this.data.password == '' || this.data.comfirm == '') {
      wx.showModal({
        title: '提示',
        content: '请保证输入不能为空',
        showCancel: false
      })
      return;
    }
    if (this.data.boolRst) {
      var that = this;
      wx.request({
        url: 'https://www.siliangjiadan.cn/php/updatePass.php?userName=' + that.data.userName + '&userPass=' + that.data.password,
        success(res) {
          if (res.data == 1) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            });
            wx.switchTab({
              url: '../me/me'
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '修改密码失败',
              showCancel: false
            })
          }
        }
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请保证两次密码一致',
        showCancel: false
      })
    }
  }

})