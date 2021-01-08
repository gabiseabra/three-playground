module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  extends: ['prettier', 'eslint:recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: false,
        singleQuote: true,
        semi: false,
        arrowParens: 'always',
        trailingComma: 'none'
      }
    ],
    'array-bracket-spacing': [2, 'never'],
    'comma-dangle': [
      'error',
      {
        arrays: 'ignore',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    'linebreak-style': ['error', 'unix'],
    'object-curly-spacing': ['error', 'never'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  }
}
