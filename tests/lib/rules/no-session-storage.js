const rule = require("../../../lib/rules/no-session-storage"),
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 7,
  },
});
ruleTester.run("no-session-storage", rule, {
  valid: [`setCacheItem('xxx')`],
  invalid: [
    {
      code: `sessionStorage.getItem('xx')`,
      errors: [
        {
          message:
            "For compatibility of node SSR. Do not directly call sessionStorage.xxxItem.\n" +
            "Recommand:\n" +
            "`import { setCacheItem, getCacheItem } from '~/tuna/lib/utils'`",
          type: "CallExpression",
        },
      ],
    },
  ],
});
