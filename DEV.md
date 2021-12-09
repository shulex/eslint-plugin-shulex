# dev remark

为了方便调试rule，可以修改.vscode/launch.json中的program为要调试的测试文件，然后断点 F5运行就行

# auto publish

已经集成了github的ci，修改package.json中的version，然后git打tag推送即会触发自动publish 到npm

example
``` js
// 1. 修改package.json文件中version为1.0.1 后提交
// 2. git tag v1.0.1 && git push origin v1.0.1
```

# Other Resources

[ast explorer](https://astexplorer.net/)

[自定义 Eslint 开发](https://github.com/pfan123/Articles/issues/70)

[Eslint Rules](https://eslint.org/docs/rules/)

[RuleTester](https://cn.eslint.org/docs/developer-guide/nodejs-api#ruletester)

[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

[【AST篇】手把手教你写Eslint插件](https://juejin.cn/post/6844903961804161031)