Page({
  data: {
    lists: [],
    inputValue: '',
    iconPath: '../../img/scan.png',
    boolScan: true,
    boderStyle: 'border-bottom: solid lightgray 1rpx',
    boderNone: 'border:none'
  },

  onShow: function (option) {//页面加载
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/admin/searchAllBook.php',
      success: function (res) {
        that.setData({
          lists: res.data
        })
      }
    })
  },

  request: function (infor) {//请求函数
    wx.showToast({
      icon: 'loading',
      duration: 5000
    });
    var that = this;
    wx.request({
      url: "https://www.siliangjiadan.cn/php/search.php?key=" + infor,
      success: function (res) {
        wx.hideToast();
        if (res.data.length > 0) {
          that.setData({
            lists: res.data,
            iconPath: '../../img/return.png',
            boolScan: false
          })
        }
        else {
          wx.showModal({
            content: '亲，我们暂时还没有收集该类书籍哦',
            showCancel: false
          })
        }
      }
    })
  },

  gotoDetail: function (e) {//转到详情页
    var id = e.currentTarget.id;
    wx.redirectTo({
      url: '../modifyBook/modifyBook?id=' + id
    });
  },

  inputChange(e) {//获取输入值
    this.setData({
      inputValue: e.detail.value
    })
  },

  searchByKey: function (e) {//关键字查询
    var key = this.data.inputValue;
    if (key != '') {
      this.request(key);
    }
    else {
      wx.showModal({
        title: '提示',
        content: '输入框不能为空',
        showCancel: false
      })
    }
  },

  checkISBN: function (ISBN) {//检查ISBN编号基本合法性
    if (ISBN.length != 10 && ISBN.length != 13) {
      return false;
    }
    for (var i = 0; i < ISBN.length; i++) {
      if (ISBN[i] < 0 || ISBN[i] > 9) {
        return false;
      }
    }
    return true;
  },

  scan: function () {//扫码方法
    var that = this;
    if (this.data.boolScan) {//是不是扫描
      wx.scanCode({
        success: function (res) {
          var ISBN = res.result;
          this.searchByISBN(ISBN);
        }
      })
    }
    else {
      this.setData({
        lists: [],
        iconPath: '../../img/scan.png',
        boolScan: true
      });
    }
  },

  searchByISBN: function (ISBN) {//通过ISBN查找
    var that = this;
    if (this.checkISBN(ISBN)) {
      wx.request({
        url: 'https://www.siliangjiadan.cn/php/scan.php?ISBN=' + ISBN,
        success: function (res) {
          if (res.data.length > 0) {
            that.setData({
              lists: res.data,
              iconPath: '../../img/return.png',
              boolScan: false
            })
          }
          else {
            wx.showModal({
              content: '亲，我们暂时还没有收集该类书籍哦',
              showCancel: false
            })
          }
        },
      })
    }
    else {
      wx.showModal({
        content: '未能获取正确的ISBN编号，请重新扫描',
        showCancel: false
      })
    }
  }
})