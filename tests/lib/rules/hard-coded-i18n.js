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
      code: `
      <template>
        <v-btn color="primary" :class="$style.addBtn" outlined block large @click="addCategory">
          <v-icon style="margin-right: 12px;">
            $plusCircleOutline
          </v-icon>
        </v-btn>
        <!-- hello -->
        <span>{{$t('hello')}} :</span>
        <span> / </span>
      </template>`,
      options: [{
        ignoreTags:["v-icon"],
        ignores:[':','/']
      }],
    },
    {
      code: `
      <template>
        <v-field label />
        <v-field label="" />
        <v-field label=" " />
        <v-field label="  " />
        <v-field :label="test" />
        <v-field :label="$t('test')" />
        <v-field :placehold="$t('test')" :label="test" />
        <v-field :placehold="xxx" :label="$t('test')" />
      </template>`,
    },
  ],
  invalid: [
    {
      code: `
        <template>
          <!-- 你好 -->
          Hello
        </template>`,
      errors: [
        {
          messageId:'unHardCoded',
          type: "VText",
        },
      ],
    },
    {
      code: `
      <template>
        <v-field placehold="你好啊1" label="你好啊1"/>
        <v-field :placehold="'你好啊2'" :label="'你好啊2'"/>
      </template>`,
      errors: [
        {
          messageId:'unHardCoded',
          type: "VAttribute",
        },
        {
          messageId:'unHardCoded',
          type: "VAttribute",
        },
        {
          messageId:'unHardCoded',
          type: "VAttribute",
        },
        {
          messageId:'unHardCoded',
          type: "VAttribute",
        },
      ],
    },
  ],
});
