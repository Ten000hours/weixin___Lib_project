// pages/myMsg/myMsg.js
Page({
  data: {
    lists: [],
    img1: '../../img/yangjiang.jpg',
    img2: '../../img/ti.jpg'
  },

  onShow: function(){
    var userId = wx.getStorageSync('id');
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/message.php?userId=' + userId  ,
      success: function(res){
        console.log(res.data);
        that.setData({
          lists: res.data
        })
      }
    })
  },

  returnLast: function () {
    wx.switchTab({
      url: '../me/me'
    })
  },

})