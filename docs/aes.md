# AES 加密解密工具

完整的 AES-256 加密解密工具，位于 `miniprogram/utils/aes.ts`。

## 主要功能

- 标准 AES-256-CBC 加密解密
- URL Safe Base64 格式支持
- 完整的错误处理和类型校验（`AESError`）
- 自定义密钥和 IV 支持

## 使用示例

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

## 注意事项

- 默认的 AES 密钥和 IV 仅用于开发测试，**生产环境请务必修改**
- Key 强制要求 32 字节以触发 AES-256，不足或超出会抛出 `AESError`
- IV 强制要求 16 字节
- 解密失败（密钥不匹配/密文被篡改）会抛出 `AESError`，请调用方 catch 处理
