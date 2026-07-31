# 自定义 TabBar

基于 TDesign 组件的自定义 TabBar 实现，位于 `miniprogram/custom-tab-bar/` 目录。

## 主要特性

- 基于 TDesign 的 `t-tab-bar` 和 `t-tab-bar-item` 组件，样式统一美观
- 自动状态同步，根据当前页面路由自动更新激活状态
- 支持页面切换，点击 TabBar 项自动跳转到对应页面
- 完整的 TypeScript 类型支持
- 易于扩展和自定义

## 配置说明

### 1. 在 `app.json` 中启用自定义 TabBar

```json
{
  "tabBar": {
    "custom": true, // 配置为 true 开启自定义 tabbar
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

### 2. TabBar 组件配置

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

## 在 TabBar 页面中使用

每个 TabBar 页面需要在 `onShow` 生命周期中调用 `init()` 方法来同步 TabBar 状态：

```typescript
Page({
  onShow() {
    // 同步 TabBar 激活状态
    this.getTabBar().init()
  },
})
```

## 自定义 TabBar 项

如需添加或修改 TabBar 项，请按以下步骤操作：

1. 在 `miniprogram/custom-tab-bar/index.ts` 的 `data.list` 数组中添加或修改配置项
2. 在 `miniprogram/app.json` 的 `tabBar.list` 数组中同步更新配置
3. 确保对应的页面已创建并在 `app.json` 的 `pages` 数组中注册

## 注意事项

- TabBar 页面必须在 `onShow` 中调用 `this.getTabBar().init()`，否则可能出现状态不同步
- `app.json` 的 `tabBar.list` 和 `custom-tab-bar/index.ts` 的 `data.list` 配置需保持一致（页面路径和顺序）
- 支持的 TDesign 内置图标：`home`、`app`、`chat`、`user`、`setting` 等，更多参考 [TDesign 图标文档](https://tdesign.tencent.com/miniprogram/components/tab-bar)
