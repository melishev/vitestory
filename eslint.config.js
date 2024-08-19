import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    rules: {
      // Connect Prettier
      'prettier/prettier': ['error'],

      // Simple rules
      'no-undef': 'off',
      'no-console': 'warn',

      // Typescript rules
      // '@typescript-eslint/consistent-type-imports': 'error', // remove if not uncommented long time
      // '@typescript-eslint/no-import-type-side-effects': 'error',

      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/v-on-event-hyphenation': ['error', 'never'],

      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/block-order': ['error', { order: [['script[setup]', 'template'], 'style'] }],
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
        },
      ],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/component-options-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
  },
  eslintPluginPrettierRecommended,
]
