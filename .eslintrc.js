module.exports = {
  root: true,
  env: {
    node: true,
    // 自訂

  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 自訂
    'vuejs-accessibility/label-has-for': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'vuejs-accessibility/anchor-has-content': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vue/multi-word-component-names': 'off',
    'func-names': 'off',
  },
};
