Page({
  data:{
    id: 0,
    lists: []
  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    var that = this;
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/detail.php?id='+that.data.id,
      success: function(res){
        that.setData({
          lists: res.data,
        });
      }
    })
  },
 
  returnLast: function(){
    wx.navigateBack();
  }
})
