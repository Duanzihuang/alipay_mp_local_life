import request from '../../utils/request.js'

Page({
  data: {
    shop: {}
  },
  onLoad(query) {
    this.getShopData(query.id)
  },
  getShopData(id) {
    request.get(`shops/${id}`).then(res => {
      this.setData({
        shop: res.data
      })
    })
  },
  // 预览
  preview(e) {
    my.previewImage({
      // #不一样
      current: e.currentTarget.dataset.index,
      urls: this.data.shop.images
    })
  }
})
