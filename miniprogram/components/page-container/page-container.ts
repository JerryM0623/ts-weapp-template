// components/page-container/page-container.ts

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 导航栏标题
    navBarTitle: {
      type: String,
      value: '',
    },
    // 是否显示返回按钮
    navBarLeftArrow: {
      type: Boolean,
      value: true,
    },
    // 导航栏是否固定
    navBarFixed: {
      type: Boolean,
      value: true,
    },
    // 导航栏占位
    navBarPlaceholder: {
      type: Boolean,
      value: true,
    },
    // 是否适配安全区域顶部
    navBarSafeAreaInsetTop: {
      type: Boolean,
      value: true,
    },
    // 导航栏层级
    navBarZIndex: {
      type: Number,
      value: 10000,
    },
    // 是否带动画效果
    navBarAnimation: {
      type: Boolean,
      value: true,
    },
    // 标题最大长度，超出用 "…" 表示
    navBarTitleMaxLength: {
      type: Number,
      value: undefined,
    },
    // 是否显示导航栏
    navBarVisible: {
      type: Boolean,
      value: true,
    },
    // 导航栏背景色
    navBarBackgroundColor: {
      type: String,
      value: '#ffffff',
    },
    // 导航栏文本颜色（标题、返回按钮等）
    navBarTextColor: {
      type: String,
      value: '#000000',
    },
    // 是否开启底部安全区适配
    containerSafeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
    // pageContainer背景色
    containerBackgroundColor: {
      type: String,
      value: '#f5f5f5',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 是否显示返回按钮（根据页面栈判断）
    showLeftArrow: true,
  },

  /**
   * 组件生命周期函数
   */
  lifetimes: {
    // 组件实例进入页面节点树时执行
    attached() {
      // 判断是否显示返回按钮
      this.checkShowLeftArrow()
    },
  },

  /**
   * 属性观察器
   */
  observers: {
    // 监听 visible 和 leftArrow 变化，重新判断是否显示返回按钮
    'visible, leftArrow'() {
      this.checkShowLeftArrow()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 检查是否显示返回按钮
     * 如果页面栈中只有一个页面，或者 visible 为 false，则不显示返回按钮
     */
    checkShowLeftArrow() {
      const pages = getCurrentPages()
      const leftArrow = this.properties.navBarLeftArrow
      const visible = this.properties.navBarVisible
      const showLeftArrow = pages.length > 1 && leftArrow && visible
      this.setData({
        showLeftArrow,
      })
    },

    /**
     * 返回按钮点击事件
     */
    goBack() {
      console.warn('点击了箭头按钮')
      wx.navigateBack({
        success: (res) => {
          // 转发成功事件
          this.triggerEvent('success', res)
          // 转发完成事件
          this.triggerEvent('complete', res)
        },
        fail: (err) => {
          // 转发失败事件
          this.triggerEvent('fail', err)
          // 转发完成事件
          this.triggerEvent('complete', err)
        },
      })
    },
  },
})
