module.exports = {
  meta: {
    docs: {
      description: "no allowed hard coded locale",
      category: "hard coded",
      recommended: false,
    },
    fixable: "code", // or "code" or "whitespace"
    messages: {
      unHardCoded:
        "For compatibility locales. Do not directly Hard Coded.\nRecommand:\n`{{ $t('xxx') }}`",
    },
    schema: [
      {
        enum: ["always","error", "never"],
      },
      // {
      //   type: "object",
      //   properties: {
      //     ignoreIncludesComment: {
      //       type: "boolean",
      //     },
      //     ignoreStringEscape: {
      //       type: "boolean",
      //     },
      //   },
      // },
    ],
    type: "suggestion",
  },
  create(context) {
    const [tip] = context?.options || []; // const ignoreIncludesComment = opts.ignoreIncludesComment
    // const ignoreStringEscape = opts.ignoreStringEscape
    // const sourceCode = context.getSourceCode()
    if (tip && tip === "never") {
      return;
    }

    if (context.parserServices.defineTemplateBodyVisitor == null) {
      context.report({
        loc: { line: 1, column: 0 },
        message:
          "Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error",
      });
      return {};
    }

    return context.parserServices.defineTemplateBodyVisitor({
      VText: function (node) {
        const { value } = node;
        if (!value || /^\s*$/gi.test(value)) {
          return;
        }
        context.report({
          node,
          messageId: "unHardCoded",
        });
      },
    });
  },
};
