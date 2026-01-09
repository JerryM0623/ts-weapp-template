import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default tseslint.config(
  // 全局忽略的文件和目录
  {
    ignores: [
      '**/node_modules/**',
      '**/miniprogram_npm/**',
      '**/dist/**',
      '**/coverage/**',
      '**/*.js.map',
      '**/typings/**',
      '**/*.d.ts',
    ],
  },

  // ESLint 推荐规则
  eslint.configs.recommended,

  // TypeScript ESLint 推荐规则
  ...tseslint.configs.recommended,

  // 项目特定配置
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier 集成
      'prettier/prettier': 'error',

      // TypeScript 规则调整（根据小程序特点）
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // 通用规则
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
    },
  },

  // Prettier 配置（禁用与 Prettier 冲突的规则）
  prettierConfig,
)
