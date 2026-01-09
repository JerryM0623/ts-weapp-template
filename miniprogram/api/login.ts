import request from '../utils/request'
import { StandardResponse } from './types'

/**
 * 登录接口请求参数类型
 */
export interface LoginParams {
  userName: string
  password: string
}

/**
 * 用户信息数据类型
 */
export interface UserInfoData {
  id: number
  username: string
  nickname: string
  avatar: string
  email: string
  phone: string
}

/**
 * 登录接口
 * @param params 登录参数
 * @returns 返回标准响应格式的登录数据
 */
export const loginReq = (params: LoginParams) => {
  return request.post<StandardResponse<UserInfoData>>('/wechatLogin/wechatLogin.action', params)
}
