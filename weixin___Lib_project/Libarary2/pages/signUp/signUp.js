Page({
  data: {
    array: ['中文社会科学图书', '中文自然科学图书', '综合书刊','外文书刊','特藏书刊','捐赠书刊'],
    index: 0,

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})