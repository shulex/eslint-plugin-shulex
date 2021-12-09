# eslint-plugin-shulex

shulex eslint plugin

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-shulex`:

```sh
npm install eslint-plugin-shulex --save-dev
```

## Usage

Add `shulex` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["shulex"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "shulex/no-local-storage": "error",
    "shulex/no-session-storage": "error",
    "shulex/hard-coded-i18n": "error"
  }
}
```

## Supported Rules

- Fill in provided rules here
