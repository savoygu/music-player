module.exports = {
  extends: [
    '@savoygu/eslint-config-vue',
    '@savoygu/eslint-config-vue/typescript'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',

    'no-used-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error']
  }
}
