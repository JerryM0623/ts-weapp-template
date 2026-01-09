/**
 * 标准响应数据格式
 */
export interface StandardResponse<T = unknown> {
  code: number
  data: T
  message: string
}
