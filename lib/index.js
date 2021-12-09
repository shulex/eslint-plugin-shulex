/**
 * @fileoverview shulex eslint plugin
 * @author gary.xie
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
  parser: require.resolve('vue-eslint-parser'),
  configs: {
    base: {
      parser: require.resolve('vue-eslint-parser'),
      parserOptions: {
        parser: require.resolve('babel-eslint'),
        sourceType: "module",
        ecmaVersion: 2018,
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: false,
          jsx: false
        }
      },
      env: {
        browser: true,
        es6: true
      },
      plugins: ['boilerplate'],
      rules: {
        'boilerplate/no-avoid-name': 'error',
        'boilerplate/no-useless-v-bind': 'error'
      }
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: requireIndex(__dirname + "/rules"),
};
