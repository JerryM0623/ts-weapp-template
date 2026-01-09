/// <reference path="./types/index.d.ts" />

/**
 * npm 包类型声明
 * 用于声明项目中使用的 npm 包的类型
 * 
 * 说明：
 * - crypto-js: 类型定义通过 @types/crypto-js 提供
 * - tdesign-miniprogram: 自带完整的类型定义文件
 * 
 * TypeScript 会自动从 node_modules 中读取这些类型定义
 * 此文件主要用于确保模块在小程序环境中的正确识别和类型支持
 */

// crypto-js 类型声明
// @types/crypto-js 已安装，通过三斜线指令引用类型定义
/// <reference types="crypto-js" />

// tdesign-miniprogram 类型声明
// tdesign-miniprogram 自带完整的类型定义文件
// TypeScript 会自动从 node_modules/tdesign-miniprogram/miniprogram_dist 读取类型
// 这里提供一个模块声明，确保在小程序环境中能正确识别
declare module 'tdesign-miniprogram' {
  // 类型定义由 tdesign-miniprogram 包内提供
  // 实际使用时，TypeScript 会自动识别 miniprogram_dist 目录下的类型文件
  export * from 'tdesign-miniprogram/miniprogram_dist/index'
}
