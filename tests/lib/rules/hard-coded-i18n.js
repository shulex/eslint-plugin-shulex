const rule = require("../../../lib/rules/hard-coded-i18n"),
  RuleTester = require("eslint").RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

tester.run("hard-coded-i18n", rule, {
  valid: [
    {
      code: `<template>
      <v-btn
      color="primary"
      :class="$style.addBtn"
      outlined
      block
      large
      @click="addCategory"
    >
      <v-icon style="margin-right: 12px;">
        $plusCircleOutline
      </v-icon>
    </v-btn>
      <!-- hello -->
      <span>{{$t('hello')}}</span>
    </template>`,
      options: [{
        ignoreTags:["v-icon"],
      }],
    },
  ],
  invalid: [
    {
      code: `
      <template>
        <!-- 你好 -->
        <span>Hello</span>
        <v-icon style="margin-right: 12px;">
          $plusCircleOutline
        </v-icon>
      </template>`,
      options: [{
        ignoreTags:["v-icon"],
      }],
      errors: [
        {
          message:
            "For compatibility locales. Do not directly Hard Coded.\nRecommand:\n`{{ $t('xxx') }}`",
          type: "VText",
        },
      ],
    },
  ],
});
