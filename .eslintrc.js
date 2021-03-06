module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'indent': 0,
    'semi': 0,
    'padded-blocks': 0,
    'camelcase': 0,
    'no-unused-vars': 0,
    'no-trailing-spaces': 0,
    'no-control-regex': 0,
    'no-multi-spaces': 0,
    'eol-last': 0,
    'handle-callback-err': 0
  }
}