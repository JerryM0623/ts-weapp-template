// app.ts
import { getPlatformInfo } from './utils/platform'

App<IAppOption>({
  globalData: {
    navBarHeight: 0, // 导航栏总高度
    navBarContentHeight: 0, // 胶囊那一栏的高度（不含状态栏）
    statusBarHeight: 0, // 状态栏高度
    menuRight: 0, // 胶囊右边距
    menuTop: 0, // 胶囊顶部距离
    menuHeight: 0, // 胶囊高度
    tabbarHeight: 0, // 底部导航栏高度
    safeAreaBottom: 0, // 底部安全区域坐标
    safeAreaInsetBottom: 0, // 中间区域内容的底边坐标
    platformInfo: {
      hardware: {
        deviceClass: 'unknown',
        brand: '',
        model: '',
        abi: '',
        deviceAbi: '',
        cpuType: '',
        memorySize: '',
      },
      software: {
        clientPlatform: 'unknown',
        rawClientPlatform: '',
        operatingSystem: 'unknown',
        system: '',
        wechatVersion: '',
        baseLibraryVersion: '',
        hostAppId: '',
      },
      isMobile: false,
      isDesktop: false,
      isDevtools: false,
    },
    token: '',
  },
  onLaunch() {
    // 获取小程序宿主环境信息
    const platformInfo = getPlatformInfo()
    this.globalData.platformInfo = platformInfo

    // 获取胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect()

    // 获取系统窗口信息
    const windowInfo = wx.getWindowInfo()

    // 赋值基础信息
    this.globalData.menuRight = windowInfo.screenWidth - menuButtonInfo.right
    this.globalData.menuTop = menuButtonInfo.top
    this.globalData.menuHeight = menuButtonInfo.height
    this.globalData.statusBarHeight = windowInfo.statusBarHeight
    this.globalData.safeAreaBottom = windowInfo.safeArea.bottom

    // 计算导航栏内容区域高度(不含状态栏)
    // 解释：(胶囊上边距 - 状态栏高度) 是胶囊距离状态栏的间隙，上下各有一个间隙，所以 * 2
    const gap = menuButtonInfo.top - windowInfo.statusBarHeight
    const navContentHeight = menuButtonInfo.height + gap * 2
    this.globalData.navBarContentHeight = navContentHeight

    // 计算导航栏+手机状态栏高度
    // 计算公式：导航栏高度 = 状态栏高度 + (胶囊上边距 - 状态栏高度) * 2 + 胶囊高度
    this.globalData.navBarHeight = windowInfo.statusBarHeight + navContentHeight

    // 计算底部小黑条高度 (屏幕高度 - 安全区域底部坐标)
    const safeAreaInsetBottom = windowInfo.screenHeight - windowInfo.safeArea.bottom
    this.globalData.safeAreaInsetBottom = safeAreaInsetBottom
  },
})
