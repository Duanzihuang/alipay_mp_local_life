import request from '../../utils/request.js'

Page({
  data: {
    cate_id: 0, //分类id
    page: 0, //页码
    pageSize: 10, //页容量
    keyword: '',//关键字
    list: [], // 列表
    hasMore: true, //是否还有更多数据，默认情况下有
    isShowPage: true,
    inputShowed: false, //input的显示
    inputVal: "" //input中输入的值
  },
  onLoad: function (query) {
    // 动态设置导航栏标题
    // #不一样
    my.setNavigationBar({
      title: query.name
    })

    // 这里我没有使用setData，因为cate_id不需要在视图中展示出来
    this.data.cate_id = query.cate_id

    // 调用加载数据的方法
    this.loadData()
  },
  /**
   * 该方法，在第一次加载、上拉加载更多、下拉刷新都用这个方法
   */
  loadData() {
    if (!this.data.hasMore) return

    // 页码+1
    this.data.page++

    // #不一样 url编码
    const keyword = encodeURI(this.data.keyword)

    const url = `categories/${this.data.cate_id}/shops?_page=${this.data.page}&_limit=${this.data.pageSize}&q=${keyword}`

    request.get(url).then(res => {
      // 停止下拉刷新
      my.stopPullDownRefresh()
      // const newArray = this.data.list.concat(res.data)
      // 通过响应头，获取到总条数
      const total = parseInt(res.headers["X-Total-Count"])
      // 上拉加载，拼接上后续加载的内容
      const newArray = [...this.data.list, ...res.data]

      if (this.data.isShowPage) {
        this.setData({
          hasMore: newArray.length < total,
          list: newArray
        })
      }
    })
  },

  // 搜索相关
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });

    this.data.page = 0
    this.data.keyword = ''
    this.setData({
      list: [],
      hasMore: true
    }, () => {
      this.loadData()
    })
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  // 获取最终要进行搜索的值
  getLastValue() {
    this.data.page = 0
    this.data.keyword = this.data.inputVal
    this.setData({
      list: [],
      hasMore: true
    }, () => {
      this.loadData()
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重置
    this.data.page = 0
    this.setData({
      hasMore: true,
      list: []
    }, () => {
      this.loadData()
    })
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData()
  }
})
