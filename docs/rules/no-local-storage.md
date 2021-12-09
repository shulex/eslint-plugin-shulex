# no-local-storage 禁止直接使用localStorage (no-local-storage)

ssr 模式下 无法直接使用localStorage

### 判定条件

代码里面直接使用localStorage，则报错

### 错误示例

```js
localStorage.getItem('')
```

```js
localStorage.setItem('','')
```

### 正确示例

```js
import { setCacheItem, getCacheItem } from '~/tuna/lib/utils'
setCacheItem('','')
```

```js
import { setCacheItem, getCacheItem } from '~/tuna/lib/utils'
getCacheItem('')
```

### 修复 【尚未实现】

插件提供了自动修复功能，在检测出错误代码之后，会自动修复，如下：

```js
// 修复前
localStorage.getItem('key')
// 修复后 变量名故意写错,为了让用户去修改它
import { getCacheItem } from '~/tuna/lib/utils'

getCacheItem('key')
```