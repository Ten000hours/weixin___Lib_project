//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      '../../img/GXUL.jpg',
       '../../img/ti.jpg',
        '../../img/gxu.jpg'
    ],
  },
  gotoDetail: function () {
    wx.navigateTo({
      url: '../detail/detail?id=1'
    });
  }
})
