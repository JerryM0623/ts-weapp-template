# 网络请求封装

基于 `axios-miniprogram` 的网络请求封装，位于 `miniprogram/utils/request.ts`。

## 主要特性

- 自动添加 Authorization 请求头（支持白名单配置）
- 统一的响应格式处理（标准格式：`{ code, data, message }`）
- 智能加载动画管理（支持并发请求计数）
- 401 未授权自动跳转登录页
- 完整的 TypeScript 类型支持
- 文件上传功能封装

## 使用示例

```typescript
import request from '../utils/request'

// GET 请求
const data = await request.get('/api/user/info')

// POST 请求
const result = await request.post('/api/user/update', { name: '张三' })

// 禁用加载动画
const data = await request.get('/api/user/info', { loading: false })

// 文件上传
import { upload } from '../utils/request'
const result = await upload({
  apiUrl: '/api/upload',
  filePath: 'tempFilePath',
  name: 'file',
  formData: { userId: 123 },
})
```

## 注意事项

1. **API 地址配置**: 请在 `request.ts` 中配置正确的 `baseURL`
2. **Token 管理**: Token 存储在 `app.globalData.token` 中，登录成功后需要手动设置
3. **请求白名单**: 不需要认证的接口需要在 `request.ts` 的 `requestWhiteList` 数组中配置
4. 响应拦截器在 `code === 200` 时自动解包返回 `result.data`，调用方直接拿到业务数据
5. 并发请求的 loading 动画通过计数器管理，避免闪烁
