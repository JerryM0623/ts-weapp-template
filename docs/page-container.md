# PageContainer 组件使用手册

## 概述

PageContainer 是一个基于 TDesign `t-navbar` 封装的页面容器组件，提供统一的导航栏与内容区域布局。组件内部已引入 `t-navbar`，并通过样式变量透传导航栏与容器背景配置，适用于需要自定义导航栏的页面。

## 功能特性

- 基于 TDesign Navbar 组件，样式统一美观
- 根据页面栈深度与属性配置，自动计算返回按钮显示
- 支持安全区域适配（顶部安全区由 `t-navbar` 处理，底部安全区由容器处理）
- 支持固定导航栏和占位符
- 支持自定义导航栏样式（背景色、文本颜色）
- 支持自定义内容区域背景色
- 提供多个插槽支持自定义导航栏内容与页面内容
- 支持返回事件回调

## 引入组件

在页面的 `json` 配置文件中引入组件：

```json
{
  "usingComponents": {
    "page-container": "../../components/page-container/page-container"
  }
}
```

## 基础用法

### 最简单的用法

```xml
<page-container nav-bar-title="页面标题">
  <view>页面内容</view>
</page-container>
```

### 自定义导航栏样式

```xml
<page-container
  nav-bar-title="页面标题"
  nav-bar-background-color="#123321"
  nav-bar-text-color="#ffffff"
>
  <view>页面内容</view>
</page-container>
```

### 隐藏返回按钮

```xml
<page-container nav-bar-title="页面标题" nav-bar-left-arrow="{{false}}">
  <view>页面内容</view>
</page-container>
```

### 隐藏导航栏

```xml
<page-container nav-bar-title="页面标题" nav-bar-visible="{{false}}">
  <view>页面内容</view>
</page-container>
```

### 关闭底部安全区适配

```xml
<page-container
  nav-bar-title="页面标题"
  container-safe-area-inset-bottom="{{false}}"
>
  <view>页面内容</view>
</page-container>
```

## 样式与主题

### 容器背景色

组件通过样式变量 `--pg-container-bg-color` 设置容器背景色，对应属性 `containerBackgroundColor`。

### 导航栏颜色

组件通过 `t-navbar` 的样式变量设置导航栏颜色：

- `--td-navbar-bg-color`：对应 `navBarBackgroundColor`
- `--td-navbar-color`：对应 `navBarTextColor`

## 属性说明

### 导航栏相关

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| navBarTitle | String | '' | 导航栏标题 |
| navBarLeftArrow | Boolean | true | 是否显示返回按钮 |
| navBarFixed | Boolean | true | 导航栏是否固定 |
| navBarPlaceholder | Boolean | true | 导航栏占位 |
| navBarSafeAreaInsetTop | Boolean | true | 是否适配安全区域顶部 |
| navBarZIndex | Number | 10000 | 导航栏层级 |
| navBarAnimation | Boolean | true | 是否带动画效果 |
| navBarTitleMaxLength | Number | undefined | 标题最大长度，超出用 "…" 表示 |
| navBarVisible | Boolean | true | 是否显示导航栏 |
| navBarBackgroundColor | String | '#ffffff' | 导航栏背景色 |
| navBarTextColor | String | '#000000' | 导航栏文本颜色（标题、返回按钮等） |

### 内容容器相关

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| containerSafeAreaInsetBottom | Boolean | true | 是否开启底部安全区适配 |
| containerBackgroundColor | String | '#f5f5f5' | 内容区域背景色 |

## 插槽说明

组件提供导航栏插槽与默认插槽，用于自定义页面内容布局。

### 默认插槽

默认插槽用于渲染页面主体内容（位于内容区域 `page-container__content` 内）：

```xml
<page-container nav-bar-title="页面标题">
  <view>页面内容</view>
</page-container>
```

### left 插槽

自定义左侧内容（返回按钮区域）：

```xml
<page-container nav-bar-title="页面标题">
  <view slot="left">自定义左侧内容</view>
  <view>页面内容</view>
</page-container>
```

### capsule 插槽

自定义胶囊区域内容：

```xml
<page-container nav-bar-title="页面标题">
  <view slot="capsule">自定义胶囊内容</view>
  <view>页面内容</view>
</page-container>
```

### title 插槽

自定义标题区域内容：

```xml
<page-container nav-bar-title="页面标题">
  <view slot="title">自定义标题内容</view>
  <view>页面内容</view>
</page-container>
```

## 事件说明

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| success | `wx.navigateBack` 成功时触发 | `event.detail`（navigateBack 成功回调参数） |
| fail | `wx.navigateBack` 失败时触发 | `event.detail`（navigateBack 失败回调参数） |
| complete | `wx.navigateBack` 完成时触发（无论成功或失败） | `event.detail`（success/fail 的参数之一） |

### 事件使用示例

```xml
<page-container
  nav-bar-title="页面标题"
  bind:success="onBackSuccess"
  bind:fail="onBackFail"
  bind:complete="onBackComplete"
>
  <view>页面内容</view>
</page-container>
```

```typescript
Page({
  onBackSuccess(res) {
    console.log('返回成功', res)
  },
  onBackFail(err) {
    console.log('返回失败', err)
  },
  onBackComplete(res) {
    console.log('返回完成', res)
  },
})
```

## 返回按钮显示逻辑

组件在实例进入页面节点树时，根据以下条件计算返回按钮是否显示：

```text
showLeftArrow = getCurrentPages().length > 1 && navBarLeftArrow && navBarVisible
```

## 注意事项

1. 组件内部依赖 TDesign 的 `t-navbar`（组件自身已在 `usingComponents` 中引入），确保项目已正确集成 `tdesign-miniprogram`
2. 使用组件时，建议在页面的 `json` 配置中关闭原生导航栏：

```json
{
  "navigationStyle": "custom"
}
```

3. 组件会自动处理返回按钮的显示逻辑，无需手动判断页面栈
4. 如需自定义返回行为，可以通过监听 `success`、`fail`、`complete` 事件来实现

## 完整示例

```xml
<!-- pages/example/index.wxml -->
<page-container
  nav-bar-title="示例页面"
  nav-bar-background-color="#ffffff"
  nav-bar-text-color="#000000"
  nav-bar-left-arrow="{{true}}"
  nav-bar-fixed="{{true}}"
  nav-bar-placeholder="{{true}}"
  nav-bar-safe-area-inset-top="{{true}}"
  container-background-color="#f5f5f5"
  container-safe-area-inset-bottom="{{true}}"
  bind:success="onBackSuccess"
  bind:fail="onBackFail"
  bind:complete="onBackComplete"
>
  <view class="content">
    <view>这是页面内容区域</view>
  </view>
</page-container>
```

```json
// pages/example/index.json
{
  "navigationStyle": "custom",
  "usingComponents": {
    "page-container": "../../components/page-container/page-container"
  }
}
```

```typescript
// pages/example/index.ts
Page({
  onBackSuccess(res) {
    console.log('页面返回成功', res)
  },
  onBackFail(err) {
    console.log('页面返回失败', err)
  },
  onBackComplete(res) {
    console.log('页面返回完成', res)
  },
})
```
