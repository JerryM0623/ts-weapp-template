// components/page-container/page-container.ts

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 导航栏标题
    title: {
      type: String,
      value: '',
    },
    // 是否显示返回按钮
    leftArrow: {
      type: Boolean,
      value: true,
    },
    // 导航栏是否固定
    fixed: {
      type: Boolean,
      value: true,
    },
    // 导航栏占位
    placeholder: {
      type: Boolean,
      value: true,
    },
    // 是否适配安全区域顶部
    safeAreaInsetTop: {
      type: Boolean,
      value: true,
    },
    // 导航栏层级
    zIndex: {
      type: Number,
      value: 10000,
    },
    // 是否带动画效果
    animation: {
      type: Boolean,
      value: true,
    },
    // 后退的层数
    delta: {
      type: Number,
      value: 1,
    },
    // 标题最大长度，超出用 "…" 表示
    titleMaxLength: {
      type: Number,
      value: undefined,
    },
    // 是否显示导航栏
    visible: {
      type: Boolean,
      value: true,
    },
    // 导航栏背景色
    backgroundColor: {
      type: String,
      value: '#ffffff',
    },
    // 导航栏文本颜色（标题、返回按钮等）
    textColor: {
      type: String,
      value: '#000000',
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
      const leftArrow = this.properties.leftArrow
      const visible = this.properties.visible
      const showLeftArrow = pages.length > 1 && leftArrow && visible
      this.setData({
        showLeftArrow,
      })
    },

    /**
     * 返回按钮点击事件
     */
    goBack() {
      const pages = getCurrentPages()
      const delta = this.properties.delta
      if (pages.length > 1 && delta > 0) {
        wx.navigateBack({
          delta,
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
      }
    },

    /**
     * 处理返回成功事件（从 t-navbar 转发）
     */
    handleBackSuccess(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('success', e.detail)
    },

    /**
     * 处理返回失败事件（从 t-navbar 转发）
     */
    handleBackFail(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('fail', e.detail)
    },

    /**
     * 处理返回完成事件（从 t-navbar 转发）
     */
    handleBackComplete(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('complete', e.detail)
    },
  },
})
