/**
 * Login 页面 - request.ts 使用示例
 * 演示网络请求封装的各种用法：GET、POST、PUT、DELETE、文件上传等
 */

import { loginReq, type LoginParams } from '../../api/login'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 登录表单数据
    username: '王波林0001',
    password: '1/OBSNrCge2rzKLaQduNpg==',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  // ==================== 输入框事件处理 ====================

  /**
   * 用户名输入变化
   */
  onUsernameChange(e: WechatMiniprogram.Input) {
    this.setData({
      username: e.detail.value,
    })
  },

  /**
   * 密码输入变化
   */
  onPasswordChange(e: WechatMiniprogram.Input) {
    this.setData({
      password: e.detail.value,
    })
  },

  /**
   * 用户ID输入变化
   */
  onUserIdChange(e: WechatMiniprogram.Input) {
    this.setData({
      userId: e.detail.value,
    })
  },

  // ==================== POST 请求示例 ====================

  /**
   * 登录处理（显示 loading）
   * 演示：POST 请求 + 默认 loading + TypeScript 类型
   */
  async handleLogin() {
    const { username, password } = this.data

    // 表单验证
    if (!username || !password) {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none',
      })
      return
    }

    try {
      // POST 请求示例 - 默认显示 loading
      const loginParams: LoginParams = { userName: username, password }
      const res = await loginReq(loginParams)
      console.warn(res)

      // 模拟保存 token
      // const app = getApp<IAppOption>()
      // if (res.data?.token) {
      //   app.globalData.token = res.data.token
      // }

      // wx.showToast({
      //   title: '登录成功',
      //   icon: 'success',
      // })

      // 实际项目中可以跳转到首页
      // setTimeout(() => {
      //   wx.switchTab({
      //     url: '/pages/index/index'
      //   })
      // }, 1500)
    } catch (error) {
      console.error('登录失败：', error)
      // 错误已在拦截器中统一处理，这里可以做额外处理
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
})
