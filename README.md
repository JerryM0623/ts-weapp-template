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
│   │   └── util.ts         # 其他工具函数
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

### 网络请求封装

项目提供了基于 `axios-miniprogram` 的请求封装，位于 `miniprogram/utils/request.ts`。

**主要特性：**

- 自动添加 Authorization 请求头（支持白名单配置）
- 统一的响应格式处理（标准格式：`{ code, data, message }`）
- 智能加载动画管理（支持并发请求计数）
- 401 未授权自动跳转登录页
- 完整的 TypeScript 类型支持
- 文件上传功能封装

**使用示例：**

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

### AES 加密解密工具

项目提供了完整的 AES-256 加密解密工具，位于 `miniprogram/utils/aes.ts`。

**主要功能：**

- 标准 AES-256-CBC 加密解密
- URL Safe Base64 格式支持
- 完整的错误处理和类型校验
- 自定义密钥和 IV 支持

**使用示例：**

```typescript
import { Encrypt, Decrypt, BASE64Encrypt, BASE64Decrypt } from '../utils/aes'

// 标准加密解密
const encrypted = Encrypt('hello world')
const decrypted = Decrypt(encrypted)

// URL Safe Base64 加密解密
const urlSafeEncrypted = BASE64Encrypt('hello world')
const urlSafeDecrypted = BASE64Decrypt(urlSafeEncrypted)

// 自定义密钥和 IV
const customEncrypted = Encrypt('hello world', 'your-key-32-bytes-long', 'your-iv-16-bytes')
```

### 时间日期格式化工具

项目提供了灵活的时间日期格式化工具，位于 `miniprogram/utils/util.ts`。

**主要功能：**

- 支持 Date 对象、时间戳、日期字符串等多种输入格式
- 自定义格式化模板，支持丰富的占位符
- 兼容中文日期格式（如 "2020年1月1日"）
- 兼容 iOS/Safari 日期解析问题
- 支持 12/24 小时制转换
- 支持毫秒显示

**使用示例：**

```typescript
import { formatTime, formatDateTime } from '../utils/util'

// 标准格式：YYYY/MM/DD HH:mm:ss
const time1 = formatTime(new Date())
// 输出：2024/01/15 14:30:45

// 自定义格式
const time2 = formatDateTime(new Date(), 'YYYY-MM-DD HH:mm:ss')
// 输出：2024-01-15 14:30:45

// 只显示日期
const date = formatDateTime(new Date(), 'YYYY年MM月DD日')
// 输出：2024年01月15日

// 12小时制
const time12 = formatDateTime(new Date(), 'YYYY/MM/DD hh:mm:ss A')
// 输出：2024/01/15 02:30:45 下午

// 时间戳格式化
const timestamp = formatDateTime(1705291845000, 'YYYY-MM-DD HH:mm')
// 输出：2024-01-15 14:30

// 字符串日期格式化
const strDate = formatDateTime('2024-01-15', 'YYYY年MM月DD日')
// 输出：2024年01月15日
```

**支持的占位符：**

- `YYYY`: 4位年份
- `YY`: 2位年份
- `MM`: 2位月份
- `M`: 1位月份
- `DD`: 2位日期
- `D`: 1位日期
- `HH`: 2位小时(24小时制)
- `H`: 1位小时(24小时制)
- `hh`: 2位小时(12小时制)
- `h`: 1位小时(12小时制)
- `mm`: 2位分钟
- `m`: 1位分钟
- `ss`: 2位秒
- `s`: 1位秒
- `SSS`: 3位毫秒
- `A`: 上午/下午
- `a`: 上午/下午(小写)

### PageContainer 页面容器组件

项目提供了基于 TDesign Navbar 封装的页面容器组件，位于 `miniprogram/components/page-container/` 目录。

**主要特性：**

- 基于 TDesign Navbar 组件，提供统一的导航栏和内容区域布局
- 自动判断返回按钮显示（根据页面栈深度）
- 支持安全区域适配，适配不同设备
- 支持自定义导航栏样式和插槽内容
- 完整的返回事件回调支持

详细使用说明请参考 [PageContainer 组件使用手册](docs/page-container.md)。

### 自定义 TabBar

项目提供了基于 TDesign 组件的自定义 TabBar 实现，位于 `miniprogram/custom-tab-bar/` 目录。

**主要特性：**

- 基于 TDesign 的 `t-tab-bar` 和 `t-tab-bar-item` 组件，样式统一美观
- 自动状态同步，根据当前页面路由自动更新激活状态
- 支持页面切换，点击 TabBar 项自动跳转到对应页面
- 完整的 TypeScript 类型支持
- 易于扩展和自定义

**配置说明：**

1. **在 `app.json` 中启用自定义 TabBar：**

```json
{
  "tabBar": {
    "custom": true,
    "color": "#000000",
    "selectedColor": "#000000",
    "backgroundColor": "#000000",
    "list": [
      {
        "pagePath": "pages/one/index",
        "text": "页面一"
      },
      {
        "pagePath": "pages/two/index",
        "text": "页面二"
      },
      {
        "pagePath": "pages/three/index",
        "text": "页面三"
      },
      {
        "pagePath": "pages/four/index",
        "text": "页面四"
      }
    ]
  }
}
```

2. **TabBar 组件配置：**

在 `miniprogram/custom-tab-bar/index.ts` 中配置 TabBar 项：

```typescript
data: {
  value: 'label_1',
  list: [
    { value: 'label_1', label: '首页', icon: 'home', pagePath: '/pages/one/index' },
    { value: 'label_2', label: '应用', icon: 'app', pagePath: '/pages/two/index' },
    { value: 'label_3', label: '聊天', icon: 'chat', pagePath: '/pages/three/index' },
    { value: 'label_4', label: '我的', icon: 'user', pagePath: '/pages/four/index' },
  ],
}
```

**在 TabBar 页面中使用：**

每个 TabBar 页面需要在 `onShow` 生命周期中调用 `init()` 方法来同步 TabBar 状态：

```typescript
Page({
  onShow() {
    // 同步 TabBar 激活状态
    this.getTabBar().init()
  },
})
```

**自定义 TabBar 项：**

如需添加或修改 TabBar 项，请按以下步骤操作：

1. 在 `miniprogram/custom-tab-bar/index.ts` 的 `data.list` 数组中添加或修改配置项
2. 在 `miniprogram/app.json` 的 `tabBar.list` 数组中同步更新配置
3. 确保对应的页面已创建并在 `app.json` 的 `pages` 数组中注册

**支持的图标类型：**

TDesign TabBar 组件支持多种内置图标，常用的有：`home`、`app`、`chat`、`user`、`setting` 等。更多图标类型请参考 [TDesign 图标文档](https://tdesign.tencent.com/miniprogram/components/tab-bar)。

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
