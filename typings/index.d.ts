/// <reference path="./types/index.d.ts" />
/// <reference path="./npm.d.ts" />

/** 微信小程序当前运行的客户端平台，对应 wx.getDeviceInfo().platform */
type ClientPlatformType = 'ios' | 'android' | 'ohos' | 'ohos_pc' | 'windows' | 'mac' | 'devtools' | 'unknown'

/** 根据客户端平台归一化后的操作系统类型 */
type OperatingSystemType = 'ios' | 'android' | 'harmonyos' | 'windows' | 'macos' | 'devtools' | 'unknown'

/** 根据客户端平台归类的硬件设备类别 */
type HardwareDeviceClassType = 'mobile' | 'desktop' | 'devtools' | 'unknown'

interface HardwarePlatformInfoType {
  deviceClass: HardwareDeviceClassType
  brand: string
  model: string
  abi: string
  deviceAbi: string
  cpuType: string
  memorySize: string
}

interface SoftwarePlatformInfoType {
  clientPlatform: ClientPlatformType
  rawClientPlatform: string
  operatingSystem: OperatingSystemType
  system: string
  wechatVersion: string
  baseLibraryVersion: string
  hostAppId: string
}

interface PlatformInfoType {
  hardware: HardwarePlatformInfoType
  software: SoftwarePlatformInfoType
  isMobile: boolean
  isDesktop: boolean
  isDevtools: boolean
}

interface IAppOption {
  globalData: {
    navBarHeight: number,
    navBarContentHeight: number,
    statusBarHeight: number,
    menuRight: number,
    menuTop: number,
    menuHeight: number,
    tabbarHeight: number,
    safeAreaBottom: number,
    safeAreaInsetBottom: number
    platformInfo: PlatformInfoType
    token: string
    userInfo?: WechatMiniprogram.UserInfo
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}
