// 小程序中使用命名空间导入 crypto-js（CommonJS 模块）
// 注意：crypto-js 是 CommonJS 模块，在小程序中需要使用 import * as 方式导入
import * as CryptoJS from 'crypto-js'

/**
 * AES 加密/解密错误类
 */
export class AESError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message)
    this.name = 'AESError'
  }
}

//  KEY 和 IV
const DEFAULT_KEY: string = 'J9w8x7z6y7A7B3C2D1E0F9G8H7I6J5K4'
const DEFAULT_IV: string = 'Q1w2Q3T4T5y6U7i8'

/**
 * 统一解析 Key 和 IV
 * 强制校验长度，确保触发 AES-256
 * @throws {AESError} 当 KEY 或 IV 长度不符合要求时抛出错误
 */
const parseKeyIv = (keyStr: string, ivStr: string) => {
  try {
    // 验证 CryptoJS 是否正确加载
    if (!CryptoJS || !CryptoJS.enc || !CryptoJS.enc.Utf8) {
      throw new AESError('CryptoJS 模块未正确加载，请检查 crypto-js 依赖', 'MODULE_NOT_LOADED')
    }

    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const iv = CryptoJS.enc.Utf8.parse(ivStr)

    // IV 必须是 16 字节 (128 bit)，否则 AES 算法本身会出错或行为异常
    if (iv.sigBytes !== 16) {
      throw new AESError(
        `AES IV 错误: 期望 16 字节, 但实际为 ${iv.sigBytes} 字节.`,
        'INVALID_IV_LENGTH',
      )
    }

    // Key 必须是 32 字节 (256 bit) 才能触发 AES-256
    // 如果是 16 字节会降级为 AES-128，如果是 24 字节是 AES-192
    // 为了强制 AES-256，这里必须报错
    if (key.sigBytes !== 32) {
      throw new AESError(
        `AES Key 错误: 期望 32 字节 (用于 AES-256), 但实际为 ${key.sigBytes} 字节.`,
        'INVALID_KEY_LENGTH',
      )
    }

    return { key, iv }
  } catch (error) {
    // 如果是 AESError，直接抛出
    if (error instanceof AESError) {
      throw error
    }
    // 其他错误包装为 AESError
    throw new AESError(
      `解析 Key 或 IV 时发生错误: ${error instanceof Error ? error.message : String(error)}`,
      'PARSE_ERROR',
    )
  }
}

/**
 * 标准 AES 加密 (输出标准 Base64)
 * @param word 要加密的字符串
 * @param keyStr 密钥，可选，默认使用 DEFAULT_KEY
 * @param ivStr 初始化向量，可选，默认使用 DEFAULT_IV
 * @returns 加密后的字符串
 * @throws {AESError} 当加密失败时抛出错误
 */
export const Encrypt = (
  word: string,
  keyStr: string = DEFAULT_KEY,
  ivStr: string = DEFAULT_IV,
): string => {
  try {
    // 验证输入参数
    if (typeof word !== 'string') {
      throw new AESError('要加密的内容必须是字符串类型', 'INVALID_INPUT')
    }

    const { key, iv } = parseKeyIv(keyStr, ivStr)

    const src = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(src, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    const result = encrypted.toString()
    if (!result) {
      throw new AESError('加密结果为空，加密可能失败', 'ENCRYPT_FAILED')
    }

    return result
  } catch (error) {
    // 如果是 AESError，直接抛出
    if (error instanceof AESError) {
      throw error
    }
    // 其他错误包装为 AESError
    throw new AESError(
      `加密失败: ${error instanceof Error ? error.message : String(error)}`,
      'ENCRYPT_ERROR',
    )
  }
}

/**
 * 标准 AES 解密 (输入标准 Base64)
 * @param word 要解密的字符串
 * @param keyStr 密钥，可选，默认使用 DEFAULT_KEY
 * @param ivStr 初始化向量，可选，默认使用 DEFAULT_IV
 * @returns 解密后的字符串，解密失败
 * @throws {AESError} 当解密过程中发生真正的错误时抛出
 */
export const Decrypt = (
  word: string,
  keyStr: string = DEFAULT_KEY,
  ivStr: string = DEFAULT_IV,
): string => {
  try {
    // 验证输入参数
    if (typeof word !== 'string' || !word.trim()) {
      throw new AESError('要解密的内容必须是非空字符串', 'INVALID_INPUT')
    }

    const { key, iv } = parseKeyIv(keyStr, ivStr)

    const decrypt = CryptoJS.AES.decrypt(word, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    const result = decrypt.toString(CryptoJS.enc.Utf8)

    // 如果解密结果为空，可能是密钥不匹配或密文被篡改（这是业务逻辑，不是错误）
    if (!result) {
      throw new AESError('解密结果为空，可能是密钥不匹配或密文被篡改', 'DECRYPT_FAILED')
    }

    return result
  } catch (error) {
    // 如果是 AESError，直接抛出（这些是真正的错误，不应该静默处理）
    if (error instanceof AESError) {
      throw error
    }
    // 其他错误（如参数错误、模块未加载等）包装为 AESError
    throw new AESError(
      `解密失败: ${error instanceof Error ? error.message : String(error)}`,
      'DECRYPT_ERROR',
    )
  }
}

/**
 * URL Safe Base64 加密
 * @param word 要加密的字符串
 * @param keyStr 密钥，可选，默认使用 DEFAULT_KEY
 * @param ivStr 初始化向量，可选，默认使用 DEFAULT_IV
 * @returns URL Safe Base64 编码的加密字符串
 * @throws {AESError} 当加密失败时抛出错误
 */
export const BASE64Encrypt = (
  word: string,
  keyStr: string = DEFAULT_KEY,
  ivStr: string = DEFAULT_IV,
): string => {
  try {
    const encrypted = Encrypt(word, keyStr, ivStr)
    return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  } catch (error) {
    // 如果是 AESError，直接抛出
    if (error instanceof AESError) {
      throw error
    }
    // 其他错误包装为 AESError
    throw new AESError(
      `URL Safe Base64 加密失败: ${error instanceof Error ? error.message : String(error)}`,
      'BASE64_ENCRYPT_ERROR',
    )
  }
}

/**
 * URL Safe Base64 解密
 * @param word 要解密的字符串
 * @param keyStr 密钥，可选，默认使用 DEFAULT_KEY
 * @param ivStr 初始化向量，可选，默认使用 DEFAULT_IV
 * @returns URL Safe Base64 解密后的字符串
 * @throws {AESError} 当解密过程中发生真正的错误时抛出
 */
export const BASE64Decrypt = (
  word: string,
  keyStr: string = DEFAULT_KEY,
  ivStr: string = DEFAULT_IV,
): string => {
  try {
    // 验证输入参数
    if (typeof word !== 'string' || !word.trim()) {
      throw new AESError('要解密的内容必须是非空字符串', 'INVALID_INPUT')
    }

    // 还原 Base64 格式
    let base64Str = word.replace(/-/g, '+').replace(/_/g, '/')

    // 补全末尾的 = (Base64长度必须是4的倍数)
    const mod4 = base64Str.length % 4
    if (mod4 > 0) {
      base64Str += '='.repeat(4 - mod4)
    }

    return Decrypt(base64Str, keyStr, ivStr)
  } catch (error) {
    // 如果是 AESError，直接抛出
    if (error instanceof AESError) {
      throw error
    }
    // 其他错误包装为 AESError
    throw new AESError(
      `URL Safe Base64 解密失败: ${error instanceof Error ? error.message : String(error)}`,
      'BASE64_DECRYPT_ERROR',
    )
  }
}
