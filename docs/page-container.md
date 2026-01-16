# PageContainer 组件使用手册

## 概述

PageContainer 是一个基于 TDesign Navbar 组件封装的页面容器组件，提供了统一的导航栏和内容区域布局，简化了小程序页面的开发流程。组件自动处理返回按钮显示逻辑、安全区域适配等常见需求。

## 功能特性

- 基于 TDesign Navbar 组件，样式统一美观
- 自动判断返回按钮显示（根据页面栈深度）
- 支持安全区域适配（适配刘海屏等特殊设备）
- 支持固定导航栏和占位符
- 支持自定义导航栏样式（背景色、文本颜色）
- 提供多个插槽支持自定义内容
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
<page-container title="页面标题">
  <view>页面内容</view>
</page-container>
```

### 自定义导航栏样式

```xml
<page-container 
  title="页面标题" 
  backgroundColor="#123321" 
  textColor="#ffffff">
  <view>页面内容</view>
</page-container>
```

### 隐藏返回按钮

```xml
<page-container title="页面标题" left-arrow="{{false}}">
  <view>页面内容</view>
</page-container>
```

### 隐藏导航栏

```xml
<page-container title="页面标题" visible="{{false}}">
  <view>页面内容</view>
</page-container>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | String | '' | 导航栏标题 |
| leftArrow | Boolean | true | 是否显示返回按钮 |
| fixed | Boolean | true | 导航栏是否固定 |
| placeholder | Boolean | true | 导航栏占位 |
| safeAreaInsetTop | Boolean | true | 是否适配安全区域顶部 |
| zIndex | Number | 10000 | 导航栏层级 |
| animation | Boolean | true | 是否带动画效果 |
| delta | Number | 1 | 后退的层数 |
| titleMaxLength | Number | undefined | 标题最大长度，超出用 "…" 表示 |
| visible | Boolean | true | 是否显示导航栏 |
| backgroundColor | String | '#ffffff' | 导航栏背景色 |
| textColor | String | '#000000' | 导航栏文本颜色（标题、返回按钮等） |

## 插槽说明

组件提供了三个插槽用于自定义导航栏内容：

### left 插槽

自定义左侧内容（返回按钮区域）：

```xml
<page-container title="页面标题">
  <view slot="left">自定义左侧内容</view>
  <view>页面内容</view>
</page-container>
```

### capsule 插槽

自定义胶囊区域内容：

```xml
<page-container title="页面标题">
  <view slot="capsule">自定义胶囊内容</view>
  <view>页面内容</view>
</page-container>
```

### title 插槽

自定义标题区域内容：

```xml
<page-container title="页面标题">
  <view slot="title">自定义标题内容</view>
  <view>页面内容</view>
</page-container>
```

## 事件说明

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| success | 返回成功时触发 | event.detail |
| fail | 返回失败时触发 | event.detail |
| complete | 返回完成时触发（无论成功或失败） | event.detail |

### 事件使用示例

```xml
<page-container 
  title="页面标题"
  bind:success="onBackSuccess"
  bind:fail="onBackFail"
  bind:complete="onBackComplete">
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

组件会自动判断是否显示返回按钮，判断规则如下：

1. 如果页面栈中只有一个页面（首页），则不显示返回按钮
2. 如果 `leftArrow` 属性为 `false`，则不显示返回按钮
3. 如果 `visible` 属性为 `false`，则不显示返回按钮
4. 其他情况显示返回按钮

## 注意事项

1. 组件依赖 TDesign 的 `t-navbar` 组件，确保已正确安装和构建 TDesign 组件库
2. 使用组件时，建议在页面的 `json` 配置中关闭原生导航栏：

```json
{
  "navigationStyle": "custom"
}
```

3. 组件会自动处理返回按钮的显示逻辑，无需手动判断页面栈
4. 如需自定义返回行为，可以通过监听 `success`、`fail`、`complete` 事件来实现
5. 使用 `delta` 属性可以控制返回的页面层数，默认为 1（返回上一页）

## 完整示例

```xml
<!-- pages/example/index.wxml -->
<page-container 
  title="示例页面"
  backgroundColor="#ffffff"
  textColor="#000000"
  left-arrow="{{true}}"
  fixed="{{true}}"
  placeholder="{{true}}"
  safe-area-inset-top="{{true}}"
  bind:success="onBackSuccess">
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
})
```
