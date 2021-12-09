const rule = require("../../../lib/rules/hard-coded-i18n"),
  RuleTester = require("eslint").RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  }
})

tester.run('hard-coded-i18n', rule, {
  valid: [
    `<template>
      <!-- hello -->
      <span>{{$t('hello')}}</span>
    </template>`
  ],
  invalid: [
    {
      code: `
      <template>
        <!-- 你好 -->
        <span>Hello</span>
      </template>`,
      options:['always'],
      errors: [
        {
          message:
            "For compatibility locales. Do not directly Hard Coded.\nRecommand:\n`{{ $t('xxx') }}`",
          type: "VText",
        },
      ],
    }
  ]
})
