// pages/date/date.ts
import { formatTime, formatDateTime } from '../../utils/util'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // formatTime 示例
    formatTimeExamples: [] as Array<{ label: string; value: string }>,
    // formatDateTime 示例 - 不同格式模板
    formatDateTimeExamples: [] as Array<{ label: string; format: string; value: string }>,
    // formatDateTime 示例 - 不同输入类型
    inputTypeExamples: [] as Array<{ label: string; input: string; value: string }>,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initExamples()
  },

  /**
   * 初始化所有示例数据
   */
  initExamples() {
    const now = new Date()
    const timestamp = now.getTime()
    const dateString = '2024-01-15 14:30:45'
    const chineseDateString = '2024年1月15日'

    // formatTime 示例
    const formatTimeExamples = [
      {
        label: '当前时间',
        value: formatTime(now),
      },
      {
        label: '指定日期',
        value: formatTime(new Date(2024, 0, 15, 14, 30, 45)),
      },
      {
        label: '昨天',
        value: formatTime(new Date(timestamp - 24 * 60 * 60 * 1000)),
      },
      {
        label: '明天',
        value: formatTime(new Date(timestamp + 24 * 60 * 60 * 1000)),
      },
    ]

    // formatDateTime 示例 - 不同格式模板
    const formatDateTimeExamples = [
      {
        label: '默认格式（YYYY/MM/DD HH:mm:ss）',
        format: 'YYYY/MM/DD HH:mm:ss',
        value: formatDateTime(now),
      },
      {
        label: '中文日期格式',
        format: 'YYYY年MM月DD日 HH:mm:ss',
        value: formatDateTime(now, 'YYYY年MM月DD日 HH:mm:ss'),
      },
      {
        label: '短日期格式',
        format: 'YY/MM/DD',
        value: formatDateTime(now, 'YY/MM/DD'),
      },
      {
        label: '12小时制格式',
        format: 'YYYY-MM-DD hh:mm:ss A',
        value: formatDateTime(now, 'YYYY-MM-DD hh:mm:ss A'),
      },
      {
        label: '24小时制格式',
        format: 'YYYY-MM-DD HH:mm:ss',
        value: formatDateTime(now, 'YYYY-MM-DD HH:mm:ss'),
      },
      {
        label: '仅日期',
        format: 'YYYY-MM-DD',
        value: formatDateTime(now, 'YYYY-MM-DD'),
      },
      {
        label: '仅时间',
        format: 'HH:mm:ss',
        value: formatDateTime(now, 'HH:mm:ss'),
      },
      {
        label: '带毫秒',
        format: 'YYYY-MM-DD HH:mm:ss.SSS',
        value: formatDateTime(now, 'YYYY-MM-DD HH:mm:ss.SSS'),
      },
      {
        label: '美式日期格式',
        format: 'MM/DD/YYYY',
        value: formatDateTime(now, 'MM/DD/YYYY'),
      },
      {
        label: '完整中文格式',
        format: 'YYYY年MM月DD日 HH时mm分ss秒',
        value: formatDateTime(now, 'YYYY年MM月DD日 HH时mm分ss秒'),
      },
    ]

    // formatDateTime 示例 - 不同输入类型
    const inputTypeExamples = [
      {
        label: 'Date 对象',
        input: 'new Date()',
        value: formatDateTime(now),
      },
      {
        label: '时间戳（数字）',
        input: `${timestamp}`,
        value: formatDateTime(timestamp),
      },
      {
        label: '日期字符串（标准格式）',
        input: dateString,
        value: formatDateTime(dateString),
      },
      {
        label: '中文日期字符串',
        input: chineseDateString,
        value: formatDateTime(chineseDateString),
      },
      {
        label: '仅年份字符串',
        input: '2024',
        value: formatDateTime('2024'),
      },
      {
        label: '年月字符串',
        input: '2024/01',
        value: formatDateTime('2024/01'),
      },
    ]

    this.setData({
      formatTimeExamples,
      formatDateTimeExamples,
      inputTypeExamples,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  /**
   * 复制文本到剪贴板
   */
  copyText(e: WechatMiniprogram.Touch) {
    const { text } = e.currentTarget.dataset
    if (!text) {
      return
    }

    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
        }).catch(() => {
          console.error('showToast error')
        })
      },
    })
  },
})
