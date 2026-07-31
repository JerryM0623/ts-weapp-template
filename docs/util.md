# 时间日期格式化工具

灵活的时间日期格式化工具，位于 `miniprogram/utils/util.ts`。

## 主要功能

- 支持 Date 对象、时间戳、日期字符串等多种输入格式
- 自定义格式化模板，支持丰富的占位符
- 兼容中文日期格式（如 "2020年1月1日"）
- 兼容 iOS/Safari 日期解析问题
- 支持 12/24 小时制转换
- 支持毫秒显示

## 使用示例

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

## 占位符一览

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `YYYY` | 4位年份 | 2024 |
| `YY` | 2位年份 | 24 |
| `MM` | 2位月份 | 01 |
| `M` | 1位月份 | 1 |
| `DD` | 2位日期 | 15 |
| `D` | 1位日期 | 15 |
| `HH` | 2位小时（24小时制） | 14 |
| `H` | 1位小时（24小时制） | 14 |
| `hh` | 2位小时（12小时制） | 02 |
| `h` | 1位小时（12小时制） | 2 |
| `mm` | 2位分钟 | 30 |
| `m` | 1位分钟 | 30 |
| `ss` | 2位秒 | 45 |
| `s` | 1位秒 | 45 |
| `SSS` | 3位毫秒 | 123 |
| `A` | 上午/下午 | 下午 |
| `a` | am/pm | pm |
