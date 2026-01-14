// custom-tab-bar/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    value: 'label_1',
    list: [
      { value: 'label_1', label: '首页', icon: 'home', pagePath: '/pages/one/index' },
      { value: 'label_2', label: '应用', icon: 'app', pagePath: '/pages/two/index' },
      { value: 'label_3', label: '聊天', icon: 'chat', pagePath: '/pages/three/index' },
      { value: 'label_4', label: '我的', icon: 'user', pagePath: '/pages/four/index' },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
      const value = e.detail.value
      this.setData({ value })
      const item = this.data.list.find((i) => i.value === value)
      if (item && item.pagePath) {
        wx.switchTab({
          url: item.pagePath,
        })
      }
    },
    init() {
      const page = getCurrentPages().pop()
      const route = (page && page.route) || ''
      const activeItem = this.data.list.find(
        (item) => route.includes(item.pagePath.replace(/^\//, '')) || item.pagePath.includes(route),
      )
      if (activeItem) {
        this.setData({
          value: activeItem.value,
        })
      }
    },
  },
})
