# hard-coded-i18n 禁止硬编码文案 (hard-coded-i18n)

多语言模式下，使用硬编码容易被漏掉

### 判定条件

template里面直接使用硬编码的文案会报错

### 错误示例

```jsx
<template>
    <p> Hello </p>
</template>
```

### 正确示例

```jsx
<template>
    <p> {{$t('hello')}} </p>
</template>
```

```jsx
<template>
    <p> {{$t('hello')}} :</p>
</template>
```