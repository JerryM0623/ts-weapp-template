// pages/index.ts
import { Encrypt, Decrypt, BASE64Encrypt, BASE64Decrypt, AESError } from '../../utils/aes'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 输入原文
    plainText: 'Hello, 小程序 AES 加密示例！',
    // 标准 Base64 加密结果
    encryptedText: '',
    // 标准 Base64 解密结果
    decryptedText: '',
    // URL Safe Base64 加密结果
    base64EncryptedText: '',
    // URL Safe Base64 解密结果
    base64DecryptedText: '',
    // 错误信息
    errorMessage: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 页面加载时自动执行一次加密解密示例
    this.handleEncrypt()
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
   * 输入原文变化
   */
  onPlainTextInput(e: WechatMiniprogram.Input) {
    this.setData({
      plainText: e.detail.value,
      errorMessage: '',
    })
  },

  /**
   * 执行标准 Base64 加密
   */
  handleEncrypt() {
    try {
      const { plainText } = this.data
      if (!plainText.trim()) {
        wx.showToast({
          title: '请输入要加密的内容',
          icon: 'none',
        }).catch(() => {
          console.error('showToast error')
        })
        return
      }

      // 执行加密
      const encrypted = Encrypt(plainText)
      this.setData({
        encryptedText: encrypted,
        errorMessage: '',
      })

      wx.showToast({
        title: '加密成功',
        icon: 'success',
      }).catch(() => {
        console.error('showToast error')
      })
    } catch (error) {
      const errorMsg = error instanceof AESError ? error.message : '加密失败'
      this.setData({
        errorMessage: errorMsg,
      })
      wx.showToast({
        title: errorMsg,
        icon: 'none',
        duration: 2000,
      }).catch(() => {
        console.error('showToast error')
      })
    }
  },

  /**
   * 执行标准 Base64 解密
   */
  handleDecrypt() {
    try {
      const { encryptedText } = this.data
      if (!encryptedText.trim()) {
        wx.showToast({
          title: '请输入要解密的内容',
          icon: 'none',
        }).catch(() => {
          console.error('showToast error')
        })
        return
      }

      // 执行解密
      const decrypted = Decrypt(encryptedText)
      if (decrypted === null) {
        this.setData({
          errorMessage: '解密失败：密钥不匹配或密文被篡改',
        })
        wx.showToast({
          title: '解密失败',
          icon: 'none',
          duration: 2000,
        }).catch(() => {
          console.error('showToast error')
        })
        return
      }

      this.setData({
        decryptedText: decrypted,
        errorMessage: '',
      })

      wx.showToast({
        title: '解密成功',
        icon: 'success',
      }).catch(() => {
        console.error('showToast error')
      })
    } catch (error) {
      const errorMsg = error instanceof AESError ? error.message : '解密失败'
      this.setData({
        errorMessage: errorMsg,
      })
      wx.showToast({
        title: errorMsg,
        icon: 'none',
        duration: 2000,
      }).catch(() => {
        console.error('showToast error')
      })
    }
  },

  /**
   * 执行 URL Safe Base64 加密
   */
  handleBase64Encrypt() {
    try {
      const { plainText } = this.data
      if (!plainText.trim()) {
        wx.showToast({
          title: '请输入要加密的内容',
          icon: 'none',
        }).catch(() => {
          console.error('showToast error')
        })
        return
      }

      // 执行 URL Safe Base64 加密
      const encrypted = BASE64Encrypt(plainText)
      this.setData({
        base64EncryptedText: encrypted,
        errorMessage: '',
      })

      wx.showToast({
        title: '加密成功',
        icon: 'success',
      }).catch(() => {
        console.error('showToast error')
      })
    } catch (error) {
      const errorMsg = error instanceof AESError ? error.message : '加密失败'
      this.setData({
        errorMessage: errorMsg,
      })
      wx.showToast({
        title: errorMsg,
        icon: 'none',
        duration: 2000,
      }).catch(() => {
        console.error('showToast error')
      })
    }
  },

  /**
   * 执行 URL Safe Base64 解密
   */
  handleBase64Decrypt() {
    try {
      const { base64EncryptedText } = this.data
      if (!base64EncryptedText.trim()) {
        wx.showToast({
          title: '请输入要解密的内容',
          icon: 'none',
        }).catch(() => {
          console.error('showToast error')
        })
        return
      }

      // 执行 URL Safe Base64 解密
      const decrypted = BASE64Decrypt(base64EncryptedText)
      if (decrypted === null) {
        this.setData({
          errorMessage: '解密失败：密钥不匹配或密文被篡改',
        })
        wx.showToast({
          title: '解密失败',
          icon: 'none',
          duration: 2000,
        }).catch(() => {
          console.error('showToast error')
        })
        return
      }

      this.setData({
        base64DecryptedText: decrypted,
        errorMessage: '',
      })

      wx.showToast({
        title: '解密成功',
        icon: 'success',
      }).catch(() => {
        console.error('showToast error')
      })
    } catch (error) {
      const errorMsg = error instanceof AESError ? error.message : '解密失败'
      this.setData({
        errorMessage: errorMsg,
      })
      wx.showToast({
        title: errorMsg,
        icon: 'none',
        duration: 2000,
      }).catch(() => {
        console.error('showToast error')
      })
    }
  },

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
