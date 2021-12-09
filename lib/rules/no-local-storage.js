module.exports = {
    meta: {
      docs: {
        description: "no-direct-use-of-localStorage",
        category: "no-direct-use-of-localStorage",
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
        "CallExpression[callee.object.name='localStorage']"(node) {
          context.report({
            node,
            message:
              "For compatibility of node SSR. Do not directly call localStorage.xxxItem.\nRecommand:\n`import { setCacheItem, getCacheItem } from '~/tuna/lib/utils'`",
          });
        },
      };
    },
  };
  