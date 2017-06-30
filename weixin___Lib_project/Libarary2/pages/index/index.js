var app = getApp();
app.key = '';
app.ISBN = '';
app.times = 0;
Page({
  data: {
    hotLists: [],
    perLists: [],
    display: 'none',
    inputValue: '',
    bookId: '',
    hide: true,
    content: '',
    borrowInfor: '',
    imgUrls: [
      '../../img/GXUL.jpg',
      '../../img/ti.jpg',
      '../../img/yangjiang.jpg'
    ]
  },
  inputChange(e) {//获取输入值
    app.key = e.detail.value;
  },
  onShow: function () {
    var that = this;
    var searchData = wx.getStorageSync('searchHistory') || [];//获取搜索历史
    var online = wx.getStorageSync('online');
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/hotRecommend.php',
      success: function (res) {
        that.setData({
          hotLists: res.data
        })

      }
    });
    if (online) {//获取在线状态
      if (searchData.length < 2) {//如果搜索历史为空或只有一条，不做相应推送
        this.setData({
          display: 'none'
        })
      }
      else {
        var len = searchData.length;
        var key1 = searchData[len - 1];
        var key2 = searchData[len - 2];//获取最近两次搜索历史
        wx.request({
          url: 'https://www.siliangjiadan.cn/php/perRecommend.php?key1=' + key1 + '&key2=' + key2,
          success: function (res) {
            if (res.data.length > 0) {
              that.setData({
                perLists: res.data,
                display: 'block'
              });
            }
          }
        });
      }
    }
  },

  boolLendByScan: function (result) {//检查是借阅书籍还是搜索书籍
    var id = result.substring(0, 7);
    if (id == 'bookId=') {
      return true;
    }
    else
      return false;
  },

  gotoDetail: function (e) {//跳转至详情页
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },

  gotoSearchByKey: function () {//查询方法
    wx.switchTab({
      url: '../search/search'
    })
  },

  scan: function () {//扫码方法
    var that = this;
    var online = wx.getStorageSync('online');//获取在线状态
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
            app.ISBN = res.result;
            wx.switchTab({
              url: '../search/search'
            })
          }
        }
        else {//不在线，调用搜索书籍的方法
          app.ISBN = res.result;
          wx.switchTab({
            url: '../search/search'
          })
        }
      }
    })
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
  }


})
