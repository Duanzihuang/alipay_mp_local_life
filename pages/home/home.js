import request from '../../utils/request'

Page({
  data: {
    slides: [], //轮播图数据
    categories: [] //分类菜单数据
  },
  onLoad() {
    this.getSlidesData()
    this.getCategoriesData()
  },
  // 获取首页轮播图数据
  getSlidesData() {
    request.get('slides').then(res => {
      this.setData({
        slides: res.data
      })
    })
  },
  // 获取首页分类数据
  getCategoriesData() {
    request.get('categories').then(res => {
      this.setData({
        categories: res.data
      })
    })
  },
  categoryTap(e) {
    const id = e.currentTarget.dataset.id
    const name = e.currentTarget.dataset.name

    my.navigateTo({
      url: `/pages/list/list?cate_id=${id}&name=${name}`
    });
  }
});
