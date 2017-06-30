var app = getApp();
app.newFavor = false;
Page({
  data: {
    id: 0,
    userId: 0,
    lists: [],
    online: false,
    boolBook: true,
    boolAuthor: false,
    boolContent: false,
    boolCatalog: false,
    imgPath: '',
    style1: 'color: limegreen;border-bottom: solid 5rpx limegreen;',
    style2: 'color: black',
    index: 0,
    bookTypeArray: ['文学', '流行', '文化', '科技', '生活', '经管'],
    today: '',
    imgName: '',
    warning: '',
    bookId: 0,
    bookType: '文学',
    bookName: '',
    bookWriterName: '',
    bookPhoneticize: '',
    bookFirstLetter: '',
    bookPublisher: '',
    bookVersionID: 1,
    bookCatalog: '暂无',
    bookBriefIntro: '暂无',
    bookCollectNum: 1,
    bookImgPath: '',
    bookBorrowTimes: '',
    bookPrice: 0.0,
    bookWriterInfor: '暂无',
    bookPublishTime: '1980-1-1',
    ISBN: '',
    bookPosition: ''
  },

  onLoad: function (options) {
    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.setData({
      id: options.id,
      today: today
    });
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/detail.php?id=' + that.data.id,
      success: function (res) {
        that.setData({
          lists: res.data,
          imgPath: res.data[0].bookImgPath,
          bookId: res.data[0].bookId,
          bookType: res.data[0].bookType,
          bookName: res.data[0].bookName,
          bookWriterName: res.data[0].bookWriterName,
          bookPhoneticize: res.data[0].bookPhoneticize,
          bookFirstLetter: res.data[0].bookFirstLetter,
          bookPublisher: res.data[0].bookPublisher,
          bookVersionID: res.data[0].bookVersionID,
          bookCatalog: res.data[0].bookCatalog,
          bookBriefIntro: res.data[0].bookBriefIntro,
          bookCollectNum: res.data[0].bookCollectNum,
          bookImgPath: res.data[0].bookImgPath,
          bookBorrowTimes: res.data[0].bookBorrowTimes,
          bookPrice: res.data[0].bookPrice,
          bookWriterInfor: res.data[0].bookWriterInfor,
          bookPublishTime: res.data[0].bookPublishTime,
          ISBN: res.data[0].ISBN,
          bookPosition: res.data[0].bookPosition,
        });
      }
    });
  },

  chooseTab: function (e) {//选项
    var id = e.currentTarget.id;
    if (id == 'tab1') {
      this.setData({
        boolBook: true,
        boolAuthor: false,
        boolContent: false,
        boolCatalog: false
      })
    }
    else if (id == 'tab2') {
      this.setData({
        boolBook: false,
        boolAuthor: true,
        boolContent: false,
        boolCatalog: false
      })
    }
    else if (id == 'tab3') {
      this.setData({
        boolBook: false,
        boolAuthor: false,
        boolContent: true,
        boolCatalog: false
      })
    }
    else {
      this.setData({
        boolBook: false,
        boolAuthor: false,
        boolContent: false,
        boolCatalog: true
      })
    }
  },

  returnLast: function () {
    wx.switchTab({
      url: '../search/search'
    });
  },

  chooseImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album'], // album 从相册选图
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          imgPath: tempFilePaths[0]
        })
      }
    })
  },

  getBookName: function (e) {//获取书籍名
    var bookName = e.detail.value;
    this.setData({
      bookName: bookName
    })
    if (this.data.bookName == '') {
      this.setData({
        warning: '书籍名不能为空'
      })
    }
    else {
      this.setData({
        warning: ''
      })
    }
  },

  getAuthor: function (e) {//获取作者名
    var author = e.detail.value;
    this.setData({
      bookWriterName: author
    })
    if (this.data.bookWriterName == '') {
      this.setData({
        warning: '作者名不能为空'
      })
    }
    else {
      this.setData({
        warning: ''
      })
    }
  },

  getPrice: function (e) {//获取价格
    var bookPrice = e.detail.value;
    this.setData({
      bookPrice: bookPrice
    })
    this.checkPrice(this.data.bookPrice);
  },

  getVersionId: function (e) {//获取版本号
    var bookVersionID = e.detail.value;
    this.setData({
      bookVersionID: bookVersionID
    })
    this.checkVersionId(this.data.bookVersionID);
  },

  getPhoneticize: function (e) {//获取全拼
    var bookPhoneticize = e.detail.value;
    var bookFirstLetter = bookPhoneticize.substr(0, 1);
    this.setData({
      bookPhoneticize: bookPhoneticize,
      bookFirstLetter: bookFirstLetter
    })
    this.checkPhoneticize(this.data.bookPhoneticize);
  },

  getPosition: function (e) {//获取位置
    var bookPosition = e.detail.value;
    this.setData({
      bookPosition: bookPosition
    })
    this.checkPosition(this.data.bookPosition);
  },

  getPublisher: function (e) {//获取出版信息
    var bookPublisher = e.detail.value;
    this.setData({
      bookPublisher: bookPublisher
    })
    this.checkPublisher(this.data.bookPublisher);
  },

  getPublishTime: function (e) {//获取出版时间
    var bookPublishTime = e.detail.value;
    this.setData({
      bookPublishTime: bookPublishTime
    })
  },

  getType: function (e) {//获取类型
    var index = e.detail.value;
    this.setData({
      bookType: this.data.bookTypeArray[index],
      index: index
    })
  },

  getCollectNum: function (e) {//获取馆藏量
    var bookCollectNum = e.detail.value;
    this.setData({
      bookCollectNum: bookCollectNum
    })
    this.checkCollectNum(this.data.bookCollectNum);
  },

  getISBN: function (e) {//获取ISBN号
    var ISBN = e.detail.value;
    this.setData({
      ISBN: ISBN
    })
    this.checkISBN(this.data.ISBN);
    this.checkBookExist(this.data.ISBN);
  },

  getAuthorInfo: function (e) {//获得作者信息
    var authorInfo = e.detail.value;
    this.setData({
      bookWriterInfor: authorInfo
    })
  },

  getContent: function (e) {//获得内容
    var content = e.detail.value;
    this.setData({
      bookBriefIntro: content
    })
  },

  getCatalog: function (e) {//获得目录信息
    var catalog = e.detail.value;
    this.setData({
      bookCatalog: catalog
    })
  },

  checkPrice: function (price) {//检查价格格式
    var input = /^\d*\.?\d*$/;
    if (!input.test(price) || price == '') {
      this.setData({
        warning: '请填写正确的价格格式'
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

  checkVersionId: function (versionId) {//检查版本号格式
    var input = /^\d+$/;
    if (!input.test(versionId) || versionId == '') {
      this.setData({
        warning: '请填写正确的版本号'
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

  checkPhoneticize: function (phoneticize) {//检查全拼格式
    var input = /^[a-zA-Z]+$/;
    if (!input.test(phoneticize) || phoneticize == '') {
      this.setData({
        warning: '请填写正确的拼音格式'
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

  checkPosition: function (position) {//检查所在位置格式
    if (position == '') {
      this.setData({
        warning: '书籍位置不能为空'
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

  checkPublisher: function (publisher) {//检查出版社格式
    if (publisher == '') {
      this.setData({
        warning: '出版社信息不能为空'
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

  checkCollectNum: function (collectNum) {//检查馆藏量格式
    var input = /^\d+$/;
    if (!input.test(collectNum) || collectNum == '') {
      this.setData({
        warning: '请填写正确的馆藏量格式'
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

  checkISBN: function (ISBN) {//检查ISBN编号基本合法性
    var input = /^\d+$/;
    if (!input.test(ISBN)) {
      this.setData({
        warning: 'ISBN号只能是数字'
      })
      return false;
    }
    if (ISBN.length != 10 && ISBN.length != 13) {
      this.setData({
        warning: 'ISBN号只能是10位或13位'
      })
      return false;
    }
    this.setData({
      warning: ''
    })
    return true;
  },

  checkBookExist: function (ISBN) {//检查ISBN是否存在
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/scan.php?ISBN=' + ISBN,
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            warning: '已存在相应ISBN号的书籍，请避免重复录入'
          })
          return false;
        }
        else {
          that.setData({
            warning: ''
          })
          return true;
        }
      }
    })
  },

  updateBasicInfor: function () {//修改基本信息
    if (this.data.bookName == '') {//修改前的检查
      wx.showModal({
        title: '提示',
        content: '书籍名不能为空',
        showCancel: false
      })
      this.setData({
        warning: '书籍名不能为空'
      })
      return;
    }
    if (this.data.bookWriterName == '') {
      wx.showModal({
        title: '提示',
        content: '作者名不能为空',
        showCancel: false
      })
      this.setData({
        warning: '作者名不能为空'
      })
      return;
    }
    if (!this.checkPrice(this.data.bookPrice)) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的价格格式',
        showCancel: false
      })
      this.setData({
        warning: '请填写正确的价格格式'
      })
      return;
    }
    if (!this.checkVersionId(this.data.bookVersionID)) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的版本号',
        showCancel: false
      })
      this.setData({
        warning: '请填写正确的版本号'
      })
      return;
    }
    if (!this.checkPhoneticize(this.data.bookPhoneticize)) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的拼音格式',
        showCancel: false
      })
      this.setData({
        warning: '请填写正确的拼音格式'
      })
      return;
    }
    if (!this.checkPosition(this.data.bookPosition)) {
      wx.showModal({
        title: '提示',
        content: '书籍位置不能为空',
        showCancel: false
      })
      this.setData({
        warning: '书籍位置不能为空'
      })
      return;
    }
    if (!this.checkPublisher(this.data.bookPublisher)) {
      wx.showModal({
        title: '提示',
        content: '出版社信息不能为空',
        showCancel: false
      })
      this.setData({
        warning: '出版社信息不能为空'
      })
      return;
    }
    if (!this.checkCollectNum(this.data.bookCollectNum)) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的馆藏量格式',
        showCancel: false
      })
      this.setData({
        warning: '请填写正确的馆藏量格式'
      })
      return;
    }
    if (!this.checkISBN(this.data.ISBN)) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的ISBN格式',
        showCancel: false
      })
      this.setData({
        warning: '请填写正确的ISBN格式'
      })
      return;
    }
    if (this.data.imgPath != this.data.bookImgPath) {//如果有修改过封面，则上传图片
      var that = this;
      wx.uploadFile({//上传图片
        url: 'https://www.siliangjiadan.cn/php/admin/upload.php',
        filePath: that.data.imgPath,
        name: 'file',
        success: function (res) {
          var imgName = res.data;
          var bookImgPath = 'https://www.siliangjiadan.cn/img/' + imgName.substr(1, imgName.length - 1);
          wx.request({//修改书籍
            url: 'https://www.siliangjiadan.cn/php/admin/updateBook.php',
            data: {
              bookId: that.data.bookId,
              bookType: that.data.bookType,
              bookName: that.data.bookName,
              bookWriterName: that.data.bookWriterName,
              bookPhoneticize: that.data.bookPhoneticize,
              bookFirstLetter: that.data.bookFirstLetter,
              bookPublisher: that.data.bookPublisher,
              bookVersionID: that.data.bookVersionID,
              bookCollectNum: that.data.bookCollectNum,
              bookImgPath: bookImgPath,
              bookPrice: that.data.bookPrice,
              bookPublishTime: that.data.bookPublishTime,
              ISBN: that.data.ISBN,
              bookPosition: that.data.bookPosition
            },
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              if (res.data == 1) {
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 1000
                });
              }
            }
          })
        }
      })
    }
    else {
      var that = this;
      wx.request({//插入书籍
        url: 'https://www.siliangjiadan.cn/php/admin/updateBook.php',
        data: {
          bookId: that.data.bookId,
          bookType: that.data.bookType,
          bookName: that.data.bookName,
          bookWriterName: that.data.bookWriterName,
          bookPhoneticize: that.data.bookPhoneticize,
          bookFirstLetter: that.data.bookFirstLetter,
          bookPublisher: that.data.bookPublisher,
          bookVersionID: that.data.bookVersionID,
          bookCollectNum: that.data.bookCollectNum,
          bookImgPath: that.data.bookImgPath,
          bookPrice: that.data.bookPrice,
          bookPublishTime: that.data.bookPublishTime,
          ISBN: that.data.ISBN,
          bookPosition: that.data.bookPosition
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.data == 1) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            });
          }
        }
      })
    }
  },

  updateAuthor: function () {//修改作者信息
    var that = this;
    if (this.data.bookWriterInfor == '') {
      that.setData({
        bookWriterInfor: '暂无'
      })
    }
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/admin/updateAuthor.php',
      data: {
        bookId: that.data.bookId,
        bookWriterInfor: that.data.bookWriterInfor
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '作者修改成功',
            icon: 'success',
            duration: 1000
          });
        }
      }
    })
  },

   updateContent: function () {//修改内容信息
    var that = this;
    if (this.data.bookBriefIntro == '') {
      that.setData({
        bookWriterInfor: '暂无'
      })
    }
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/admin/updateContent.php',
      data: {
        bookId: that.data.bookId,
        bookBriefIntro: that.data.bookBriefIntro
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '简介修改成功',
            icon: 'success',
            duration: 1000
          });
        }
      }
    })
  },

  updateCatalog: function () {//修改目录
    var that = this;
    if (this.data.bookCatalog == '') {
      that.setData({
        bookCatalog: '暂无'
      })
    }
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/admin/updateCatalog.php',
      data: {
        bookId: that.data.bookId,
        bookCatalog: that.data.bookCatalog
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '目录修改成功',
            icon: 'success',
            duration: 1000
          });
        }
      }
    })
  }

})



