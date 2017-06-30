let app = getApp();
app.boolUserExist = false;
app.boolPhoneExist = false;
app.boolIdNumExist = false;
Page({
  data: {
    id: 0,
    warning: '',
    userName: '',
    phoneNum: '',
    IdNum: '',
    password: '',
    comfirm: '',
  },
  request: function (warning, parameter, type_) {//type_表示相应类型
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/' + parameter,
      success: function (res) {
        if (res.data == 1) {
          that.setData({
            warning: warning,
          })
          if (type_ == 0) {//0表示用户名
            app.boolUserExist = true;
          }
          else if (type_ == 1) {//1表示手机号
            app.boolPhoneExist = true;
          }
          else {//2表示身份证号
            app.boolIdNum = true;
          }
        }
        else {
          that.setData({
            warning: '',
          })
          if (type_ == 0) {//0表示用户名
            app.boolUserExist = false;
          }
          else if (type_ == 1) {//1表示手机号
            app.boolPhoneExist = false;
          }
          else {//2表示身份证号
            app.boolIdNum = false;
          }
        }
      }
    })
  },

  checkUserName: function (name) {//检查用户名的合理性
    var input = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;//利用正则表达式限定只能为汉字，字母，数字以及下划线
    if (!input.test(name)) {
      this.setData({
        warning: '用户名只支持汉字、数字、字母及下划线'
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

  checkPhoneNum: function (phoneNum) {//检查手机号的合法性
    var input = /^[\d]+$/g; //只能输入数字
    if (phoneNum.length != 11) {
      this.setData({
        warning: '请输入正确的手机位数'
      })
      return false;
    }
    else if (!input.test(phoneNum)) {
      this.setData({
        warning: '请输入正确的手机格式'
      })
      return false;
    }
    else {
      this.setData({
        warning: ''
      })
      return true;
    }
  },

  checkIdNum: function (IdNum) {//检查身份证号
    if (IdNum.length != 18) {
      this.setData({
        warning: '请输入正确的身份证号位数'
      })
      return false;
    }
    else if ((IdNum[IdNum.length - 1] > '9' || IdNum[IdNum.length - 1] < '0') && IdNum[IdNum.length - 1] != 'X') {
      this.setData({
        warning: '请输入正确的身份证号格式'
      })
      return false;
    }
    else {
      for (var i = 0; i < IdNum.length - 1; i++) {
        if (IdNum[i] > '9' || IdNum[i] < '0') {
          this.setData({
            warning: '请输入正确的身份证号格式'
          })
          return false;
        }
      }
      this.setData({
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
    var warning = '该用户已存在';
    var parameter = 'checkUserName.php?userName=' + name;
    this.request(warning, parameter, 0);
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
    this.request(warning, parameter, 1);
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
    this.request(warning, parameter, 2);
  },

  getPassword: function (e) {
    var password = e.detail.value;
    this.setData({
      password: password
    })
  },

  getComfirm: function (e) {
    var comfirm = e.detail.value;
    this.setData({
      comfirm: comfirm
    })
  },

  register: function () {
    if (!this.checkUserName(this.data.userName)) {//插入前的检查
      wx.showModal({
        title: '提示',
        content: '请填写正确的用户名格式',
        showCancel: false
      })
      this.setData({
        warning: '用户名只支持汉字、数字、字母及下划线'
      })
      return;
    }
    var warning = '该用户已存在';
    var parameter = 'checkUserName.php?userName=' + this.data.userName;
    this.request(warning, parameter, 0);
    if (app.boolUserExist) {
      wx.showModal({
        title: '提示',
        content: '该用户名已注册',
        showCancel: false
      })
      app.boolUserExist = false;
      return;
    }
    if (!this.checkPhoneNum(this.data.phoneNum)) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的手机号格式或位数',
        showCancel: false
      })
      this.setData({
        warning: '请填写正确的手机号格式或位数'
      })
      return;
    }
    var warning = '该手机号已被绑定';
    var parameter = 'checkPhoneNum.php?userPhoneNum=' + this.data.phoneNum;
    this.request(warning, parameter, 1);
    if (app.boolPhoneExist) {
      wx.showModal({
        title: '提示',
        content: '该手机号已被绑定',
        showCancel: false
      })
      this.setData({
        warning: '该手机号已被绑定'
      })
      app.boolPhoneExist = false;
      return;
    }
    if (!this.checkIdNum(this.data.IdNum)) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的身份证个事或位数',
        showCancel: false
      })
      this.setData({
        warning: '请填写正确的身份证个事或位数'
      })
      return;
    }
    var warning = '该身份证号已被绑定';
    var parameter = 'checkIdNum.php?useIdNum=' + this.data.IdNum;
    this.request(warning, parameter, 2);
    if (app.boolIdNumExist) {
      wx.showModal({
        title: '提示',
        content: '该身份证号已被绑定',
        showCancel: false
      })
      app.boolIdNumExist = false;
      return;
    }
    if (this.data.password != this.data.comfirm) {
      wx.showModal({
        title: '提示',
        content: '两次输入的密码不一致',
        showCancel: false
      })
      this.setData({
        warning: '两次输入的密码不一致'
      })
      return;
    }
    var userName = this.data.userName;
    var phoneNum = this.data.phoneNum;
    var IdNum = this.data.IdNum;
    var password = this.data.password;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/addUser.php',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userName: userName,
        phoneNum: phoneNum,
        IdNum: IdNum,
        password: password
      },
      success: function (res) {
        if (res.data == 1) {
          wx.switchTab({
            url: '../me/me'
          })
        }
      }
    })
  }

})  
