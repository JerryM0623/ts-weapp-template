/**
 * 网络请求封装 - 基于 axios-miniprogram
 *
 * 功能特性：
 * - 自动添加 Token
 * - 统一错误处理
 * - 智能加载动画管理
 * - 完整的 TypeScript 类型支持
 * - 文件上传功能
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios-miniprogram'
import type { StandardResponse } from '../api/types'

// ==================== 类型定义 ====================

/**
 * 自定义请求配置接口
 * 扩展 axios 的请求配置，添加自定义参数
 */
interface CustomRequestConfig extends AxiosRequestConfig {
  loading?: boolean // 是否显示加载提示，默认 true
  upload?: boolean // 是否为上传请求
}

/**
 * 文件上传配置接口
 */
interface UploadOptions {
  apiUrl: string // 接口路径
  filePath: string // 文件本地路径
  name?: string // 文件对应的 key，默认 'file'
  formData?: Record<string, unknown> // 额外参数
  loading?: boolean // 是否显示加载提示，默认 true
  onUploadProgress?: (event: unknown) => void // 上传进度回调
}

// ==================== 基础配置 ====================

// 配置 baseURL
axios.defaults.baseURL = '你的后端域名'

// 配置超时时间（30秒）
axios.defaults.timeout = 30000

// 配置默认请求头
axios.defaults.headers.common['Content-Type'] = 'application/json'

// ==================== 请求白名单 ====================

/**
 * 请求白名单
 * 白名单内的接口不需要添加 Authorization 请求头
 * 例如：登录接口、注册接口等
 */
const requestWhiteList: string[] = []

// ==================== 加载动画管理 ====================

/**
 * 网络请求计数器
 * 用于管理多个并发请求的加载状态
 */
let netWorkNum = 0

/**
 * 开启加载动画
 * 使用计数器机制，防止多个请求导致的 loading 闪烁
 * @param title 加载提示文字
 */
function startLoading(title: string) {
  if (netWorkNum === 0) {
    wx.showLoading({
      title: title,
      mask: true,
    })
  }
  netWorkNum++
}

/**
 * 关闭加载动画
 * 延迟 500ms 关闭，确保用户体验
 */
function endLoading() {
  netWorkNum--
  setTimeout(() => {
    if (netWorkNum === 0) {
      wx.hideLoading()
      wx.stopPullDownRefresh() // 停止当前页面下拉刷新
    }
  }, 500)
}

// ==================== 请求拦截器 ====================

axios.interceptors.request.use(
  (config: CustomRequestConfig) => {
    // 加载提示
    if (config.loading ?? true) {
      startLoading('请稍等...')
    }

    // Content-Type 设置
    // 注意：上传文件时 axios 会自动设置正确的 Content-Type
    if (config.headers && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }

    // Token 自动注入（非白名单接口）
    if (!requestWhiteList.includes(config.url || '')) {
      const app = getApp<IAppOption>()
      if (app.globalData.token && config.headers) {
        config.headers['Authorization'] = app.globalData.token
      }
    }

    // 详细日志记录
    /* eslint-disable no-console */
    console.log('============发送请求 start============')
    console.log(`[${new Date().toISOString()}] [INFO] 请求地址: ${config.baseURL}${config.url}`)
    console.log(`[${new Date().toISOString()}] [INFO] 请求方式: ${config.method?.toUpperCase()}`)
    console.log(`[${new Date().toISOString()}] [INFO] 上传模式: ${config.upload ? '是' : '否'}`)
    console.log(`[${new Date().toISOString()}] [INFO] params参数: ${JSON.stringify(config.params)}`)
    console.log(`[${new Date().toISOString()}] [INFO] data参数: ${JSON.stringify(config.data)}`)
    console.log('============发送请求 end============')
    /* eslint-enable no-console */

    return config
  },
  (error) => {
    // 请求错误处理
    endLoading()
    return Promise.reject(error)
  },
)

// ==================== 响应拦截器 ====================

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 关闭加载动画
    const config = response.config as CustomRequestConfig
    if (config.loading ?? true) {
      endLoading()
    }

    // 标准格式：{ code, data, message }
    const result = response.data as StandardResponse

    if (result.code === 200) {
      // 只返回 data 字段（修改 response.data 为提取后的 data）
      return { ...response, data: result.data } as unknown as AxiosResponse
    } else {
      // 业务错误处理
      wx.showToast({
        title: result.message || '请求失败',
        icon: 'none',
      })
      return Promise.reject(new Error(result.message))
    }
  },
  (error: unknown) => {
    // 关闭加载动画
    const axiosError = error as {
      config?: CustomRequestConfig
      response?: AxiosResponse
      message?: string
    }
    const config = axiosError.config
    if (config?.loading ?? true) {
      endLoading()
    }

    // 401 未授权，跳转登录页
    if (axiosError.response?.status === 401) {
      wx.showToast({
        title: '未授权，请重新登录',
        icon: 'none',
      })
      wx.reLaunch({
        url: '/pages/login/login',
      })
      return Promise.reject(error)
    }

    // 统一错误提示
    const errorData = axiosError.response?.data as StandardResponse | undefined
    const message = errorData?.message || errorData?.data || axiosError.message || '网络请求失败'

    wx.showToast({
      title: message as string,
      icon: 'none',
    })

    return Promise.reject(error)
  },
)

// ==================== 文件上传封装 ====================

/**
 * 文件上传函数
 * 基于 axios-miniprogram 内置的 upload 功能
 * @param options 上传配置
 * @returns Promise<T> 返回 data 字段的类型
 */
function upload<T = unknown>(options: UploadOptions): Promise<T> {
  const {
    apiUrl,
    filePath,
    name = 'file',
    formData = {},
    loading = true,
    onUploadProgress,
  } = options

  return axios({
    url: apiUrl,
    method: 'POST',
    upload: true, // 启用上传模式
    data: {
      name, // 文件对应的 key
      filePath, // 要上传文件资源的路径
      ...formData, // 额外的 formData 属性
    },
    loading, // 自定义 loading 参数（会被拦截器识别）
    onUploadProgress, // 上传进度回调
  } as CustomRequestConfig).then((res) => res.data as T)
}

// ==================== 导出接口 ====================

// 默认导出 axios 实例（支持完整的泛型类型推导）
export default axios

// 命名导出 upload 函数（支持泛型）
export { upload }
