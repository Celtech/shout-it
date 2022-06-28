module.exports = {
  root: true,
  settings: {
    tailwindcss: {
      config: 'packages/app/tailwind.config.js',
    },
    // We don't actually use React, this only exists to silence a warning
    // https://github.com/DRD4-7R/eslint-config-7r-building/issues/1#issuecomment-473031376
    react: {
      version: '99.99.99',
    },
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2021,
  },
  env: {
    es2021: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:tailwindcss/recommended',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'airbnb',
    'prettier',
    'plugin:compat/recommended',
  ],
  plugins: ['prettier', 'tailwindcss'],
  rules: {
    'prettier/prettier': ['error'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  overrides: [
    {
      files: 'packages/api/**/*',
      rules: {
        'no-console': 'off',
        'no-param-reassign': 'off',
      },
    },
  ],
};
