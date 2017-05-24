Page({
  data: {
    lists: [],
    searchHistory: [],
    inputValue: '',
    display: '',
    classification: '',
    iconPath: '../../img/scan.png',
    boolScan: true,
    boolClear: false
  },

  scrollR: function (e) {

  },

  onLoad: function (option) {
    var searchData = wx.getStorageSync('searchHistory');
    this.setData({
      searchHistory: searchData
    })
  },

  scroll: function (e) {
    this.scrollR(this.data.offset);
  },

  request: function (infor) {//请求函数
    var that = this
    wx.request({
      url: "https://www.siliangjiadan.cn/php/search.php?key=" + infor,
      success: function (res) {
        that.setData({
          lists: res.data,
        });
      },
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
    let data;
    let localStorageValue = [];
    if (key != '') {
      var searchData = wx.getStorageSync('searchHistory') || []
      searchData.push(this.data.inputValue)
      wx.setStorageSync('searchHistory', searchData);//本地缓存
      searchData = wx.getStorageSync('searchHistory');
      this.setData({
        iconPath: '../../img/return.png',
        display: 'none',
        boolScan: false,
        searchHistory: searchData,
        boolClear : false
      });
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

  searchByScan: function () {//通过扫码查询
    if (this.data.boolScan) {
      var that = this;
      var ISBN;
      wx.scanCode({
        success: function (res) {
          ISBN = res.result;
          wx.request({
            url: 'https://www.siliangjiadan.cn/php/scan.php?ISBN=' + ISBN,
            success: function (res) {
              that.setData({
                lists: res.data,
                iconPath: '../../img/return.png',
                display: 'none',
                boolScan: false
              })
            },
          })
        }
      });
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

  searchByType: function (e) {//通过类型查询
    var key = e.currentTarget.id;
    this.setData({
      iconPath: '../../img/return.png',
      display: 'none',
      boolScan: false
    });
    this.request(key);
  },

  searchByHistory: function (e) {//按历史记录查询
    var key = e.currentTarget.id;
    this.setData({
      iconPath: '../../img/return.png',
      display: 'none',
      boolScan: false,
    });
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