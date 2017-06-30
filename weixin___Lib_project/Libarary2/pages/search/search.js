var app = getApp();
app.times = 0;
Page({
  data: {
    lists: [],
    searchHistory: [],
    inputValue: '',
    display: '',
    classification: '',
    iconPath: '../../img/scan.png',
    boolScan: true,
    boolClear: false,
    boderStyle: 'border-bottom: solid lightgray 1rpx',
    boderNone: 'border:none',
    bookId: '',
    hide: true,
    content: '',
    borrowInfor: '',
  },

  onLoad: function (option) {//页面加载
    var searchData = wx.getStorageSync('searchHistory');
    var history = [];//清空历史记录数组
    for (var i = searchData.length - 1; i >= searchData.length - 9 && i >= 0; i--) {//最多取最近9次记录
      history.push(searchData[i]);
    }
    this.setData({
      searchHistory: history
    })
  },

  onShow: function () {//页面展示
    if (app.key != '') {
      this.setData({
        inputValue: app.key
      })
      this.searchByKey(app.key);
      app.key = '';
    }
    else if (app.ISBN != '') {
      this.searchByISBN(app.ISBN);
      app.ISBN = '';
    }
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
            display: 'none',
            boolScan: false,
            searchHistory: history,
            boolClear: false
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
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },

  inputChange(e) {//获取输入值
    this.setData({
      inputValue: e.detail.value
    })
  },

  searchByKey: function (e) {//关键字查询
    var key = this.data.inputValue;
    var that = this;
    let data;
    let localStorageValue = [];
    if (key != '') {
      var searchData = wx.getStorageSync('searchHistory') || [];
      searchData.push(this.data.inputValue);
      wx.request({
        url: "https://www.siliangjiadan.cn/php/search.php?key=" + key,
        success: function (res) {
          if (res.data.length > 0) {
            var history = [];//搜索成功后记录历史记录
            for (var i = searchData.length - 1; i >= searchData.length - 9 && i >= 0; i--) {//最多取最近9次记录
              history.push(searchData[i]);
            }
            wx.setStorageSync('searchHistory', searchData);
            searchData = wx.getStorageSync('searchHistory');
            that.setData({
              lists: res.data,
              iconPath: '../../img/return.png',
              display: 'none',
              boolScan: false,
              searchHistory: history,
              boolClear: false
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
    }
    else {
      wx.showModal({
        title: '提示',
        content: '输入框不能为空',
        showCancel: false
      })
    }
  },

  searchByType: function (e) {//通过类型查询
    var _type = e.currentTarget.id;
    wx.showToast({
      icon: 'loading',
      duration: 5000
    });
    var that = this;
    wx.request({
      url: "https://www.siliangjiadan.cn/php/searchByType.php?type=" + _type,
      success: function (res) {
        wx.hideToast();
        if (res.data.length > 0) {
          that.setData({
            lists: res.data,
            iconPath: '../../img/return.png',
            display: 'none',
            boolScan: false,
            searchHistory: history,
            boolClear: false
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

  boolLendByScan: function (result) {//检查是借阅书籍还是搜索书籍
    var id = result.substring(0, 7);
    if (id == 'bookId=') {
      return true;
    }
    else
      return false;
  },

  scan: function () {//扫码方法
    var that = this;
    var online = wx.getStorageSync('online');//获取在线状态
    if (this.data.boolScan) {//是不是扫描
      wx.scanCode({
        success: function (res) {
          if (online) {//考察是否在线
            if (that.boolLendByScan(res.result)) {//如果是借书调用借书的方法
              var arr = res.result.split('=');
              var date = new Date();
              var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
              date.setMonth(date.getMonth() + 1);//获取1个月后的日期
              var endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
              var bookId = arr[1];
              var userName = wx.getStorageSync("userName");
              var userId = wx.getStorageSync('id');
              var bookName = '';
              wx.request({//获得书籍名称
                url: 'https://www.siliangjiadan.cn/php/getBookName.php?bookId=' + bookId,
                success: function (res) {
                  bookName = res.data[0].bookName;
                  var infor = '\t书籍名：' + bookName + '\n\t用户：' + userName + '\n\t借书时间：' + today + '\n\t还书时间：' + endDate + '\n\t请问是否确认借阅该书籍？';
                  var borrowInfor = 'bookId=' + bookId + '&userId=' + userId + '&borrowTime=' + today + '&returnTime=' + endDate;
                  that.setData({
                    bookId: bookId,
                    content: infor,
                    hide: false,
                    borrowInfor: borrowInfor
                  })
                }
              })
            }
            else {//不是借书，即调用搜索书籍的方法
              var ISBN = res.result;
              that.searchByISBN(ISBN);
            }
          }
          else {//不在线，调用搜索书籍的方法
            var ISBN = res.result;
            that.searchByISBN(ISBN);
          }
        }
      })
    }
    else {
      this.setData({
        lists: [],
        display: 'block',
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
              display: 'none',
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
  },

  checkBorrowTimes: function () {//检查是否已达今日借阅上限
    var userId = wx.getStorageSync('id');
    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/checkBorrowTimes.php',
      data: {
        userId: userId,
        dateTime: today
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.length == 2) {
          app.times = 2;
        }
      }
    })
  },

  borrow: function () {//书籍借阅方法
    this.setData({
      hide: true
    })
    this.checkBorrowTimes();
    if (app.times == 2) {
      wx.showModal({
        title: '提示',
        content: '已达今日借阅上限，一次性限定借两本书籍',
        showCancel: false
      })
      app.times == 0;//清空全局变量
      return;
    }
    var that = this;
    var userId = wx.getStorageSync('id');
    wx.request({//确定书籍余量是否可以借阅
      url: 'https://www.siliangjiadan.cn/php/detail.php?id=' + that.data.bookId,
      success: function (res) {
        if (res.data[0].bookCollectNum > 0) {
          wx.request({//检查是否借阅过该书籍
            url: 'https://www.siliangjiadan.cn/php/checkBorrow.php?bookId=' + that.data.bookId + '&userId=' + userId,
            success: function (res) {
              console.log(res.data);
              if (res.data == 1) {
                wx.showModal({
                  title: '提示',
                  content: '已生成相应订单，或已借阅，请前往相应位置查看',
                  showCancel: false
                })
              }
              else {
                wx.request({
                  url: 'https://www.siliangjiadan.cn/php/addBorrow.php?' + that.data.borrowInfor,
                  success: function (res) {
                    if (res.data == 11) {
                      wx.showModal({
                        title: '提示',
                        content: '亲，订单已生成，请于今天完成支付，不然明天订单会自动取消哦',
                        showCancel: false,
                        success() {
                          wx.navigateTo({
                            url: '../myWallet/myWallet'
                          })
                        }
                      })
                    }
                    else {
                      wx.showModal({
                        title: '提示',
                        content: '借阅失败',
                        showCancel: false
                      })
                    }
                  }
                })
              }
            }
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '该书可能已为您生成订单，请前往我的钱包确认，如没有相应订单，则表明该书已被预约，暂不予以借阅',
            showCancel: false
          })
        }
      }
    })

  },

  hide: function () {//隐藏借阅提示框
    this.setData({
      hide: true
    })
  },

  searchByHistory: function (e) {//按历史记录查询
    var key = e.currentTarget.id;
    this.request(key);
  },

  clearHistory: function () {//清除历史记录
    if (!this.data.boolClear) {
      this.data.boolClear = true;
      var that = this;
      wx.removeStorage({
        key: 'searchHistory',
        success: function (res) {
          that.setData({
            searchHistory: []
          })
        }
      })
    }
  }
})