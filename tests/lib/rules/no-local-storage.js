const rule = require("../../../lib/rules/no-local-storage"),
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 7,
  },
});
ruleTester.run("no-local-storage", rule, {
  valid: [`setCacheItem('xxx')`],
  invalid: [
    {
      code: `localStorage.getItem('xx')`,
      errors: [
        {
          message:
            "For compatibility of node SSR. Do not directly call localStorage.xxxItem.\n" +
            "Recommand:\n" +
            "`import { setCacheItem, getCacheItem } from '~/tuna/lib/utils'`",
          type: "CallExpression",
        },
      ],
    },
  ],
});
