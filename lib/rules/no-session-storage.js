module.exports = {
    meta: {
      docs: {
        description: "no-direct-use-of-sessionStorage",
        category: "no-direct-use-of-sessionStorage",
        recommended: false,
      },
      fixable: null, // or "code" or "whitespace"
      schema: [
        {
          "enum": ["always", "never"]
        }
      ],
    },
    create(context) {
      return {
        "CallExpression[callee.object.name='sessionStorage']"(node) {
          context.report({
            node,
            message:
              "For compatibility of node SSR. Do not directly call sessionStorage.xxxItem.\nRecommand:\n`import { setCacheItem, getCacheItem } from '~/tuna/lib/utils'`",
          });
        },
      };
    },
  };
  