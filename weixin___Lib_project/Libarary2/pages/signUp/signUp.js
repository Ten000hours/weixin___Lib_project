Page({
  data: {
    id: 0,
    warning: '',
    userName: '',
    phoneNum: '',
    IdNum: '',
    password: '',
    comfirm: '',
    boolName: false,
    boolPhone: false,
    boolId: false,
    boolComfirm: false,
    submit: false,
    color1: '#00EE00',
    color2: 'lightgray'
  },
  request: function (warning, parameter) {
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/' + parameter,
      success: function (res) {
        if (res.data == 1) {
          that.setData({
            warning: warning
          })
        }
        else {
          that.setData({
            warning: ''
          })
        }
      }
    })
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

  checkPhoneNum: function (phoneNum) {//检查手机号的合法性
    var input = /^[\d]+$/g; //只能输入数字
    if (phoneNum.length != 11) {
      this.setData({
        boolPhone: false,
        warning: '请输入正确的手机位数'
      })
      return false;
    }
    else if (!input.test(phoneNum)) {
      this.setData({
        boolPhone: false,
        warning: '请输入正确的手机格式'
      })
      return false;
    }
    else {
      this.setData({
        boolPhone: true,
        warning: ''
      })
      return true;
    }
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

  checkStatus: function () {//检查状态
    if (this.data.boolName && this.data.boolPhone && this.data.boolId && this.data.boolComfirm) {
      this.setData({
        submit: true
      })
    }
    else {
      this.setData({
        submit: false
      })
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
    var warning = '该用户已存在';
    var parameter = 'checkUserName.php?userName=' + name;
    this.request(warning, parameter)
    this.checkStatus();
  },

  getPhoneNum: function (e) {
    var phoneNum = e.detail.value;
    this.setData({
      phoneNum: phoneNum
    })
    if (!this.checkPhoneNum(phoneNum)) {
      return;
    }
    var warning = '该手机号已被绑定';
    var parameter = 'checkPhoneNum.php?userPhoneNum=' + phoneNum;
    this.request(warning, parameter);
    this.checkStatus();
  },

  getIdNum: function (e) {
    var IdNum = e.detail.value;
    this.setData({
      IdNum: IdNum
    })
    if (!this.checkIdNum(IdNum)) {
      return;
    }
    var warning = '该身份证号已被绑定';
    var parameter = 'checkIdNum.php?useIdNum=' + IdNum;
    this.request(warning, parameter);
    this.checkStatus();
  },

  getPassword: function (e) {
    var password = e.detail.value;
    this.setData({
      password: password
    })
    this.checkStatus();
  },

  getComfirm: function (e) {
    var comfirm = e.detail.value;
    this.setData({
      comfirm: comfirm
    })
    if (comfirm != this.data.password) {
      this.setData({
        boolComfirm: false,
        warning: '两次输入的密码不一致'
      })
    }
    else {
      this.setData({
        boolComfirm: true,
        warning: ''
      })
    }
    this.checkStatus();
  },

  register: function () {
    if (this.data.submit) {
      var userName = this.data.userName;
      var phoneNum = this.data.phoneNum;
      var IdNum = this.data.IdNum;
      var password = this.data.password;
      wx.request({
        url: 'https://www.siliangjiadan.cn/php/addUser.php?userName=' + userName + '&phoneNum=' + phoneNum + '&IdNum=' + IdNum + '&password=' + password,
        success: function (res) {
          if (res.data == 1) {
            wx.switchTab({
              url: '../me/me'
            })
          }
        }
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请完善相应信息！',
        showCancel: false
      })
    }
  }

})  
