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
    // schema: [
    //   {
    //     enum: ["always","error", "never"],
    //   },
    //   {
    //     type: 'object',
    //     properties: {
    //       ignoreTags: {
    //         type: 'array'
    //       }
    //     }
    //   }
    // ],
    type: "suggestion",
  },
  create(context) {
    const options = context.options; // const ignoreIncludesComment = opts.ignoreIncludesComment
    // 允许的标签
    let allowRawNames = [];
    // 允许的内容
    let contentIgnores = [];
    // 有传入配置
    if (options && options.length > 0) {
      const config = options[0];
      if (config) {
        if (config.ignoreTags) {
          allowRawNames = config.ignoreTags;
        }
        if (config.ignores) {
          contentIgnores = config.ignores;
        }
      }
    }

    if (context.parserServices.defineTemplateBodyVisitor == null) {
      context.report({
        loc: { line: 1, column: 0 },
        message:
          "Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error",
      });
      return {};
    }

    // 检测属性值i18n
    function checkAttributeI18n(node){
      // <input  label="text"/>   node.directive=false && node.value.type==='VLiteral'
      // <input  :label="'text'"/>   node.value.type==='VExpressionContainer' && node.value.expression.type==='Literal'
      // <input  :label="$t('text')"/>   node.value.type==='VExpressionContainer' && node.value.expression.type==='CallExpression'
      // <input  :label="text"/>   node.value.type==='VIdentifier'
      if(node.directive){
        if(node.value.type==='VIdentifier'){
          return
        }
        // :xx="xx" 或者 :xx="$t()" || :label="option.description"
        if(node.value.type==='VExpressionContainer' 
          && node.value.expression 
          && (
            node.value.expression.type==='CallExpression'
            || node.value.expression.type==='Identifier'
            ||node.value.expression.type==='MemberExpression')
          ){
          return 
        }
      }
      // label="" || label 允许空字符串的情况
      else if(node.value===null || /^\s*$/gi.test(node.value.value)){
        return
      }
      

      context.report({
        node,
        messageId: "unHardCoded",
      });
    }

    // 检测html i18n
    function checkVText(node){
      const { value } = node;
      if (!value || /^\s*$/gi.test(value)) {
        return;
      }
      // 允许的node标签
      if (node.parent && allowRawNames.includes(node.parent.rawName)) {
        return;
      }
      // 忽略的内容(去掉前后空白后如果是允许的内容，则通过)
      const content=value?.replace(/^\s*(\S)?\s*$/gi,'$1')
      if(contentIgnores.includes(content)){
        return
      }

      context.report({
        node,
        messageId: "unHardCoded",
      });
    }

    return context.parserServices.defineTemplateBodyVisitor({
      VText:checkVText,
      "VAttribute[directive=false][key.name='label']": checkAttributeI18n,
      "VAttribute[directive=true][key.name.name='bind'][key.argument.name='label']": checkAttributeI18n,
      "VAttribute[directive=false][key.name='placehold']": checkAttributeI18n,
      "VAttribute[directive=true][key.name.name='bind'][key.argument.name='placehold']": checkAttributeI18n,
    });
  },
};
