// pages/favorite/favorite.js
Page({
  data: {
    lists: [],
    selected: [],
    edit: false,
    index: 0,
    visiblity: "hidden",
    selectPath: "../../img/select.png",
    selectedPath: '../../img/selected.png'
  },

  onShow: function () {
    var that = this;
    var selected = [];
    var userId = wx.getStorageSync('id');
    wx.request({
      url: 'https://www.siliangjiadan.cn/php/favorite.php?userId=' + userId,
      success: function (res) {
        that.setData({
          lists: res.data
        });
      }
    })
  },

  returnLast: function () {
    if (!this.data.edit) {
      wx.navigateBack();
    }
    else {
      var selected = this.data.selected;
      for (var i = 0; i < selected.length; i++) {
        selected[i].selected = false;
      }
      this.setData({
        edit: false,
        visiblity: "hidden",
        selected: selected
      });
    }
  },

  edit: function () {
    this.setData({
      edit: true,
      visiblity: "visible"
    })
  },

  selOrgoto: function (e) {//编辑状态下进行选择，非编辑状态进入详情页
    if (this.data.edit) {
      var id = e.currentTarget.id;
      var selected = this.data.selected;
      for (var i = 0; i < this.data.lists.length; i++) {
        var item = new Object();
        item.id = this.data.lists[i].bookId;
        item.selected = false;
        selected.push(item);
      }
      this.setData({
        selected: selected
      });
      for (var i = 0; i < selected.length; i++) {
        if (id == selected[i].id) {
          if (selected[i].selected) {
            selected[i].selected = false;
          }
          else {
            selected[i].selected = true;
          }
        }
      }
      this.setData({
        selected: selected
      });
    }
    else {
      var id = e.currentTarget.id;
      wx.navigateTo({
        url: '../detail/detail?id=' + id
      })
    }
  },

  delFavor: function () {
    var that = this;
    var userId = wx.getStorageSync('id');
    for (var i = 0; i < this.data.lists.length; i++) {
      if (this.data.selected[i].selected) {
        var bookId = this.data.selected[i].id;
        wx.request({
          url: 'https://www.siliangjiadan.cn/php/delFavor.php?userId=' + userId + '&bookId=' + bookId,
        })
      }
    }
    this.setData({
      edit: false,
      visiblity: "hidden"
    })
    this.onShow();//类似汇编的空指令，防止刷新失败的情况
  }


})