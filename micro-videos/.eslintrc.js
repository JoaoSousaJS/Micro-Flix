module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    camelcase: 'off',
    'no-useless-constructor': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'dot-notation': 'off',
    'max-classes-per-file': 'off',
  },
};
