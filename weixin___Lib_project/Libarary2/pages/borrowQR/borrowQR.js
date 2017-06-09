var QR = require("../../utils/qrcode.js");//调用接口模板
var app = getApp();
app.QRContent = '';//全局变量，借书二维码的内容
Page({
  data: {
    maskHidden: true,
    imagePath: '',
    url: ''
  },

  onShow: function(){
    if(app.QRContent != ''){
      this.setData({
        url: app.QRContent
      })
      this.createQR();
      app.QRContent = '';//清空全局变量的值
    }
  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
    }
    return size;
  },

  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url, canvasId, cavW, cavH);

  },

  createQR: function () {
    var that = this;
    var url = this.data.url;
    that.setData({
      maskHidden: false,
    });
    wx.showToast({
      icon: 'loading',
      duration: 500
    });
    var st = setTimeout(function () {
      wx.hideToast()
      var size = that.setCanvasSize();
      //绘制二维码
      that.createQrCode(url, "mycanvas", size.w, size.h);
      that.setData({
        maskHidden: true
      });
      clearTimeout(st);
    }, 500)

  }

})