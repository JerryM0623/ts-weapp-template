/**
 * 格式化数字为两位数，不足两位前面补0
 * @param n 需要格式化的数字
 * @returns 格式化后的字符串（两位数）
 */
const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

/**
 * 格式化日期时间为 YYYY/MM/DD HH:mm:ss 格式
 * @param date 需要格式化的日期对象
 * @returns 格式化后的日期时间字符串，格式为 YYYY/MM/DD HH:mm:ss
 */
export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

/**
 * 格式化日期时间
 * @param {Date|Number|String} date 日期对象、时间戳或日期字符串
 * @param {String} format 格式化模板，支持以下占位符：
 *   - YYYY: 4位年份
 *   - YY: 2位年份
 *   - MM: 2位月份
 *   - M: 1位月份
 *   - DD: 2位日期
 *   - D: 1位日期
 *   - HH: 2位小时(24小时制)
 *   - H: 1位小时(24小时制)
 *   - hh: 2位小时(12小时制)
 *   - h: 1位小时(12小时制)
 *   - mm: 2位分钟
 *   - m: 1位分钟
 *   - ss: 2位秒
 *   - s: 1位秒
 *   - SSS: 3位毫秒
 *   - A: 上午/下午
 *   - a: 上午/下午(小写)
 * @return {String} 格式化后的日期时间字符串
 */
export const formatDateTime = (
  date: Date | number | string | undefined,
  format: string = 'YYYY/MM/DD HH:mm:ss',
): string => {
  if (!date && date !== 0) return ''

  let d: Date

  // 1. 处理字符串类型的特殊清洗逻辑 (兼容原本 getDate 的脏数据处理能力)
  if (typeof date === 'string') {
    let cleanStr = date.trim()

    // 替换中文符号和特殊符号为标准分隔符
    if (['年', '月', '日'].some((x) => cleanStr.includes(x))) {
      cleanStr = cleanStr.replace(/[年月日]/g, '/')
    }

    // 补全简写日期 (例如 "2020" -> "2020/01/01") 以便 new Date 解析
    const parts = cleanStr.split(/[-/ :]/).filter(Boolean)
    if (parts.length === 1)
      cleanStr += '/01/01' // 只有年
    else if (parts.length === 2) cleanStr += '/01' // 只有年月

    // 解决 iOS/Safari 不支持 "-" 连接符的问题
    cleanStr = cleanStr.replace(/-/g, '/')

    d = new Date(cleanStr)
  } else if (typeof date === 'number') {
    d = new Date(date)
  } else {
    d = date
  }

  // 有效性检查
  if (!(d instanceof Date) || isNaN(d.getTime())) {
    return ''
  }

  // 提取时间分量
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const milliseconds = d.getMilliseconds()

  // 定义替换映射表
  const matches: Record<string, string | number> = {
    YYYY: year,
    YY: String(year).slice(-2),
    MM: String(month).padStart(2, '0'),
    M: month,
    DD: String(day).padStart(2, '0'),
    D: day,
    HH: String(hours).padStart(2, '0'),
    H: hours,
    hh: String(hours % 12 || 12).padStart(2, '0'),
    h: hours % 12 || 12,
    mm: String(minutes).padStart(2, '0'),
    m: minutes,
    ss: String(seconds).padStart(2, '0'),
    s: seconds,
    SSS: String(milliseconds).padStart(3, '0'),
    A: hours < 12 ? '上午' : '下午',
    a: hours < 12 ? 'am' : 'pm',
  }

  // 5. 生成结果
  return format.replace(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g, (match) =>
    String(matches[match]),
  )
}
