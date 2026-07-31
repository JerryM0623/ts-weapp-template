# 图片 URL 兼容工具（iOS ATS）

解决微信小程序在 iOS/Mac WKWebView 下 HTTP 图片因 ATS 限制无法加载的问题，位于 `miniprogram/utils/image.ts`。

## 背景

微信小程序在 iOS/Mac 平台的 WKWebView 下，`<image>` 组件加载 HTTP 图片会被 ATS（App Transport Security）拦截，必须通过 HTTPS 才能远程渲染。本工具自动判断当前平台和协议，对 HTTP 图片在 iOS/Mac 下通过 `wx.request` 下载后转为 base64 data URL，确保图片正常显示。

## 主要功能

- 自动检测当前设备平台（读取 `app.globalData.platformInfo`），仅在 iOS/Mac 下对 HTTP 图片触发 base64 转码
- HTTPS 链接和非 iOS/Mac 平台直接返回原始 URL，零额外开销
- 非完整 URL（不以 `http://` 或 `https://` 开头）会 `console.warn` 提示后原样返回
- `urlToBase64` 使用 `wx.request` + `arraybuffer`，不经过 axios 拦截器

## 使用示例

```typescript
import { getImageDisplayUrl, urlToBase64 } from '../utils/image'

// 推荐：直接获取可用于 <image> 显示的 URL（自动判断是否需要转 base64）
const displayUrl = await getImageDisplayUrl('http://example.com/photo.jpg')

// 或手动将任意图片转为 base64
const base64 = await urlToBase64('https://example.com/photo.jpg')
```
