module.exports = {
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  extends: [
    'airbnb-base',
  ],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  settings: {
    'import/resolver': { node: { extensions: ['.js', '.ts'] } },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // File
    indent: ['error', 2],
    '@typescript-eslint/indent': 'off',
    semi: ['error', 'always'],
    'max-len': ['error', { code: 200, ignoreComments: true, tabWidth: 2 }],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1 }],

    // Layout
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'no-trailing-spaces': 'error',
    'no-unexpected-multiline': 'error',
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': 'error',
    'space-in-parens': 'error',
    'no-multi-spaces': 'error',
    'comma-spacing': 'error',
    'no-template-curly-in-string': 'off',
    camelcase: 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

    // Code
    'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
    'no-unreachable': 'error',
    'no-new': 'off',
    'max-classes-per-file': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    '@typescript-eslint/no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
    'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
  },
};
