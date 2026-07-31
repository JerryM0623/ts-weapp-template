# 微信小程序 TypeScript 模板

一个基于 TypeScript 和 SASS 的微信小程序开发模板，集成了 TDesign 组件库、网络请求封装、AES 加密工具等常用功能，开箱即用。

## 技术栈

- **开发语言**: TypeScript
- **样式预处理**: SASS/SCSS
- **UI 组件库**: TDesign Miniprogram (v1.12.1)
- **网络请求**: axios-miniprogram (v2.7.2)
- **加密工具**: crypto-js (v4.2.0)
- **代码规范**: ESLint + Prettier
- **构建工具**: 微信开发者工具

## 功能特性

- 完整的 TypeScript 类型支持，提供更好的开发体验和代码提示
- 基于 axios-miniprogram 的网络请求封装，支持自动 Token 注入、统一错误处理、智能加载动画管理
- AES-256 加密解密工具，支持标准 Base64 和 URL Safe Base64 两种格式
- 图片 URL 兼容工具，自动处理 iOS WKWebView 下 HTTP 图片无法加载的问题（ATS 限制），按需转 base64
- 集成 TDesign 组件库，提供丰富的 UI 组件
- 自定义 TabBar 实现，基于 TDesign 组件，支持自动状态同步和页面切换
- 完善的代码规范配置，支持 ESLint 和 Prettier 自动格式化
- 请求拦截器和响应拦截器，统一处理认证、错误和加载状态
- 文件上传功能封装，支持上传进度回调
- 小程序启动时自动计算导航栏、状态栏、安全区域等尺寸信息，便于适配不同设备

## 快速开始

### 环境要求

- Node.js >= 18
- 微信开发者工具（最新版本）
- pnpm

### 安装步骤

- 克隆或下载项目到本地

  ```bash
  # 使用 HTTPS
  git clone https://github.com/JerryM0623/ts-weapp-template.git

  # 或使用 SSH
  git clone git@github.com:JerryM0623/ts-weapp-template.git
  ```

- 配置项目
  - 打开 `project.config.json`，修改 `appid` 为你的小程序 AppID
  - 打开 `miniprogram/utils/request.ts`，修改 `baseURL` 为你的后端 API 地址

- 安装依赖

  ```bash
  pnpm install
  ```

- 构建 npm 包

  在微信开发者工具中：
  - 点击菜单栏「工具」-> 「构建 npm」
  - 等待构建完成

- 编译运行

  在微信开发者工具中点击「编译」按钮，即可预览小程序。

## 项目结构

```
ts-weapp-template/
├── miniprogram/              # 小程序源码目录
│   ├── api/                  # API 接口定义
│   │   ├── login.ts         # 登录接口示例
│   │   └── types.ts         # 类型定义
│   ├── components/          # 自定义组件目录
│   ├── custom-tab-bar/      # 自定义 TabBar 组件
│   │   ├── index.ts        # TabBar 组件逻辑
│   │   ├── index.wxml      # TabBar 模板
│   │   ├── index.json      # TabBar 配置
│   │   └── index.scss      # TabBar 样式
│   ├── pages/               # 页面目录
│   │   ├── index/          # 首页
│   │   ├── login/          # 登录页
│   │   ├── date/           # 日期页
│   │   ├── one/            # TabBar 页面一
│   │   ├── two/            # TabBar 页面二
│   │   ├── three/          # TabBar 页面三
│   │   └── four/           # TabBar 页面四
│   ├── utils/              # 工具函数
│   │   ├── request.ts      # 网络请求封装
│   │   ├── aes.ts          # AES 加密解密工具
│   │   ├── image.ts        # 图片 URL 兼容工具
│   │   ├── util.ts         # 日期格式化工具
│   │   └── platform.ts     # 平台信息检测
│   ├── app.ts              # 小程序入口文件
│   ├── app.json            # 小程序配置文件
│   └── app.scss            # 全局样式
├── typings/                # TypeScript 类型定义
├── project.config.json     # 项目配置文件
├── tsconfig.json           # TypeScript 配置
├── package.json            # 项目依赖配置
└── README.md              # 项目说明文档
```

## 核心功能说明

本模板内置了以下工具和组件，方便开发者进行小程序业务的开发：

| 工具 / 组件 | 说明 | 文档 |
|------------|------|------|
| 网络请求封装 | 基于 axios-miniprogram，Token 注入、loading 管理、401 跳转、文件上传 | [查看文档](docs/request.md) |
| AES 加密解密 | AES-256-CBC 加密解密，支持标准 Base64 和 URL Safe Base64 | [查看文档](docs/aes.md) |
| 图片 URL 兼容 | iOS WKWebView 下 HTTP 图片因 ATS 无法加载的自动转 base64 方案 | [查看文档](docs/image.md) |
| 日期时间格式化 | 多输入格式兼容、自定义模板、iOS 日期解析修复 | [查看文档](docs/util.md) |
| RootPageLayout 组件 | 基于 TDesign Navbar 的页面容器，自动返回按钮、安全区适配 | [查看文档](docs/root-page-layout.md) |
| 自定义 TabBar | 基于 TDesign 的自定义 TabBar，路由同步、状态管理 | [查看文档](docs/custom-tab-bar.md) |

## 开发指南

### 代码规范

项目已配置 ESLint 和 Prettier，建议在提交代码前运行以下命令：

```bash
# 检查代码规范
pnpm lint

# 自动修复代码规范问题
pnpm lint:fix

# 格式化代码
pnpm format

# 检查代码格式
pnpm format:check
```

### 添加新页面

1. 在 `miniprogram/pages/` 目录下创建新页面文件夹
2. 创建页面文件：`index.ts`、`index.wxml`、`index.scss`、`index.json`
3. 在 `miniprogram/app.json` 的 `pages` 数组中添加页面路径

**注意：** 如果新页面是 TabBar 页面，还需要：

- 在 `app.json` 的 `tabBar.list` 数组中添加配置
- 在 `miniprogram/custom-tab-bar/index.ts` 的 `data.list` 数组中添加配置
- 在页面的 `onShow` 生命周期中调用 `this.getTabBar().init()` 同步状态

### 添加新 API

1. 在 `miniprogram/api/` 目录下创建或编辑对应的 API 文件
2. 定义请求参数和响应数据类型
3. 使用 `request` 工具发送请求

示例：

```typescript
import request from '../utils/request'
import { StandardResponse } from './types'

export interface UserInfo {
  id: number
  name: string
}

export const getUserInfo = (id: number) => {
  return request.get<StandardResponse<UserInfo>>(`/api/user/${id}`)
}
```

### 使用 TDesign 组件

1. 在页面的 `json` 配置文件中引入组件：

```json
{
  "usingComponents": {
    "t-button": "tdesign-miniprogram/button/button"
  }
}
```

2. 在 `wxml` 中使用组件：

```xml
<t-button theme="primary">按钮</t-button>
```

更多组件使用方式请参考 [TDesign 小程序文档](https://tdesign.tencent.com/miniprogram/overview)。

## 注意事项

1. **AppID 配置**: 开发前请务必在 `project.config.json` 中配置正确的 AppID
2. **API 地址配置**: 请在 `miniprogram/utils/request.ts` 中配置正确的 `baseURL`
3. **Token 管理**: Token 存储在 `app.globalData.token` 中，登录成功后需要手动设置
4. **请求白名单**: 不需要认证的接口需要在 `request.ts` 的 `requestWhiteList` 数组中配置
5. **加密密钥**: 默认的 AES 密钥和 IV 仅用于开发测试，生产环境请务必修改
6. **npm 构建**: 修改 `package.json` 中的依赖后，需要在微信开发者工具中重新构建 npm
7. **自定义 TabBar**: TabBar 页面必须在 `onShow` 生命周期中调用 `this.getTabBar().init()` 来同步 TabBar 状态，否则可能出现状态不同步的问题
8. **TabBar 配置一致性**: 确保 `app.json` 的 `tabBar.list` 和 `custom-tab-bar/index.ts` 的 `data.list` 配置保持一致，包括页面路径和顺序

## 许可证

请查看 [LICENSE](LICENSE) 文件了解详情。
