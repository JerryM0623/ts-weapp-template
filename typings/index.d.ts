/// <reference path="./types/index.d.ts" />
/// <reference path="./npm.d.ts" />

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
    system: string,
    token: string
    userInfo?: WechatMiniprogram.UserInfo
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}
