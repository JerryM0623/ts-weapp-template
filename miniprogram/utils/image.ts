/**
 * 图片工具 — iOS ATS 兼容处理
 *
 * 背景：微信小程序在 iOS WKWebView 下，<image> 组件加载 HTTP 图片会被 ATS 拦截，
 * 必须先通过 wx.request 下载为 ArrayBuffer，再转为 base64 data URL 才能正常显示。
 */

// ==================== 图片 URL 兼容（iOS ATS） ====================

/**
 * 将网络图片转为 base64，用于 iOS 图片回显等场景
 * 使用 wx.request 直接请求，避免经过 axios 的 StandardResponse 拦截逻辑
 * @param url 图片完整 URL
 * @returns Promise<data:image/xxx;base64,xxx> 格式的 base64 字符串
 */
function urlToBase64(url: string): Promise<string> {
  if (!url || typeof url !== 'string') {
    return Promise.reject(new Error('url 不能为空'))
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'GET',
      responseType: 'arraybuffer',
      success: (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`请求失败: ${res.statusCode}`))
          return
        }
        const arrayBuffer = res.data as ArrayBuffer
        const base64 = wx.arrayBufferToBase64(arrayBuffer)
        const ext = (url.match(/\.(jpg|jpeg|png|gif|webp)/i) || ['', 'png'])[1]
        resolve(`data:image/${ext};base64,${base64}`)
      },
      fail: (err) => reject(err),
    })
  })
}

/**
 * 获取图片显示用的 URL，仅在 HTTP + iOS/Mac 时转为 base64 以解决 ATS 回显问题
 * - HTTPS 链接：任何平台均直接返回原始 URL
 * - HTTP 链接 + iOS/Mac：转为 base64
 * - HTTP 链接 + 其他平台：直接返回原始 URL
 * @param url 完整的图片 URL（必须是 http:// 或 https:// 开头）
 * @returns Promise<string> 返回可用的 url（网络链接或 base64 字符串）
 */
async function getImageDisplayUrl(url: string): Promise<string> {
  const isFullUrl = /^https?:\/\//i.test(url)
  if (!isFullUrl) {
    console.warn(
      '[getImageDisplayUrl] 传入的不是完整 URL，请传入 http:// 或 https:// 开头的完整链接',
    )
    return url
  }

  const app: IAppOption = getApp()
  const { clientPlatform } = app.globalData.platformInfo.software

  const isHttp = /^http:\/\//i.test(url)
  const isIosOrMac = clientPlatform === 'ios' || clientPlatform === 'mac'

  if (isHttp && isIosOrMac) {
    return urlToBase64(url).catch(() => url)
  }

  return url
}

export { urlToBase64, getImageDisplayUrl }
