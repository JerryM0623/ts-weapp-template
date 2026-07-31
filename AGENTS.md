# CLAUDE.md

This file provides guidance to AI Coding Agent when working with code in this repository.

## 项目概况

微信小程序 TypeScript 模板 — 基于 TypeScript + SASS 的小程序开发脚手架，集成 TDesign 组件库、axios-miniprogram 网络请求、crypto-js AES 加密等。

## 常用命令

```bash
# 安装依赖（需要 pnpm）
pnpm install

# ESLint 检查
pnpm lint

# ESLint 自动修复
pnpm lint:fix

# Prettier 格式化
pnpm format

# Prettier 格式检查
pnpm format:check
```

**微信开发者工具操作：**

- 修改 `package.json` 依赖后，需在微信开发者工具中执行「工具 → 构建 npm」
- TypeScript 和 SASS 编译由微信开发者工具内置编译器完成（无独立构建命令）
- 开发时在微信开发者工具中点击「编译」即可预览

## 技术栈

| 类别     | 技术                                                                 |
| -------- | -------------------------------------------------------------------- |
| 语言     | TypeScript (ES2020 target, CommonJS module)                          |
| 样式     | SASS/SCSS（通过 `project.config.json` 的 `useCompilerPlugins` 启用） |
| UI 组件  | TDesign Miniprogram v1.12+                                           |
| HTTP     | axios-miniprogram v2.7+                                              |
| 加密     | crypto-js v4.2+                                                      |
| 包管理   | pnpm                                                                 |
| 代码规范 | ESLint 9 + TypeScript ESLint + Prettier                              |

## 项目架构

```
miniprogram/
├── app.ts              # 入口：计算导航栏/安全区尺寸、初始化 platformInfo 到 globalData
├── app.json            # 页面注册、自定义 TabBar、navigationStyle: "custom"
├── app.scss            # 全局样式重置
├── api/                # API 接口层（每接口一个文件 + types.ts 定义 StandardResponse<T>）
├── components/         # 共享组件（目前仅有 root-page-layout）
├── custom-tab-bar/     # 自定义 TabBar（基于 TDesign t-tab-bar）
├── pages/              # 页面（index, login, date, one~four）
├── utils/
│   ├── request.ts      # axios-miniprogram 封装：Token 注入、loading 管理、401 跳转
│   ├── aes.ts          # AES-256-CBC 加密/解密 + URL Safe Base64 变体
│   ├── util.ts         # 日期格式化（formatTime / formatDateTime）
│   ├── image.ts         # 图片 URL 兼容（iOS ATS http→base64）
│   └── platform.ts     # 微信宿主平台信息检测（设备类别/操作系统/桌面or移动）
└── miniprogram_npm/    # 微信开发者工具构建的 npm 产物（已 gitignore，不直接编辑）
typings/                # 全局类型声明（IAppOption、PlatformInfoType 等）+ 微信 API 类型
```

## 内置工具模块

所有工具位于 `miniprogram/utils/`，均有对应的详细文档：

| 模块 | 文件 | 文档 | 用途 |
|------|------|------|------|
| 网络请求 | `request.ts` | `docs/request.md` | axios-miniprogram 封装，Token 注入、loading 管理、401 跳转、`upload()` |
| AES 加解密 | `aes.ts` | `docs/aes.md` | AES-256-CBC，`Encrypt`/`Decrypt`/`BASE64Encrypt`/`BASE64Decrypt` |
| 图片工具 | `image.ts` | `docs/image.md` | iOS ATS 兼容，HTTP 图片自动转 base64，`getImageDisplayUrl`/`urlToBase64` |
| 日期格式化 | `util.ts` | `docs/util.md` | `formatTime`/`formatDateTime`，支持多输入类型和自定义模板 |
| 平台检测 | `platform.ts` | — | `getPlatformInfo()`，启动时调用，结果存入 `globalData.platformInfo` |

所有组件文档：

| 组件 | 目录 | 文档 | 用途 |
|------|------|------|------|
| RootPageLayout | `components/root-page-layout/` | `docs/root-page-layout.md` | 页面容器，封装 TDesign Navbar，自动返回按钮逻辑、安全区适配 |
| 自定义 TabBar | `custom-tab-bar/` | `docs/custom-tab-bar.md` | 基于 TDesign t-tab-bar，需在 TabBar 页 `onShow` 中调用 `init()` |

## 核心架构决策

### 自定义导航栏

`app.json` 中 `window.navigationStyle: "custom"` 全局关闭了原生导航栏。所有需要导航栏的页面必须使用 `root-page-layout` 组件（封装 TDesign `t-navbar`），该组件自动根据页面栈深度决定是否显示返回按钮。

### 网络请求模式

所有 API 调用遵循统一模式：

1. `api/types.ts` 定义 `StandardResponse<T>` 结构（`{ code, data, message }`）
2. 每个 API 模块从 `utils/request` 导入 axios 实例，定义请求函数
3. 请求拦截器自动注入 `Authorization` header（从 `app.globalData.token` 读取），白名单接口除外
4. 响应拦截器在 `code === 200` 时自动解包返回 `result.data`，401 时 `reLaunch` 到登录页
5. 并发请求的 loading 动画通过计数器管理（`netWorkNum`），避免闪烁

### GlobalData 结构

`app.globalData` 在 `onLaunch` 中初始化以下数据：

- **UI 布局数据**：`navBarHeight`、`navBarContentHeight`、`statusBarHeight`、`menuRight`、`menuTop`、`menuHeight`、`safeAreaBottom`、`safeAreaInsetBottom` — 通过 `wx.getMenuButtonBoundingClientRect()` 和 `wx.getWindowInfo()` 计算
- **平台信息**：`platformInfo` — 通过 `utils/platform.ts` 的 `getPlatformInfo()` 获取，包含 hardware、software、isMobile、isDesktop、isDevtools
- **认证**：`token`（登录成功后由业务代码设置）

类型定义位于 `typings/index.d.ts` 的 `IAppOption` 接口。

### 自定义 TabBar

- `app.json` 中 `tabBar.custom: true` 启用自定义 TabBar
- 组件位于 `miniprogram/custom-tab-bar/`，基于 TDesign `t-tab-bar`
- TabBar 页面必须在 `onShow` 中调用 `this.getTabBar().init()` 同步激活状态
- `app.json` 的 `tabBar.list` 和 `custom-tab-bar/index.ts` 的 `data.list` 需保持配置一致

### SASS 全局注入

`project.config.json` 中通过 `sassSetting` 配置了 `sassCommonUseFilePath: "global.sass"` 和 `scssCommonUseFilePath: "global.scss"`，微信开发者工具会自动将这些全局文件注入每个 SCSS/SASS 文件。当前 miniprogram 根目录下尚无 `global.scss` / `global.sass` 文件，需手动创建后使用。

### 无独立构建系统

本项目不依赖 Webpack/Vite 等构建工具。TypeScript 和 SASS 编译由微信开发者工具的 SWC 编译器内置完成（`project.config.json` 中 `swc: true`）。ESLint/Prettier 仅用于代码质量检查，不参与编译流程。

## 关键约定

- **npm 镜像**：`.npmrc` 配置了 npmmirror.com 镜像和 node-sass 二进制镜像
- **代码风格**：分号关闭、单引号、100 字符宽度、2 空格缩进、LF 换行
- **ESLint**：`no-console` 为 warn 级别（仅允许 `console.warn` 和 `console.error`），`@typescript-eslint/no-explicit-any` 为 warn
- **路径别名**：无路径别名 — 所有 import 使用相对路径
- **微信基础库版本**：`libVersion: "3.14.1"`（`project.config.json`），`3.17.0`（`project.private.config.json`）
- **npm 构建模式**：手动模式（`packNpmManually: true`），npm 包输出到 `miniprogram/` 目录
- **Git 忽略**：`miniprogram/miniprogram_npm/`、`project.private.config.json`、`*.js.map` 等不纳入版本控制

## 类型系统

全局类型通过 `typings/index.d.ts` 的三斜线指令引入，定义了：

- `IAppOption` — App 实例类型（含 `globalData` 完整结构）
- `PlatformInfoType` / `HardwarePlatformInfoType` / `SoftwarePlatformInfoType` — 平台信息层级类型
- `ClientPlatformType` / `OperatingSystemType` / `HardwareDeviceClassType` — 联合类型
- 微信小程序 API 类型位于 `typings/types/wx/` 目录
